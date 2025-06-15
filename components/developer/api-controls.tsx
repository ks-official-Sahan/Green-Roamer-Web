"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useDeveloperStore } from "@/store/developer-store"
import { useToast } from "@/components/ui/use-toast"
import { Database, Wifi, RefreshCw, Settings, Zap, Activity } from "lucide-react"

export function APIControls() {
  const { apiStatus, toggleAPI } = useDeveloperStore()
  const { toast } = useToast()

  const handleToggle = (service: "supabase" | "websocket") => {
    toggleAPI(service)
    toast({
      title: `${service === "supabase" ? "Supabase" : "WebSocket"} ${apiStatus[service] ? "Disabled" : "Enabled"}`,
      description: `${service === "supabase" ? "Database" : "Real-time"} connection ${apiStatus[service] ? "disconnected" : "connected"}.`,
    })
  }

  const handleReconnect = (service: string) => {
    toast({
      title: "Reconnecting...",
      description: `Attempting to reconnect ${service} service.`,
    })
  }

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-400" />
          API & WebSocket Controls
        </CardTitle>
        <CardDescription>Manage external service connections</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Supabase Controls */}
        <motion.div
          className="p-4 rounded-lg bg-white/5 border border-white/10"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-green-400" />
              <div>
                <Label htmlFor="supabase-toggle" className="font-medium">
                  Supabase Database
                </Label>
                <p className="text-xs text-muted-foreground">PostgreSQL database connection</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: apiStatus.supabase ? [1, 1.2, 1] : 1,
                  opacity: apiStatus.supabase ? [1, 0.7, 1] : 0.5,
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Badge
                  variant={apiStatus.supabase ? "default" : "destructive"}
                  className={apiStatus.supabase ? "bg-green-500/20 text-green-400 border-green-500/50" : ""}
                >
                  {apiStatus.supabase ? "Connected" : "Disconnected"}
                </Badge>
              </motion.div>
              <Switch
                id="supabase-toggle"
                checked={apiStatus.supabase}
                onCheckedChange={() => handleToggle("supabase")}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-green-400" />
                <span className="text-muted-foreground">Status:</span>
                <span className={apiStatus.supabase ? "text-green-400" : "text-red-400"}>
                  {apiStatus.supabase ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-blue-400" />
                <span className="text-muted-foreground">Latency:</span>
                <span className="text-blue-400">{apiStatus.supabase ? "12ms" : "N/A"}</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleReconnect("Supabase")}
              disabled={!apiStatus.supabase}
              className="border-white/20 hover:bg-white/10"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Reconnect
            </Button>
          </div>
        </motion.div>

        <Separator className="bg-white/10" />

        {/* WebSocket Controls */}
        <motion.div
          className="p-4 rounded-lg bg-white/5 border border-white/10"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Wifi className="w-5 h-5 text-purple-400" />
              <div>
                <Label htmlFor="websocket-toggle" className="font-medium">
                  WebSocket Connection
                </Label>
                <p className="text-xs text-muted-foreground">Real-time communication channel</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: apiStatus.websocket ? [1, 1.2, 1] : 1,
                  opacity: apiStatus.websocket ? [1, 0.7, 1] : 0.5,
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Badge
                  variant={apiStatus.websocket ? "default" : "destructive"}
                  className={apiStatus.websocket ? "bg-purple-500/20 text-purple-400 border-purple-500/50" : ""}
                >
                  {apiStatus.websocket ? "Connected" : "Disconnected"}
                </Badge>
              </motion.div>
              <Switch
                id="websocket-toggle"
                checked={apiStatus.websocket}
                onCheckedChange={() => handleToggle("websocket")}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-purple-400" />
                <span className="text-muted-foreground">Status:</span>
                <span className={apiStatus.websocket ? "text-purple-400" : "text-red-400"}>
                  {apiStatus.websocket ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-blue-400" />
                <span className="text-muted-foreground">Ping:</span>
                <span className="text-blue-400">{apiStatus.websocket ? "8ms" : "N/A"}</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleReconnect("WebSocket")}
              disabled={!apiStatus.websocket}
              className="border-white/20 hover:bg-white/10"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Reconnect
            </Button>
          </div>
        </motion.div>

        {/* Connection Summary */}
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall System Status:</span>
            <Badge
              variant={apiStatus.supabase && apiStatus.websocket ? "default" : "destructive"}
              className={
                apiStatus.supabase && apiStatus.websocket
                  ? "bg-green-500/20 text-green-400 border-green-500/50"
                  : "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
              }
            >
              {apiStatus.supabase && apiStatus.websocket ? "All Systems Operational" : "Partial Outage"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
