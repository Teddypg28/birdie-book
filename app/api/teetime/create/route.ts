import convertDateTimeToTime from '@/helpers/convertDateTimeToTime'
import validTeeTimes from '@/validTeeTimes'
import { PrismaClient } from '@prisma/client'

import { NextRequest, NextResponse } from 'next/server'
import validateTeetimePermissions from '@/auth/validateTeetimePermissions'

const db = new PrismaClient()
 
export async function POST(req: NextRequest) {
  try {  
    
    // verify that an authorized user is making the request
    const verifiedUserToken = await validateTeetimePermissions(req)
    if (!verifiedUserToken) {
      return new NextResponse('Unauthorized to create tee times', {status: 401})
    }

    // handle data sent with the request
    const teeTimeData = await req.json()
    const { courseId, time, numHoles, players } = teeTimeData

    // missing required tee time data
    if (!courseId || !time || !numHoles || !players) {
      return new NextResponse('Missing required tee time data', {status: 400})
    }

    // invalid tee time data (course does not exist, invalid time slot, too many players, no players, invalid number of holes)
    const course = await db.golfCourse.findFirst({where: {id: {equals: courseId}}})
    if (!validTeeTimes.includes(convertDateTimeToTime(time)) || !course || players.length > 4 || players.length < 1 || ![9, 18].includes(numHoles)) {
        return new NextResponse('Error creating tee time. Invalid course, time slot, number of holes, or number of players', {status: 400})
    }

    // tee time already booked out
    const teeTime = await db.teeTime.findFirst({where: {golfCourseId: courseId, time: new Date(time)}})
    if (teeTime) {
      return new NextResponse('Tee time is already booked', {status: 400})
    }
  
    // book tee time
    await db.teeTime.create({data: {golfCourseId: courseId, time: new Date(time), numHoles, players, userId: verifiedUserToken.payload.id as string}})
    return new NextResponse('Tee time successfully booked', {status: 200})

  } catch (error) {

    return new NextResponse('Sorry, something went wrong on the server', {status: 500})
    
  }
} 
