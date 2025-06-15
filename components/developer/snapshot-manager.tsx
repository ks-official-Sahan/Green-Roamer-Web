"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDeveloperStore } from "@/store/developer-store"
import { useToast } from "@/components/ui/use-toast"
import { Camera, History, Plus, RotateCcw, Calendar, User, GitBranch } from "lucide-react"

export function SnapshotManager() {
  const { snapshots, createSnapshot, revertToSnapshot } = useDeveloperStore()
  const { toast } = useToast()

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newSnapshot, setNewSnapshot] = useState({ name: "", description: "" })
  const [isReverting, setIsReverting] = useState<string | null>(null)

  // Safety check
  if (!snapshots) {
    return (
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-400" />
            Snapshot Manager
          </CardTitle>
          <CardDescription>Loading snapshots...</CardDescription>
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

  const handleCreateSnapshot = () => {
    if (!newSnapshot.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for the snapshot",
        variant: "destructive",
      })
      return
    }

    try {
      createSnapshot(newSnapshot.name, newSnapshot.description)
      toast({
        title: "Snapshot Created",
        description: `Successfully created snapshot "${newSnapshot.name}"`,
      })
      setNewSnapshot({ name: "", description: "" })
      setIsCreateOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create snapshot",
        variant: "destructive",
      })
    }
  }

  const handleRevert = async (id: string, name: string) => {
    setIsReverting(id)
    try {
      // Simulate revert process
      await new Promise((resolve) => setTimeout(resolve, 2000))
      revertToSnapshot(id)
      toast({
        title: "Reverted Successfully",
        description: `System reverted to snapshot "${name}"`,
      })
    } catch (error) {
      toast({
        title: "Revert Failed",
        description: "Failed to revert to snapshot",
        variant: "destructive",
      })
    } finally {
      setIsReverting(null)
    }
  }

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date
      if (isNaN(dateObj.getTime())) {
        return "Invalid Date"
      }
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch (error) {
      return "Invalid Date"
    }
  }

  return (
    <>
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-400" />
                Snapshot Manager
              </CardTitle>
              <CardDescription>Create and manage system snapshots</CardDescription>
            </div>
            <Button onClick={() => setIsCreateOpen(true)} size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-3">
              <AnimatePresence>
                {snapshots.map((snapshot, index) => (
                  <motion.div
                    key={snapshot.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium truncate">{snapshot.name}</h4>
                          <Badge variant="outline" className="shrink-0">
                            <GitBranch className="w-3 h-3 mr-1" />
                            {snapshot.version}
                          </Badge>
                        </div>
                        {snapshot.description && (
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{snapshot.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(snapshot.createdAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {snapshot.createdBy}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRevert(snapshot.id, snapshot.name)}
                          disabled={isReverting === snapshot.id}
                          className="text-green-400 hover:text-green-300 hover:bg-green-400/10"
                        >
                          {isReverting === snapshot.id ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <RotateCcw className="w-4 h-4" />
                            </motion.div>
                          ) : (
                            <RotateCcw className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {snapshots.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No snapshots created yet</p>
                  <p className="text-sm">Create your first snapshot to get started</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Create Snapshot Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="glass-effect">
          <DialogHeader>
            <DialogTitle>Create New Snapshot</DialogTitle>
            <DialogDescription>Capture the current state of your system configuration</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Snapshot Name</label>
              <Input
                placeholder="e.g., Before Feature Update"
                value={newSnapshot.name}
                onChange={(e) => setNewSnapshot((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Description (Optional)</label>
              <Textarea
                placeholder="Describe what changes this snapshot captures..."
                value={newSnapshot.description}
                onChange={(e) => setNewSnapshot((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSnapshot}>Create Snapshot</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
