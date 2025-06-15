"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { RealTimeVisitors } from "@/components/developer/real-time-visitors"
import { SnapshotManager } from "@/components/developer/snapshot-manager"
import { SEOManager } from "@/components/developer/seo-manager"
import { MaintenanceControls } from "@/components/developer/maintenance-controls"
import { PageVisibility } from "@/components/developer/page-visibility"
import { SystemLogs } from "@/components/developer/system-logs"
import { EnvViewer } from "@/components/developer/env-viewer"
import { APIControls } from "@/components/developer/api-controls"
import { DeploymentTools } from "@/components/developer/deployment-tools"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, Shield, AlertTriangle, Settings, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function DeveloperPage() {
  const { isAuthenticated, user, canAccessDeveloper } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
      return
    }

    if (!canAccessDeveloper()) {
      router.push("/unauthorized")
      return
    }
  }, [isAuthenticated, canAccessDeveloper, router])

  // Show access denied for non-developers
  if (!isAuthenticated || !canAccessDeveloper()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full">
          <Card className="glass-effect border-red-500/30">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <CardTitle className="text-red-400">Access Denied</CardTitle>
              <CardDescription>You don't have permission to access the developer portal.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                This page is restricted to users with developer privileges only.
              </p>
              <div className="space-y-2">
                <Button onClick={() => router.push("/")} className="w-full">
                  Return Home
                </Button>
                {user?.role === "admin" && (
                  <Button variant="outline" onClick={() => router.push("/admin")} className="w-full">
                    Go to Admin Panel
                  </Button>
                )}
              </div>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-3">
                <Code className="w-10 h-10 text-purple-400" />
                Developer Portal
              </h1>
              <p className="text-muted-foreground mt-2">Advanced development tools and system controls</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/50">
                <Code className="w-3 h-3 mr-1" />
                Developer Access
              </Badge>
              <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50">
                System Online
              </Badge>

              {/* Admin Panel Link */}
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              >
                <Link href="/admin" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Admin Panel
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="glass-effect border-purple-500/30 bg-purple-500/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-purple-400">
                  <Code className="w-4 h-4" />
                  <span className="text-sm font-medium">Welcome to your Developer Portal, {user?.username}</span>
                </div>
                <Link href="/admin" className="text-xs text-blue-400 hover:text-blue-300 underline">
                  Need Admin Tools? →
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="glass-effect border-yellow-500/30 bg-yellow-500/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-yellow-400">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Developer Environment - Changes affect live production system
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Developer Tools Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial="hidden"
          animate="show"
          variants={container}
        >
          {/* Real-time Visitors */}
          <motion.div variants={item}>
            <RealTimeVisitors />
          </motion.div>

          {/* Snapshot Manager */}
          <motion.div variants={item}>
            <SnapshotManager />
          </motion.div>

          {/* SEO Manager */}
          <motion.div variants={item} className="lg:col-span-2">
            <SEOManager />
          </motion.div>

          {/* Maintenance Controls */}
          <motion.div variants={item}>
            <MaintenanceControls />
          </motion.div>

          {/* Page Visibility */}
          <motion.div variants={item}>
            <PageVisibility />
          </motion.div>

          {/* System Logs */}
          <motion.div variants={item}>
            <SystemLogs />
          </motion.div>

          {/* Environment Variables */}
          <motion.div variants={item}>
            <EnvViewer />
          </motion.div>

          {/* API Controls */}
          <motion.div variants={item}>
            <APIControls />
          </motion.div>

          {/* Deployment Tools */}
          <motion.div variants={item}>
            <DeploymentTools />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
