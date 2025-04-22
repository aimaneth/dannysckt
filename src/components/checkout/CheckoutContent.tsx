'use client';

import { CheckoutForm } from './CheckoutForm';
import { OrderSummary } from './OrderSummary';

export function CheckoutContent() {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-card rounded-lg border p-6">
          <CheckoutForm />
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-card rounded-lg border p-6 sticky top-24">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
} 