"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Rocket, Github, Download, ExternalLink, CheckCircle, AlertCircle, Clock } from "lucide-react"

interface DeploymentStatus {
  status: "idle" | "building" | "deploying" | "success" | "failed"
  progress: number
  lastDeploy: string
  version: string
}

export function DeploymentTools() {
  const { toast } = useToast()
  const [deployment, setDeployment] = useState<DeploymentStatus>({
    status: "idle",
    progress: 0,
    lastDeploy: "2 hours ago",
    version: "v2.1.4",
  })

  const handleTriggerBuild = () => {
    setDeployment((prev) => ({ ...prev, status: "building", progress: 0 }))

    toast({
      title: "Build Started",
      description: "Triggering new build process...",
    })

    // Simulate build progress
    const interval = setInterval(() => {
      setDeployment((prev) => {
        const newProgress = prev.progress + 10
        if (newProgress >= 100) {
          clearInterval(interval)
          return { ...prev, status: "success", progress: 100, lastDeploy: "Just now" }
        }
        return { ...prev, progress: newProgress }
      })
    }, 500)
  }

  const handleViewLogs = () => {
    toast({
      title: "Opening CI/CD Logs",
      description: "Redirecting to GitHub Actions...",
    })
  }

  const handleDownloadBuild = () => {
    toast({
      title: "Download Started",
      description: "Preparing build artifacts for download...",
    })
  }

  const getStatusIcon = () => {
    switch (deployment.status) {
      case "building":
        return <Clock className="w-4 h-4 text-yellow-400 animate-spin" />
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-400" />
      default:
        return <Rocket className="w-4 h-4 text-blue-400" />
    }
  }

  const getStatusColor = () => {
    switch (deployment.status) {
      case "building":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "success":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
    }
  }

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="w-5 h-5 text-orange-400" />
          Deployment Tools
        </CardTitle>
        <CardDescription>Build and deployment management</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span className="font-medium">Current Status</span>
            </div>
            <Badge variant="outline" className={getStatusColor()}>
              {deployment.status.toUpperCase()}
            </Badge>
          </div>

          {deployment.status === "building" && (
            <div className="space-y-2">
              <Progress value={deployment.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">Building... {deployment.progress}%</p>
            </div>
          )}

          <div className="flex items-center justify-between text-sm mt-3">
            <span className="text-muted-foreground">Last Deploy:</span>
            <span className="text-blue-400">{deployment.lastDeploy}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Version:</span>
            <span className="text-green-400 font-mono">{deployment.version}</span>
          </div>
        </div>

        {/* Build Actions */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Rocket className="w-4 h-4 text-purple-400" />
            Build Actions
          </h4>

          <div className="grid grid-cols-1 gap-2">
            <Button
              onClick={handleTriggerBuild}
              disabled={deployment.status === "building"}
              className="w-full justify-start"
              variant="outline"
            >
              <Rocket className="w-4 h-4 mr-2" />
              {deployment.status === "building" ? "Building..." : "Trigger Build"}
            </Button>

            <Button
              onClick={handleViewLogs}
              variant="outline"
              className="w-full justify-start border-white/20 hover:bg-white/10"
            >
              <Github className="w-4 h-4 mr-2" />
              View CI/CD Logs
              <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>

            <Button
              onClick={handleDownloadBuild}
              variant="outline"
              className="w-full justify-start border-white/20 hover:bg-white/10"
              disabled={deployment.status !== "success"}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Build
            </Button>
          </div>
        </div>

        {/* Deployment History */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Recent Deployments</h4>
          <div className="space-y-2">
            {[
              { version: "v2.1.4", status: "success", time: "2 hours ago" },
              { version: "v2.1.3", status: "success", time: "1 day ago" },
              { version: "v2.1.2", status: "failed", time: "2 days ago" },
            ].map((deploy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10 text-xs"
              >
                <div className="flex items-center gap-2">
                  {deploy.status === "success" ? (
                    <CheckCircle className="w-3 h-3 text-green-400" />
                  ) : (
                    <AlertCircle className="w-3 h-3 text-red-400" />
                  )}
                  <span className="font-mono text-blue-400">{deploy.version}</span>
                </div>
                <span className="text-muted-foreground">{deploy.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
