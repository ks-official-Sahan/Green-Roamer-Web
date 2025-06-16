"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RefreshCw, Home, AlertTriangle, Wrench } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function Custom500 {
  const [countdown, setCountdown] = useState(30)
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

  const handleAutoRetry = () => {
    if (countdown === 0) {
      handleRetry()
    }
  }

  useEffect(() => {
    if (countdown === 0) {
      handleAutoRetry()
    }
  }, [countdown])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="relative flex-1 w-full overflow-hidden bg-gradient-to-br from-background via-background to-destructive/5">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-destructive/10"
              style={{
                width: Math.random() * 250 + 40,
                height: Math.random() * 250 + 40,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.1, 0.2, 0.1],
                scale: [0.8, 1.1, 0.8],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: Math.random() * 10 + 8,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-4 py-12 text-center">
          {/* Animated Error Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
            className="mb-8 relative"
          >
            <div className="w-32 h-32 rounded-full bg-destructive/10 flex items-center justify-center relative overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-2 border-4 border-destructive/20 border-t-destructive rounded-full"
              />
              <AlertTriangle className="h-16 w-16 text-destructive z-10" />
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
                className="text-8xl font-bold text-destructive/20"
              >
                500
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold">Something broke! 😅</h1>

              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Our devs are already panicking and fixing this. The server encountered an unexpected error.
              </p>

              {/* Countdown */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="glass-card p-4 max-w-sm mx-auto"
              >
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                  <Wrench className="h-4 w-4" />
                  <span>Auto-retry in</span>
                </div>
                <div className="text-2xl font-bold text-primary">{countdown}s</div>
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
                    Retrying...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Try Again Now
                  </>
                )}
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Safety
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-sm text-muted-foreground space-y-2"
            >
              <p>Error ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              <p>If this persists, please contact support</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
