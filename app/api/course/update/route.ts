import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()
 
export async function POST(req: Request) {
  try {

    const courseData = await req.json()

    const { name, city, state, type } = courseData
  
    // user submitted with blank values that are required
    if (!name || !city || !state || !type) {
      return new Response('Missing required course data', {status: 400})
    }

    // update course
    await db.golfCourse.update({where: {id: courseData.id}, data: {...courseData}})
  
    return new Response('Course successfully updated', {status: 200})

  } catch (error) {

    return new Response('Sorry, something went wrong on the server', {status: 500})
    
  }
} 
