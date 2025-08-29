
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/app/api/auth/[...nextauth]/route';
import { featureFlags } from '@/lib/feature-flags';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/bugrakarsli')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathname.startsWith('/bugrakarsli/activity') && !featureFlags.isActivityPageEnabled()) {
      return NextResponse.redirect(new URL('/bugrakarsli', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/bugrakarsli/:path*'],
};
