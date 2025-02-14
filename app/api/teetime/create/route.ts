import convertDateTimeToTime from '@/helpers/convertDateTimeToTime'
import validTeeTimes from '@/validTeeTimes'
import { PrismaClient } from '@prisma/client'

import jwt from 'jsonwebtoken'

const db = new PrismaClient()
 
export async function POST(req: Request) {
  try {

    const teeTimeData = await req.json()

    // VALIDATE JWT
    const token = req.headers.get('Authorization')
    if (!token) {
      return new Response('Unauthorized', {status: 401})
    }

    const { courseId, time, numHoles, players } = teeTimeData

    // invalid tee time data (course does not exist, invalid time slot, too many players, no players, invalid number of holes)
    const course = await db.golfCourse.findFirst({where: {id: {equals: parseInt(courseId)}}})
    if (!validTeeTimes.includes(convertDateTimeToTime(time)) || !course || players.length > 4 || players.length < 1 || ![9, 18].includes(numHoles)) {
        return new Response('Error creating tee time', {status: 400})
    }
  
    // tee time already booked out
    const teeTime = await db.teeTime.findFirst({where: {golfCourseId: {equals: courseId}, AND: {time: {equals: time}}}})
    if (teeTime) {
      return new Response('Tee time is already booked', {status: 400})
    }
  
    // book tee time
    await db.teeTime.create({data: {golfCourseId: courseId, time, numHoles, players, userId: 1}})
  
    return new Response('Tee time successfully booked!', {status: 200})

  } catch (error) {

    return new Response('Sorry, something went wrong on the server', {status: 500})
    
  }
} 
