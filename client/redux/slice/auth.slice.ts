import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../apis/auth.api";
import { getStorage } from "../utils/authStorage";

type authType = {
    admin: {
        name: string
    } | null
}

const initialState: authType = {
    admin: getStorage()
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {},

    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.verifyOTP.matchFulfilled, (state, { payload }) => {
            state.admin = payload.result
        })
        .addMatcher(authApi.endpoints.signOut.matchFulfilled, (state, { payload }) => {
            state.admin = null
        })
})

// export const { invalidate } = authSlice.actions
export default authSlice.reducer