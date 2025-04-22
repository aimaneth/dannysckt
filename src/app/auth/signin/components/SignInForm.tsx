'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegisterMode = searchParams.get('mode') === 'register';
  const [isLoading, setIsLoading] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isForgotPassword, setIsForgotPassword] = React.useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      if (isForgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        });

        if (error) {
          toast.error(error.message);
          return;
        }

        toast.success('Password reset email sent! Please check your inbox.');
        setIsForgotPassword(false);
        return;
      }

      if (isRegisterMode) {
        if (password !== confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }

        // First, sign up with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role: 'customer',
            },
          },
        });

        if (authError) {
          toast.error(authError.message);
          return;
        }

        if (authData.user) {
          // Create user record in users table
          const { error: userError } = await supabase
            .from('users')
            .insert({
              id: authData.user.id,
              email: authData.user.email!,
              role: 'customer',
            });

          if (userError) {
            console.error('Error creating user record:', userError);
            toast.error('Account created but there was an issue setting up your profile. Please contact support.');
            return;
          }

          toast.success('Registration successful! Please check your email to verify your account.');
          router.push('/auth/signin');
          return;
        }
      } else {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          if (result.error === 'Email not verified') {
            toast.error('Please verify your email before signing in. Check your inbox for the verification link.');
            
            // Resend verification email
            const { error: resendError } = await supabase.auth.resend({
              type: 'signup',
              email,
            });

            if (!resendError) {
              toast.info('Verification email resent!');
            }
            
            return;
          }
          toast.error('Invalid credentials');
          return;
        }

        router.push('/');
        router.refresh();
        toast.success('Signed in successfully');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  if (isForgotPassword) {
    return (
      <div className="grid gap-6">
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                required
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              )}
              Send Reset Link
            </Button>
          </div>
        </form>
        <div className="text-center text-sm">
          <Button variant="link" className="p-0 h-auto" onClick={() => setIsForgotPassword(false)}>
            Back to Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {!isRegisterMode && (
                <Button
                  variant="link"
                  className="px-0 font-normal"
                  onClick={() => setIsForgotPassword(true)}
                  type="button"
                >
                  Forgot password?
                </Button>
              )}
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete={isRegisterMode ? "new-password" : "current-password"}
              disabled={isLoading}
              required
            />
          </div>
          {isRegisterMode && (
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          )}
          <Button disabled={isLoading}>
            {isLoading && (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            )}
            {isRegisterMode ? 'Register' : 'Sign In'}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => signIn('google')}
      >
        Continue with Google
      </Button>
      <div className="text-center text-sm">
        {isRegisterMode ? (
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Button variant="link" className="p-0 h-auto" onClick={() => router.push('/auth/signin')}>
              Sign in
            </Button>
          </p>
        ) : (
          <p className="text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Button variant="link" className="p-0 h-auto" onClick={() => router.push('/auth/signin?mode=register')}>
              Register
            </Button>
          </p>
        )}
      </div>
    </div>
  );
} 