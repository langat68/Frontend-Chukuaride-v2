import { createSlice } from '@reduxjs/toolkit'

interface CarState {
  cars: any[] // or use Car[] if you've imported the type
  loading: boolean
  error: string | null
}

const initialState: CarState = {
  cars: [],
  loading: false,
  error: null,
}

const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setCars, setLoading, setError } = carSlice.actions
export default carSlice.reducer
