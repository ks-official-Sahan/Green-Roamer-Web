"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useDeveloperStore } from "@/store/developer-store"
import { useToast } from "@/components/ui/use-toast"
import { Key, Eye, EyeOff, Copy, ChevronDown, ChevronRight, Shield } from "lucide-react"

export function EnvViewer() {
  const { envVars } = useDeveloperStore()
  const { toast } = useToast()
  const [visibleVars, setVisibleVars] = useState<Record<string, boolean>>({})
  const [isOpen, setIsOpen] = useState(false)

  const toggleVisibility = (key: string) => {
    setVisibleVars((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const copyToClipboard = (key: string, value: string) => {
    navigator.clipboard.writeText(value)
    toast({
      title: "Copied to Clipboard",
      description: `${key} has been copied to clipboard.`,
    })
  }

  const isSecret = (key: string) => {
    const secretKeys = ["key", "secret", "token", "password", "private"]
    return secretKeys.some((secret) => key.toLowerCase().includes(secret))
  }

  const maskValue = (value: string) => {
    if (value.length <= 8) return "••••••••"
    return value.substring(0, 4) + "••••••••••••••••" + value.substring(value.length - 4)
  }

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="w-5 h-5 text-yellow-400" />
          Environment Variables
        </CardTitle>
        <CardDescription>View and manage environment variables</CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between border-white/20 hover:bg-white/10">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-yellow-400" />
                <span>Environment Variables ({Object.keys(envVars).length})</span>
              </div>
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-4">
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              {Object.entries(envVars).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono text-cyan-400">{key}</code>
                      {isSecret(key) && (
                        <Badge variant="outline" className="text-xs bg-red-500/20 text-red-400 border-red-500/50">
                          Secret
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleVisibility(key)}
                        className="h-6 w-6 p-0 hover:bg-white/20"
                      >
                        {visibleVars[key] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(key, value)}
                        className="h-6 w-6 p-0 hover:bg-white/20"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="font-mono text-sm p-2 rounded bg-black/20 border border-white/5">
                    {visibleVars[key] || !isSecret(key) ? (
                      <span className="text-green-400 break-all">{value}</span>
                    ) : (
                      <span className="text-muted-foreground">{maskValue(value)}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
