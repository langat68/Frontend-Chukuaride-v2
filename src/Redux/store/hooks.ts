import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Typed version of useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch

// Typed version of useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
