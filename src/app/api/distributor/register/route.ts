import { NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { addMonths } from 'date-fns';

export async function POST(request: Request) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      package_id,
      business_name,
      business_type,
      business_address,
      contact_person,
      contact_number,
    } = body;

    // Get package details
    const { data: packageData, error: packageError } = await supabase
      .from('distributor_packages')
      .select('*')
      .eq('id', package_id)
      .single();

    if (packageError || !packageData) {
      return NextResponse.json(
        { error: 'Invalid package selected' },
        { status: 400 }
      );
    }

    // Calculate subscription dates
    const startDate = new Date();
    const endDate = addMonths(startDate, packageData.duration_months);

    // Create subscription
    const { error: subscriptionError } = await supabase
      .from('distributor_subscriptions')
      .insert({
        user_id: session.user.id,
        package_id,
        business_name,
        business_type,
        business_address,
        contact_person,
        contact_number,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
      });

    if (subscriptionError) {
      console.error('Subscription error:', subscriptionError);
      return NextResponse.json(
        { error: 'Failed to create subscription' },
        { status: 500 }
      );
    }

    // Update user role to distributor
    const { error: updateError } = await supabase.auth.updateUser({
      data: { role: 'distributor' }
    });

    if (updateError) {
      console.error('Role update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update user role' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 