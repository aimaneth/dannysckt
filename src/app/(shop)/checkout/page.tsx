import { Metadata } from 'next';
import { CheckoutContent } from '@/components/checkout/CheckoutContent';

export const metadata: Metadata = {
  title: 'Checkout | Danny\'s CKT',
  description: 'Complete your order securely with Stripe.',
};

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <CheckoutContent />
    </div>
  );
} 