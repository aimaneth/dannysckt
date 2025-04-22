'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X, User, Home, Package, CalendarDays, Info, Briefcase, PhoneCall, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';
import { CartSheet } from '@/components/cart/CartSheet';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { Separator } from '@/components/ui/separator';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';

type NavItem = {
  name: 'nav.home' | 'nav.products' | 'nav.events' | 'nav.about' | 'nav.business' | 'nav.contact';
  href: string;
  icon: React.ElementType;
};

const navigation: NavItem[] = [
  { name: 'nav.home', href: '/', icon: Home },
  { name: 'nav.products', href: '/products', icon: Package },
  { name: 'nav.events', href: '/events', icon: CalendarDays },
  { name: 'nav.about', href: '/about', icon: Info },
  { name: 'nav.business', href: '/business-opportunities', icon: Briefcase },
  { name: 'nav.contact', href: '/contact', icon: PhoneCall },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { state, itemCount } = useCart();
  const { t } = useLanguage();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border' : 'bg-transparent'
    )}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-amber-500">
              Danny&apos;s CKT
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-orange-500',
                  pathname === item.href
                    ? 'text-orange-500'
                    : 'text-muted-foreground'
                )}
              >
                {t(item.name)}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <CartSheet />
            <LanguageToggle />
            
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:text-orange-500">
              <User className="h-5 w-5" />
            </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {session.user?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {session.user?.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-orange-500"
                onClick={() => signIn()}
              >
                <User className="h-5 w-5" />
              </Button>
            )}
            
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="hover:text-orange-500">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full bg-background/95 backdrop-blur-xl">
                  {/* Header */}
                  <div className="p-6 border-b">
                    <div className="flex items-center">
                      <h2 className="text-lg font-semibold">Menu</h2>
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="flex-1 overflow-y-auto">
                    <div className="px-4 py-6 space-y-1">
                      {navigation.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                              'flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors',
                              pathname === item.href
                                ? 'text-orange-500 bg-orange-500/10'
                                : 'text-muted-foreground hover:bg-muted'
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Icon className="h-5 w-5" />
                            {t(item.name)}
                          </Link>
                        );
                      })}
                    </div>

                    <Separator className="my-4" />

                    {/* Additional Links */}
                    <div className="px-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Account</h3>
                      {session ? (
                        <div className="space-y-2">
                          {session.user?.role === 'admin' && (
                            <Button 
                              variant="outline" 
                              className="w-full justify-start gap-2" 
                              size="lg"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                router.push('/admin');
                              }}
                            >
                              <User className="h-4 w-4" />
                              Dashboard
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            className="w-full justify-start gap-2" 
                            size="lg"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              router.push('/profile');
                            }}
                          >
                            <User className="h-4 w-4" />
                            Profile
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start gap-2" 
                            size="lg"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              router.push('/orders');
                            }}
                          >
                            <Package className="h-4 w-4" />
                            Orders
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start gap-2" 
                            size="lg"
                            onClick={() => {
                              signOut();
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          className="w-full justify-start gap-2" 
                          size="lg"
                          onClick={() => {
                            signIn();
                            setIsMobileMenuOpen(false);
                          }}
                        >
                        <User className="h-4 w-4" />
                        Sign In
                      </Button>
                      )}
                    </div>
                  </nav>

                  {/* Footer */}
                  <div className="p-6 border-t">
                    <p className="text-sm text-muted-foreground text-center">
                      © {new Date().getFullYear()} Danny&apos;s CKT
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
} 