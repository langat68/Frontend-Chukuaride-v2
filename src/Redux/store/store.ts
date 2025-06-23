import { configureStore } from '@reduxjs/toolkit'

// Import all slices
import authReducer from './slices/authSlice'
import carReducer from './slices/carSlice'
import bookingReducer from './slices/bookingSlice'
import rentalReducer from './slices/rentalSlice'
import paymentReducer from './slices/paymentSlice'
import feedbackReducer from './slices/feedbackSlice'
import supportReducer from './slices/supportSlice'
import userReducer from './slices/userSlice'
import adminReducer from './slices/adminSlice'

// Configure the store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carReducer,
    bookings: bookingReducer,
    rentals: rentalReducer,
    payments: paymentReducer,
    feedback: feedbackReducer,
    support: supportReducer,
    users: userReducer,
    admin: adminReducer,
  },
})

// Define types for usage in typed hooks
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
