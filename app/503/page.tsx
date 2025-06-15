"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RefreshCw, Home, Settings, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function ServiceUnavailable() {
  const [countdown, setCountdown] = useState(120) // 2 minutes
  const [isRetrying, setIsRetrying] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleRetry = () => {
    setIsRetrying(true)
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="relative flex-1 w-full overflow-hidden bg-gradient-to-br from-background via-background to-amber-500/5">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-amber-500/10"
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 12 + 8,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 4,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-4 py-12 text-center">
          {/* Animated Wrench */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 120 }}
            className="mb-8 relative"
          >
            <div className="w-32 h-32 rounded-full bg-amber-500/10 flex items-center justify-center relative">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Settings className="h-16 w-16 text-amber-500" />
              </motion.div>

              {/* Sparkles */}
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-amber-400 rounded-full"
                  style={{
                    top: `${20 + Math.sin((i * 60 * Math.PI) / 180) * 40}%`,
                    left: `${50 + Math.cos((i * 60 * Math.PI) / 180) * 40}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-8xl font-bold text-amber-500/20"
              >
                503
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold">We're doing some quick maintenance 🔧</h1>

              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Green Roamer is temporarily unavailable while we make some improvements. We'll be back shortly!
              </p>

              {/* Countdown */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="glass-card p-6 max-w-sm mx-auto"
              >
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-3">
                  <Clock className="h-4 w-4" />
                  <span>Estimated time remaining</span>
                </div>
                <div className="text-3xl font-bold text-amber-500">{formatTime(countdown)}</div>
                <div className="mt-2 w-full bg-amber-500/20 rounded-full h-2">
                  <motion.div
                    className="bg-amber-500 h-2 rounded-full"
                    initial={{ width: "100%" }}
                    animate={{ width: `${(countdown / 120) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button onClick={handleRetry} disabled={isRetrying} size="lg" className="animate-pulse-glow">
                {isRetrying ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Check Again
                  </>
                )}
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-sm text-muted-foreground space-y-2"
            >
              <p>Follow us on social media for updates</p>
              <p>
                Maintenance ID: MAINT-{new Date().getFullYear()}-{Math.random().toString(36).substr(2, 6).toUpperCase()}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
