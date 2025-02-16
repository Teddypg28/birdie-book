import convertDateTimeToTime from '@/helpers/convertDateTimeToTime'
import validTeeTimes from '@/validTeeTimes'
import { PrismaClient } from '@prisma/client'

import jwt from 'jsonwebtoken'
import { parse } from 'cookie'

const db = new PrismaClient()
 
export async function POST(req: Request) {
  try {  
    // check for cookies
    const cookies = req.headers.get('Cookie')
    if (!cookies) {
      return new Response('Unauthorized', {status: 401})
    }
    // parse the cookies
    const parsedCookies = parse(cookies)
    const token = parsedCookies.token
    // check for jwt
    if (!token) {
      return new Response('Unauthorized', {status: 401})
    }

    // verify the jwt
    let verifiedToken
    try {
      verifiedToken = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload
    } catch {
      return new Response('Failed verification', {status: 401})
    }

    // handle data sent with the request
    const teeTimeData = await req.json()
    const { courseId, time, numHoles, players } = teeTimeData

    // missing required tee time data
    if (!courseId || !time || !numHoles || !players) {
      return new Response('Missing required tee time data', {status: 400})
    }

    // invalid tee time data (course does not exist, invalid time slot, too many players, no players, invalid number of holes)
    const course = await db.golfCourse.findFirst({where: {id: {equals: parseInt(courseId)}}})
    if (!validTeeTimes.includes(convertDateTimeToTime(time)) || !course || players.length > 4 || players.length < 1 || ![9, 18].includes(numHoles)) {
        return new Response('Error creating tee time. Invalid course, time slot, number of holes, or number of players', {status: 400})
    }
  
    // tee time already booked out
    const teeTime = await db.teeTime.findFirst({where: {golfCourseId: parseInt(courseId), time}})
    if (teeTime) {
      return new Response('Tee time is already booked', {status: 400})
    }
  
    // book tee time
    await db.teeTime.create({data: {golfCourseId: courseId, time, numHoles, players, userId: verifiedToken.id}})
  
    return new Response('Tee time successfully booked!', {status: 200})

  } catch (error) {

    return new Response('Sorry, something went wrong on the server', {status: 500})
    
  }
} 
