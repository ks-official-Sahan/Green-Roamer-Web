"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export function ScrollCue() {
  const scrollToContent = () => {
    const firstSection = document.querySelector("[data-scroll-target]")
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.button
      onClick={scrollToContent}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-background/20 backdrop-blur-sm border border-border/30 hover:bg-background/30 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Scroll to content"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="h-6 w-6 text-foreground" />
      </motion.div>
    </motion.button>
  )
}
