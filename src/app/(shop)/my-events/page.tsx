import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/auth.config';
import { supabase } from '@/lib/supabase';
import BookingsList from './components/BookingsList';

export const metadata: Metadata = {
  title: 'My Events | Danny\'s CKT',
  description: 'View and manage your event bookings',
};

export default async function MyEventsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin?from=/my-events');
  }

  const { data: bookings } = await supabase
    .from('event_bookings')
    .select(`
      *,
      event:events(*)
    `)
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Events</h1>
        <p className="mt-2 text-muted-foreground">
          View and manage your event bookings
        </p>
      </div>

      <BookingsList initialBookings={bookings || []} />
    </div>
  );
} 