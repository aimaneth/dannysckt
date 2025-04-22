'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface CheckoutFormSubmitProps {
  isLoading: boolean;
  onSubmit: () => void;
}

export function CheckoutFormSubmit({ isLoading, onSubmit }: CheckoutFormSubmitProps) {
  return (
    <Button
      type="button"
      className="w-full mt-6"
      disabled={isLoading}
      onClick={onSubmit}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        'Continue to Payment'
      )}
    </Button>
  );
} 