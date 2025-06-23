
// ✅ src/store/slices/supportSlice.ts
import { createSlice } from '@reduxjs/toolkit'

const supportSlice = createSlice({
  name: 'support',
  initialState: {
    requests: [],
    loading: false,
  },
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setRequests, setLoading } = supportSlice.actions
export default supportSlice.reducer