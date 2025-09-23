// Supabase real-time payload types
export interface CoupleRecord {
  id: string
  user1_id: string
  user2_id: string
  created_at: string
  updated_at: string
}

export interface ConnectionCodeRecord {
  id: string
  code: string
  user_id: string
  expires_at: string
  created_at: string
}

export interface SupabasePayload<T = Record<string, any>> {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  new: T | null
  old: T | null
  schema: string
  table: string
  commit_timestamp: string
}

// Specific payload types
export type CouplePayload = SupabasePayload<CoupleRecord>
export type ConnectionCodePayload = SupabasePayload<ConnectionCodeRecord>

// Application data types
export interface CoupleData {
  partner: {
    firstName: string
    lastName: string
    email: string
    id: string
  }
  coupleId: string
  createdAt: string
}

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  imageUrl?: string
  emailVerified?: boolean
}

// API response types
export interface CoupleStatusResponse {
  isCoupled: boolean
  coupleData: CoupleData | null
}

export interface CodeGenerationResponse {
  success: boolean
  code?: string
  error?: string
}

export interface CoupleConnectionResponse {
  success: boolean
  message?: string
  error?: string
}