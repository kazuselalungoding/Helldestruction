import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
//   isPublicRoute,
  isAuthRoute,
  isProtectedRoute,
  getSessionCookie,
  verifySession,
} from './middleware/utils';
import { DEFAULT_REDIRECT } from './middleware/config';

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);

  // 1. Public routes - always allow
//   if (isPublicRoute(pathname)) {
//     console.log('[Middleware] Public route, allowing access');
//     return NextResponse.next();
//   }

  // 2. Auth routes (login/register)
  if (isAuthRoute(pathname)) {
    
    // TEMPORARILY: Allow access to auth routes regardless of session
    // TODO: Re-enable after fixing session handling

    return NextResponse.next();
    
    /* DISABLED FOR NOW
    if (sessionCookie) {
      const isValid = await verifySession(sessionCookie);
      console.log('[Middleware] Auth route, session valid:', isValid);
      
      if (isValid) {
        console.log('[Middleware] Already logged in, redirecting to dashboard');
        return NextResponse.redirect(
          new URL(DEFAULT_REDIRECT.afterLogin, request.url)
        );
      }
    }
    */
  }

  // 3. Protected routes - TEMPORARILY DISABLED
  if (isProtectedRoute(pathname)) {
    return NextResponse.next();
    
    /* DISABLED FOR NOW
    if (!sessionCookie) {
      console.log('[Middleware] No session, redirecting to login');
      return redirectToLogin(request, pathname);
    }

    const isValid = await verifySession(sessionCookie);
    console.log('[Middleware] Protected route, session valid:', isValid);
    
    if (!isValid) {
      console.log('[Middleware] Invalid session, redirecting to login');
      return redirectToLogin(request, pathname);
    }

    console.log('[Middleware] Valid session, allowing access');
    */
  }

  return NextResponse.next();
}

function redirectToLogin(request: NextRequest, returnPath: string) {
  const loginUrl = new URL(DEFAULT_REDIRECT.unauthorized, request.url);
  loginUrl.searchParams.set('redirect', returnPath);

  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete('laravel_session');

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets).*)',
  ],
};