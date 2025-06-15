"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { ChevronDown, Play, Film } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

interface VideoHeroProps {
  title: string
  subtitle: string
  type: "videos" | "shorts"
}

export function VideoHero({ title, subtitle, type }: VideoHeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      // Split text animation
      const titleSplit = new SplitText(titleRef.current!, { type: "chars" })
      const subtitleSplit = new SplitText(subtitleRef.current!, { type: "words" })

      // Set initial states
      gsap.set(titleSplit.chars, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        transformOrigin: "50% 50% -50px",
      })
      gsap.set(subtitleSplit.words, { opacity: 0, y: 30 })

      // Create timeline
      const tl = gsap.timeline({ delay: 0.5 })

      tl.to(titleSplit.chars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: "back.out(1.7)",
      }).to(
        subtitleSplit.words,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4",
      )

      // Parallax background effect
      gsap.to(containerRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const scrollToContent = () => {
    const contentSection = document.querySelector("[data-scroll-target]")
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]" />

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full bg-accent/10 blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full glass-effect mb-6">
            {type === "videos" ? (
              <Play className="h-10 w-10 text-primary" />
            ) : (
              <Film className="h-10 w-10 text-primary" />
            )}
          </div>
        </motion.div>

        <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient">
          {title}
        </h1>

        <p ref={subtitleRef} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12">
          {subtitle}
        </p>

        {/* Scroll Cue */}
        <motion.button
          onClick={scrollToContent}
          className="inline-flex items-center justify-center w-12 h-12 rounded-full glass-effect hover:bg-white/20 transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.button>
      </div>
    </section>
  )
}
