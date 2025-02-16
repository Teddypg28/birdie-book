import { parse } from 'cookie'
import { NextResponse } from 'next/server'

import * as jose from 'jose'

export default async function middleware(request: Request) {
    try {
        // check for cookies
        const cookies = request.headers.get('Cookie')
        if (!cookies) {
            return NextResponse.redirect(new URL('/not-authorized', request.url), {status: 302})
        }
        // check for token cookie
        const parsedCookies = parse(cookies)
        const authToken = parsedCookies.token
        if (!authToken) {
            return NextResponse.redirect(new URL('/not-authorized', request.url), {status: 302})
        } 
        // verify token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const verifiedToken = await jose.jwtVerify(authToken, secret)
        if (verifiedToken.payload.isOwner) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL('/not-authorized', request.url), {status: 302});
        }
    } catch (error) {
        return NextResponse.redirect(new URL('/not-authorized', request.url), {status: 302})
    }
}

export const config = {
    matcher: ['/course', '/api/course/update'],
};
  