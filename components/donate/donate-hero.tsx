"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { Heart, Globe, Camera } from "lucide-react"

gsap.registerPlugin(SplitText)

export function DonateHero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (titleRef.current && subtitleRef.current) {
      const titleSplit = new SplitText(titleRef.current, { type: "chars" })
      const subtitleSplit = new SplitText(subtitleRef.current, { type: "words" })

      gsap.fromTo(
        titleSplit.chars,
        { opacity: 0, y: 50, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: "back.out(1.7)",
        },
      )

      gsap.fromTo(
        subtitleSplit.words,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.5,
          ease: "power2.out",
        },
      )
    }
  }, [])

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(46,125,50,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(3,218,198,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(163,230,53,0.1),transparent_70%)]" />

      <div className="container-width relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full glass-effect mb-6 animate-float">
              <Heart className="w-12 h-12 text-primary animate-pulse-glow" />
            </div>
          </motion.div>

          <h1 ref={titleRef} className="hero-text text-gradient mb-6">
            Support Green Roamer's Journey 🌍
          </h1>

          <p ref={subtitleRef} className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Help us continue exploring and documenting the world's most beautiful places. Your support enables us to
            create inspiring content and share amazing adventures.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8"
          >
            <div className="flex items-center gap-3 glass-card px-6 py-3">
              <Globe className="w-6 h-6 text-primary" />
              <div className="text-left">
                <div className="font-semibold">50+ Destinations</div>
                <div className="text-sm text-muted-foreground">Explored & Documented</div>
              </div>
            </div>
            <div className="flex items-center gap-3 glass-card px-6 py-3">
              <Camera className="w-6 h-6 text-primary" />
              <div className="text-left">
                <div className="font-semibold">100+ Videos</div>
                <div className="text-sm text-muted-foreground">Created & Shared</div>
              </div>
            </div>
            <div className="flex items-center gap-3 glass-card px-6 py-3">
              <Heart className="w-6 h-6 text-primary" />
              <div className="text-left">
                <div className="font-semibold">10K+ Viewers</div>
                <div className="text-sm text-muted-foreground">Inspired to Travel</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
