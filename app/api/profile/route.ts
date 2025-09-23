import { UserService } from '@/lib/db/user-service'
import { NextResponse } from 'next/server'

// GET /api/profile - Get user profile (creates if doesn't exist)
export async function GET() {
  try {
    // This automatically creates profile if it doesn't exist
    const profile = await UserService.getCurrentUserProfile()
    
    if (!profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/profile - Update user profile and preferences
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { theme, notifications } = body

    // Sync user first (creates profile if needed)
    await UserService.syncUserFromClerk()

    // Update preferences if provided
    if (theme !== undefined || notifications !== undefined) {
      await UserService.updateUserPreferences({
        theme,
        notifications,
      })
    }

    // Return updated profile
    const profile = await UserService.getCurrentUserProfile()
    
    return NextResponse.json({ profile })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}