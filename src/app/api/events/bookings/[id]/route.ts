import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/auth.config';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data: booking, error } = await supabase
      .from('event_bookings')
      .select(`
        *,
        event:events(*)
      `)
      .eq('id', params.id)
      .single();

    if (error) throw error;

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Check if user has permission to view this booking
    if (
      booking.user_id !== session.user.id &&
      session.user.role !== 'vendor'
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { number_of_guests, special_requests, status } = body;

    // Get the current booking
    const { data: existingBooking, error: fetchError } = await supabase
      .from('event_bookings')
      .select('*')
      .eq('id', params.id)
      .single();

    if (fetchError || !existingBooking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check permissions
    if (
      existingBooking.user_id !== session.user.id &&
      session.user.role !== 'vendor'
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Regular users can only update number_of_guests and special_requests
    const updates: any = {};
    if (session.user.role !== 'vendor') {
      if (number_of_guests) updates.number_of_guests = number_of_guests;
      if (special_requests) updates.special_requests = special_requests;
    } else {
      // Vendors can also update status
      if (status) updates.status = status;
      if (number_of_guests) updates.number_of_guests = number_of_guests;
      if (special_requests) updates.special_requests = special_requests;
    }

    const { data: booking, error } = await supabase
      .from('event_bookings')
      .update(updates)
      .eq('id', params.id)
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
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get the current booking
    const { data: booking, error: fetchError } = await supabase
      .from('event_bookings')
      .select('*')
      .eq('id', params.id)
      .single();

    if (fetchError || !booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check permissions
    if (
      booking.user_id !== session.user.id &&
      session.user.role !== 'vendor'
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { error } = await supabase
      .from('event_bookings')
      .delete()
      .eq('id', params.id);

    if (error) throw error;

    return NextResponse.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
} 