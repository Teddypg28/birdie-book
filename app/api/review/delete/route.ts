import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const db = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        
        const reviewFormData = await req.formData()
    
        const reviewObjectData = Object.fromEntries(reviewFormData.entries())
    
        const { reviewId } = reviewObjectData

        const review = await db.review.findFirst({where: {id: {equals: reviewId as string}}})
        if (!review) {
            return new NextResponse('The review you are trying to delete does not exist', {status: 400})
        }

        // verify that the user deleting the review is the user who created the review (extra security layer)
        const authTokenUserId = req.headers.get('auth-user-id') as string
        if (review.userId !== authTokenUserId) {
            return new NextResponse('Unauthorized to delete this review', {status: 401})
        }
        
        // delete the review
        await db.review.delete({where: {id: review.id}})
        return new NextResponse('Review successfully deleted', {status: 200})

    } catch (error) {

        return new NextResponse('Sorry, something went wrong on the server', {status: 500})

    }
}