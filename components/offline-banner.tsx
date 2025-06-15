"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNetworkStatus } from "@/components/network-status-provider"
import { WifiOff, Wifi, X, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function OfflineBanner() {
  const { isOnline } = useNetworkStatus()
  const [isDismissed, setIsDismissed] = useState(false)
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = () => {
    setIsRetrying(true)
    // Simulate retry attempt
    setTimeout(() => {
      setIsRetrying(false)
      if (navigator.onLine) {
        window.location.reload()
      }
    }, 1500)
  }

  const handleDismiss = () => {
    setIsDismissed(true)
  }

  return (
    <AnimatePresence>
      {!isOnline && !isDismissed && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-orange-500/90 to-red-500/90 text-white shadow-lg backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <WifiOff className="h-5 w-5" />
                </motion.div>

                <div className="flex-1">
                  <p className="text-sm font-medium">You are currently offline</p>
                  <p className="text-xs opacity-90">Some features may be unavailable until you reconnect</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className="text-white hover:bg-white/20 h-8 px-3"
                >
                  {isRetrying ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                      <span className="text-xs">Checking...</span>
                    </>
                  ) : (
                    <>
                      <Wifi className="h-4 w-4 mr-1" />
                      <span className="text-xs">Retry</span>
                    </>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDismiss}
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Dismiss</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Animated border */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-white/30"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
