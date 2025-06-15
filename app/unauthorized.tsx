"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Lock, LogIn, Home } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="relative flex-1 w-full overflow-hidden bg-gradient-to-br from-background to-destructive/5">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-destructive/5"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 0.3,
                scale: 1,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-4 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-8 h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center"
          >
            <Lock className="h-12 w-12 text-destructive" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 text-4xl font-bold"
          >
            Unauthorized Access
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8 max-w-md text-muted-foreground"
          >
            You don't have permission to access this page. Please log in with the appropriate credentials or return to
            the home page.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button asChild className="animate-pulse-glow">
              <Link href="/admin/login">
                <LogIn className="mr-2 h-4 w-4" />
                Log In
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
