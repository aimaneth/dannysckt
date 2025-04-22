import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Paths that don't require authentication
const publicPaths = [
  '/',
  '/products',
  '/products/(.*)',
  '/events',
  '/events/(.*)',
  '/about',
  '/business-opportunities',
  '/auth/signin',
  '/auth/error',
  '/auth/verify-request',
  '/faq',
  '/privacy',
  '/terms',
  '/contact'
];

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if the current path matches any public paths
  const isPublicPath = publicPaths.some(path => {
    if (path.includes('(.*)')) {
      const basePath = path.replace('(.*)', '');
      return request.nextUrl.pathname.startsWith(basePath);
    }
    return request.nextUrl.pathname === path;
  });

  // If there is no session and the path is not public, redirect to signin
  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // If there is a session and the user is trying to access auth routes
  if (session && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}; 