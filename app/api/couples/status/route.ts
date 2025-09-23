import { prisma } from '@/lib/db/client'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const couple = await prisma.couple.findFirst({
      where: {
        OR: [
          { user1Id: user.id },
          { user2Id: user.id }
        ]
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

    if (!couple) {
      return NextResponse.json({ 
        isCoupled: false, 
        coupleData: null 
      })
    }

    const partner = couple.user1Id === user.id ? couple.user2 : couple.user1
    
    return NextResponse.json({ 
      isCoupled: true, 
      coupleData: {
        partner,
        coupleId: couple.id,
        createdAt: couple.createdAt.toISOString()
      }
    })

  } catch (error) {
    console.error('Error fetching couple status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}