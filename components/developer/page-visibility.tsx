"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useDeveloperStore } from "@/store/developer-store"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, Globe } from "lucide-react"

export function PageVisibility() {
  const { pageVisibility, togglePageVisibility } = useDeveloperStore()
  const { toast } = useToast()

  const handleToggle = (pageId: string, checked: boolean) => {
    togglePageVisibility(pageId)
    toast({
      title: checked ? "Page Hidden" : "Page Visible",
      description: `${pageId} is now ${checked ? "hidden from" : "visible in"} navigation.`,
    })
  }

  const pages = [
    { id: "home", label: "Home", emoji: "🏠", path: "/" },
    { id: "about", label: "About", emoji: "ℹ️", path: "/about" },
    { id: "destinations", label: "Destinations", emoji: "🌍", path: "/destinations" },
    { id: "videos", label: "Videos", emoji: "📹", path: "/videos" },
    { id: "shorts", label: "Shorts", emoji: "🎬", path: "/shorts" },
    { id: "explore", label: "Explore", emoji: "🔍", path: "/explore" },
    { id: "contact", label: "Contact", emoji: "📧", path: "/contact" },
    { id: "donate", label: "Donate", emoji: "💝", path: "/donate" },
    { id: "support", label: "Support", emoji: "🆘", path: "/support" },
    { id: "feedback", label: "Feedback", emoji: "💬", path: "/feedback" },
  ]

  const visibleCount = pages.filter((page) => pageVisibility[page.id] !== false).length
  const hiddenCount = pages.length - visibleCount

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-400" />
          Page Visibility
        </CardTitle>
        <CardDescription>Control which pages are visible in navigation</CardDescription>
        <div className="flex gap-2 mt-2">
          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50">
            <Eye className="w-3 h-3 mr-1" />
            {visibleCount} Visible
          </Badge>
          <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/50">
            <EyeOff className="w-3 h-3 mr-1" />
            {hiddenCount} Hidden
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {pages.map((page, index) => {
            const isVisible = pageVisibility[page.id] !== false
            return (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{page.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{page.label}</span>
                      <code className="text-xs text-muted-foreground bg-black/20 px-1 rounded">{page.path}</code>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isVisible ? <Eye className="w-4 h-4 text-green-400" /> : <EyeOff className="w-4 h-4 text-red-400" />}
                  <Switch checked={isVisible} onCheckedChange={(checked) => handleToggle(page.id, !checked)} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
