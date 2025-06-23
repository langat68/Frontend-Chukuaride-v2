import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils'
import type { Car } from '../../../types'

export const fetchCars = createAsyncThunk<Car[]>(
  'cars/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/cars') // adjust endpoint if needed
      return response.data as Car[]
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cars')
    }
  }
)
