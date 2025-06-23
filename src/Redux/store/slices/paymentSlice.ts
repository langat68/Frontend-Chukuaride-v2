// ✅ src/store/slices/paymentSlice.ts
import { createSlice } from '@reduxjs/toolkit'

const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    payments: [],
    loading: false,
  },
  reducers: {
    setPayments: (state, action) => {
      state.payments = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setPayments, setLoading } = paymentSlice.actions
export default paymentSlice.reducer