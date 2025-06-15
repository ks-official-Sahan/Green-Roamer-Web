"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, userRole } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login")
      return
    }

    // Redirect to admin if trying to access developer page without developer role
    if (isAuthenticated && pathname.includes("/admin/developer") && userRole !== "developer") {
      router.push("/admin")
      return
    }
  }, [isAuthenticated, userRole, pathname, router])

  return <>{children}</>
}
