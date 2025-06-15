"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDeveloperStore } from "@/store/developer-store"
import { useToast } from "@/components/ui/use-toast"
import { Users, Wifi, WifiOff, Activity, Eye, Clock, MapPin } from "lucide-react"

export function RealTimeVisitors() {
  const { visitorData, toggleConnection, updateVisitorCount } = useDeveloperStore()
  const { toast } = useToast()
  const [isSimulating, setIsSimulating] = useState(false)

  // Safety check
  if (!visitorData) {
    return (
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-400" />
            Real-time Visitors
          </CardTitle>
          <CardDescription>Loading visitor data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-white/5 rounded-lg"></div>
            <div className="h-16 bg-white/5 rounded-lg"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  useEffect(() => {
    if (!visitorData.isConnected) return

    // Simulate real-time visitor count updates
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 10) - 5 // -5 to +5
      const newCount = Math.max(0, (visitorData?.count || 0) + change)
      updateVisitorCount(newCount)
    }, 5000)

    return () => clearInterval(interval)
  }, [visitorData?.isConnected, visitorData?.count, updateVisitorCount])

  const handleToggleConnection = () => {
    try {
      toggleConnection()
      toast({
        title: visitorData.isConnected ? "Disconnected" : "Connected",
        description: visitorData.isConnected ? "Real-time monitoring disabled" : "Real-time monitoring enabled",
        variant: visitorData.isConnected ? "destructive" : "default",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to toggle connection",
        variant: "destructive",
      })
    }
  }

  const simulateTrafficSpike = () => {
    if (isSimulating) return

    setIsSimulating(true)
    let count = 0
    const spike = setInterval(() => {
      const currentCount = visitorData?.count || 0
      updateVisitorCount(currentCount + Math.floor(Math.random() * 20) + 10)
      count++

      if (count >= 5) {
        clearInterval(spike)
        setIsSimulating(false)
      }
    }, 1000)

    toast({
      title: "Traffic Spike Simulated",
      description: "Simulating increased visitor activity",
    })
  }

  const formatTime = (date: Date | string) => {
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date
      if (isNaN(dateObj.getTime())) {
        return "Invalid Time"
      }
      return dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    } catch (error) {
      return "Invalid Time"
    }
  }

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-400" />
              Real-time Visitors
            </CardTitle>
            <CardDescription>Monitor live visitor activity</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`${
                visitorData.isConnected
                  ? "bg-green-500/20 text-green-400 border-green-500/50"
                  : "bg-red-500/20 text-red-400 border-red-500/50"
              }`}
            >
              {visitorData.isConnected ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
              {visitorData.isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Visitor Count */}
        <div className="text-center p-6 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
          <motion.div
            key={visitorData.count}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-bold text-green-400 mb-2"
          >
            {visitorData.count || 0}
          </motion.div>
          <p className="text-sm text-muted-foreground">Active Visitors</p>
        </div>

        {/* Current Page */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
          <MapPin className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium">Current Page:</span>
          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/50">
            {visitorData.currentPage || "/"}
          </Badge>
        </div>

        {/* Recent Activity */}
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" />
            Recent Activity
          </h4>
          <ScrollArea className="h-32">
            <div className="space-y-2">
              {visitorData.recentActivity?.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 p-2 rounded-lg bg-white/5 text-sm"
                >
                  <Eye className="w-3 h-3 text-gray-400" />
                  <span className="flex-1">{activity.page}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {formatTime(activity.timestamp)}
                  </div>
                </motion.div>
              )) || <div className="text-center py-4 text-muted-foreground text-sm">No recent activity</div>}
            </div>
          </ScrollArea>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleConnection}
            className={`flex-1 ${
              visitorData.isConnected
                ? "text-red-400 hover:bg-red-400/10 border-red-500/30"
                : "text-green-400 hover:bg-green-400/10 border-green-500/30"
            }`}
          >
            {visitorData.isConnected ? <WifiOff className="w-4 h-4 mr-2" /> : <Wifi className="w-4 h-4 mr-2" />}
            {visitorData.isConnected ? "Disconnect" : "Connect"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={simulateTrafficSpike}
            disabled={isSimulating || !visitorData.isConnected}
            className="text-orange-400 hover:bg-orange-400/10 border-orange-500/30"
          >
            {isSimulating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Activity className="w-4 h-4" />
              </motion.div>
            ) : (
              <Activity className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
