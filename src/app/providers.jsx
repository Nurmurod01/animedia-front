"use client"

import { useEffect, useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Poppins } from "next/font/google"

// Poppins shriftini sozlash
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // kerakli vaznlar
  variable: "--font-poppins", // css o‘zgaruvchisi nomi
})

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }
  return (
    <ThemeProvider attribute="class">
      <div className={poppins.className}>{children}</div>
    </ThemeProvider>
  )
}

