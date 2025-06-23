// ✅ src/store/slices/rentalSlice.ts
import { createSlice } from '@reduxjs/toolkit'

const rentalSlice = createSlice({
  name: 'rentals',
  initialState: {
    rentals: [],
    loading: false,
  },
  reducers: {
    setRentals: (state, action) => {
      state.rentals = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setRentals, setLoading } = rentalSlice.actions
export default rentalSlice.reducer