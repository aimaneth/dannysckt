'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/types/supabase';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { getFoodPlaceholderImage } from '@/lib/image-utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, 1);
    toast.success('Added to cart', {
      description: `${product.name} has been added to your cart.`,
    });
  };

  // Generate a placeholder image URL using the product ID as a seed
  const placeholderImage = getFoodPlaceholderImage(product.id);

  return (
    <Card className="group overflow-hidden rounded-lg border-2 border-border transition-all hover:border-foreground/20">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.image_url || placeholderImage}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Link 
            href={`/products/${product.slug}`}
            className="text-lg font-semibold line-clamp-2 hover:underline"
          >
            {product.name}
          </Link>
          <div className="text-right">
            <p className="text-lg font-bold">RM {product.price.toFixed(2)}</p>
            {!product.is_available && (
              <p className="text-sm text-destructive">Out of stock</p>
            )}
          </div>
        </div>
        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full"
          disabled={!product.is_available || product.stock_quantity === 0}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
} 