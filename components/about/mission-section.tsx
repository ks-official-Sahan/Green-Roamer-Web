"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { OptimizedImage } from "@/components/optimized-image"

export function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} className="container-width">
      <div className="relative">
        {/* Background Image with Parallax */}
        <motion.div className="absolute inset-0 -z-10 parallax-bg" style={{ y }}>
          <OptimizedImage
            src="/placeholder.svg?height=800&width=1200"
            alt="Green Roamer landscape"
            className="w-full h-full object-cover rounded-2xl opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent rounded-2xl" />
        </motion.div>

        {/* Content */}
        <motion.div className="glass-card p-8 md:p-12 text-center max-w-4xl mx-auto" style={{ opacity }}>
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8 text-gradient"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Mission
          </motion.h2>

          <motion.div
            className="space-y-6 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-foreground/90">
              We believe that nature is not just scenery—it's a story. Through cinematic visuals and immersive
              storytelling, Green Roamer documents the earth's most remote and beautiful locations.
            </p>

            <p className="text-foreground/80">
              Every journey we take is an opportunity to showcase the raw beauty of our planet, the diverse cultures
              that call it home, and the adventures that await those brave enough to explore beyond the beaten path.
            </p>

            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {["Explore", "Document", "Inspire", "Connect"].map((word, index) => (
                <motion.span
                  key={word}
                  className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-medium"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(34,197,94,0.2)" }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
