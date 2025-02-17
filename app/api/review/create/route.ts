import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const db = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        
        const reviewFormData = await req.formData()
    
        const reviewObjectData = Object.fromEntries(reviewFormData.entries())
    
        const { rating, body, golfCourseId } = reviewObjectData
    
        // verify that all of the necessary review data is included
        if (!rating || !body || !golfCourseId) {
          return new NextResponse('Missing required review data', {status: 400})
        }
        // verify that the course being reviewed exists in the db
        const golfCourse = await db.golfCourse.findFirst({where: {id: {equals: golfCourseId.toString()}}})
        if (!golfCourse) {
            return new NextResponse('Golf course with the given id does not exist', {status: 400})
        }
        
        // create the review
        await db.review.create({data: {body: body as string, rating: parseInt(rating as string), golfCourseId: golfCourseId as string}})
        return new NextResponse('Review successfully posted', {status: 200})


    } catch (error) {

        return new NextResponse('Sorry, something went wrong on the server', {status: 500})

    }
}