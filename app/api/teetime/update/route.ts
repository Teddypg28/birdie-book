import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import validateTeetimePermissions from '@/auth/validateTeetimePermissions'

const db = new PrismaClient()
 
export async function POST(req: NextRequest) {
  try {

    const teeTimeData = await req.json()
    const { teeTimeId, numHoles, players } = teeTimeData

    if (!teeTimeId || !numHoles || !players) {
      return new NextResponse('Error updating tee time. Missing required data', {status: 400})
    }

    // check if tee time exists
    const teeTime = await db.teeTime.findFirst({where: {id: {equals: teeTimeId}}})
    if (!teeTime) {
      return new NextResponse('Error updating tee time. Tee time does not exist', {status: 400})
    }

    // verify that an authorized user is making the request and that the one who booked the tee time is updating it (extra security layer)
    const verifiedUserToken = await validateTeetimePermissions(req)
    if (!verifiedUserToken || teeTime.userId !== verifiedUserToken.payload.id) {
      return new NextResponse('Unauthorized to update tee times', {status: 401})
    }

    // invalid tee time data (too many players, no players, invalid number of holes)
    if (players.length > 4 || players.length < 1 || ![9, 18].includes(numHoles)) {
        return new NextResponse('Error creating tee time. Invalid course, time slot, number of holes, or number of players', {status: 400})
    }

    // update tee time
    await db.teeTime.update({where: {id: teeTimeId}, data: {numHoles, players}})
    return new NextResponse('Tee time successfully updated', {status: 200})

  } catch (error) {
    
    return new NextResponse('Sorry, something went wrong on the server', {status: 500})
    
  }
} 
