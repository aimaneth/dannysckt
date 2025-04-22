import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/auth.config';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data: bookings, error } = await supabase
      .from('event_bookings')
      .select(`
        *,
        event:events(*)
      `)
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { event_id, number_of_guests, special_requests } = body;

    if (!event_id || !number_of_guests) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data: booking, error } = await supabase
      .from('event_bookings')
      .insert({
        user_id: session.user.id,
        event_id,
        number_of_guests,
        special_requests,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      if (error.message.includes('capacity exceeded')) {
        return NextResponse.json(
          { error: 'Event capacity exceeded' },
          { status: 400 }
        );
      }
      throw error;
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
} 