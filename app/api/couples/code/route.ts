import { prisma } from '@/lib/db/client'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

/**
 * POST /api/couples/code - Generate a connection code for coupling
 * 
 * This endpoint generates a unique 5-character code that expires in 30 seconds.
 * Another user can use this code to connect and form a couple relationship.
 * 
 * @returns Generated connection code
 */
export async function POST() {
  try {
    // ===== STEP 1: Authenticate the user =====
    const authenticatedUser = await currentUser()
    if (!authenticatedUser) {
      return NextResponse.json(
        { error: 'You must be logged in to generate a connection code' }, 
        { status: 401 }
      )
    }

    // ===== STEP 2: Define code generation function =====
    const generateUniqueCode = (): string => {
      // Use characters that are easy to read and distinguish
      const allowedCharacters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
      let generatedCode = ''
      
      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * allowedCharacters.length)
        generatedCode += allowedCharacters.charAt(randomIndex)
      }
      
      return generatedCode
    }

    // ===== STEP 3: Generate unique code (avoid duplicates) =====
    let connectionCode = generateUniqueCode()
    let generationAttempts = 0
    const maxAttempts = 10

    while (generationAttempts < maxAttempts) {
      const existingCode = await prisma.connectionCode.findUnique({
        where: { code: connectionCode }
      })
      
      if (!existingCode) {
        break // Code is unique, we can use it
      }
      
      connectionCode = generateUniqueCode()
      generationAttempts++
    }

    if (generationAttempts >= maxAttempts) {
      return NextResponse.json(
        { error: 'Unable to generate unique code. Please try again.' },
        { status: 500 }
      )
    }

    // ===== STEP 4: Clean up old codes for this user =====
    await prisma.connectionCode.deleteMany({
      where: { userId: authenticatedUser.id }
    })

    // ===== STEP 4.5: Clean up all expired codes (database maintenance) =====
    await prisma.connectionCode.deleteMany({
      where: {
        expiresAt: {
          lt: new Date() // Delete all codes that have already expired
        }
      }
    })

    // ===== STEP 5: Create new connection code =====
    const codeExpirationTime = new Date(Date.now() + 30 * 1000) // 30 seconds from now
    
    const newConnectionCode = await prisma.connectionCode.create({
      data: {
        code: connectionCode,
        userId: authenticatedUser.id,
        expiresAt: codeExpirationTime,
      }
    })

    // ===== STEP 6: Return the connection code =====
    return NextResponse.json({ 
      success: true,
      code: newConnectionCode.code,
      expiresAt: codeExpirationTime.toISOString(),
      expiresInSeconds: 30,
      message: 'Connection code generated successfully. Share this code with your partner!'
    })

  } catch (error) {
    console.error('❌ Error generating connection code:', error)
    return NextResponse.json(
      { error: 'Failed to generate connection code. Please try again.' },
      { status: 500 }
    )
  }
}