'use client';

import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { CartProvider } from '@/contexts/CartContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { UploadThingProvider } from '@/components/providers/uploadthing/index';
import { Toaster } from 'sonner';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <LanguageProvider>
          <CartProvider>
            <UploadThingProvider>
              {children}
              <Toaster richColors closeButton />
            </UploadThingProvider>
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SessionProvider>
  );
} 