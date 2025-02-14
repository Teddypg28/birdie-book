import { PrismaClient } from '@prisma/client'

import bcrypt from 'bcrypt'

const db = new PrismaClient()
 
export async function POST(req: Request) {
  try {

    const signupData = await req.json()
    const { firstName, lastName, email, password, courseName, courseType, courseCity, courseState } = signupData
  
    // owner didn't complete the full registration form
    if (!firstName || !lastName || !email || !password || !courseName || !courseType || !courseCity || !courseState) {
      return new Response('Missing required form data', {status: 400})
    }
  
    // owner with email already exists in the db
    const user = await db.owner.findFirst({where: {email: {equals: email}}})
    if (user) {
      return new Response('Owner with this email already exists', {status: 400})
    }

    const golfCourseExists = await db.golfCourse.findFirst({where: {name: {equals: courseName}}})
    if (golfCourseExists) {
        return new Response('Golf course already owned. Contact the owner to gain admin access', {status: 400})
    }
  
    // encrypt password to safely store in the db
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const golfCourseData = {
        name: courseName,
        type: courseType,
        city: courseCity,
        state: courseState
    }
  
    await db.owner.create({data: {email, firstName, password: hashedPassword, lastName, golfCoursesOwned: {create: golfCourseData}}})
  
    return new Response('Successfully registered!', {status: 200})

  } catch (error) {

    return new Response('Sorry, something went wrong on the server', {status: 500})
    
  }
} 
