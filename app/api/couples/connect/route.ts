import { prisma } from '@/lib/db/client'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { code } = await request.json()

    if (!code || code.length !== 5) {
      return NextResponse.json({ error: 'Invalid code format' }, { status: 400 })
    }

    // Check if user is already coupled
    const existingCouple = await prisma.couple.findFirst({
      where: {
        OR: [
          { user1Id: user.id },
          { user2Id: user.id }
        ]
      }
    })

    if (existingCouple) {
      return NextResponse.json({ error: 'You are already coupled with someone' }, { status: 400 })
    }

    // Find active connection code
    const activeCode = await prisma.connectionCode.findFirst({
      where: {
        code: code.toUpperCase(),
        expiresAt: {
          gt: new Date() // Code hasn't expired
        }
      }
    })

    if (!activeCode) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 404 })
    }

    // Check if user is trying to connect to themselves
    if (activeCode.userId === user.id) {
      return NextResponse.json({ error: 'Cannot couple with yourself' }, { status: 400 })
    }

    // Create the couple relationship
    const couple = await prisma.couple.create({
      data: {
        user1Id: activeCode.userId, // Code generator
        user2Id: user.id,           // Code enterer
      },
      include: {
        user1: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        user2: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    })

    // Delete the used connection code
    await prisma.connectionCode.delete({
      where: { id: activeCode.id }
    })

    return NextResponse.json({ 
      success: true, 
      couple,
      message: `Successfully connected!`
    })

  } catch (error) {
    console.error('Error connecting couple:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}