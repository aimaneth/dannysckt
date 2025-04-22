import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        try {
          // First check if the user exists in the users table
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('id, email, role')
            .eq('email', credentials.email)
            .single();

          if (userError && userError.code !== 'PGRST116') {
            console.error('Error checking user:', userError);
            return null;
          }

          if (!userData) {
            console.error('User not found in users table');
            return null;
          }

          // Then attempt to sign in with Supabase Auth
          const { data: { session }, error: authError } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (authError) {
            console.error('Supabase auth error:', authError.message);
            return null;
          }

          if (!session?.user) {
            console.error('No user in session');
            return null;
          }

          return {
            id: userData.id,
            email: userData.email,
            role: userData.role,
            emailVerified: session.user.email_confirmed_at ? new Date(session.user.email_confirmed_at) : null,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) {
        console.error('No email provided');
        return false;
      }

      // Only handle OAuth sign ins here (Google, etc.)
      if (account?.provider === 'credentials') {
        return true;
      }

      try {
        const { data: existingUser, error: selectError } = await supabase
          .from('users')
          .select('id, email, role')
          .eq('email', user.email)
          .single();

        if (selectError && selectError.code !== 'PGRST116') {
          console.error('Error checking user:', selectError);
          return false;
        }

        if (!existingUser) {
          const { data: newUser, error: insertError } = await supabase
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.emailVerified = user.emailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.emailVerified = token.emailVerified as Date | null;
      }
      return session;
    },
  },
}; 