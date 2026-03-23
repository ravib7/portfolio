import { LOGIN_RESPONSE } from "@/types/user";

export const setStorage = (data: LOGIN_RESPONSE) => {
    if (typeof window === "undefined") {
        return
    }

    localStorage.setItem("ADMIN", JSON.stringify(data.result))
}

export const getStorage = (): { name: string } | null => {
    if (typeof window === "undefined") {
        return null
    }

    const data = localStorage.getItem("ADMIN")
    return data ? JSON.parse(data) : null
}

export const removeStorage = () => {
    if (typeof window === "undefined") {
        return
    }

    localStorage.removeItem("ADMIN")
}