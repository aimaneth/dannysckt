'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useLanguage, type TranslationKeys } from '@/contexts/LanguageContext';

// Custom TikTok icon since it's not available in lucide-react
function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      {...props}
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  // Helper function to ensure string type
  const ts = (key: TranslationKeys): string => {
    const value = t(key);
    return Array.isArray(value) ? value[0] : value;
  };

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gradient">
              Danny&apos;s CKT
            </h2>
            <p className="text-sm text-muted-foreground">
              {ts('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{ts('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {ts('footer.products')}
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {ts('footer.events')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {ts('footer.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h3 className="font-semibold mb-4">{ts('footer.business')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/business-opportunities" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {ts('footer.startBusiness')}
                </Link>
              </li>
              <li>
                <Link href="/business-opportunities#packages" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {ts('footer.investmentPackages')}
                </Link>
              </li>
              <li>
                <Link href="/business-opportunities#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {ts('footer.businessDev')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">{ts('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {ts('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {ts('footer.terms')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {ts('footer.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">{ts('footer.newsletter')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {ts('footer.newsletterDesc')}
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder={ts('footer.emailPlaceholder')}
                className="w-full"
              />
              <Button type="submit" className="w-full">
                {ts('footer.subscribe')}
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Danny&apos;s CKT. {ts('footer.rights')}
          </p>

          {/* Social Links */}
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" className="hover:text-orange-500">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-orange-500">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-orange-500">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-orange-500">
              <TikTokIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
} 