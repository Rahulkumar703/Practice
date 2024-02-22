"use client"

import { ThemeProvider } from "@/components/Providers/ThemeProvider"
import { SessionProvider } from "next-auth/react"


export default function Providers({ children, ...props }) {
    return (
        <SessionProvider >

            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </SessionProvider>
    )
}
