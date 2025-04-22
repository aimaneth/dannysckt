import { Metadata } from 'next';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getFoodPlaceholderImage } from '@/lib/image-utils';

const UNSPLASH_FOOD_COLLECTION = '3178572';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!product) {
    return {
      title: 'Product Not Found | Danny\'s CKT',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.name} | Danny's CKT`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !product) {
    notFound();
  }

  // Generate a placeholder image URL using the product ID as a seed
  const placeholderImage = getFoodPlaceholderImage(product.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-border">
          <Image
            src={product.image_url || placeholderImage}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <div className="text-right">
              <div className="text-3xl font-bold">
                RM {product.price.toFixed(2)}
              </div>
              {!product.is_available && (
                <Badge variant="destructive" className="mt-2">
                  Out of Stock
                </Badge>
              )}
            </div>
          </div>

          <Card className="p-6 mb-8">
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          </Card>

          {product.ingredients && (
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              <p className="text-muted-foreground">{product.ingredients}</p>
            </Card>
          )}

          <div className="mt-auto space-y-4">
            <Button 
              size="lg" 
              className="w-full"
              disabled={!product.is_available || product.stock_quantity === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            {product.is_available && product.stock_quantity > 0 && (
              <p className="text-sm text-muted-foreground text-center">
                {product.stock_quantity} portions available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 