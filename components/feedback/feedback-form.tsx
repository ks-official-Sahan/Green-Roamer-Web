"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send } from "lucide-react"

interface FeedbackData {
  category: string
  message: string
}

interface FeedbackFormProps {
  onSubmit: (feedback: FeedbackData) => void
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [formData, setFormData] = useState<FeedbackData>({
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FeedbackData>>({})
  const { toast } = useToast()

  const validateForm = (): boolean => {
    const newErrors: Partial<FeedbackData> = {}

    if (!formData.category) {
      newErrors.category = "Please select a category"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      onSubmit(formData)

      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your feedback. We'll review it shortly.",
      })

      // Reset form
      setFormData({
        category: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Failed to Submit",
        description: "There was an error submitting your feedback. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FeedbackData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-8"
    >
      <h2 className="text-2xl font-bold mb-6">Submit Feedback</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Label htmlFor="category" className="text-sm font-medium">
            Category *
          </Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleInputChange("category", value)}
            disabled={isSubmitting}
          >
            <SelectTrigger
              className={`mt-1 transition-all duration-300 ${errors.category ? "border-destructive" : ""}`}
            >
              <SelectValue placeholder="Select feedback category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bug">🐛 Bug Report</SelectItem>
              <SelectItem value="suggestion">💡 Suggestion</SelectItem>
              <SelectItem value="request">🙏 Feature Request</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && <p className="text-sm text-destructive mt-1">{errors.category}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Label htmlFor="message" className="text-sm font-medium">
            Your Feedback *
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            className={`mt-1 min-h-[120px] transition-all duration-300 ${errors.message ? "border-destructive" : ""}`}
            placeholder="Share your thoughts, report bugs, or suggest improvements..."
            disabled={isSubmitting}
          />
          {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-base font-medium transition-all duration-300 hover:scale-105"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Feedback
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}
