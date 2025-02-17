import { NextRequest, NextResponse } from 'next/server'

import verifyJWT from './auth/verifyJWT';

export default async function middleware(request: NextRequest) {
    try {
        // make sure user is authenticated via a jwt
        const verifiedUserToken = await verifyJWT(request)
        if (!verifiedUserToken) {
            return NextResponse.redirect(new URL('/login', request.url), {status: 302})
        }
        // make sure user is authorized depending on the route
        if (['/api/course/update'].includes(request.nextUrl.pathname)) {
            if (!verifiedUserToken.payload.isOwner) {
                return NextResponse.redirect(new URL('/not-authorized', request.url), {status: 302})
            }
        }
        return NextResponse.next()
    } catch (error) {
        return NextResponse.redirect(new URL('/not-authorized', request.url));        
    }
}

export const config = {
    matcher: ['/api/course/update', '/api/review/:path*', '/api/teetime/:path*']
};
  