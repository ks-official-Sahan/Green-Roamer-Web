"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { ContentManager } from "@/components/admin/content-manager"
import { FeedbackPanel } from "@/components/admin/feedback-panel"
import { UserManagement } from "@/components/admin/user-management"
import { AnalyticsSummary } from "@/components/admin/analytics-summary"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Shield, Code2, Settings, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const { isAuthenticated, user, canAccessAdmin } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
      return
    }

    if (!canAccessAdmin()) {
      router.push("/unauthorized")
      return
    }
  }, [isAuthenticated, canAccessAdmin, router])

  // Show access denied for unauthorized users
  if (!isAuthenticated || !canAccessAdmin()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full">
          <Card className="glass-effect border-red-500/30">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <CardTitle className="text-red-400">Access Denied</CardTitle>
              <CardDescription>You don't have permission to access the admin panel.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">This page requires admin or developer privileges.</p>
              <Button onClick={() => router.push("/")} className="w-full">
                Return Home
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <motion.div className="max-w-7xl mx-auto space-y-8" initial="hidden" animate="show" variants={container}>
        {/* Header */}
        <motion.div variants={item} className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
              <Settings className="w-10 h-10 text-blue-400" />
              Admin Control Panel
            </h1>
            <p className="text-gray-400 mt-2">Content management and site administration</p>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="bg-blue-500/20 text-blue-400 border-blue-500/30 flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              {user?.role === "developer" ? "Developer (Admin Access)" : "Administrator"}
            </Badge>

            {/* Developer Portal Link */}
            {user?.role === "developer" && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
              >
                <Link href="/developer" className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  Developer Portal
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </Button>
            )}
          </div>
        </motion.div>

        {/* Role-specific Alert */}
        {user?.role === "developer" && (
          <motion.div variants={item}>
            <Alert className="border-purple-500/30 bg-purple-500/10">
              <Code2 className="h-4 w-4 text-purple-400" />
              <AlertTitle className="text-purple-400">Developer Access</AlertTitle>
              <AlertDescription className="text-purple-300">
                You're accessing the admin panel with developer privileges. Your primary portal is at{" "}
                <Link href="/developer" className="underline hover:text-purple-200">
                  /developer
                </Link>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {user?.role === "admin" && (
          <motion.div variants={item}>
            <Alert className="border-blue-500/30 bg-blue-500/10">
              <Shield className="h-4 w-4 text-blue-400" />
              <AlertTitle className="text-blue-400">Administrator Access</AlertTitle>
              <AlertDescription className="text-blue-300">
                Welcome to the admin control panel. Manage site content, users, and feedback.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Admin-focused Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Column - Primary Admin Tools */}
          <div className="space-y-8">
            <motion.div variants={item}>
              <ContentManager />
            </motion.div>

            <motion.div variants={item}>
              <AnalyticsSummary />
            </motion.div>
          </div>

          {/* Right Column - Management Tools */}
          <div className="space-y-8">
            <motion.div variants={item}>
              <FeedbackPanel />
            </motion.div>

            {/* User Management - Only for developers */}
            {user?.role === "developer" && (
              <motion.div variants={item}>
                <UserManagement />
              </motion.div>
            )}

            {/* Admin-specific tools placeholder */}
            {user?.role === "admin" && (
              <motion.div variants={item}>
                <Card className="glass-effect border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-blue-400 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Admin Tools
                    </CardTitle>
                    <CardDescription>Additional administrative functions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start" disabled>
                        <Settings className="w-4 h-4 mr-2" />
                        Site Configuration
                      </Button>
                      <Button variant="outline" className="w-full justify-start" disabled>
                        <Shield className="w-4 h-4 mr-2" />
                        Security Settings
                      </Button>
                      <Button variant="outline" className="w-full justify-start" disabled>
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Backup Management
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">Additional admin tools coming soon</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
