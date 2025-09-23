import { prisma } from '@/lib/db/client'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const coupleId = params.id

    // Find the couple
    const couple = await prisma.couple.findUnique({
      where: { id: coupleId },
      include: {
        user1: { select: { id: true, firstName: true } },
        user2: { select: { id: true, firstName: true } }
      }
    })

    if (!couple) {
      return NextResponse.json({ error: 'Couple not found' }, { status: 404 })
    }

    // Verify user is part of this couple
    if (couple.user1Id !== user.id && couple.user2Id !== user.id) {
      return NextResponse.json({ error: 'You are not part of this couple' }, { status: 403 })
    }

    // Delete the couple (this will cascade delete dates and other related data)
    await prisma.couple.delete({
      where: { id: coupleId }
    })

    // Also clean up any active connection codes for both users
    await prisma.connectionCode.deleteMany({
      where: {
        OR: [
          { userId: couple.user1Id },
          { userId: couple.user2Id }
        ]
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Couple successfully deleted' 
    })

  } catch (error) {
    console.error('Error deleting couple:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}