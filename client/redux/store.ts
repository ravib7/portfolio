import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/auth.api";
import { adminApi } from "./apis/admin.api";
import authSlice from "./slice/auth.slice"
import { useSelector } from "react-redux";
import { publicApi } from "./apis/public.api";


const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [publicApi.reducerPath]: publicApi.reducer,
        auth: authSlice
    },
    devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production",
    middleware: def => def().concat(authApi.middleware, adminApi.middleware, publicApi.middleware)
})
type RootType = ReturnType<typeof reduxStore.getState>
export const useAppSelector = useSelector.withTypes<RootType>()

export default reduxStore