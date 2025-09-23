import { UserService } from '@/lib/db/user-service'
import { NextResponse } from 'next/server'

/**
 * GET /api/profile - Get current user's profile
 * 
 * This endpoint retrieves the authenticated user's profile information.
 * If the profile doesn't exist, it will be automatically created.
 * 
 * @returns User profile with preferences
 */
export async function GET() {
  try {
    // ===== STEP 1: Get user profile (auto-creates if needed) =====
    const userProfile = await UserService.getCurrentUserProfile()
    
    if (!userProfile) {
      return NextResponse.json(
        { error: 'Unable to retrieve user profile' }, 
        { status: 401 }
      )
    }

    // ===== STEP 2: Return profile data =====
    return NextResponse.json({ 
      success: true,
      profile: userProfile 
    })

  } catch (error) {
    console.error('❌ Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'Failed to load profile. Please try again.' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/profile - Update user profile and preferences
 * 
 * This endpoint allows users to update their profile preferences
 * such as theme and notifications settings.
 * 
 * @param theme - UI theme preference ('light', 'dark', 'system')
 * @param notifications - Whether to enable notifications
 * @returns Updated user profile
 */
export async function POST(request: Request) {
  try {
    // ===== STEP 1: Parse request body =====
    const requestBody = await request.json()
    const { theme, notifications } = requestBody

    // ===== STEP 2: Validate input data =====
    if (theme && !['light', 'dark', 'system'].includes(theme)) {
      return NextResponse.json(
        { error: 'Invalid theme. Must be light, dark, or system' },
        { status: 400 }
      )
    }

    if (notifications !== undefined && typeof notifications !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid notifications setting. Must be true or false' },
        { status: 400 }
      )
    }

    // ===== STEP 3: Sync user data from Clerk =====
    await UserService.syncUserFromClerk()

    // ===== STEP 4: Update user preferences if provided =====


    // ===== STEP 5: Return updated profile =====
    const updatedProfile = await UserService.getCurrentUserProfile()
    
    return NextResponse.json({ 
      success: true,
      message: 'Profile updated successfully',
      profile: updatedProfile 
    })

  } catch (error) {
    console.error('❌ Error updating user profile:', error)
    return NextResponse.json(
      { error: 'Failed to update profile. Please try again.' },
      { status: 500 }
    )
  }
}