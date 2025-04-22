import { Metadata } from 'next';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DistributorRegistrationForm } from '../components/DistributorRegistrationForm';

export const metadata: Metadata = {
  title: 'Become a Distributor | Danny\'s CKT',
  description: 'Join our distributor network and grow your business with our authentic products',
};

export default async function DistributorRegistrationPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/signin?from=/distributor/register');
  }

  const { data: packages } = await supabase
    .from('distributor_packages')
    .select('*')
    .order('price');

  const { data: existingSubscription } = await supabase
    .from('distributor_subscriptions')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('status', 'active')
    .single();

  if (existingSubscription) {
    redirect('/distributor/dashboard');
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Become a Distributor</h1>
        <p className="mt-2 text-muted-foreground">
          Join our network of distributors and get access to wholesale prices and exclusive benefits
        </p>
      </div>

      <DistributorRegistrationForm packages={packages || []} userId={session.user.id} />
    </div>
  );
} 