import { APP_URL } from "@/constants/config"
import { LOGIN_RESPONSE, OTP } from "@/types/user"
import { createApi } from "@reduxjs/toolkit/query/react"
import { removeStorage, setStorage } from "../utils/authStorage"
import { createAutoLogoutBaseQuery } from "./createAutoLogoutBaseQuery"

export const authApi = createApi({
    reducerPath: "authApi",
    // baseQuery: fetchBaseQuery({ baseUrl: `${APP_URL}/api/auth`, credentials: "include" }),
    baseQuery: createAutoLogoutBaseQuery({
        baseUrl: `${APP_URL}/api/auth`,
        redirectPath: "/login"
    }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
            sendOTP: builder.mutation<void, void>({
                query: () => {
                    return {
                        url: "/send-otp",
                        method: "POST",
                    }
                },
                invalidatesTags: ["auth"]
            }),

            verifyOTP: builder.mutation<LOGIN_RESPONSE, OTP>({
                query: userData => {
                    return {
                        url: "/verify-otp",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: (data: LOGIN_RESPONSE) => {
                    setStorage(data)
                    return data
                },
                invalidatesTags: ["auth"]
            }),

            signOut: builder.mutation<void, void>({
                query: () => {
                    return {
                        url: "/signout",
                        method: "POST",
                    }
                },
                transformResponse: () => {
                    removeStorage()
                },
                invalidatesTags: ["auth"]
            }),
        }
    }
})

export const {
    useSendOTPMutation,
    useVerifyOTPMutation,
    useSignOutMutation
} = authApi
