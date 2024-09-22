import { NextRequest, NextResponse } from 'next/server';
import { getToken, validateToken } from '@/utils/auth';

export async function middleware(req: NextRequest) {
  const token = getToken(req);
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  const user = validateToken(token);
  if (!user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  if (req.nextUrl.pathname.startsWith('/admin') && user.role !== 'Admin') {
    return NextResponse.redirect(new URL('/403', req.url)); 
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/protected/:path*'],
};
