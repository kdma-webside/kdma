import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check if the request is for the admin section
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Exclude the login page from checking
        if (request.nextUrl.pathname === '/admin/login') {
            // If already logged in, redirect to dashboard
            const hasSession = request.cookies.has('admin_session');
            if (hasSession) {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
            return NextResponse.next();
        }

        // Check for session cookie
        const hasSession = request.cookies.has('admin_session');

        if (!hasSession) {
            // Redirect to login page if no session
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin', '/admin/:path*'],
};
