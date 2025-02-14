import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()
 
export async function POST(req: Request) {
  try {

    const courseData = await req.json()
    const { name, city, state, type, ownerId } = courseData
  
    // user didn't complete the full course details form
    if (!name || !city || !state || !type || !ownerId) {
      return new Response('Missing required course data', {status: 400})
    }

    // course already exists in the database
    const courseExists = await db.golfCourse.findFirst({where: {name: {equals: name}}})
    if (courseExists) {
        return new Response('Course already exists', {status: 400})
    }
  
    // create course
    await db.golfCourse.create({data: {name, city, state, type, ownerId}})
  
    return new Response('Course successfully published', {status: 200})

  } catch (error) {

    return new Response('Sorry, something went wrong on the server', {status: 500})
    
  }
} 
