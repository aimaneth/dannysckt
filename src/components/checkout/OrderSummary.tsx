'use client';

import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { Separator } from '@/components/ui/separator';

export function OrderSummary() {
  const { state } = useCart();
  const shippingCost: number = 0; // Free delivery for now
  const total: number = state.total + shippingCost;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Order Summary</h2>
      
      <div className="space-y-4">
        {state.items.map((item) => (
          <div key={item.product.id} className="flex gap-4">
            <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
              {item.product.image_url ? (
                <Image
                  src={item.product.image_url}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">No image</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{item.product.name}</h3>
              <p className="text-sm text-muted-foreground">
                Quantity: {item.quantity}
              </p>
            </div>
            
            <div className="text-right">
              <p className="font-medium">
                RM {(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>RM {state.total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Delivery</span>
          <span>{shippingCost === 0 ? 'Free' : `RM ${shippingCost.toFixed(2)}`}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>RM {total.toFixed(2)}</span>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          By completing this order, you agree to Danny&apos;s CKT&apos;s terms of service and 
          privacy policy.
        </p>
      </div>
    </div>
  );
} 