'use client';

import { supabase } from '@/lib/supabase';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProductFilters } from '@/components/products/ProductFilters';
import { useLanguage, type TranslationKeys } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import type { Product } from '@/types/supabase';

export default function ProductsPage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false });
      
      setProducts(data || []);
    };

    fetchProducts();
  }, []);

  // Helper function to ensure string type
  const ts = (key: TranslationKeys): string => {
    const value = t(key);
    return Array.isArray(value) ? value[0] : value;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-orange-600/10 py-12 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {ts('products.title')}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {ts('products.description')}
            </p>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder={ts('products.searchPlaceholder')}
                  className="pl-10"
                />
              </div>
              <Button>{ts('products.searchButton')}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <ProductFilters />
          </div>

          {/* Products Grid */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                {ts('products.showing')} {products.length} products
              </p>
              <select className="bg-background border rounded-md px-3 py-1.5 text-sm">
                <option value="latest">{ts('products.sort.latest')}</option>
                <option value="price-low">{ts('products.sort.priceLow')}</option>
                <option value="price-high">{ts('products.sort.priceHigh')}</option>
                <option value="name">{ts('products.sort.name')}</option>
              </select>
            </div>

            <ProductGrid products={products} />
          </div>
        </div>
      </section>
    </div>
  );
} 