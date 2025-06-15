"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { Input } from "@/components/ui/input"
import { Search, HelpCircle } from "lucide-react"

gsap.registerPlugin(SplitText)

interface SupportHeroProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function SupportHero({ searchQuery, onSearchChange }: SupportHeroProps) {
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
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(46,125,50,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_70%,rgba(3,218,198,0.1),transparent_50%)]" />

      <div className="container-width relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full glass-effect mb-6 animate-float">
              <HelpCircle className="w-10 h-10 text-primary" />
            </div>
          </motion.div>

          <h1 ref={titleRef} className="hero-text text-gradient mb-6">
            How can we help?
          </h1>

          <p ref={subtitleRef} className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to common questions, get support, or reach out to our team directly.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-md mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-12 text-base glass-effect border-border/50 focus:border-primary/50"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
