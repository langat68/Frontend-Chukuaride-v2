
// ✅ src/store/slices/userSlice.ts
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setUsers, setLoading } = userSlice.actions
export default userSlice.reducer