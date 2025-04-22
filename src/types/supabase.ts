export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          created_at: string | null
          id: string
          provider: string
          provider_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          provider: string
          provider_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          provider?: string
          provider_id?: string
          user_id?: string
        }
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
          image_url: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
          image_url?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
          image_url?: string | null
          updated_at?: string | null
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          price: number
          category_id: string | null
          image_url: string | null
          stock_quantity: number
          is_available: boolean
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          price: number
          category_id?: string | null
          image_url?: string | null
          stock_quantity?: number
          is_available?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          price?: number
          category_id?: string | null
          image_url?: string | null
          stock_quantity?: number
          is_available?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: 'pending' | 'processing' | 'completed' | 'cancelled'
          total_amount: number
          shipping_address: Json
          payment_intent_id: string | null
          payment_status: 'pending' | 'processing' | 'succeeded' | 'failed'
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          total_amount: number
          shipping_address: Json
          payment_intent_id?: string | null
          payment_status?: 'pending' | 'processing' | 'succeeded' | 'failed'
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          total_amount?: number
          shipping_address?: Json
          payment_intent_id?: string | null
          payment_status?: 'pending' | 'processing' | 'succeeded' | 'failed'
          created_at?: string | null
          updated_at?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          created_at: string | null
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          created_at?: string | null
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          created_at?: string | null
        }
      }
      events: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          start_time: string
          end_time: string
          location: string
          price: number
          max_capacity: number
          current_bookings: number
          is_available: boolean
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          start_time: string
          end_time: string
          location: string
          price: number
          max_capacity: number
          current_bookings?: number
          is_available?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          start_time?: string
          end_time?: string
          location?: string
          price?: number
          max_capacity?: number
          current_bookings?: number
          is_available?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
      }
      event_bookings: {
        Row: {
          id: string
          event_id: string
          user_id: string
          number_of_guests: number
          status: 'pending' | 'confirmed' | 'cancelled'
          total_amount: number
          payment_intent_id: string | null
          payment_status: 'pending' | 'processing' | 'succeeded' | 'failed'
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          number_of_guests: number
          status?: 'pending' | 'confirmed' | 'cancelled'
          total_amount: number
          payment_intent_id?: string | null
          payment_status?: 'pending' | 'processing' | 'succeeded' | 'failed'
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          number_of_guests?: number
          status?: 'pending' | 'confirmed' | 'cancelled'
          total_amount?: number
          payment_intent_id?: string | null
          payment_status?: 'pending' | 'processing' | 'succeeded' | 'failed'
          created_at?: string | null
          updated_at?: string | null
        }
      }
      users: {
        Row: {
          id: string
          email: string
          role: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          email: string
          role?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          role?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      sessions: {
        Row: {
          id: string
          user_id: string
          expires: string
          session_token: string
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          expires: string
          session_token: string
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          expires?: string
          session_token?: string
          created_at?: string | null
        }
      }
      verification_tokens: {
        Row: {
          token: string
          identifier: string
          expires: string
          created_at: string | null
        }
        Insert: {
          token: string
          identifier: string
          expires: string
          created_at?: string | null
        }
        Update: {
          token?: string
          identifier?: string
          expires?: string
          created_at?: string | null
        }
      }
    }
    Functions: {
      calculate_order_total: {
        Args: { order_id: string }
        Returns: number
      }
      check_event_capacity: {
        Args: { event_id: string; requested_guests: number }
        Returns: boolean
      }
      check_product_stock: {
        Args: { product_id: string; requested_quantity: number }
        Returns: boolean
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Functions<T extends keyof Database['public']['Functions']> = Database['public']['Functions'][T]

// Shortcuts for common types
export type Category = Tables<'categories'>
export type Product = Tables<'products'>
export type Order = Tables<'orders'>
export type OrderItem = Tables<'order_items'>
export type Event = Tables<'events'>
export type EventBooking = Tables<'event_bookings'>
export type User = Tables<'users'>
export type Session = Tables<'sessions'>
export type VerificationToken = Tables<'verification_tokens'> 