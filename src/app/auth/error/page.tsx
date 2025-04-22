'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-2xl font-bold">Authentication Error</h1>
        <p className="mb-4 text-muted-foreground">
          {error || 'An error occurred during authentication.'}
        </p>
        <Button asChild>
          <a href="/signin">Try Again</a>
        </Button>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
} 