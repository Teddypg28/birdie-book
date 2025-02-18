import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const db = new PrismaClient()
 
export async function POST(req: NextRequest) {
  try {

    const formData = await req.formData()
    const courseData = Object.fromEntries(formData)

    const { name, city, state, type, id, images } = courseData
  
    // check for blank values that are required
    if (!name || !city || !state || !type || !id) {
      return new NextResponse('Missing required course data', {status: 400})
    }

    // update course
    await db.golfCourse.update({where: {id: id as string}, data: {...courseData}})

    return new NextResponse('Course successfully updated', {status: 200})

  } catch (error) {

    return new NextResponse('Sorry, something went wrong on the server', {status: 500})
    
  }
} 
