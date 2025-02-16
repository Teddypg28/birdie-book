import verifyJWT from '@/auth/verifyJWT'
import { NextRequest, NextResponse } from 'next/server'

export default async function authentication(req: NextRequest) {
    const verifiedUserToken = await verifyJWT(req)
    if (!verifiedUserToken) {
        return NextResponse.redirect(new URL('/login', req.url), {status: 302})
    }
    return NextResponse.next()
}