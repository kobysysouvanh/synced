import { UserService } from '@/lib/db/user-service'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // This uses your existing UserService to sync the user
    const profile = await UserService.syncUserFromClerk()
    
    if (!profile) {
      return NextResponse.json({ 
        error: 'No user found or user not authenticated' 
      }, { status: 401 })
    }

    return NextResponse.json({ 
      success: true, 
      profile,
      message: 'User profile synced successfully' 
    })
  } catch (error) {
    console.error('Error syncing user profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}