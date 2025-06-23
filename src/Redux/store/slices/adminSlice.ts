
// ✅ src/store/slices/adminSlice.ts
import { createSlice } from '@reduxjs/toolkit'

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    stats: {},
    reports: [],
    loading: false,
  },
  reducers: {
    setStats: (state, action) => {
      state.stats = action.payload
    },
    setReports: (state, action) => {
      state.reports = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setStats, setReports, setLoading } = adminSlice.actions
export default adminSlice.reducer
