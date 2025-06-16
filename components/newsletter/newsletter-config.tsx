"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, RotateCcw, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface NewsletterStats {
  totalShown: number
  totalSubscriptions: number
  totalDismissals: number
  conversionRate: number
  lastShown: string | null
  currentVariant: string
}

export function NewsletterConfig() {
  const [stats, setStats] = useState<NewsletterStats>({
    totalShown: 0,
    totalSubscriptions: 0,
    totalDismissals: 0,
    conversionRate: 0,
    lastShown: null,
    currentVariant: "standard",
  })
  const [isTestMode, setIsTestMode] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = () => {
    if (typeof window === "undefined") return

    try {
      const lastShown = localStorage.getItem("newsletter-modal-last-shown")
      const status = localStorage.getItem("newsletter-modal-status")
      const variant = localStorage.getItem("newsletter-modal-variant") || "standard"
      const dismissals = parseInt(localStorage.getItem("newsletter-modal-dismissals") || "0", 10)

      const totalShown = dismissals + (status === "subscribed" ? 1 : 0)
      const totalSubscriptions = status === "subscribed" ? 1 : 0
      const conversionRate = totalShown > 0 ? (totalSubscriptions / totalShown) * 100 : 0

      setStats({
        totalShown,
        totalSubscriptions,
        totalDismissals: dismissals,
        conversionRate,
        lastShown: lastShown ? new Date(Number.parseInt(lastShown)).toLocaleString() : null,
        currentVariant: variant,
      })
    } catch (error) {
      console.error("Error loading newsletter stats:", error)
    }
  }

  const resetModalState = () => {
    if (typeof window === "undefined") return

    try {
      localStorage.removeItem("newsletter-modal-last-shown")
      localStorage.removeItem("newsletter-modal-status")
      localStorage.removeItem("newsletter-modal-variant")
      localStorage.removeItem("newsletter-modal-dismissals")
      sessionStorage.removeItem("newsletter-modal-session-shown")

      loadStats()

      toast({
        title: "Modal State Reset",
        description: "Newsletter modal state has been cleared. It will show again based on the configured rules.",
      })
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: "There was an error resetting the modal state.",
        variant: "destructive",
      })
    }
  }

  const forceShowModal = () => {
    if (typeof window === "undefined") return

    try {
      sessionStorage.removeItem("newsletter-modal-session-shown")
      localStorage.removeItem("newsletter-modal-last-shown")

      toast({
        title: "Modal Triggered",
        description: "The newsletter modal will appear on the next page interaction.",
      })

      window.location.reload()
    } catch (error) {
      toast({
        title: "Trigger Failed",
        description: "There was an error triggering the modal.",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = () => {
    if (typeof window === "undefined") return null

    const status = localStorage.getItem("newsletter-modal-status")
    switch (status) {
      case "subscribed":
        return (
          <Badge variant="default" className="bg-green-500">
            Subscribed
          </Badge>
        )
      case "permanently_dismissed":
        return <Badge variant="destructive">Permanently Dismissed</Badge>
      default:
        return <Badge variant="secondary">Active</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Newsletter Modal Configuration
          </CardTitle>
          <CardDescription>Manage and monitor the newsletter subscription modal behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Current Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{stats.totalShown}</div>
                <div className="text-sm text-muted-foreground">Times Shown</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{stats.totalSubscriptions}</div>
                <div className="text-sm text-muted-foreground">Subscriptions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{stats.totalDismissals}</div>
                <div className="text-sm text-muted-foreground">Dismissals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{stats.conversionRate.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Conversion Rate</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Modal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Modal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Current Status</Label>
                <div>{getStatusBadge()}</div>
              </div>
              <div className="space-y-2">
                <Label>Last Shown</Label>
                <div className="text-sm text-muted-foreground">{stats.lastShown || "Never"}</div>
              </div>
              <div className="space-y-2">
                <Label>Current Variant</Label>
                <div className="text-sm font-medium capitalize">{stats.currentVariant}</div>
              </div>
              <div className="space-y-2">
                <Label>Test Mode</Label>
                <div className="flex items-center space-x-2">
                  <Switch checked={isTestMode} onCheckedChange={setIsTestMode} />
                  <span className="text-sm text-muted-foreground">{isTestMode ? "Enabled" : "Disabled"}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Configuration Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Display Interval</Label>
                <div className="text-sm text-muted-foreground">10 days between displays</div>
              </div>
              <div className="space-y-2">
                <Label>Session Delay</Label>
                <div className="text-sm text-muted-foreground">25s for new visitors, 45s for returning</div>
              </div>
              <div className="space-y-2">
                <Label>Scroll Threshold</Label>
                <div className="text-sm text-muted-foreground">75% page scroll depth</div>
              </div>
              <div className="space-y-2">
                <Label>Max Dismissals</Label>
                <div className="text-sm text-muted-foreground">3 dismissals before permanent hide</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Button onClick={resetModalState} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Modal State
              </Button>
              <Button onClick={forceShowModal} variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Force Show Modal
              </Button>
              <Button onClick={loadStats} variant="outline">
                Refresh Stats
              </Button>
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Usage Instructions</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Frequency Control:</strong> Modal shows maximum once every 10 days per user</p>
              <p><strong>Session Limit:</strong> Only shows once per browser session</p>
              <p><strong>Engagement-Based:</strong> Requires user engagement (scroll, time, interactions) before showing</p>
              <p><strong>Smart Dismissal:</strong> After 3 dismissals, modal is permanently hidden</p>
              <p><strong>A/B Testing:</strong> Three variants available: Standard, Premium, Minimal</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
