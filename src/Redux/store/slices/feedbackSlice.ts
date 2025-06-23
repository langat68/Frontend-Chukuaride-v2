// ✅ src/store/slices/feedbackSlice.ts
import { createSlice } from '@reduxjs/toolkit'

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    feedback: [],
    loading: false,
  },
  reducers: {
    setFeedback: (state, action) => {
      state.feedback = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setFeedback, setLoading } = feedbackSlice.actions
export default feedbackSlice.reducer