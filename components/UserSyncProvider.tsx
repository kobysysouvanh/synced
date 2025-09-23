'use client'

import { useAutoUserSync } from '@/hooks/useAutoUserSync'

export function UserSyncProvider({ children }: { children: React.ReactNode }) {
  useAutoUserSync() // Just sync silently in the background
  
  return <>{children}</>
}