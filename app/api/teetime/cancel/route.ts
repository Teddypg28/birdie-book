import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()
 
export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { teeTimeId } = data

    const teeTime = await db.teeTime.findFirst({where: {id: {equals: parseInt(teeTimeId)}}})
    if (!teeTime) {
        return new Response('Tee time does not exist', {status: 400})
    }

    await db.teeTime.delete({where: {id: parseInt(teeTimeId)}})
    return new Response('Tee time successfully cancelled', {status: 200})

  } catch (error) {

    return new Response('Sorry, something went wrong on the server', {status: 500})
    
  }
} 
