"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAdminStore } from "@/store/admin-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Save, Eye, RotateCcw } from "lucide-react"

export function ContentManager() {
  const { siteContent, updateSiteContent } = useAdminStore()
  const [localContent, setLocalContent] = useState(siteContent)
  const [showPreview, setShowPreview] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    updateSiteContent(localContent)
    toast({
      title: "Content Updated",
      description: "Site content has been successfully updated.",
    })
  }

  const handleRevert = () => {
    setLocalContent(siteContent)
    toast({
      title: "Changes Reverted",
      description: "All unsaved changes have been reverted.",
      variant: "destructive",
    })
  }

  const hasChanges = JSON.stringify(localContent) !== JSON.stringify(siteContent)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-white/10 dark:bg-black/10 border-white/20 backdrop-blur-xl shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Site Content Manager
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Edit and manage your website content with live preview
              </CardDescription>
            </div>
            {hasChanges && (
              <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                Unsaved Changes
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Editor Panel */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Content Editor</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName" className="text-sm font-medium">
                    Site Name
                  </Label>
                  <Input
                    id="siteName"
                    value={localContent.siteName}
                    onChange={(e) => setLocalContent({ ...localContent, siteName: e.target.value })}
                    className="bg-white/5 border-white/10 focus:border-green-400/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tagline" className="text-sm font-medium">
                    Tagline
                  </Label>
                  <Input
                    id="tagline"
                    value={localContent.tagline}
                    onChange={(e) => setLocalContent({ ...localContent, tagline: e.target.value })}
                    className="bg-white/5 border-white/10 focus:border-green-400/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heroTitle" className="text-sm font-medium">
                    Hero Title
                  </Label>
                  <Input
                    id="heroTitle"
                    value={localContent.heroTitle}
                    onChange={(e) => setLocalContent({ ...localContent, heroTitle: e.target.value })}
                    className="bg-white/5 border-white/10 focus:border-green-400/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heroSubtitle" className="text-sm font-medium">
                    Hero Subtitle
                  </Label>
                  <Textarea
                    id="heroSubtitle"
                    value={localContent.heroSubtitle}
                    onChange={(e) => setLocalContent({ ...localContent, heroSubtitle: e.target.value })}
                    className="bg-white/5 border-white/10 focus:border-green-400/50 min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aboutContent" className="text-sm font-medium">
                    About Content
                  </Label>
                  <Textarea
                    id="aboutContent"
                    value={localContent.aboutContent}
                    onChange={(e) => setLocalContent({ ...localContent, aboutContent: e.target.value })}
                    className="bg-white/5 border-white/10 focus:border-green-400/50 min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="developerBlurb" className="text-sm font-medium">
                    Developer Blurb
                  </Label>
                  <Textarea
                    id="developerBlurb"
                    value={localContent.developerBlurb}
                    onChange={(e) => setLocalContent({ ...localContent, developerBlurb: e.target.value })}
                    className="bg-white/5 border-white/10 focus:border-green-400/50 min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="footerText" className="text-sm font-medium">
                    Footer Text
                  </Label>
                  <Input
                    id="footerText"
                    value={localContent.footerText}
                    onChange={(e) => setLocalContent({ ...localContent, footerText: e.target.value })}
                    className="bg-white/5 border-white/10 focus:border-green-400/50"
                  />
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Live Preview</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="bg-white/5 border-white/10 hover:bg-white/10"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? "Hide" : "Show"} Preview
                </Button>
              </div>

              {showPreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-4"
                >
                  <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-white">{localContent.siteName}</h1>
                    <p className="text-green-400">{localContent.tagline}</p>
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-white">{localContent.heroTitle}</h2>
                    <p className="text-gray-300 text-sm">{localContent.heroSubtitle}</p>
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="space-y-2">
                    <h3 className="font-medium text-white">About</h3>
                    <p className="text-gray-300 text-sm">{localContent.aboutContent}</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-white">Developer</h3>
                    <p className="text-gray-300 text-sm">{localContent.developerBlurb}</p>
                  </div>

                  <Separator className="bg-white/10" />

                  <p className="text-xs text-gray-400 text-center">{localContent.footerText}</p>
                </motion.div>
              )}
            </div>
          </div>

          <Separator className="bg-white/10" />

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleRevert}
              disabled={!hasChanges}
              className="bg-white/5 border-white/10 hover:bg-red-500/10 hover:border-red-500/30 disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Revert Changes
            </Button>

            <Button
              onClick={handleSave}
              disabled={!hasChanges}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
