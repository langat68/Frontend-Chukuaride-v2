// ✅ src/store/slices/bookingSlice.ts
import { createSlice } from '@reduxjs/toolkit'

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    loading: false,
  },
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setBookings, setLoading } = bookingSlice.actions
export default bookingSlice.reducer