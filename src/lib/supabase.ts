import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type Tables = {
  users: {
    id: string;
    email: string;
    role: 'customer' | 'vendor';
    created_at: string;
    updated_at: string;
  };
  products: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'paste' | 'ingredient' | 'bundle';
    stock: number;
    images: string[];
    cooking_instructions: string;
    vendor_price?: number;
    created_at: string;
    updated_at: string;
  };
  orders: {
    id: string;
    user_id: string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    total: number;
    created_at: string;
    updated_at: string;
  };
  order_items: {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    price: number;
    created_at: string;
  };
  events: {
    id: string;
    user_id: string;
    type: 'private' | 'corporate' | 'demo';
    title: string;
    description: string;
    date: string;
    capacity: number;
    location: string;
    price: number;
    status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
    created_at: string;
    updated_at: string;
  };
  event_bookings: {
    id: string;
    user_id: string;
    event_id: string;
    number_of_guests: number;
    special_requests?: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    created_at: string;
    updated_at: string;
  };
  reviews: {
    id: string;
    user_id: string;
    product_id: string;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
  };
  distributor_packages: {
    id: string;
    name: string;
    description: string;
    price: number;
    duration_months: number;
    business_type: 'stall' | 'restaurant' | 'catering';
    benefits: {
      discount_percentage?: number;
      free_delivery?: boolean;
      priority_support?: boolean;
      training_sessions?: number;
      max_order_value?: number;
    };
    created_at: string;
    updated_at: string;
  };
}; 