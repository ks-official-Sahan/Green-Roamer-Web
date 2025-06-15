"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { Save, Loader2, AlertTriangle, Info, CheckCircle, XCircle, RefreshCw, Terminal, Globe, Eye } from "lucide-react"

export function DeveloperPortal() {
  const [isSaving, setIsSaving] = useState(false)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [pageVisibility, setPageVisibility] = useState({
    home: true,
    about: true,
    videos: true,
    destinations: true,
    contact: true,
    donate: true,
    explore: true,
  })
  const [apiEndpoints, setApiEndpoints] = useState({
    videos: true,
    analytics: true,
    comments: true,
    users: true,
  })
  const [logs, setLogs] = useState<
    Array<{
      timestamp: string
      level: "info" | "warning" | "error" | "success"
      message: string
    }>
  >([])
  const logsEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Animation refs
  const maintenanceRef = useRef(null)
  const visibilityRef = useRef(null)
  const seoRef = useRef(null)
  const apiRef = useRef(null)
  const logsRef = useRef(null)

  const maintenanceInView = useInView(maintenanceRef, { once: true, margin: "-100px" })
  const visibilityInView = useInView(visibilityRef, { once: true, margin: "-100px" })
  const seoInView = useInView(seoRef, { once: true, margin: "-100px" })
  const apiInView = useInView(apiRef, { once: true, margin: "-100px" })
  const logsInView = useInView(logsRef, { once: true, margin: "-100px" })

  // Handle save
  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Changes saved",
        description: "Your system settings have been updated successfully.",
      })
      setIsSaving(false)
    }, 1500)
  }

  // Generate mock logs
  useEffect(() => {
    const logMessages = [
      { level: "info", message: "User session started" },
      { level: "info", message: "Content loaded successfully" },
      { level: "warning", message: "API rate limit approaching threshold" },
      { level: "error", message: "Failed to load video metadata" },
      { level: "info", message: "Database connection established" },
      { level: "success", message: "Cache refreshed successfully" },
      { level: "warning", message: "High memory usage detected" },
      { level: "info", message: "User authentication successful" },
      { level: "error", message: "Failed to connect to external API" },
      { level: "info", message: "Background task completed" },
    ]

    const initialLogs = Array.from({ length: 10 }, (_, i) => {
      const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)]
      const timestamp = new Date(Date.now() - (10 - i) * 60000).toISOString()
      return {
        timestamp,
        level: randomLog.level as "info" | "warning" | "error" | "success",
        message: randomLog.message,
      }
    })

    setLogs(initialLogs)

    // Add new logs periodically
    const interval = setInterval(() => {
      const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)]
      const newLog = {
        timestamp: new Date().toISOString(),
        level: randomLog.level as "info" | "warning" | "error" | "success",
        message: randomLog.message,
      }

      setLogs((prevLogs) => [...prevLogs, newLog])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Auto-scroll logs to bottom
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [logs])

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

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Developer Portal</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
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

      <Tabs defaultValue="maintenance" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="visibility">Visibility</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="maintenance">
          <motion.div
            ref={maintenanceRef}
            variants={container}
            initial="hidden"
            animate={maintenanceInView ? "show" : "hidden"}
            className="grid gap-6 md:grid-cols-2"
          >
            <motion.div variants={item}>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>System Maintenance Mode</CardTitle>
                  <CardDescription>Control site-wide maintenance mode</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <Switch id="maintenance-mode" checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                  </div>
                  <div className="rounded-md bg-amber-500/10 p-4">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="mt-1 h-5 w-5 text-amber-500" />
                      <div>
                        <h4 className="text-sm font-medium text-amber-500">Warning</h4>
                        <p className="text-sm text-muted-foreground">
                          Enabling maintenance mode will make the site inaccessible to all users except administrators
                          and developers.
                        </p>
                      </div>
                    </div>
                  </div>
                  {maintenanceMode && (
                    <div className="space-y-2">
                      <Label htmlFor="maintenance-message">Maintenance Message</Label>
                      <Textarea
                        id="maintenance-message"
                        placeholder="We're currently performing scheduled maintenance. Please check back soon."
                        className="min-h-[100px]"
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">Last maintenance: Never</div>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Environment Variables</CardTitle>
                  <CardDescription>View and edit environment variables</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input id="api-key" type="password" value="••••••••••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="database-url">Database URL</Label>
                    <Input id="database-url" type="password" value="••••••••••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storage-bucket">Storage Bucket</Label>
                    <Input id="storage-bucket" value="green-roamer-media" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="analytics-id">Analytics ID</Label>
                    <Input id="analytics-id" value="G-XXXXXXXXXX" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    Show All Environment Variables
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={item} className="md:col-span-2">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Performance Settings</CardTitle>
                  <CardDescription>Configure system performance parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="cache-ttl">Cache TTL (seconds)</Label>
                      <Input id="cache-ttl" type="number" defaultValue="3600" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-connections">Max Connections</Label>
                      <Input id="max-connections" type="number" defaultValue="100" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeout">Request Timeout (ms)</Label>
                      <Input id="timeout" type="number" defaultValue="30000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rate-limit">Rate Limit (req/min)</Label>
                      <Input id="rate-limit" type="number" defaultValue="60" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="visibility">
          <motion.div
            ref={visibilityRef}
            variants={container}
            initial="hidden"
            animate={visibilityInView ? "show" : "hidden"}
            className="grid gap-6 md:grid-cols-2"
          >
            <motion.div variants={item} className="md:col-span-2">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Page Visibility</CardTitle>
                  <CardDescription>Control which pages are visible to users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {Object.entries(pageVisibility).map(([page, isVisible]) => (
                      <div key={page} className="flex items-center justify-between space-x-2">
                        <div>
                          <Label htmlFor={`visibility-${page}`} className="capitalize">
                            {page}
                          </Label>
                          <p className="text-xs text-muted-foreground">/{page === "home" ? "" : page}</p>
                        </div>
                        <Switch
                          id={`visibility-${page}`}
                          checked={isVisible}
                          onCheckedChange={(checked) => {
                            setPageVisibility((prev) => ({ ...prev, [page]: checked }))
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Hidden pages will return a 404 error for non-admin users.
                  </div>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Feature Flags</CardTitle>
                  <CardDescription>Toggle features on and off</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="feature-comments">Comments</Label>
                      <p className="text-xs text-muted-foreground">Allow users to comment on videos</p>
                    </div>
                    <Switch id="feature-comments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="feature-dark-mode">Dark Mode</Label>
                      <p className="text-xs text-muted-foreground">Allow users to switch to dark mode</p>
                    </div>
                    <Switch id="feature-dark-mode" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="feature-newsletter">Newsletter</Label>
                      <p className="text-xs text-muted-foreground">Show newsletter signup form</p>
                    </div>
                    <Switch id="feature-newsletter" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="feature-analytics">Analytics</Label>
                      <p className="text-xs text-muted-foreground">Enable user analytics tracking</p>
                    </div>
                    <Switch id="feature-analytics" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Content Restrictions</CardTitle>
                  <CardDescription>Control content visibility</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-videos">Max Videos Per Page</Label>
                    <Input id="max-videos" type="number" defaultValue="12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content-filter">Content Filter</Label>
                    <Select defaultValue="moderate">
                      <SelectTrigger id="content-filter">
                        <SelectValue placeholder="Select filter level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="strict">Strict</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="feature-premium">Premium Content</Label>
                      <p className="text-xs text-muted-foreground">Show premium content badges</p>
                    </div>
                    <Switch id="feature-premium" defaultChecked={false} />
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
                  <CardTitle>SEO Manager</CardTitle>
                  <CardDescription>Manage SEO settings for each page</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="home">
                    <TabsList className="mb-4">
                      <TabsTrigger value="home">Home</TabsTrigger>
                      <TabsTrigger value="about">About</TabsTrigger>
                      <TabsTrigger value="videos">Videos</TabsTrigger>
                      <TabsTrigger value="destinations">Destinations</TabsTrigger>
                      <TabsTrigger value="contact">Contact</TabsTrigger>
                    </TabsList>
                    <TabsContent value="home" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="home-title">Page Title</Label>
                        <Input id="home-title" defaultValue="Green Roamer - Travel & Adventure" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="home-description">Meta Description</Label>
                        <Textarea
                          id="home-description"
                          defaultValue="Explore the natural beauty of Europe and Sri Lanka through hiking and travel adventures with Green Roamer."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="home-keywords">Keywords</Label>
                        <Input id="home-keywords" defaultValue="travel, hiking, adventure, nature, Europe, Sri Lanka" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="home-og-image">OG Image URL</Label>
                        <Input id="home-og-image" defaultValue="https://example.com/og-image.jpg" />
                      </div>
                    </TabsContent>
                    <TabsContent value="about" className="space-y-4">
                      {/* Similar fields for About page */}
                      <div className="text-sm text-muted-foreground">Configure SEO settings for the About page</div>
                    </TabsContent>
                    <TabsContent value="videos" className="space-y-4">
                      {/* Similar fields for Videos page */}
                      <div className="text-sm text-muted-foreground">Configure SEO settings for the Videos page</div>
                    </TabsContent>
                    <TabsContent value="destinations" className="space-y-4">
                      {/* Similar fields for Destinations page */}
                      <div className="text-sm text-muted-foreground">
                        Configure SEO settings for the Destinations page
                      </div>
                    </TabsContent>
                    <TabsContent value="contact" className="space-y-4">
                      {/* Similar fields for Contact page */}
                      <div className="text-sm text-muted-foreground">Configure SEO settings for the Contact page</div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Sitemap Configuration</CardTitle>
                  <CardDescription>Configure XML sitemap settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="auto-sitemap">Auto-generate Sitemap</Label>
                      <p className="text-xs text-muted-foreground">Automatically update sitemap.xml</p>
                    </div>
                    <Switch id="auto-sitemap" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sitemap-frequency">Update Frequency</Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger id="sitemap-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sitemap-priority">Default Priority</Label>
                    <Select defaultValue="0.8">
                      <SelectTrigger id="sitemap-priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5">0.5</SelectItem>
                        <SelectItem value="0.8">0.8</SelectItem>
                        <SelectItem value="1.0">1.0</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Generate Sitemap Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Robots.txt</CardTitle>
                  <CardDescription>Configure robots.txt settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    className="min-h-[200px] font-mono text-sm"
                    defaultValue={`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://greenroamer.com/sitemap.xml`}
                  />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Update Robots.txt
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="api">
          <motion.div
            ref={apiRef}
            variants={container}
            initial="hidden"
            animate={apiInView ? "show" : "hidden"}
            className="grid gap-6 md:grid-cols-2"
          >
            <motion.div variants={item} className="md:col-span-2">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>API Endpoints</CardTitle>
                  <CardDescription>Manage API endpoints and access</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {Object.entries(apiEndpoints).map(([endpoint, isEnabled]) => (
                      <div key={endpoint} className="flex items-center justify-between space-x-2">
                        <div>
                          <Label htmlFor={`api-${endpoint}`} className="capitalize">
                            {endpoint}
                          </Label>
                          <p className="text-xs text-muted-foreground">/api/{endpoint}</p>
                        </div>
                        <Switch
                          id={`api-${endpoint}`}
                          checked={isEnabled}
                          onCheckedChange={(checked) => {
                            setApiEndpoints((prev) => ({ ...prev, [endpoint]: checked }))
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>WebSocket Configuration</CardTitle>
                  <CardDescription>Configure WebSocket connections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="ws-enabled">WebSocket Server</Label>
                      <p className="text-xs text-muted-foreground">Enable WebSocket connections</p>
                    </div>
                    <Switch id="ws-enabled" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ws-port">WebSocket Port</Label>
                    <Input id="ws-port" defaultValue="8080" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ws-path">WebSocket Path</Label>
                    <Input id="ws-path" defaultValue="/ws" />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="ws-auth">Require Authentication</Label>
                      <p className="text-xs text-muted-foreground">Require auth for WebSocket connections</p>
                    </div>
                    <Switch id="ws-auth" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>API Rate Limiting</CardTitle>
                  <CardDescription>Configure API rate limiting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="rate-limiting">Enable Rate Limiting</Label>
                      <p className="text-xs text-muted-foreground">Limit API requests per client</p>
                    </div>
                    <Switch id="rate-limiting" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate-limit-requests">Requests per Window</Label>
                    <Input id="rate-limit-requests" type="number" defaultValue="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate-limit-window">Window Size (seconds)</Label>
                    <Input id="rate-limit-window" type="number" defaultValue="60" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate-limit-strategy">Rate Limit Strategy</Label>
                    <Select defaultValue="sliding-window">
                      <SelectTrigger id="rate-limit-strategy">
                        <SelectValue placeholder="Select strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed-window">Fixed Window</SelectItem>
                        <SelectItem value="sliding-window">Sliding Window</SelectItem>
                        <SelectItem value="token-bucket">Token Bucket</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item} className="md:col-span-2">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>API Documentation</CardTitle>
                  <CardDescription>Manage API documentation settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="api-docs">Enable API Docs</Label>
                      <p className="text-xs text-muted-foreground">Make API documentation publicly accessible</p>
                    </div>
                    <Switch id="api-docs" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-docs-path">Documentation Path</Label>
                    <Input id="api-docs-path" defaultValue="/api/docs" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-version">API Version</Label>
                    <Input id="api-version" defaultValue="v1" />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="api-playground">Enable API Playground</Label>
                      <p className="text-xs text-muted-foreground">Allow testing API endpoints in documentation</p>
                    </div>
                    <Switch id="api-playground" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Globe className="mr-2 h-4 w-4" />
                    View API Documentation
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="logs">
          <motion.div
            ref={logsRef}
            variants={container}
            initial="hidden"
            animate={logsInView ? "show" : "hidden"}
            className="grid gap-6 md:grid-cols-3"
          >
            <motion.div variants={item} className="md:col-span-2">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>System Logs</CardTitle>
                  <CardDescription>Real-time system logs</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] rounded-md border p-4 font-mono text-sm">
                    {logs.map((log, index) => {
                      let icon
                      let textColor

                      switch (log.level) {
                        case "info":
                          icon = <Info className="h-4 w-4 text-blue-500" />
                          textColor = "text-blue-500"
                          break
                        case "warning":
                          icon = <AlertTriangle className="h-4 w-4 text-amber-500" />
                          textColor = "text-amber-500"
                          break
                        case "error":
                          icon = <XCircle className="h-4 w-4 text-red-500" />
                          textColor = "text-red-500"
                          break
                        case "success":
                          icon = <CheckCircle className="h-4 w-4 text-green-500" />
                          textColor = "text-green-500"
                          break
                      }

                      return (
                        <div key={index} className="mb-2 flex items-start gap-2">
                          <div className="mt-0.5 flex-shrink-0">{icon}</div>
                          <div>
                            <span className={`font-bold ${textColor}`}>[{log.level.toUpperCase()}]</span>{" "}
                            <span className="text-muted-foreground">
                              {new Date(log.timestamp).toLocaleTimeString()}
                            </span>{" "}
                            {log.message}
                          </div>
                        </div>
                      )
                    })}
                    <div ref={logsEndRef} />
                  </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Clear Logs
                  </Button>
                  <Button variant="outline" size="sm">
                    Download Logs
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Log Settings</CardTitle>
                  <CardDescription>Configure logging behavior</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="log-level">Log Level</Label>
                    <Select defaultValue="info">
                      <SelectTrigger id="log-level">
                        <SelectValue placeholder="Select log level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="log-to-file">Log to File</Label>
                      <p className="text-xs text-muted-foreground">Save logs to disk</p>
                    </div>
                    <Switch id="log-to-file" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="log-rotation">Log Rotation</Label>
                      <p className="text-xs text-muted-foreground">Automatically rotate log files</p>
                    </div>
                    <Switch id="log-rotation" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="log-retention">Log Retention (days)</Label>
                    <Input id="log-retention" type="number" defaultValue="30" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item} className="md:col-span-3">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Terminal</CardTitle>
                  <CardDescription>Execute commands</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md bg-black p-4 font-mono text-sm text-green-400">
                    <div className="mb-2">$ npm run build</div>
                    <div className="mb-1">Creating an optimized production build...</div>
                    <div className="mb-1">Compiled successfully.</div>
                    <div className="mb-2">
                      <span className="text-white">✓</span> Ready in 3.2s
                    </div>
                    <div className="mb-2">$ _</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full items-center space-x-2">
                    <Input placeholder="Enter command..." className="font-mono" />
                    <Button size="sm">
                      <Terminal className="mr-2 h-4 w-4" />
                      Run
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
