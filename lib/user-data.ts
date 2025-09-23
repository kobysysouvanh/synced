import { currentUser } from '@clerk/nextjs/server'
import { UserService } from '@/lib/db/user-service'

export async function getCurrentUserData() {
  try {
    const clerkUser = await currentUser()
    if (!clerkUser) return null

    const profile = await UserService.getCurrentUserProfile()
    
    return {
      clerkUser,
      profile,
      user: profile ? {
        ...profile,
        imageUrl: clerkUser.imageUrl,
        emailVerified: clerkUser.emailAddresses[0]?.verification?.status === 'verified',
      } : null
    }
  } catch (error) {
    console.error('Error getting current user data:', error)
    return null
  }
}