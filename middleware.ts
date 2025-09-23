import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define protected API routes that require authentication
const isProtectedApiRoute = createRouteMatcher([
  '/api/profile(.*)',
  '/api/couples(.*)',
]);

// Define protected page routes
const isProtectedPageRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  
  // Check if this is a protected API route
  if (isProtectedApiRoute(req)) {
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Add security headers for API routes
    const response = NextResponse.next();
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    
    // Validate content type for POST/PUT/PATCH requests
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      const contentType = req.headers.get('content-type');
      if (contentType && !contentType.includes('application/json')) {
        return NextResponse.json(
          { error: 'Invalid content type. Expected application/json' },
          { status: 400 }
        );
      }
    }
    
    return response;
  }
  
  // Check if this is a protected page route
  if (isProtectedPageRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }
  
  // Redirect authenticated users away from auth pages
  if (userId && (req.nextUrl.pathname.startsWith('/sign-in') || req.nextUrl.pathname.startsWith('/sign-up'))) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};