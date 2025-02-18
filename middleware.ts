import { NextRequest, NextResponse } from 'next/server'

import verifyJWT from './auth/verifyJWT';

export default async function middleware(request: NextRequest) {
    try {
        // make sure user is authenticated via a jwt
        const verifiedUserToken = await verifyJWT(request)
        if (!verifiedUserToken) {
            return NextResponse.redirect(new URL('/login', request.url), {status: 302})
        }
        // make sure user has owner privileges for certain protected routes
        if (['/api/course/update'].includes(request.nextUrl.pathname)) {
            if (!verifiedUserToken.payload.isOwner) {
                return NextResponse.redirect(new URL('/not-authorized', request.url), {status: 302})
            }
        }
        // send the token to the next route
        const response = NextResponse.next()
        response.headers.set('auth-user-id', verifiedUserToken.payload.id as string)
        return response
    } catch (error) {
        return NextResponse.redirect(new URL('/not-authorized', request.url));        
    }
}

export const config = {
    matcher: ['/', '/api/courses', '/api/course/update', '/api/review/:path*', '/api/teetime/:path*']
};
  