"use client"

import { ThemeProvider } from 'next-themes'
import React from 'react'

const ModeProvider = ({ children }: { children: React.ReactNode }) => {
    return <>
        <ThemeProvider
            defaultTheme='dark'
            attribute="class"
            enableSystem={false}
            disableTransitionOnChange={true}
        >
            {children}
        </ThemeProvider>
    </>
}

export default ModeProvider