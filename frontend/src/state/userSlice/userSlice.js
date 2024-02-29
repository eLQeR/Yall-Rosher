import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    loading: null,
    error: null,
    accessToken: null,
    refreshToken: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signupStart: (state) => {
            state.loading = true
            state.error = null
            state.user = null
        },
        signupSuccess: (state, action) => {
            state.loading = false
            state.error = null
            state.user = action.payload
        },
        signupFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
            state.user = null
        },
        signinStart: (state) => {
            state.loading = true
            state.error = null
        },
        signinSuccess: (state, action) => {
            console.log(action)
            state.loading = false
            state.error = null
            state.accessToken = action.payload.access
            state.refreshToken = action.payload.refresh
        },
        signinFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        refreshAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        resetError: (state) => {
            state.error = null
        },
    },
})

export const {
    signupStart,
    signupSuccess,
    signupFailure,
    signinStart,
    signinSuccess,
    signinFailure,
    refreshAccessToken,
    resetError,
} = userSlice.actions

export default userSlice.reducer
