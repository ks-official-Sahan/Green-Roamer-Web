"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navbar } from "@/components/navigation/navbar"
import { AboutHero } from "@/components/about/about-hero"
import { MissionSection } from "@/components/about/mission-section"
import { StatsGrid } from "@/components/about/stats-grid"
import { TeamSection } from "@/components/about/team-section"
import { CTASection } from "@/components/about/cta-section"
import { ScrollCue } from "@/components/scroll-cue"
import { ErrorBoundary } from "@/components/error-boundary"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

  useEffect(() => {
    // GSAP scroll animations
    const ctx = gsap.context(() => {
      // Parallax backgrounds
      gsap.utils.toArray(".parallax-bg").forEach((element: any) => {
        gsap.to(element, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })

      // Section reveals
      gsap.utils.toArray(".reveal-section").forEach((element: any) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 100,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })

      // Stagger animations for cards
      gsap.utils.toArray(".stagger-item").forEach((element: any, index) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 60,
            rotationX: 15,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <ErrorBoundary>
      <div ref={containerRef} className="min-h-screen relative overflow-hidden">
        <Navbar />

        {/* Animated Background */}
        <motion.div className="fixed inset-0 z-0" style={{ y: backgroundY }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]" />
        </motion.div>

        <main className="relative z-10">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center">
            <AboutHero />
            <ScrollCue />
          </section>

          {/* Mission Section */}
          <section data-scroll-target className="reveal-section section-padding">
            <MissionSection />
          </section>

          {/* Stats Grid */}
          <section className="reveal-section section-padding bg-gradient-to-b from-transparent via-muted/20 to-transparent">
            <StatsGrid />
          </section>

          {/* Team Section */}
          <section className="reveal-section section-padding">
            <TeamSection />
          </section>

          {/* CTA Section */}
          <section className="reveal-section section-padding">
            <CTASection />
          </section>
        </main>

        {/* Ambient Floating Elements */}
        <div className="fixed inset-0 pointer-events-none z-5">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}
