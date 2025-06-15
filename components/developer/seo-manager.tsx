"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useDeveloperStore } from "@/store/developer-store"
import { useToast } from "@/components/ui/use-toast"
import { Search, Save, Eye, Globe } from "lucide-react"

export function SEOManager() {
  const { seoData, updateSEOData } = useDeveloperStore()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("/")

  const routes = [
    { path: "/", label: "Home", emoji: "🏠" },
    { path: "/about", label: "About", emoji: "ℹ️" },
    { path: "/destinations", label: "Destinations", emoji: "🌍" },
    { path: "/videos", label: "Videos", emoji: "📹" },
    { path: "/shorts", label: "Shorts", emoji: "🎬" },
    { path: "/explore", label: "Explore", emoji: "🔍" },
    { path: "/contact", label: "Contact", emoji: "📧" },
    { path: "/donate", label: "Donate", emoji: "💝" },
  ]

  const handleSave = (path: string) => {
    toast({
      title: "SEO Data Saved",
      description: `SEO metadata for ${path} has been updated successfully.`,
    })
  }

  const handleInputChange = (path: string, field: string, value: string) => {
    updateSEOData(path, { [field]: value })
  }

  const getCharacterCount = (text: string, max: number) => {
    const count = text.length
    const isOverLimit = count > max
    return {
      count,
      isOverLimit,
      color: isOverLimit ? "text-red-400" : count > max * 0.8 ? "text-yellow-400" : "text-green-400",
    }
  }

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5 text-purple-400" />
          SEO Meta Manager
        </CardTitle>
        <CardDescription>Manage SEO metadata for all pages</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-1 bg-white/5 p-1">
            {routes.map((route) => (
              <TabsTrigger
                key={route.path}
                value={route.path}
                className="text-xs data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
              >
                <span className="mr-1">{route.emoji}</span>
                <span className="hidden sm:inline">{route.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {routes.map((route) => {
            const data = seoData[route.path] || { title: "", description: "", ogImage: "" }
            const titleCount = getCharacterCount(data.title, 60)
            const descCount = getCharacterCount(data.description, 160)

            return (
              <TabsContent key={route.path} value={route.path} className="mt-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  {/* Page Header */}
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-2xl">{route.emoji}</span>
                    <div>
                      <h3 className="font-semibold">{route.label}</h3>
                      <code className="text-sm text-muted-foreground">{route.path}</code>
                    </div>
                  </div>

                  {/* SEO Form */}
                  <div className="space-y-4">
                    {/* Title */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Page Title</label>
                        <Badge variant="outline" className={titleCount.color}>
                          {titleCount.count}/60
                        </Badge>
                      </div>
                      <Input
                        value={data.title}
                        onChange={(e) => handleInputChange(route.path, "title", e.target.value)}
                        placeholder="Enter page title..."
                        className="bg-white/5 border-white/20 focus:border-purple-400"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Meta Description</label>
                        <Badge variant="outline" className={descCount.color}>
                          {descCount.count}/160
                        </Badge>
                      </div>
                      <Textarea
                        value={data.description}
                        onChange={(e) => handleInputChange(route.path, "description", e.target.value)}
                        placeholder="Enter meta description..."
                        className="bg-white/5 border-white/20 focus:border-purple-400 min-h-[80px]"
                      />
                    </div>

                    {/* OG Image */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Open Graph Image URL</label>
                      <Input
                        value={data.ogImage}
                        onChange={(e) => handleInputChange(route.path, "ogImage", e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="bg-white/5 border-white/20 focus:border-purple-400"
                      />
                    </div>
                  </div>

                  {/* Search Preview */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium">Search Preview</span>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-green-400">greenroamer.com{route.path}</span>
                        </div>
                        <h3 className="text-blue-400 text-lg font-medium hover:underline cursor-pointer">
                          {data.title || `${route.label} - Green Roamer`}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {data.description || `Discover amazing ${route.label.toLowerCase()} content on Green Roamer.`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <Button
                    onClick={() => handleSave(route.path)}
                    className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/50"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save SEO Data
                  </Button>
                </motion.div>
              </TabsContent>
            )
          })}
        </Tabs>
      </CardContent>
    </Card>
  )
}
