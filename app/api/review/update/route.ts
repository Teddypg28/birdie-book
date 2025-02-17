import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const db = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        
        const reviewFormData = await req.formData()
    
        const reviewObjectData = Object.fromEntries(reviewFormData.entries())
    
        const { rating, body, golfCourseId, reviewId } = reviewObjectData
    
        // verify that all of the necessary review data is included
        if (!rating || !body || !golfCourseId || !reviewId) {
          return new NextResponse('Missing required review data', {status: 400})
        }
        // verify that the course being reviewed exists in the db
        const golfCourse = await db.golfCourse.findFirst({where: {id: {equals: golfCourseId.toString()}}})
        if (!golfCourse) {
            return new NextResponse('Golf course with the given id does not exist', {status: 400})
        }

        const review = await db.review.findFirst({where: {id: {equals: reviewId as string}}})
        if (!review) {
            return new NextResponse('The review you are trying to update does not exist', {status: 400})
        }

        // verify that the user updating the review is the user who created the review (extra security layer)
        const authTokenUserId = req.headers.get('auth-user-id') as string
        if (review.userId !== authTokenUserId) {
            return new NextResponse('Unauthorized to update this review', {status: 401})
        }
        
        // create the review
        await db.review.update({where: {id: authTokenUserId}, data: {body: body as string, rating: parseInt(rating as string), golfCourseId: golfCourseId as string}})
        return new NextResponse('Review successfully updated', {status: 200})


    } catch (error) {

        return new NextResponse('Sorry, something went wrong on the server', {status: 500})

    }
}