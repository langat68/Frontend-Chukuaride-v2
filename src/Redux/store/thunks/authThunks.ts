import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils';
import type { LoginCredentials, RegisterData, User } from '../../../types';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Login failed');
    }
  }
);


export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Registration failed');
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
    'auth/fetchProfile',
    async (_, { getState, rejectWithValue }) => {
        const { auth } = getState() as { auth: { token: string | null }};
        if (!auth.token) {
            return rejectWithValue('No token found');
        }
        try {
            const response = await api.get('/users/profile', {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            return response.data as User;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || 'Failed to fetch user profile');
        }
    }
);