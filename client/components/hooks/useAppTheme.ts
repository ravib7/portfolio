"use client";

import { useTheme } from "next-themes";
import { darkTheme, lightTheme } from "../theme/theme.config";


export const useAppTheme = () => {
    const { theme } = useTheme();

    const isDark = theme === "dark";

    return {
        isDark,
        mode: isDark ? "dark" : "light",
        theme: isDark ? darkTheme : lightTheme,
    };
};