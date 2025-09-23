'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

interface UserProfile {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  preferences?: {
    theme: string
    notifications: boolean
  } | null
  createdAt: string
  updatedAt: string
}

export function useCurrentUser() {
  const { user: clerkUser, isLoaded } = useUser()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUserProfile() {
      if (!isLoaded) return
      if (!clerkUser) {
        setProfile(null)
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/profile')
        
        if (response.ok) {
          const data = await response.json()
          setProfile(data.profile)
        } else {
          setError('Failed to fetch profile')
        }
      } catch (err) {
        setError('Error fetching profile')
        console.error('Error fetching user profile:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [clerkUser, isLoaded])

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      if (response.ok) {
        const data = await response.json()
        setProfile(data.profile)
        return data.profile
      }
    } catch (err) {
      console.error('Error updating profile:', err)
      throw err
    }
  }

  return {
    // Clerk user data
    clerkUser,
    isAuthenticated: !!clerkUser,
    isLoaded,
    
    // Database profile data
    profile,
    loading,
    error,
    
    // Actions
    updateProfile,
    
    // Combined user data for convenience
    user: profile ? {
      ...profile,
      // Add Clerk-specific data that might not be in DB
      imageUrl: clerkUser?.imageUrl,
      emailVerified: clerkUser?.emailAddresses[0]?.verification?.status === 'verified',
    } : null
  }
}