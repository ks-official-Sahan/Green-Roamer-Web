"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { SplitText } from "@/components/split-text"
import { ScrollCue } from "@/components/scroll-cue"
import dynamic from "next/dynamic"

// Dynamically import Three.js scene to ensure SSR compatibility
const ThreeJsScene = dynamic(() => import("./three-scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background/80" />,
})

export function DestinationsHero() {
  const [isClient, setIsClient] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(heroRef, { once: true })

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section ref={heroRef} className="relative h-[70vh] min-h-[500px] max-h-[800px] w-full overflow-hidden">
      {/* Three.js Background Scene */}
      {isClient && <ThreeJsScene />}

      {/* Fallback Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="overflow-hidden">
            <SplitText
              text="Explore Our Destinations"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient"
              animation={{
                hidden: { y: 100, opacity: 0 },
                visible: (i: number) => ({
                  y: 0,
                  opacity: 1,
                  transition: {
                    delay: i * 0.05,
                    duration: 0.8,
                    ease: [0.33, 1, 0.68, 1],
                  },
                }),
              }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Discover breathtaking landscapes and hidden gems from around the world
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-12"
        >
          <ScrollCue />
        </motion.div>
      </div>
    </section>
  )
}
