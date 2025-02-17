import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const db = new PrismaClient()
 
export async function POST(req: NextRequest) {
  try {

    const courseData = await req.json()

    const { name, city, state, type, id } = courseData
  
    // check for user-submitted blank values that are required
    if (!name || !city || !state || !type || !id) {
      return new NextResponse('Missing required course data', {status: 400})
    }

    // update course
    await db.golfCourse.update({where: {id}, data: {...courseData}})
  
    return new NextResponse('Course successfully updated', {status: 200})

  } catch (error) {

    return new NextResponse('Sorry, something went wrong on the server', {status: 500})
    
  }
} 
