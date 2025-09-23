'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/db/supabase'
import { CodeGenerator } from "@/components/CodeGenerator"
import { DecoupleButton } from "@/components/DecoupleButton"
import { SignOutButton } from "@clerk/nextjs"
import { CoupleData, SupabaseRealtimePayload } from '@/lib/types'

const Dashboard = () => {
  const { user } = useUser()
  const [isCoupled, setIsCoupled] = useState<boolean>(false)
  const [coupleData, setCoupleData] = useState<CoupleData | null>(null)
  const [loading, setLoading] = useState(true)

  

  useEffect(() => {
    if (!user) return

    const fetchCoupleStatus = async () => {
    if (!user) return

    try {
      const response = await fetch('/api/couples/status')
      const data = await response.json()
      
      setIsCoupled(data.isCoupled)
      setCoupleData(data.coupleData)
    } catch (error) {
      console.error('Error fetching couple status:', error)
    } finally {
      setLoading(false)
    }
  }

    // Initial fetch
    fetchCoupleStatus()

    // Set up real-time subscription for both user positions
    const channel = supabase
      .channel('couples_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'couples'
        },
        async (payload: SupabaseRealtimePayload) => {
          // Check if this change affects the current user
          const record = payload.new || payload.old
          if (record && (record.user1_id === user.id || record.user2_id === user.id)) {
            console.log('Real-time couple change for user:', payload)
            
            if (payload.eventType === 'INSERT') {
              await fetchCoupleStatus()
            } else if (payload.eventType === 'DELETE') {
              setIsCoupled(false)
              setCoupleData(null)
            }
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>Please sign in to continue</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!isCoupled) {
    return <CodeGenerator />
  }

  return (
    <div className="flex flex-col p-6 max-w-2xl mx-auto space-y-6">
      {/* User Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-2">
          Welcome, {user?.firstName}! 👋
        </h1>
        <div className="mt-4">
          <SignOutButton />
        </div>
      </div>

      {/* Couple Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">{`💕 You're Coupled Up!`}</h2>
          <DecoupleButton 
            coupleId={coupleData?.coupleId || ''} 
            partnerName={`${coupleData?.partner?.firstName} ${coupleData?.partner?.lastName}`.trim()}
          />
        </div>
        
        <div className="space-y-2">
          <div><strong>Partner:</strong> {coupleData?.partner?.firstName} {coupleData?.partner?.lastName}</div>
          <div><strong>Email:</strong> {coupleData?.partner?.email}</div>
          <div><strong>Coupled Since:</strong> {new Date(coupleData?.createdAt || '').toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard