import { NextRequest, NextResponse } from "next/server"
import { parse } from "cookie"

import * as jose from 'jose'

export default async function verifyJWT(req: NextRequest) {
     // check for cookies
     const cookies = req.headers.get('Cookie')
     if (!cookies) {
       return false
     }
     
     // parse the cookies
     const parsedCookies = parse(cookies)
     const token = parsedCookies.token
     // check for jwt
     if (!token) {
       return false
     }
 
     // verify the jwt
     let verifiedToken
     try {
       const secret = new TextEncoder().encode(process.env.JWT_SECRET)
       verifiedToken = await jose.jwtVerify(token, secret)
       return verifiedToken
     } catch {
       return false
     }
}