"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { greenRoamerData } from "@/data/green-roamer-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Save, History, RefreshCw } from "lucide-react"

export function AdminContentManager() {
  const [channelInfo, setChannelInfo] = useState({ ...greenRoamerData.channelInfo })
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Changes saved",
        description: "Your changes have been saved successfully.",
      })
      setIsSaving(false)
    }, 1500)
  }

  const handleRevert = () => {
    setChannelInfo({ ...greenRoamerData.channelInfo })
    toast({
      title: "Changes reverted",
      description: "All changes have been reverted to the original data.",
    })
  }

  // Animation variants
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
    show: { opacity: 1, y: 0 },
  }

  // Scroll animation refs
  const generalRef = useRef(null)
  const statsRef = useRef(null)
  const seoRef = useRef(null)
  const snapshotsRef = useRef(null)

  const generalInView = useInView(generalRef, { once: true, margin: "-100px" })
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })
  const seoInView = useInView(seoRef, { once: true, margin: "-100px" })
  const snapshotsInView = useInView(snapshotsRef, { once: true, margin: "-100px" })

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Site Content Manager</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRevert}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Revert Changes
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="snapshots">Snapshots</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <motion.div
            ref={generalRef}
            variants={container}
            initial="hidden"
            animate={generalInView ? "show" : "hidden"}
            className="grid gap-6 md:grid-cols-2"
          >
            <motion.div variants={item}>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Channel Information</CardTitle>
                  <CardDescription>Basic information about your channel</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Channel Title</Label>
                    <Input
                      id="title"
                      value={channelInfo.title}
                      onChange={(e) => setChannelInfo({ ...channelInfo, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="handle">Channel Handle</Label>
                    <Input
                      id="handle"
                      value={channelInfo.handle}
                      onChange={(e) => setChannelInfo({ ...channelInfo, handle: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Input
                      id="region"
                      value={channelInfo.region}
                      onChange={(e) => setChannelInfo({ ...channelInfo, region: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Channel Description</CardTitle>
                  <CardDescription>Edit your channel description</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    className="min-h-[200px]"
                    value={channelInfo.description}
                    onChange={(e) => setChannelInfo({ ...channelInfo, description: e.target.value })}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Profile Image</CardTitle>
                  <CardDescription>Update your profile image</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 overflow-hidden rounded-full border">
                      <img
                        src={channelInfo.profileImage || "/placeholder.svg"}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="profileImage">Image URL</Label>
                      <Input
                        id="profileImage"
                        value={channelInfo.profileImage}
                        onChange={(e) => setChannelInfo({ ...channelInfo, profileImage: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Upload New Image
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Creation Date</CardTitle>
                  <CardDescription>Channel creation information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="creationDate">Creation Date</Label>
                    <Input
                      id="creationDate"
                      type="datetime-local"
                      value={channelInfo.creationDate.slice(0, 16)}
                      onChange={(e) =>
                        setChannelInfo({ ...channelInfo, creationDate: new Date(e.target.value).toISOString() })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="stats">
          <motion.div
            ref={statsRef}
            variants={container}
            initial="hidden"
            animate={statsInView ? "show" : "hidden"}
            className="grid gap-6 md:grid-cols-2"
          >
            <motion.div variants={item}>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Channel Statistics</CardTitle>
                  <CardDescription>Update your channel statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="viewCount">Total Views</Label>
                    <Input
                      id="viewCount"
                      value={channelInfo.stats.viewCount}
                      onChange={(e) =>
                        setChannelInfo({
                          ...channelInfo,
                          stats: { ...channelInfo.stats, viewCount: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subscriberCount">Subscribers</Label>
                    <Input
                      id="subscriberCount"
                      value={channelInfo.stats.subscriberCount}
                      onChange={(e) =>
                        setChannelInfo({
                          ...channelInfo,
                          stats: { ...channelInfo.stats, subscriberCount: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="videoCount">Video Count</Label>
                    <Input
                      id="videoCount"
                      value={channelInfo.stats.videoCount}
                      onChange={(e) =>
                        setChannelInfo({
                          ...channelInfo,
                          stats: { ...channelInfo.stats, videoCount: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hiddenSubscriberCount"
                      checked={channelInfo.stats.hiddenSubscriberCount}
                      onChange={(e) =>
                        setChannelInfo({
                          ...channelInfo,
                          stats: { ...channelInfo.stats, hiddenSubscriberCount: e.target.checked },
                        })
                      }
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="hiddenSubscriberCount">Hide Subscriber Count</Label>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Content Analytics</CardTitle>
                  <CardDescription>Content performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Total Videos</Label>
                    <div className="text-2xl font-bold">{greenRoamerData.insights.totalVideos}</div>
                    <div className="text-sm text-muted-foreground">
                      {greenRoamerData.insights.longVideosCount} long videos, {greenRoamerData.insights.shortsCount}{" "}
                      shorts
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Average Video Length</Label>
                    <div className="text-2xl font-bold">
                      {Math.floor(greenRoamerData.insights.averageLengthSeconds / 60)}:
                      {(greenRoamerData.insights.averageLengthSeconds % 60).toString().padStart(2, "0")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {greenRoamerData.insights.averageLengthSeconds} seconds
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item} className="md:col-span-2">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Most Viewed Videos</CardTitle>
                  <CardDescription>Your top performing content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {greenRoamerData.insights.mostViewedVideos.map((video, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex-1">
                          <div className="font-medium">{video.title}</div>
                          <div className="text-sm text-muted-foreground">{video.views} views</div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={video.url} target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="seo">
          <motion.div
            ref={seoRef}
            variants={container}
            initial="hidden"
            animate={seoInView ? "show" : "hidden"}
            className="grid gap-6 md:grid-cols-2"
          >
            <motion.div variants={item} className="md:col-span-2">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>Optimize your site for search engines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      value={greenRoamerData.channelInfo.title}
                      onChange={(e) => setChannelInfo({ ...channelInfo, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      value={greenRoamerData.channelInfo.description.split("\n")[0]}
                      onChange={(e) => {
                        const descLines = channelInfo.description.split("\n")
                        descLines[0] = e.target.value
                        setChannelInfo({ ...channelInfo, description: descLines.join("\n") })
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input id="keywords" placeholder="travel, hiking, Sri Lanka, Europe, nature, adventure" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Open Graph</CardTitle>
                  <CardDescription>Social media sharing settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ogTitle">OG Title</Label>
                    <Input id="ogTitle" placeholder="Green Roamer - Travel & Adventure" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ogDescription">OG Description</Label>
                    <Textarea
                      id="ogDescription"
                      placeholder="Unveiling the Natural Beauty of Europe and Sri Lanka through Hiking and traveling"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ogImage">OG Image URL</Label>
                    <Input id="ogImage" placeholder="https://example.com/og-image.jpg" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Twitter Card</CardTitle>
                  <CardDescription>Twitter sharing settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="twitterCard">Card Type</Label>
                    <Select defaultValue="summary_large_image">
                      <SelectTrigger id="twitterCard">
                        <SelectValue placeholder="Select card type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summary">Summary</SelectItem>
                        <SelectItem value="summary_large_image">Summary with Large Image</SelectItem>
                        <SelectItem value="app">App</SelectItem>
                        <SelectItem value="player">Player</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitterTitle">Twitter Title</Label>
                    <Input id="twitterTitle" placeholder="Green Roamer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitterDescription">Twitter Description</Label>
                    <Textarea
                      id="twitterDescription"
                      placeholder="Explore breathtaking landscapes through travel adventures"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="snapshots">
          <motion.div
            ref={snapshotsRef}
            variants={container}
            initial="hidden"
            animate={snapshotsInView ? "show" : "hidden"}
            className="grid gap-6 md:grid-cols-2"
          >
            <motion.div variants={item} className="md:col-span-2">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Configuration Snapshots</CardTitle>
                  <CardDescription>Restore previous versions of your site configuration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: "snap-001", date: "2024-06-13T12:30:00Z", description: "Pre-summer update" },
                      { id: "snap-002", date: "2024-05-20T09:15:00Z", description: "Spring content refresh" },
                      { id: "snap-003", date: "2024-04-05T16:45:00Z", description: "Major redesign" },
                      { id: "snap-004", date: "2024-03-12T11:20:00Z", description: "Initial setup" },
                    ].map((snapshot) => (
                      <div key={snapshot.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex-1">
                          <div className="font-medium">{snapshot.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(snapshot.date).toLocaleString()} • ID: {snapshot.id}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <History className="mr-2 h-4 w-4" />
                            Restore
                          </Button>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Create New Snapshot
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
