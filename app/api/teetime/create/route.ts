import convertDateTimeToTime from '@/helpers/convertDateTimeToTime'
import validTeeTimes from '@/validTeeTimes'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()
 
export async function POST(req: Request) {
  try {

    const teeTimeData = await req.json()
    const { courseId, time, numHoles } = teeTimeData

    if (!validTeeTimes.includes(convertDateTimeToTime(time))) {
        return new Response('Invalid tee time', {status: 400})
    }
  
    // tee time already booked out
    const teeTime = await db.teeTime.findFirst({where: {golfCourseId: {equals: courseId}, AND: {time: {equals: time}}}})
    if (!teeTime) {
      return new Response('Tee time is already booked out', {status: 400})
    }
  
    // book tee time
    await db.teeTime.create({data: {golfCourseId: courseId, time, numHoles }})
  
    return new Response('Successfully registered!', {status: 200})

  } catch (error) {

    return new Response('Sorry, something went wrong on the server', {status: 500})
    
  }
} 
