import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { createClient } from '@supabase/supabase-js';
import type { Adapter, AdapterUser, AdapterAccount, AdapterSession } from 'next-auth/adapters';

interface DatabaseUser extends AdapterUser {
  role: string;
}

// Create Supabase client
const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Custom adapter implementation
const SupabaseAdapter: Adapter = {
  // Copy all the adapter implementation here
  // ... (same as before)
};

export const authOptions: NextAuthOptions = {
  adapter: SupabaseAdapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) {
        console.error('No email provided');
        return false;
      }

      try {
        const { data: existingUser, error: selectError } = await supabaseClient
          .from('users')
          .select('id, email, role')
          .eq('email', user.email)
          .single();

        if (selectError && selectError.code !== 'PGRST116') {
          console.error('Error checking user:', selectError);
          return false;
        }

        if (!existingUser) {
          const { data: newUser, error: insertError } = await supabaseClient
            .from('users')
            .insert({
              email: user.email,
              role: 'customer',
            })
            .select()
            .single();

          if (insertError) {
            console.error('Error creating user:', insertError);
            return false;
          }

          user.id = newUser.id;
          user.role = newUser.role;
        } else {
          user.id = existingUser.id;
          user.role = existingUser.role;
        }

        return true;
      } catch (error) {
        console.error('SignIn error:', error);
        return false;
      }
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      if (trigger === 'update' && token?.email) {
        const { data: userData, error } = await supabaseClient
          .from('users')
          .select('id, role')
          .eq('email', token.email)
          .single();

        if (!error && userData) {
          token.id = userData.id;
          token.role = userData.role;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
}; 