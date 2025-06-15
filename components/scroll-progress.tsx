"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Transform opacity based on scroll progress
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.1, 0.9, 0.95, 1], [0, 1, 1, 1, 1, 0])

  if (prefersReducedMotion) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary z-50 origin-left"
      style={{
        scaleX,
        opacity,
      }}
    />
  )
}
