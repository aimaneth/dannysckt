'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SignInForm } from './components/SignInForm';
import Image from 'next/image';

function SignInContent() {
  const searchParams = useSearchParams();
  const isRegisterMode = searchParams.get('mode') === 'register';

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/70">
          <Image
            src="/images/auth-bg.jpg"
            alt="Authentication background"
            fill
            className="object-cover mix-blend-overlay opacity-20"
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Danny&apos;s CKT
          </h1>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Experience the authentic taste of Char Kway Teow, crafted with passion and tradition.&rdquo;
            </p>
            <footer className="text-sm">Danny&apos;s CKT</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {isRegisterMode ? 'Create an account' : 'Welcome back'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isRegisterMode 
                ? 'Enter your details to create your account'
                : 'Sign in to your account'
              }
            </p>
          </div>
          <SignInForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <a href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
} 