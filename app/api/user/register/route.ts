import { PrismaClient } from '@prisma/client'

import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

const db = new PrismaClient()
 
export async function POST(req: NextRequest) {
  try {

    const signupData = await req.json()
    const { firstName, lastName, email, password } = signupData
  
    // user didn't complete the full registration form
    if (!firstName || !lastName || !email || !password) {
      return new NextResponse('Missing required form data', {status: 400})
    }
  
    // user with email already exists in the db
    const user = await db.user.findFirst({where: {email: {equals: email}}})
    if (user) {
      return new NextResponse('User with this email already exists', {status: 400})
    }
  
    // encrypt password to safely store in the db
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    await db.user.create({data: {email, firstName, password: hashedPassword, lastName}})
  
    return new NextResponse('Successfully registered!', {status: 200})

  } catch (error) {

    return new NextResponse('Sorry, something went wrong on the server', {status: 500})
    
  }
} 
