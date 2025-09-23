import { prisma } from '@/lib/db/client'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

/**
 * GET /api/couples/status - Check if user is in a couple relationship
 * 
 * This endpoint checks whether the authenticated user is currently
 * coupled with someone and returns their partner's information if so.
 * 
 * @returns Couple status and partner information
 */
export async function GET() {
  try {
    // ===== STEP 1: Authenticate the user =====
    const authenticatedUser = await currentUser()
    if (!authenticatedUser) {
      return NextResponse.json(
        { error: 'You must be logged in to check couple status' }, 
        { status: 401 }
      )
    }

    // ===== STEP 2: Search for existing couple relationship =====
    const existingCouple = await prisma.couple.findFirst({
      where: {
        OR: [
          { user1Id: authenticatedUser.id },
          { user2Id: authenticatedUser.id }
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

    // ===== STEP 3: Handle case where user is not coupled =====
    if (!existingCouple) {
      return NextResponse.json({ 
        success: true,
        isCoupled: false, 
        coupleData: null,
        message: 'You are not currently coupled with anyone'
      })
    }

    // ===== STEP 4: Determine partner information =====
    const isUser1 = existingCouple.user1Id === authenticatedUser.id
    const partnerInfo = isUser1 ? existingCouple.user2 : existingCouple.user1
    
    // ===== STEP 5: Return couple status and partner info =====
    return NextResponse.json({ 
      success: true,
      isCoupled: true, 
      coupleData: {
        partner: partnerInfo,
        coupleId: existingCouple.id,
        coupledSince: existingCouple.createdAt.toISOString(),
        relationshipDuration: `${Math.floor((Date.now() - existingCouple.createdAt.getTime()) / (1000 * 60 * 60 * 24))} days`
      },
      message: `You are coupled with ${partnerInfo.firstName} ${partnerInfo.lastName}`
    })

  } catch (error) {
    console.error('❌ Error fetching couple status:', error)
    return NextResponse.json(
      { error: 'Failed to check couple status. Please try again.' },
      { status: 500 }
    )
  }
}