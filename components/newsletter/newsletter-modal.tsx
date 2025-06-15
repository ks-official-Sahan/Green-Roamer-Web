"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { ErrorBoundary } from "@/components/error-boundary"
import { Mail, X, Loader2, CheckCircle, AlertCircle, Wifi, WifiOff, Sparkles } from "lucide-react"

// Register GSAP plugins
gsap.registerPlugin(TextPlugin)

interface NewsletterModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

interface FormState {
  email: string
  consent: boolean
  isSubmitting: boolean
  isSuccess: boolean
  error: string
}

export function NewsletterModal({ isOpen, onClose, onSuccess }: NewsletterModalProps) {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    consent: false,
    isSubmitting: false,
    isSuccess: false,
    error: "",
  })
  const [isOnline, setIsOnline] = useState(true)

  const { toast } = useToast()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // GSAP text animations
  useEffect(() => {
    if (!isOpen) return

    const tl = gsap.timeline({ delay: 0.3 })

    // Animate title with split text effect
    if (titleRef.current) {
      const text = titleRef.current.textContent || ""
      const chars = text.split("")
      titleRef.current.innerHTML = chars
        .map((char) => `<span class="inline-block">${char === " " ? "&nbsp;" : char}</span>`)
        .join("")

      const spans = titleRef.current.querySelectorAll("span")
      gsap.set(spans, { y: 50, opacity: 0, rotationX: -90 })

      tl.to(spans, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(1.7)",
      })
    }

    // Animate subtitle
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { y: 30, opacity: 0 })
      tl.to(
        subtitleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4",
      )
    }

    return () => {
      tl.kill()
    }
  }, [isOpen])

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email.trim())
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isOnline) {
      toast({
        title: "Connection Error",
        description: "Unable to connect right now. Please check your internet connection.",
        variant: "destructive",
      })
      return
    }

    const { email, consent } = formState

    // Validation
    if (!email.trim()) {
      setFormState((prev) => ({ ...prev, error: "Email is required" }))
      return
    }

    if (!validateEmail(email)) {
      setFormState((prev) => ({ ...prev, error: "Please enter a valid email address" }))
      return
    }

    if (!consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to receive our newsletter.",
        variant: "destructive",
      })
      return
    }

    // Check if already subscribed (mock check)
    const existingSubscription = localStorage.getItem("newsletter-subscription")
    if (existingSubscription === email) {
      toast({
        title: "Already Subscribed",
        description: "You're already subscribed to our newsletter!",
      })
      return
    }

    setFormState((prev) => ({ ...prev, isSubmitting: true, error: "" }))

    try {
      // Simulate API call with potential network error
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate 10% chance of network error
          if (Math.random() < 0.1) {
            reject(new Error("Network error"))
          } else {
            resolve(true)
          }
        }, 2000)
      })

      // Success
      localStorage.setItem("newsletter-subscription", email)
      localStorage.setItem("newsletter-subscribed", "true")

      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        isSuccess: true,
      }))

      toast({
        title: "Welcome to Green Roamer! 🎉",
        description: "You've successfully subscribed to our newsletter.",
      })

      onSuccess?.()

      // Auto-close after success animation
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: "Network error occurred. Please try again.",
      }))

      toast({
        title: "Subscription Failed",
        description: "There was an error subscribing. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle input changes
  const handleEmailChange = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      email: value,
      error: prev.error ? "" : prev.error,
    }))
  }

  const handleConsentChange = (checked: boolean) => {
    setFormState((prev) => ({ ...prev, consent: checked }))
  }

  // Handle modal close
  const handleClose = () => {
    if (formState.isSubmitting) return

    setFormState({
      email: "",
      consent: false,
      isSubmitting: false,
      isSuccess: false,
      error: "",
    })
    onClose()
  }

  // Keyboard accessibility
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !formState.isSubmitting) {
        handleClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, formState.isSubmitting])

  return (
    <ErrorBoundary
      fallback={
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-background border rounded-lg p-6 text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-4 text-destructive" />
            <p>Newsletter modal temporarily unavailable</p>
          </div>
        </div>
      }
    >
      <AnimatePresence>
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent
              className="sm:max-w-md border-0 bg-transparent shadow-none p-0"
              aria-labelledby="newsletter-title"
              aria-describedby="newsletter-description"
            >
              <DialogTitle className="sr-only">
                Subscribe to our newsletter
              </DialogTitle>
              <DialogDescription className="sr-only">
                Get updates on new destinations and travel tips
              </DialogDescription>

              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
              />

              {/* Modal Content */}
              <motion.div
                ref={modalRef}
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.5,
                }}
                className="relative z-10 bg-white/10 dark:bg-black/20 border border-white/20 rounded-xl shadow-2xl p-6 md:p-10 backdrop-blur-md"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Ambient Background Effect */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-pulse" />
                  <div className="absolute top-0 left-0 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-float" />
                  <div
                    className="absolute bottom-0 right-0 w-24 h-24 bg-accent/30 rounded-full blur-2xl animate-float"
                    style={{ animationDelay: "1s" }}
                  />
                </div>

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  disabled={formState.isSubmitting}
                  className="absolute top-4 right-4 h-8 w-8 rounded-full hover:bg-white/20 transition-colors z-10"
                  aria-label="Close newsletter modal"
                >
                  <X className="h-4 w-4" />
                </Button>

                <AnimatePresence mode="wait">
                  {formState.isSuccess ? (
                    // Success State
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      className="text-center py-8 relative z-10"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                          delay: 0.2,
                        }}
                        className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center backdrop-blur-sm border border-green-500/30"
                      >
                        <CheckCircle className="w-10 h-10 text-green-500" />
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold mb-4 text-white"
                      >
                        Welcome Aboard! 🎉
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/80 mb-6"
                      >
                        Thank you for subscribing! You'll receive exclusive
                        behind-the-scenes content and updates about our latest
                        adventures.
                      </motion.p>
                    </motion.div>
                  ) : (
                    // Form State
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6 pt-4 relative z-10"
                    >
                      {/* Header */}
                      <div className="text-center space-y-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            delay: 0.1,
                          }}
                          className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm border border-primary/30"
                        >
                          <motion.div
                            animate={{
                              y: [-2, 2, -2],
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                          >
                            <Sparkles className="w-8 h-8 text-primary" />
                          </motion.div>
                        </motion.div>

                        <h3
                          id="newsletter-title"
                          ref={titleRef}
                          className="text-2xl md:text-3xl font-bold text-white"
                        >
                          Get Travel Behind-The-Scenes
                        </h3>

                        <p
                          id="newsletter-description"
                          ref={subtitleRef}
                          className="text-white/80 text-sm md:text-base max-w-sm mx-auto"
                        >
                          Subscribe to receive early access to Green Roamer's
                          discoveries
                        </p>

                        {/* Network Status Indicator */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center justify-center gap-2 text-xs"
                        >
                          {isOnline ? (
                            <>
                              <Wifi className="w-3 h-3 text-green-400" />
                              <span className="text-green-400">Connected</span>
                            </>
                          ) : (
                            <>
                              <WifiOff className="w-3 h-3 text-red-400" />
                              <span className="text-red-400">Offline</span>
                            </>
                          )}
                        </motion.div>
                      </div>

                      {/* Form */}
                      <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                      >
                        {/* Email Input */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="newsletter-email"
                            className="text-white/90 text-sm font-medium"
                          >
                            Email Address
                          </Label>
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                            }}
                          >
                            <Input
                              id="newsletter-email"
                              type="email"
                              placeholder="Enter your email address"
                              value={formState.email}
                              onChange={(e) =>
                                handleEmailChange(e.target.value)
                              }
                              disabled={formState.isSubmitting || !isOnline}
                              className={`
                                bg-white/10 border-white/20 text-white placeholder:text-white/50
                                focus:border-primary/50 focus:ring-primary/25 backdrop-blur-sm
                                transition-all duration-300
                                ${
                                  formState.error
                                    ? "border-red-400/50 focus:border-red-400/50"
                                    : ""
                                }
                              `}
                              aria-describedby={
                                formState.error ? "email-error" : undefined
                              }
                              aria-invalid={!!formState.error}
                            />
                          </motion.div>
                          {formState.error && (
                            <motion.p
                              id="email-error"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-400 text-sm flex items-center gap-1"
                              role="alert"
                            >
                              <AlertCircle className="w-3 h-3" />
                              {formState.error}
                            </motion.p>
                          )}
                        </div>

                        {/* Consent Checkbox */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="flex items-start space-x-3"
                        >
                          <Checkbox
                            id="newsletter-consent"
                            checked={formState.consent}
                            onCheckedChange={handleConsentChange}
                            disabled={formState.isSubmitting}
                            className="mt-0.5 border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <Label
                            htmlFor="newsletter-consent"
                            className="text-xs text-white/70 leading-relaxed cursor-pointer"
                          >
                            I agree to receive emails from Green Roamer. You can
                            unsubscribe at any time.
                          </Label>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                          className="space-y-3"
                        >
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              type="submit"
                              disabled={formState.isSubmitting || !isOnline}
                              className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              {formState.isSubmitting ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Subscribing...
                                </>
                              ) : (
                                <>
                                  <Mail className="w-4 h-4 mr-2" />
                                  Subscribe Now
                                </>
                              )}
                            </Button>
                          </motion.div>

                          <Button
                            type="button"
                            variant="ghost"
                            onClick={handleClose}
                            disabled={formState.isSubmitting}
                            className="w-full text-sm text-white/70 hover:text-white hover:bg-white/10"
                          >
                            Maybe later
                          </Button>
                        </motion.div>
                      </motion.form>

                      {/* Footer */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-center space-y-2 pt-4 border-t border-white/10"
                      >
                        <p className="text-xs text-white/50">
                          🔒 We respect your privacy. No spam, ever.
                        </p>
                        <p className="text-xs text-white/40">
                          Only 1-2 emails per month with our best content
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}
