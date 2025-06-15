"use client"

import { motion } from "framer-motion"
import { Loader2, Mountain } from "lucide-react"

interface PageLoaderProps {
  message?: string
  variant?: "default" | "minimal" | "branded"
}

export function PageLoader({ message = "Loading...", variant = "default" }: PageLoaderProps) {
  if (variant === "minimal") {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-muted-foreground">{message}</span>
        </motion.div>
      </div>
    )
  }

  if (variant === "branded") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center"
          >
            <Mountain className="h-8 w-8 text-primary" />
          </motion.div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Green Roamer</h3>
            <p className="text-muted-foreground">{message}</p>
          </div>

          <motion.div
            className="flex justify-center space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    )
  }

  // Default variant
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 text-center space-y-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-12 h-12 mx-auto rounded-full border-4 border-primary/20 border-t-primary"
        />

        <div className="space-y-2">
          <h3 className="font-medium">{message}</h3>
          <p className="text-sm text-muted-foreground">Please wait while we load your content</p>
        </div>
      </motion.div>
    </div>
  )
}
