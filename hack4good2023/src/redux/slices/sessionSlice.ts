import {createSlice} from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        loggedIn: false,
        username: "",
        displayName: "user"
    },
    reducers: {
        endSession: state => {
            state.loggedIn = false
            state.username = ""
            state.displayName = ""
        },
        endLogout: state => {
            state.loggedIn = false
            state.username = ""
            state.displayName = ""
        },
        start: (state, action) => {
            state.loggedIn = true
            state.username = action.payload.username
            state.displayName = action.payload.displayName
        },
        updateDispName: (state, action) => {
            state.displayName = action.payload.displayName
        }
    }
})

export const {endSession, endLogout, start, updateDispName} = sessionSlice.actions

export default sessionSlice.reducer