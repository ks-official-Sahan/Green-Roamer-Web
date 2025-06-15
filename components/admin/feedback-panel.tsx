"use client"

import { motion } from "framer-motion"
import { useAdminStore } from "@/store/admin-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Mail, MailOpen, Trash2, MessageSquare } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function FeedbackPanel() {
  const { feedback, markFeedbackAsRead, deleteFeedback } = useAdminStore()
  const { toast } = useToast()

  const handleMarkAsRead = (id: string) => {
    markFeedbackAsRead(id)
    toast({
      title: "Marked as Read",
      description: "Feedback has been marked as read.",
    })
  }

  const handleDelete = (id: string) => {
    deleteFeedback(id)
    toast({
      title: "Feedback Deleted",
      description: "Feedback has been permanently deleted.",
      variant: "destructive",
    })
  }

  const unreadCount = feedback.filter((item) => !item.isRead).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="bg-white/10 dark:bg-black/10 border-white/20 backdrop-blur-xl shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-purple-400" />
                Feedback Management
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Manage user feedback and support requests
              </CardDescription>
            </div>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                {unreadCount} Unread
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedback.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No feedback received yet.</p>
              </div>
            ) : (
              feedback.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    item.isRead ? "bg-white/5 border-white/10" : "bg-blue-500/10 border-blue-500/30 shadow-lg"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        {item.isRead ? (
                          <MailOpen className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Mail className="w-4 h-4 text-blue-400" />
                        )}
                        <span className="font-medium text-foreground">{item.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground">{item.email}</p>

                      <p className="text-sm text-foreground leading-relaxed">{item.message}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {!item.isRead && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsRead(item.id)}
                          className="bg-white/5 border-white/10 hover:bg-blue-500/10 hover:border-blue-500/30"
                        >
                          <MailOpen className="w-4 h-4" />
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="bg-white/5 border-white/10 hover:bg-red-500/10 hover:border-red-500/30 text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
