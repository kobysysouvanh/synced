import { prisma } from '@/lib/db/client'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Generate 5-character code
    const generateCode = () => {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
      let result = ''
      for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return result
    }

    let code = generateCode()
    
    // Ensure code is unique
    let attempts = 0
    while (attempts < 10) {
      const existing = await prisma.connectionCode.findUnique({
        where: { code }
      })
      if (!existing) break
      code = generateCode()
      attempts++
    }

    // Delete any existing codes for this user
    await prisma.connectionCode.deleteMany({
      where: { userId: user.id }
    })

    // Create new connection code (expires in 30 seconds)
    const connectionCode = await prisma.connectionCode.create({
      data: {
        code,
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 1000), // 30 seconds from now
      }
    })

    return NextResponse.json({ code: connectionCode.code })

  } catch (error) {
    console.error('Error generating code:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}