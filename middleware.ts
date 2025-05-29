import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/app/Login' || path === '/app/Register';
  
  // Get token from cookies
  const token = request.cookies.get('token')?.value || '';

  // Handle root path and direct to login if not authenticated
  if (path === '/') {
    return NextResponse.redirect(new URL('/app/Login', request.url));
  }

  // If trying to access login/register while logged in, redirect to SaleChannel
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/SaleChannel', request.url));
  }

  // If trying to access any route without token, redirect to login
  if (!isPublicPath && !token) {
    // Clear any existing navigation history state
    const response = NextResponse.redirect(new URL('/app/Login', request.url));
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
  }

  // For authenticated requests to protected routes
  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  return response;
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    '/',  // Match root path
    '/((?!api|_next/static|_next/image|favicon.ico).*)',  // Match all except static files
    '/app/Login',
    '/app/Register',
    '/SaleChannel',
    '/SaleChannel/:path*',
    '/Inventory',
    '/Inventory/:path*'
  ]
}; 