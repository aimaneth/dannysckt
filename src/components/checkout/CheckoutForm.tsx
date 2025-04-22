'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Please enter your full address'),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

export function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useCart();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: '',
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: state.items.map(item => ({
            id: item.product.id,
            quantity: item.quantity,
          })),
          customer: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            notes: data.notes,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();
      router.push(`/checkout/payment?payment_intent=${clientSecret}`);
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Something went wrong', {
        description: 'Please try again or contact support if the problem persists.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your full name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter your phone number' },
    { name: 'address', label: 'Delivery Address', type: 'text', placeholder: 'Enter your delivery address' },
    { name: 'notes', label: 'Order Notes (Optional)', type: 'text', placeholder: 'Any special instructions?' },
  ] as const;

  const formSubmit = handleSubmit(onSubmit);

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.name)}
            className={errors[field.name] ? 'border-destructive' : ''}
          />
          {errors[field.name] && (
            <p className="text-sm text-destructive">
              {errors[field.name]?.message}
            </p>
          )}
        </div>
      ))}

      <Button
        type="button"
        className="w-full mt-6"
        disabled={isLoading}
        onClick={() => formSubmit()}
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
    </div>
  );
} 