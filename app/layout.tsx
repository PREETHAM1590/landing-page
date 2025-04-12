import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/AuthContext" // Updated import path
import { CartProvider } from "@/context/CartContext" // Updated import path
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider" // Static import
import { ClientOnly } from "@/components/client-only" // Add ClientOnly import

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Shopme", // Updated title
  description: "A modern shopping experience", // Simplified description
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gradient-to-br from-purple-100 via-purple-50 to-secondary`}>
        {/* Wrap only ThemeProvider in ClientOnly */}
        <ClientOnly>
          <ThemeProvider defaultTheme="light">
            <AuthProvider>
              <CartProvider>
                <div className="flex flex-col min-h-screen">
                  <ClientOnly> {/* Explicitly wrap Header again */}
                    <Header />
                  </ClientOnly>
                  <main className="flex-1">{children}</main>
              </div>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </ClientOnly>
      </body>
    </html>
  )
}
