import { prisma } from '@/lib/db/client'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

/**
 * POST /api/couples/connect - Connect with another user using a connection code
 * 
 * This endpoint allows a user to connect with another user by entering
 * their connection code, creating a couple relationship.
 * 
 * @param code - 5-character connection code from another user
 * @returns Newly created couple relationship
 */
export async function POST(request: Request) {
  try {
    // ===== STEP 1: Authenticate the user =====
    const authenticatedUser = await currentUser()
    if (!authenticatedUser) {
      return NextResponse.json(
        { error: 'You must be logged in to connect with someone' }, 
        { status: 401 }
      )
    }

    // ===== STEP 2: Parse and validate connection code =====
    const requestBody = await request.json()
    const { code } = requestBody

    if (!code || typeof code !== 'string' || code.length !== 5) {
      return NextResponse.json(
        { error: 'Invalid code format. Code must be exactly 5 characters.' }, 
        { status: 400 }
      )
    }

    const sanitizedCode = code.toUpperCase().trim()

    // ===== STEP 3: Check if user is already in a relationship =====
    const existingRelationship = await prisma.couple.findFirst({
      where: {
        OR: [
          { user1Id: authenticatedUser.id },
          { user2Id: authenticatedUser.id }
        ]
      },
      include: {
        user1: { select: { firstName: true, lastName: true } },
        user2: { select: { firstName: true, lastName: true } }
      }
    })

    if (existingRelationship) {
      const partner = existingRelationship.user1Id === authenticatedUser.id 
        ? existingRelationship.user2 
        : existingRelationship.user1
      
      return NextResponse.json(
        { error: `You are already coupled with ${partner.firstName} ${partner.lastName}` }, 
        { status: 400 }
      )
    }

    // ===== STEP 4: Find and validate the connection code =====
    const validConnectionCode = await prisma.connectionCode.findFirst({
      where: {
        code: sanitizedCode,
        expiresAt: {
          gt: new Date() // Code hasn't expired
        }
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    })

    if (!validConnectionCode) {
      return NextResponse.json(
        { error: 'Invalid or expired connection code. Please ask for a new code.' }, 
        { status: 404 }
      )
    }

    // ===== STEP 5: Prevent self-connection =====
    if (validConnectionCode.userId === authenticatedUser.id) {
      return NextResponse.json(
        { error: 'You cannot connect to yourself!' }, 
        { status: 400 }
      )
    }

    // ===== STEP 6: Create the couple relationship =====
    const newCouple = await prisma.couple.create({
      data: {
        user1Id: validConnectionCode.userId, // Code generator (first user)
        user2Id: authenticatedUser.id,       // Code enterer (second user)
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

    // ===== STEP 7: Clean up - delete the used connection code =====
    await prisma.connectionCode.delete({
      where: { id: validConnectionCode.id }
    })

    // ===== STEP 8: Return success response =====
    const partnerName = `${validConnectionCode.user.firstName} ${validConnectionCode.user.lastName}`.trim()
    
    return NextResponse.json({ 
      success: true, 
      couple: newCouple,
      message: `🎉 Successfully connected with ${partnerName}!`,
      connectionDate: newCouple.createdAt.toISOString()
    })

  } catch (error) {
    console.error('❌ Error connecting couple:', error)
    return NextResponse.json(
      { error: 'Failed to establish connection. Please try again.' },
      { status: 500 }
    )
  }
}