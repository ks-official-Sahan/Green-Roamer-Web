"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDeveloperStore } from "@/store/developer-store"
import { useToast } from "@/components/ui/use-toast"
import { Terminal, Trash2, Filter, Info, AlertTriangle, XCircle, CheckCircle, Clock } from "lucide-react"

export function SystemLogs() {
  const { logs, addLog, clearLogs } = useDeveloperStore()
  const { toast } = useToast()
  const [filter, setFilter] = useState<string>("all")

  // Safety check
  if (!logs) {
    return (
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-purple-400" />
            System Logs
          </CardTitle>
          <CardDescription>Loading system logs...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-white/5 rounded-lg"></div>
            <div className="h-32 bg-white/5 rounded-lg"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const filteredLogs = logs.filter((log) => filter === "all" || log.type === filter)

  const getLogIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="w-3 h-3" />
      case "warn":
        return <AlertTriangle className="w-3 h-3" />
      case "error":
        return <XCircle className="w-3 h-3" />
      case "success":
        return <CheckCircle className="w-3 h-3" />
      default:
        return <Info className="w-3 h-3" />
    }
  }

  const getLogColor = (type: string) => {
    switch (type) {
      case "info":
        return "text-blue-400 bg-blue-500/20 border-blue-500/50"
      case "warn":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/50"
      case "error":
        return "text-red-400 bg-red-500/20 border-red-500/50"
      case "success":
        return "text-green-400 bg-green-500/20 border-green-500/50"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/50"
    }
  }

  const handleClearLogs = () => {
    try {
      clearLogs()
      toast({
        title: "Logs Cleared",
        description: "All system logs have been cleared",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear logs",
        variant: "destructive",
      })
    }
  }

  const generateTestLog = () => {
    const types = ["info", "warn", "error", "success"] as const
    const messages = [
      "Database connection established",
      "High memory usage detected",
      "API request failed",
      "Backup completed successfully",
      "User authentication successful",
      "Cache invalidated",
      "File upload completed",
      "System maintenance scheduled",
    ]

    const randomType = types[Math.floor(Math.random() * types.length)]
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]

    try {
      addLog(randomType, randomMessage)
      toast({
        title: "Test Log Added",
        description: `Added ${randomType} log entry`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add test log",
        variant: "destructive",
      })
    }
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
              <Terminal className="w-5 h-5 text-purple-400" />
              System Logs
            </CardTitle>
            <CardDescription>Monitor system events and activities</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-32 h-8">
                <Filter className="w-3 h-3 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warn">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Log Stats */}
        <div className="grid grid-cols-4 gap-2">
          {["info", "warn", "error", "success"].map((type) => {
            const count = logs.filter((log) => log.type === type).length
            return (
              <div key={type} className="text-center p-2 rounded-lg bg-white/5">
                <div className={`text-sm font-medium ${getLogColor(type).split(" ")[0]}`}>{count}</div>
                <div className="text-xs text-muted-foreground capitalize">{type}</div>
              </div>
            )
          })}
        </div>

        {/* Logs List */}
        <ScrollArea className="h-48">
          <div className="space-y-2">
            <AnimatePresence>
              {filteredLogs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.02 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  <Badge variant="outline" className={`shrink-0 ${getLogColor(log.type)}`}>
                    {getLogIcon(log.type)}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm break-words">{log.message}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {formatTime(log.timestamp)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredLogs.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Terminal className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No logs found</p>
                <p className="text-sm">{filter === "all" ? "No system logs available" : `No ${filter} logs found`}</p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={generateTestLog}
            className="text-blue-400 hover:bg-blue-400/10 border-blue-500/30"
          >
            <Terminal className="w-4 h-4 mr-2" />
            Add Test Log
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearLogs}
            disabled={logs.length === 0}
            className="text-red-400 hover:bg-red-400/10 border-red-500/30"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
