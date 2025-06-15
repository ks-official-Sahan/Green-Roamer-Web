"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useDeveloperStore } from "@/store/developer-store"
import { useToast } from "@/components/ui/use-toast"
import { Settings, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

export function MaintenanceControls() {
  const { maintenanceMode, pageMaintenanceMode, toggleMaintenanceMode, togglePageMaintenance } = useDeveloperStore()

  const { toast } = useToast()

  // Safety checks to prevent errors
  if (!maintenanceMode || !pageMaintenanceMode) {
    return (
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-orange-400" />
            Maintenance Controls
          </CardTitle>
          <CardDescription>Loading maintenance controls...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-white/5 rounded-lg"></div>
            <div className="h-8 bg-white/5 rounded-lg"></div>
            <div className="h-8 bg-white/5 rounded-lg"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleGlobalToggle = (checked: boolean) => {
    try {
      toggleMaintenanceMode()
      toast({
        title: checked ? "Maintenance Mode Enabled" : "Maintenance Mode Disabled",
        description: checked
          ? "Site is now in maintenance mode for all users."
          : "Site is now accessible to all users.",
        variant: checked ? "destructive" : "default",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to toggle maintenance mode",
        variant: "destructive",
      })
    }
  }

  const handlePageToggle = (pageId: string, checked: boolean) => {
    if (maintenanceMode.global) {
      toast({
        title: "Global Maintenance Active",
        description: "Disable global maintenance mode first to control individual pages.",
        variant: "destructive",
      })
      return
    }

    try {
      togglePageMaintenance(pageId)
      toast({
        title: checked ? "Page Maintenance Enabled" : "Page Maintenance Disabled",
        description: `${pageId} is now ${checked ? "under maintenance" : "accessible"}.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to toggle maintenance for ${pageId}`,
        variant: "destructive",
      })
    }
  }

  const pages = [
    { id: "donate", label: "Donate", emoji: "💝" },
    { id: "shorts", label: "Shorts", emoji: "🎬" },
    { id: "videos", label: "Videos", emoji: "📹" },
    { id: "explore", label: "Explore", emoji: "🔍" },
    { id: "contact", label: "Contact", emoji: "📧" },
    { id: "support", label: "Support", emoji: "🆘" },
  ]

  const activeMaintenanceCount = Object.values(pageMaintenanceMode || {}).filter(Boolean).length

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-orange-400" />
          Maintenance Controls
        </CardTitle>
        <CardDescription>Manage site and page-level maintenance modes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Global Maintenance */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              <span className="font-medium">Global Maintenance</span>
            </div>
            <Switch checked={maintenanceMode?.global || false} onCheckedChange={handleGlobalToggle} />
          </div>
          <p className="text-sm text-muted-foreground">Enable maintenance mode for the entire site</p>
        </div>

        {maintenanceMode?.global && (
          <Alert className="border-orange-500/30 bg-orange-500/10">
            <AlertTriangle className="h-4 w-4 text-orange-400" />
            <AlertDescription className="text-orange-400">
              Global maintenance mode is active. All pages will show maintenance message.
            </AlertDescription>
          </Alert>
        )}

        {/* Page-level Maintenance */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Page-level Maintenance</h4>
            <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/50">
              {activeMaintenanceCount} Active
            </Badge>
          </div>

          {pages.map((page, index) => {
            const isInMaintenance = pageMaintenanceMode?.[page.id] || false
            const isDisabled = maintenanceMode?.global || false

            return (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  isDisabled
                    ? "bg-gray-500/10 border-gray-500/20 opacity-50"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{page.emoji}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{page.label}</span>
                    {isInMaintenance ? (
                      <XCircle className="w-4 h-4 text-red-400" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                </div>
                <Switch
                  checked={isInMaintenance}
                  onCheckedChange={(checked) => handlePageToggle(page.id, checked)}
                  disabled={isDisabled}
                />
              </motion.div>
            )
          })}
        </div>

        {!maintenanceMode?.global && activeMaintenanceCount > 0 && (
          <Alert className="border-yellow-500/30 bg-yellow-500/10">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-yellow-400">
              {activeMaintenanceCount} page{activeMaintenanceCount > 1 ? "s are" : " is"} currently under maintenance.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
