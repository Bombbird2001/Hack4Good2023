import { configureStore, combineReducers } from '@reduxjs/toolkit'
import sessionReducer from './slices/sessionSlice'
import { persistStore, persistReducer,
    FLUSH, REHYDRATE, PAUSE,
    PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'

// Main reducer object made by combining multiple slice reducers
const mainReducer = combineReducers({
    session: sessionReducer
})

// Persistent reducer configuration
const persistConfig = {
    key: 'nsx-portal',
    storage
}

// Persistent reducer made by persisting the main reducer object
const persistedReducer = persistReducer(persistConfig, mainReducer)

// Main redux store with the persistent reducer, ignoring serialization checks for certain actions to prevent errors
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    })
})

// Persistor object
export const persistor = persistStore(store)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch