import { Metadata } from 'next';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import BulkOrderForm from '@/components/distributor/BulkOrderForm';

export const metadata: Metadata = {
  title: 'Place Bulk Order | Danny\'s CKT',
  description: 'Place bulk orders with special distributor pricing',
};

export default async function BulkOrderPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/signin');
  }

  // Get distributor subscription details
  const { data: subscription } = await supabase
    .from('distributor_subscriptions')
    .select(`
      *,
      distributor_packages (
        name,
        max_order_value,
        discount_percentage
      )
    `)
    .eq('user_id', session.user.id)
    .single();

  if (!subscription) {
    redirect('/distributor/register');
  }

  // Get available products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('name');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Place Bulk Order</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600">Package</p>
            <p className="font-medium">{subscription.distributor_packages.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Maximum Order Value</p>
            <p className="font-medium">₱{subscription.distributor_packages.max_order_value.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Discount</p>
            <p className="font-medium">{subscription.distributor_packages.discount_percentage}%</p>
          </div>
        </div>

        <BulkOrderForm 
          products={products || []} 
          maxOrderValue={subscription.distributor_packages.max_order_value}
          discountPercentage={subscription.distributor_packages.discount_percentage}
        />
      </div>
    </div>
  );
} 