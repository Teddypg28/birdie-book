import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()
 
export async function POST(req: Request) {
  try {

    const teeTimeData = await req.json()
    const { teeTimeId, numHoles, players } = teeTimeData

    // invalid tee time data (too many players, no players, invalid number of holes)
    if (players.length > 4 || players.length < 1 || ![9, 18].includes(numHoles)) {
        return new Response('Error creating tee time', {status: 400})
    }

    // update tee time
    await db.teeTime.update({where: {id: parseInt(teeTimeId)}, data: {numHoles, players}})
  
    return new Response('Tee time successfully booked!', {status: 200})

  } catch (error) {

    return new Response('Sorry, something went wrong on the server', {status: 500})
    
  }
} 
