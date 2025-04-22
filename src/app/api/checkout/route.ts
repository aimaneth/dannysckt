import { NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Stripe from 'stripe';

// Define types for request body
interface CartItem {
  id: string;
  quantity: number;
}

interface RequestBody {
  items: CartItem[];
}

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

export async function POST(request: Request) {
  try {
    // Get user session
    const supabase = createServerComponentClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get cart items from request body
    const body: RequestBody = await request.json();
    const { items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Fetch products from database to validate prices
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name, price, is_available')
      .in('id', items.map(item => item.id))
      .eq('is_available', true);

    if (productsError || !products) {
      console.error('Error fetching products:', productsError);
      return NextResponse.json(
        { error: 'Error fetching products' },
        { status: 500 }
      );
    }

    // Validate all products exist and are active
    const validProducts = products.length === items.length;
    if (!validProducts) {
      return NextResponse.json(
        { error: 'One or more products are not available' },
        { status: 400 }
      );
    }

    // Create line items for Stripe
    const lineItems = products.map(product => {
      const cartItem = items.find(item => item.id === product.id);
      return {
        price_data: {
          currency: 'myr',
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100, // Convert to cents
        },
        quantity: cartItem?.quantity || 0,
      };
    });

    // Calculate total amount
    const amount = lineItems.reduce((total: number, item) => {
      if (!item.price_data?.unit_amount || !item.quantity) return total;
      return total + (item.price_data.unit_amount * item.quantity);
    }, 0);

    // Check if customer exists in Stripe
    let customerId: string;
    const { data: customerData } = await supabase
      .from('customers')
      .select('stripe_customer_id')
      .eq('user_id', session.user.id)
      .single();

    if (customerData?.stripe_customer_id) {
      customerId = customerData.stripe_customer_id;
    } else {
      // Create new customer in Stripe
      const customer = await stripe.customers.create({
        email: session.user.email,
        metadata: {
          supabase_user_id: session.user.id,
        },
      });
      customerId = customer.id;

      // Save Stripe customer ID to database
      await supabase
        .from('customers')
        .insert({
          user_id: session.user.id,
          stripe_customer_id: customer.id,
        });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'myr',
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        user_id: session.user.id,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Error creating payment intent' },
      { status: 500 }
    );
  }
} 