// ======================
// Auth & User Types
// ======================
export interface User {
  id: number
  email: string
  name?: string
  role: 'admin' | 'staff' | 'customer'
  createdAt?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
  name?: string
}
