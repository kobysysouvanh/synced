import { prisma } from '@/lib/db/client'
import { auth, currentUser } from '@clerk/nextjs/server'

export class UserService {
  // Create or update user profile when they sign up/sign in
  static async syncUserFromClerk() {
    const user = await currentUser()
    if (!user) return null

    return await prisma.profile.upsert({
      where: { id: user.id },
      update: {
        email: user.emailAddresses[0]?.emailAddress || '',
        firstName: user.firstName,
        lastName: user.lastName,
        updatedAt: new Date(),
      },
      create: {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        firstName: user.firstName,
        lastName: user.lastName,
      },
    })
  }

  // Get current user's profile and create if it doesn't exist
  static async getCurrentUserProfile() {
    const { userId } = await auth()
    if (!userId) return null

    // Try to get existing profile
    let profile = await prisma.profile.findUnique({
      where: { id: userId },

    })

    // If no profile exists, create one
    if (!profile) {
      const syncedProfile = await this.syncUserFromClerk()
      if (syncedProfile) {
        // Fetch the profile again with preferences
        profile = await prisma.profile.findUnique({
          where: { id: userId },

        })
      }
    }

    return profile
  }


  // Checks if Current User is Coupled
static async isUserCoupled(): Promise<boolean> {
  const user = await currentUser()
  if (!user) return false

  try {
    const couple = await prisma.couple.findFirst({
      where: {
        OR: [
          { user1Id: user.id },
          { user2Id: user.id }
        ]
      }
    })

    return !!couple // Convert to boolean
  } catch (error) {
    console.error('Error checking couple status:', error)
    return false
  }
}

// Gets Current Coupled Information
static async getCurrentCouple() {
  const user = await currentUser()
  if (!user) return null

  try {
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

    if (!couple) return null

    // Return the partner (not the current user)
    const partner = couple.user1Id === user.id ? couple.user2 : couple.user1
    
    return {
      couple,
      partner,
      coupleId: couple.id,
      createdAt: couple.createdAt
    }
  } catch (error) {
    console.error('Error getting couple:', error)
    return null
  }
}



}

