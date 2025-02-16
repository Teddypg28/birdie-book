import { PrismaClient } from '@prisma/client'

import bcrypt from 'bcrypt'
import { SignJWT } from 'jose'
import * as cookie from 'cookie'
import { NextRequest, NextResponse } from 'next/server'

const db = new PrismaClient()
 
export async function POST(req: NextRequest) {
  try {

    const loginData = await req.json()
    const { email, password } = loginData
  
    // user didn't complete the full login form
    if (!email || !password) {
      return new NextResponse('Missing credentials', {status: 400})
    }

    // check for user or owner
    const userOwner = await db.user.findFirst({
      where: {
        email: { equals: email }
      }
    }) || await db.owner.findFirst({
      where: {
        email: { equals: email }
      }
    })

    // if no user or owner found, respond with vague error
    if (!userOwner) {
        return new NextResponse('Email or password does not match', {status: 400})
    }

    // compare password submitted to password hash stored
    const isCorrect = await bcrypt.compare(password, userOwner.password)
    if (isCorrect) {
        const userDetails = {id: userOwner.id, firstName: userOwner.firstName, isOwner: userOwner.isOwner}
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const token = await new SignJWT(userDetails)
          .setProtectedHeader({ alg: 'HS256' })
          .setExpirationTime('1hr')
          .sign(secret)
        const setCookie = cookie.serialize('token', token, { httpOnly: true })
        // respond with cookie containing jwt
        const response = new NextResponse('Login Successful', {status: 200})
        response.headers.set('Set-Cookie', setCookie)
        return response
    } else {
        return new NextResponse('Email or password does not match', {status: 400})
    }

  } catch (error) {

    return new NextResponse('Sorry, something went wrong on the server', {status: 500})
    
  }
} 
