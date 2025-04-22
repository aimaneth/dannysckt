'use client';

import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CartProvider>
        {children}
        <Toaster richColors closeButton />
      </CartProvider>
    </ThemeProvider>
  );
} 