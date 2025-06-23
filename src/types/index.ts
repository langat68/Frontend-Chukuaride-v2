// User Roles & Enums
export type UserRole = 'admin' | 'staff' | 'customer'
export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid'
export type Transmission = 'automatic' | 'manual'
export type RentalStatus = 'booked' | 'ongoing' | 'completed' | 'cancelled'

// =======================
// Users
// =======================
export interface User {
  id: number
  email: string
  name?: string
  passwordHash?: string // only used internally
  role: UserRole
  createdAt: string
}


// =======================
// Auth
// =======================

export interface LoginCredentials {
  email: string
  password: string
}


export interface RegisterData {
  name: string
  email: string
  password: string
}

// =======================
// Cars
// =======================
export interface Car {
  id: number
  make: string
  model: string
  year: number
  category: string
  pricePerHour: number
  pricePerDay: number
  fuel: FuelType
  transmission: Transmission
  capacity: number
  availability: boolean
  location: string
  createdBy: number
  createdAt: string
}

export interface CarImage {
  id: number
  carId: number
  imageUrl: string
}

// =======================
// Bookings
// =======================
export interface Booking {
  id: number
  userId: number
  carId: number
  pickupTime: string
  returnTime: string
  priceEstimate?: number
  confirmed: boolean
  createdAt: string
}

// =======================
// Rentals
// =======================
export interface Rental {
  id: number
  bookingId: number
  status: RentalStatus
  durationHours?: number
  totalCost?: number
  startedAt?: string
  endedAt?: string
}

// =======================
// Payments
// =======================
export interface Payment {
  id: number
  rentalId: number
  paymentProvider?: string
  amount: number
  refundAmount?: number
  paidAt: string
  invoiceUrl?: string
  status: string
  receipt?: string
  phone?: string
  checkoutRequestId?: string
}

// =======================
// Feedback
// =======================
export interface Feedback {
  id: number
  userId: number
  carId: number
  rating: number
  comment?: string
  createdAt: string
}

// =======================
// Support Requests
// =======================
export interface SupportRequest {
  id: number
  userId: number
  message: string
  responded: boolean
  createdAt: string
}
