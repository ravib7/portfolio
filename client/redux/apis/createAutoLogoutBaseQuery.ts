import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { toast } from "sonner";

export const createAutoLogoutBaseQuery = ({ baseUrl, redirectPath }: { baseUrl: string; redirectPath: string }) => {
    const baseQuery = fetchBaseQuery({ baseUrl, credentials: "include" })

    //                  👇 TypeScript, don’t check this. It can be anything.
    return async (args: any, api: any, extraOptions: any) => {
        const result = await baseQuery(args, api, extraOptions)

        if (result.error?.status === 401) {
            toast.error(
                (result.error.data as any)?.message || "Session expired. Please login again."
            )

            if (typeof window !== "undefined") {
                localStorage.removeItem("ADMIN")
                setTimeout(() => window.location.replace(redirectPath), 4000)
            }
        }

        return result
    }
}