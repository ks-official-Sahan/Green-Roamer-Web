"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Calendar, MessageSquare, User } from "lucide-react"

interface Feedback {
  id: string
  category: string
  message: string
  user: string
  date: string
  status: string
}

interface FeedbackTimelineProps {
  feedbacks: Feedback[]
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "bug":
      return "🐛"
    case "suggestion":
      return "💡"
    case "request":
      return "🙏"
    default:
      return "💬"
  }
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "fixed":
      return "bg-green-500/20 text-green-700 dark:text-green-300"
    case "under review":
      return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
    case "rejected":
      return "bg-red-500/20 text-red-700 dark:text-red-300"
    default:
      return "bg-blue-500/20 text-blue-700 dark:text-blue-300"
  }
}

export function FeedbackTimeline({ feedbacks }: FeedbackTimelineProps) {
  return (
    <div className="space-y-4">
      {feedbacks.map((feedback, index) => (
        <motion.div
          key={feedback.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="glass-card p-6 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getCategoryIcon(feedback.category)}</span>
              <div>
                <h3 className="font-semibold text-foreground">{feedback.category}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-3 h-3" />
                  <span>{feedback.user}</span>
                  <Calendar className="w-3 h-3 ml-2" />
                  <span>{feedback.date}</span>
                </div>
              </div>
            </div>
            <Badge className={getStatusColor(feedback.status)}>{feedback.status}</Badge>
          </div>

          <div className="flex items-start gap-3">
            <MessageSquare className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
            <p className="text-foreground leading-relaxed">{feedback.message}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
