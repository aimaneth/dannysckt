import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/auth.config';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'vendor') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const event_id = searchParams.get('event_id');
    const from_date = searchParams.get('from_date');
    const to_date = searchParams.get('to_date');

    let query = supabase
      .from('event_bookings')
      .select(`
        *,
        event:events(*),
        user:users(id, email)
      `)
      .order('created_at', { ascending: false });

    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }
    if (event_id) {
      query = query.eq('event_id', event_id);
    }
    if (from_date) {
      query = query.gte('created_at', from_date);
    }
    if (to_date) {
      query = query.lte('created_at', to_date);
    }

    const { data: bookings, error } = await query;

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

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'vendor') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { booking_ids, status } = body;

    if (!booking_ids || !Array.isArray(booking_ids) || !status) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { data: bookings, error } = await supabase
      .from('event_bookings')
      .update({ status })
      .in('id', booking_ids)
      .select();

    if (error) throw error;

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error updating bookings:', error);
    return NextResponse.json(
      { error: 'Failed to update bookings' },
      { status: 500 }
    );
  }
} 