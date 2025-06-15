"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { DeveloperPortal } from "@/components/admin/developer-portal"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldAlert } from "lucide-react"

export default function DeveloperPage() {
  const { isAuthenticated, userRole } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else if (userRole !== "developer") {
      router.push("/admin")
    }
  }, [isAuthenticated, userRole, router])

  if (!isAuthenticated || userRole !== "developer") {
    return null
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  }

  return (
    <motion.div className="space-y-6" initial="hidden" animate="show" variants={container}>
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold text-gradient">Developer Portal</h1>
        <p className="text-muted-foreground">Advanced system settings and feature toggles</p>
      </motion.div>

      <motion.div variants={item}>
        <Alert className="border-amber-500/50 bg-amber-500/10">
          <ShieldAlert className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-amber-500">Developer Access</AlertTitle>
          <AlertDescription>You have full developer privileges. Be careful with system settings.</AlertDescription>
        </Alert>
      </motion.div>

      <motion.div variants={item}>
        <DeveloperPortal />
      </motion.div>
    </motion.div>
  )
}
