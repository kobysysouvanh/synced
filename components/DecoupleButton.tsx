'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { HeartCrack } from 'lucide-react'

interface DecoupleButtonProps {
  coupleId: string
  partnerName: string
}

export function DecoupleButton({ coupleId, partnerName }: DecoupleButtonProps) {
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDecouple = async () => {
    if (!showConfirm) {
      setShowConfirm(true)
      return
    }

    setLoading(true)
    
    try {
      const response = await fetch(`/api/couples/delete/${coupleId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Successfully decoupled 💔')
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } else {
        toast.error(data.error || 'Failed to decouple')
      }
    } catch (error) {
      console.error('Error decoupling:', error)
      toast.error('Failed to decouple')
    } finally {
      setLoading(false)
      setShowConfirm(false)
    }
  }

  const handleCancel = () => {
    setShowConfirm(false)
  }

  if (showConfirm) {
    return (
      <div className="space-y-3 p-4 border border-red-200 rounded-lg bg-red-50">
        <div className="text-sm">
          <p className="font-semibold text-red-800 mb-2">
            Are you sure you want to break up with {partnerName}?
          </p>
          <p className="text-red-600 text-xs mb-2">
            ⚠️ This will permanently delete all shared dates and memories.
          </p>
          <p className="text-red-600 text-xs font-medium">
            This action cannot be undone.
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button
            onClick={handleCancel}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDecouple}
            disabled={loading}
            variant="destructive"
            size="sm"
            className="flex-1"
          >
            <HeartCrack className="h-4 w-4 mr-1" />
            {loading ? 'Breaking Up...' : 'Break Up'}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Button 
      onClick={handleDecouple}
      variant="destructive" 
      size="sm"
      className="bg-red-500 hover:bg-red-600"
    >
      <HeartCrack className="h-4 w-4 mr-2" />
      Break Up
    </Button>
  )
}