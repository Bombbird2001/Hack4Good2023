import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { RootState, AppDispatch } from '../redux/store'

export const useTypedDispatch: () => AppDispatch = useDispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector