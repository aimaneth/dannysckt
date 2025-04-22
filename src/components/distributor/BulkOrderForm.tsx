'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface BulkOrderFormProps {
  products: Product[];
  maxOrderValue: number;
  discountPercentage: number;
}

const formSchema = z.object({
  orderItems: z.array(z.object({
    product_id: z.string(),
    quantity: z.number().min(1),
    price: z.number(),
  })),
  shipping_address: z.string().min(1, 'Shipping address is required'),
  notes: z.string().optional(),
});

export default function BulkOrderForm({ products, maxOrderValue, discountPercentage }: BulkOrderFormProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderItems: products.map(product => ({
        product_id: product.id,
        quantity: 0,
        price: product.price * (1 - discountPercentage / 100),
      })),
      shipping_address: '',
      notes: '',
    },
  });

  const calculateTotal = () => {
    return form.watch('orderItems').reduce((total, item) => {
      return total + (item.quantity * item.price);
    }, 0);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const total = calculateTotal();

      if (total > maxOrderValue) {
        toast.error('Order exceeds maximum value', {
          description: `Your order total (₱${total.toLocaleString()}) exceeds your package limit of ₱${maxOrderValue.toLocaleString()}`
        });
        return;
      }

      // Filter out items with quantity 0
      const orderItems = values.orderItems.filter(item => item.quantity > 0);

      if (orderItems.length === 0) {
        toast.error('No items selected', {
          description: 'Please add at least one item to your order'
        });
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error('Authentication error', {
          description: 'Please sign in to place an order'
        });
        return;
      }

      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: total,
          shipping_address: values.shipping_address,
          notes: values.notes || null,
          status: 'pending',
          is_bulk_order: true,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(
          orderItems.map(item => ({
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
          }))
        );

      if (itemsError) throw itemsError;

      toast.success('Order placed successfully', {
        description: 'Your bulk order has been submitted for processing'
      });

      router.push('/distributor/dashboard');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Error placing order', {
        description: 'There was a problem submitting your order. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Products</h3>
          {products.map((product, index) => (
            <div key={product.id} className="grid grid-cols-4 gap-4 items-center">
              <div className="col-span-2">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">
                  ₱{(product.price * (1 - discountPercentage / 100)).toLocaleString()} each
                </p>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name={`orderItems.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max={product.stock}
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <p className="font-medium text-right">
                  ₱{((form.watch(`orderItems.${index}.quantity`) || 0) * 
                     (product.price * (1 - discountPercentage / 100))).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <p className="text-lg font-semibold flex justify-between">
            <span>Total</span>
            <span>₱{calculateTotal().toLocaleString()}</span>
          </p>
          {calculateTotal() > maxOrderValue && (
            <p className="text-sm text-red-500 mt-1">
              Order exceeds maximum value of ₱{maxOrderValue.toLocaleString()}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="shipping_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipping Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting || calculateTotal() > maxOrderValue}
        >
          {isSubmitting ? 'Placing Order...' : 'Place Bulk Order'}
        </Button>
      </form>
    </Form>
  );
} 