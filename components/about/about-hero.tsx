"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText)
}

export function AboutHero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation for title
      if (titleRef.current) {
        const splitTitle = new SplitText(titleRef.current, { type: "chars" })
        gsap.fromTo(
          splitTitle.chars,
          {
            opacity: 0,
            y: 100,
            rotationX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: "back.out(1.7)",
            delay: 0.5,
          },
        )
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            delay: 1.5,
          },
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="container-width text-center relative z-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        {/* Main Title */}
        <h1
          ref={titleRef}
          className="hero-text text-gradient font-bold leading-tight"
          style={{ perspective: "1000px" }}
        >
          About Green Roamer
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed"
        >
          Travel isn't a destination. It's a perspective.
        </p>

        {/* Decorative Elements */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 2 }}
          className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"
        />

        {/* Floating Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="glass-card p-6 max-w-2xl mx-auto mt-12"
        >
          <p className="text-lg text-foreground/80 italic">"Explore the world. Capture nature. Inspire culture."</p>
        </motion.div>
      </motion.div>

      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(34,197,94,0.1), transparent 70%)",
            "radial-gradient(circle at 60% 40%, rgba(16,185,129,0.15), transparent 70%)",
            "radial-gradient(circle at 40% 60%, rgba(34,197,94,0.1), transparent 70%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}
