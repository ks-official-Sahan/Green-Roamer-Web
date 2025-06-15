"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, AlertCircle, RotateCcw } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function BadRequest() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="relative flex-1 w-full overflow-hidden bg-gradient-to-br from-background via-background to-orange-500/5">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-orange-500/10"
              style={{
                width: Math.random() * 180 + 60,
                height: Math.random() * 180 + 60,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{
                opacity: [0.1, 0.2, 0.1],
                scale: [0.8, 1.1, 0.8],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: Math.random() * 8 + 6,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-4 py-12 text-center">
          {/* Tilted Form Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
            className="mb-8 relative"
          >
            <div className="w-32 h-32 rounded-lg bg-orange-500/10 flex items-center justify-center relative border-2 border-orange-500/20">
              <motion.div
                animate={{
                  rotate: [0, -5, 5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <AlertCircle className="h-16 w-16 text-orange-500" />
              </motion.div>

              {/* Error lines */}
              <div className="absolute inset-4 border border-orange-500/30 rounded opacity-50" />
              <div className="absolute inset-6 border border-orange-500/20 rounded opacity-30" />
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
                className="text-8xl font-bold text-orange-500/20"
              >
                400
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold">Oops, that request was malformed 📝</h1>

              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                The request you sent couldn't be understood by our server. Let's try that again with the correct format.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button onClick={() => window.location.reload()} size="lg" className="animate-pulse-glow">
                <RotateCcw className="mr-2 h-5 w-5" />
                Try Again
              </Button>

              <Button variant="outline" size="lg" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
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
              <p>Common causes: Invalid form data, missing parameters, or incorrect format</p>
              <p>Request ID: REQ-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
