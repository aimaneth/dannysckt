'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu } from 'lucide-react';
import { useState } from 'react';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from '@/components/ui/sonner';
import { Navbar } from '@/components/layout/Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <Toaster position="top-center" />
      </div>
    </CartProvider>
  );
} 