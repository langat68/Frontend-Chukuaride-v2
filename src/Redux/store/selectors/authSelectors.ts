import type { RootState } from '../store'

export const selectAuthState = (state: RootState) => state.auth

export const selectUser = (state: RootState) => state.auth.user

export const selectAuthToken = (state: RootState) => state.auth.token

export const selectIsAuthenticated = (state: RootState) => !!state.auth.user && !!state.auth.token

export const selectAuthLoading = (state: RootState) => state.auth.loading

export const selectAuthError = (state: RootState) => state.auth.error
