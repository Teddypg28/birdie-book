import { PrismaClient } from '@prisma/client'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as cookie from 'cookie'

const db = new PrismaClient()
 
export async function POST(req: Request) {
  try {

    const loginData = await req.json()
    const { email, password } = loginData
  
    // user didn't complete the full login form
    if (!email || !password) {
      return new Response('Missing credentials', {status: 400})
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
        return new Response('Email or password does not match', {status: 400})
    }

    // compare password submitted to password hash stored
    const isCorrect = await bcrypt.compare(password, userOwner.password)
    if (isCorrect) {
        const userDetails = {id: userOwner.id, firstName: userOwner.firstName, isOwner: userOwner.isOwner}
        const token = jwt.sign(userDetails, process.env.JWT_SECRET as string, {expiresIn: '1h'})
        const setCookie = cookie.serialize('token', token, { httpOnly: true })
        // respond with cookie containing jwt
        const response = new Response('Login Successful', {status: 200})
        response.headers.set('Set-Cookie', setCookie)
        return response
    } else {
        return new Response('Email or password does not match', {status: 400})
    }

  } catch (error) {

    return new Response('Sorry, something went wrong on the server', {status: 500})
    
  }
} 
