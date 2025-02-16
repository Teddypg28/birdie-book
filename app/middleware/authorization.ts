import { NextRequest, NextResponse } from "next/server";
import verifyJWT from '@/auth/verifyJWT'

export default async function authorization(req: NextRequest) {
    const verifiedUserToken = await verifyJWT(req)
    if (!verifiedUserToken || !verifiedUserToken.payload.isOwner) {
        return NextResponse.redirect(new URL('/not-authorized', req.url), {status: 302})
    }
    return NextResponse.next()
}
