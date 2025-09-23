'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

export function useAutoUserSync() {
  const { user, isLoaded } = useUser()
  const [synced, setSynced] = useState(false)

  useEffect(() => {
    async function syncUser() {
      if (!isLoaded || !user || synced) return

      try {
        // Silent background sync - no loading states
        const response = await fetch('/api/profile/sync', {
          method: 'POST',
        })

        if (response.ok) {
          setSynced(true)
          console.log('✅ User profile synced silently in background')
        } else {
          console.error('❌ Failed to sync user profile silently')
        }
      } catch (error) {
        console.error('❌ Error syncing user profile:', error)
      }
    }

    syncUser()
  }, [user, isLoaded, synced])

  // Only return synced status, no loading state
  return { synced }
}