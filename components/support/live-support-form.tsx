"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send, MessageCircle } from "lucide-react"

interface SupportFormData {
  name: string
  email: string
  subject: string
  priority: string
  message: string
}

export function LiveSupportForm() {
  const [formData, setFormData] = useState<SupportFormData>({
    name: "",
    email: "",
    subject: "",
    priority: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<SupportFormData>>({})
  const { toast } = useToast()

  const validateForm = (): boolean => {
    const newErrors: Partial<SupportFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.priority) {
      newErrors.priority = "Please select a priority level"
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
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Support Request Sent!",
        description: "We'll get back to you within 24 hours.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        priority: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Failed to Send",
        description: "There was an error sending your support request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof SupportFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass-card p-8"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
          <MessageCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Contact Live Support</h2>
        <p className="text-muted-foreground">
          Can't find what you're looking for? Send us a message and we'll help you out.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`mt-1 transition-all duration-300 ${errors.name ? "border-destructive" : ""}`}
              placeholder="Enter your full name"
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`mt-1 transition-all duration-300 ${errors.email ? "border-destructive" : ""}`}
              placeholder="Enter your email address"
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Label htmlFor="subject" className="text-sm font-medium">
            Subject *
          </Label>
          <Input
            id="subject"
            type="text"
            value={formData.subject}
            onChange={(e) => handleInputChange("subject", e.target.value)}
            className={`mt-1 transition-all duration-300 ${errors.subject ? "border-destructive" : ""}`}
            placeholder="Brief description of your issue"
            disabled={isSubmitting}
          />
          {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Label htmlFor="priority" className="text-sm font-medium">
            Priority Level *
          </Label>
          <Select
            value={formData.priority}
            onValueChange={(value) => handleInputChange("priority", value)}
            disabled={isSubmitting}
          >
            <SelectTrigger
              className={`mt-1 transition-all duration-300 ${errors.priority ? "border-destructive" : ""}`}
            >
              <SelectValue placeholder="Select priority level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">🟢 Low - General question</SelectItem>
              <SelectItem value="medium">🟡 Medium - Need assistance</SelectItem>
              <SelectItem value="high">🟠 High - Issue affecting experience</SelectItem>
              <SelectItem value="urgent">🔴 Urgent - Critical problem</SelectItem>
            </SelectContent>
          </Select>
          {errors.priority && <p className="text-sm text-destructive mt-1">{errors.priority}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Label htmlFor="message" className="text-sm font-medium">
            Message *
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            className={`mt-1 min-h-[120px] transition-all duration-300 ${errors.message ? "border-destructive" : ""}`}
            placeholder="Please describe your issue or question in detail..."
            disabled={isSubmitting}
          />
          {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-base font-medium transition-all duration-300 hover:scale-105"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Support Request
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}
