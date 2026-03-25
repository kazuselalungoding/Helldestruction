import type { NextRequest } from 'next/server';
import { ROUTE_CONFIG } from './config';

// export function isPublicRoute(pathname: string): boolean {
//   return ROUTE_CONFIG.public.some(route => {
//     if (pathname === route) return true;
    
//     const routePattern = route.replace(/\[.*?\]/g, '[^/]+');
//     const regex = new RegExp(`^${routePattern}$`);
//     return regex.test(pathname);
//   });
// }

export function isAuthRoute(pathname: string): boolean {
  return ROUTE_CONFIG.auth.some(route => pathname === route);
}

export function isProtectedRoute(pathname: string): boolean {
  return ROUTE_CONFIG.protected.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function getSessionCookie(request: NextRequest): string | undefined {
  // Try to get laravel_session cookie
  const laravelSession = request.cookies.get('laravel_session')?.value;
  if (laravelSession) {
    console.log('[Middleware Utils] Found laravel_session cookie');
    return laravelSession;
  }

  // Fallback: check all cookies
  const allCookies = request.cookies.getAll();
  console.log('[Middleware Utils] All cookies:', allCookies.map(c => c.name));
  
  return undefined;
}

export async function verifySession(sessionValue: string): Promise<boolean> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    console.log('[Middleware Utils] Verifying session with API...');
    
    const response = await fetch(`${apiUrl}/api/user`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cookie': `laravel_session=${sessionValue}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
      cache: 'no-store',
    });

    console.log('[Middleware Utils] Verification response status:', response.status);

    if (!response.ok) {
      console.log('[Middleware Utils] Verification failed: not OK');
      return false;
    }

    const data = await response.json();
    console.log('[Middleware Utils] Verification data:', data);
    
    return data.status === true && !!data.user;
  } catch (error) {
    console.error('[Middleware Utils] Verification error:', error);
    return false;
  }
}