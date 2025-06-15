"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navigation/navbar"
import { FeedbackForm } from "@/components/feedback/feedback-form"
import { FeedbackTimeline } from "@/components/feedback/feedback-timeline"
import { ErrorBoundary } from "@/components/error-boundary"
import { EmptyState } from "@/components/empty-state"
import { MessageSquare } from "lucide-react"

// Mock user authentication
const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  role: "user",
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Mock authentication check
    setIsAuthenticated(true)

    // Mock existing feedbacks
    setFeedbacks([
      {
        id: "1",
        category: "Suggestion",
        message: "It would be great to have a dark mode toggle in the navigation.",
        user: "John Doe",
        date: "2024-01-15",
        status: "Under Review",
      },
      {
        id: "2",
        category: "Bug",
        message: "The video player sometimes doesn't load on mobile devices.",
        user: "Jane Smith",
        date: "2024-01-14",
        status: "Fixed",
      },
    ])
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="section-padding">
          <div className="container-width">
            <EmptyState
              title="Authentication Required"
              description="Please log in to access the feedback page."
              icon={<MessageSquare className="h-12 w-12" />}
              action={{
                label: "Go to Login",
                href: "/login",
              }}
            />
          </div>
        </main>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <Navbar />
        <main className="section-padding">
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="hero-text text-gradient mb-4">Share Your Feedback</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Help us improve Green Roamer by sharing your thoughts, suggestions, and bug reports.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              <FeedbackForm
                onSubmit={(feedback) => {
                  setFeedbacks((prev) => [
                    {
                      ...feedback,
                      id: Date.now().toString(),
                      user: mockUser.name,
                      date: new Date().toISOString().split("T")[0],
                      status: "Under Review",
                    },
                    ...prev,
                  ])
                }}
              />

              <div>
                <h2 className="text-2xl font-bold mb-6">Recent Feedback</h2>
                {feedbacks.length > 0 ? (
                  <FeedbackTimeline feedbacks={feedbacks} />
                ) : (
                  <EmptyState
                    title="No Feedback Yet"
                    description="Be the first to share your feedback with us!"
                    icon={<MessageSquare className="h-12 w-12" />}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  )
}
