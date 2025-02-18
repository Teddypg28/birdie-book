import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const db = new PrismaClient()

export default async function GET(req: NextRequest) {
    
    const authTokenUserId = req.headers.get('auth-user-id') as string
    const golfer = await db.user.findFirst({where: {id: {equals: authTokenUserId}}}) ||  await db.owner.findFirst({where: {id: {equals: authTokenUserId}}})

    if (!golfer) {
        return new NextResponse('Golfer does not exist', {status: 400})
    }

    const courses = await db.golfCourse.findMany({where: {state: golfer.state}, include: {rates: true, reviews: true, teeTimes: true}})
    return new NextResponse(JSON.stringify({courses}), {status: 200})

}