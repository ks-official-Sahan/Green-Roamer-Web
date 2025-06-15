"use client"

import type React from "react"
import { ErrorBoundary } from "@/components/error-boundary"
import { ThemeProvider } from "@/components/theme-provider"
import { NetworkStatusProvider } from "@/components/network-status-provider"
import { LenisProvider } from "@/components/lenis-provider"
import { Navbar } from "@/components/navigation/navbar"
import { Toaster } from "@/components/ui/sonner"
import { OfflineBanner } from "@/components/offline-banner"
import { ScrollProgress } from "@/components/scroll-progress"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <NetworkStatusProvider>
              <LenisProvider>
                <div className="relative flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1 pt-16">{children}</main>
                  <ScrollProgress />
                  <OfflineBanner />
                </div>
                <Toaster />
              </LenisProvider>
            </NetworkStatusProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
