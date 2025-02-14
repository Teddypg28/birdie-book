import { PrismaClient } from '@prisma/client'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const db = new PrismaClient()
 
export async function POST(req: Request) {
  try {

    const loginData = await req.json()
    const { email, password } = loginData
  
    // user didn't complete the full login form
    if (!email || !password) {
      return new Response('Missing credentials', {status: 400})
    }

    // see if user with the submitted email exists in the db
    const user = await db.user.findFirst({where: {email: {equals: email}}})
    if (!user) {
        return new Response('Email or password does not match', {status: 400})
    }

    // compare password submitted to password hash stored
    const isCorrect = await bcrypt.compare(password, user.password)
    if (isCorrect) {
        const userDetails = {id: user.id, firstName: user.firstName}
        const token = jwt.sign(userDetails, process.env.JWT_SECRET as string, {expiresIn: '1h'})

        return new Response(JSON.stringify({token}), {status: 200})
    } else {
        return new Response('Email or password does not match', {status: 400})
    }

  } catch (error) {

    return new Response('Sorry, something went wrong on the server', {status: 500})
    
  }
} 
