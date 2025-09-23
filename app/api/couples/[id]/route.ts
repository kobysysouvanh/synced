import { prisma } from '@/lib/db/client'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

/**
 * DELETE /api/couples/[id] - Delete/Break an existing couple relationship
 * 
 * This endpoint allows a user to delete their couple relationship.
 * Only users who are part of the couple can delete it.
 * 
 * @param coupleId - The ID of the couple relationship to delete
 * @returns Success message or error
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // ===== STEP 1: Authenticate the user =====
    const authenticatedUser = await currentUser()
    if (!authenticatedUser) {
      return NextResponse.json(
        { error: 'You must be logged in to delete a couple relationship' }, 
        { status: 401 }
      )
    }

    // ===== STEP 2: Get the couple ID from URL parameters =====
    const { id: coupleId } = await params

    // ===== STEP 3: Find the couple relationship in database =====
    const coupleToDelete = await prisma.couple.findUnique({
      where: { id: coupleId },
      include: {
        user1: { 
          select: { 
            id: true, 
            firstName: true,
            lastName: true 
          } 
        },
        user2: { 
          select: { 
            id: true, 
            firstName: true,
            lastName: true 
          } 
        }
      }
    })

    // Check if couple exists
    if (!coupleToDelete) {
      return NextResponse.json(
        { error: 'Couple relationship not found' }, 
        { status: 404 }
      )
    }

    // ===== STEP 4: Verify user has permission to delete this couple =====
    const isUser1 = coupleToDelete.user1Id === authenticatedUser.id
    const isUser2 = coupleToDelete.user2Id === authenticatedUser.id
    const userCanDeleteCouple = isUser1 || isUser2

    if (!userCanDeleteCouple) {
      return NextResponse.json(
        { error: 'You can only delete your own couple relationship' }, 
        { status: 403 }
      )
    }

    // ===== STEP 5: Delete the couple relationship =====
    // This will cascade delete related data like dates, etc.
    await prisma.couple.delete({
      where: { id: coupleId }
    })

    // ===== STEP 6: Clean up related data =====
    // Remove any active connection codes for both users
    await prisma.connectionCode.deleteMany({
      where: {
        OR: [
          { userId: coupleToDelete.user1Id },
          { userId: coupleToDelete.user2Id }
        ]
      }
    })

    // ===== STEP 7: Return success response =====
    const partnerName = isUser1 
      ? `${coupleToDelete.user2.firstName} ${coupleToDelete.user2.lastName}`.trim()
      : `${coupleToDelete.user1.firstName} ${coupleToDelete.user1.lastName}`.trim()

    return NextResponse.json({ 
      success: true, 
      message: `Successfully ended couple relationship with ${partnerName}`,
      deletedCoupleId: coupleId
    })

  } catch (error) {
    console.error('❌ Error deleting couple relationship:', error)
    return NextResponse.json(
      { error: 'Failed to delete couple relationship. Please try again.' },
      { status: 500 }
    )
  }
}