import { NextRequest, NextResponse } from 'next/server'

import authentication from './app/middleware/authentication';
import authorization from './app/middleware/authorization';

export default async function middleware(request: NextRequest) {
    try {
        const authenticationResponse = await authentication(request)
        if (authenticationResponse) return authenticationResponse

        if (['/api/course/update'].includes(request.nextUrl.pathname)) {
            return await authorization(request)
        }

        return NextResponse.next()
    } catch (error) {
        return NextResponse.redirect(new URL('/not-authorized', request.url));        
    }
}

export const config = {
    matcher: ['/api/course/update', '/']
};
  