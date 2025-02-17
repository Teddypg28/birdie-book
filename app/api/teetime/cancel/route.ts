import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const db = new PrismaClient()
 
export async function POST(req: NextRequest) {
  try {
    
    const data = await req.json()
    const { teeTimeId } = data

    if (!teeTimeId) {
      return new NextResponse('Missing required tee time id', {status: 400})
    }

    const teeTime = await db.teeTime.findFirst({where: {id: {equals: teeTimeId}}})
    if (!teeTime) {
      return new NextResponse('Tee time does not exist', {status: 400})
    }

    // verify that the one who booked the tee time is the one cancelling it (extra security layer)
    const authTokenUserId = req.headers.get('auth-user-id') as string
    if (teeTime.userId !== authTokenUserId) {
      return new NextResponse('Unauthorized to cancel tee times', {status: 401})
    }

    await db.teeTime.delete({where: {id: teeTimeId}})
    return new NextResponse('Tee time successfully cancelled', {status: 200})

  } catch (error) {

    return new NextResponse('Sorry, something went wrong on the server', {status: 500})
    
  }
} 
