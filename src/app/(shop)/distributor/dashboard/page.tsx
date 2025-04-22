import { Metadata } from 'next';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Distributor Dashboard | Danny\'s CKT',
  description: 'Manage your distributor account and place bulk orders',
};

export default async function DistributorDashboard() {
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
        description,
        price,
        duration_months,
        benefits,
        business_type,
        max_order_value
      )
    `)
    .eq('user_id', session.user.id)
    .single();

  if (!subscription) {
    redirect('/distributor/register');
  }

  // Get recent orders
  const { data: recentOrders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Distributor Dashboard</h1>
      
      {/* Subscription Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Subscription Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Package</p>
            <p className="font-medium">{subscription.distributor_packages.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Business Type</p>
            <p className="font-medium">{subscription.business_type}</p>
          </div>
          <div>
            <p className="text-gray-600">Max Order Value</p>
            <p className="font-medium">₱{subscription.distributor_packages.max_order_value.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Subscription End Date</p>
            <p className="font-medium">{format(new Date(subscription.end_date), 'MMMM d, yyyy')}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <a
          href="/distributor/order"
          className="bg-primary text-white rounded-lg p-6 text-center hover:bg-primary/90 transition-colors"
        >
          <h3 className="text-xl font-semibold mb-2">Place Bulk Order</h3>
          <p>Order ingredients and products in bulk with special pricing</p>
        </a>
        <a
          href="/distributor/orders"
          className="bg-secondary text-white rounded-lg p-6 text-center hover:bg-secondary/90 transition-colors"
        >
          <h3 className="text-xl font-semibold mb-2">View Orders</h3>
          <p>Track and manage your bulk orders</p>
        </a>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
        {recentOrders && recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Order ID</th>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Total</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-2">{order.id}</td>
                    <td className="py-2">{format(new Date(order.created_at), 'MMM d, yyyy')}</td>
                    <td className="py-2">₱{order.total_amount.toLocaleString()}</td>
                    <td className="py-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                        order.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No recent orders found.</p>
        )}
      </div>
    </div>
  );
} 