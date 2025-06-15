"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { OptimizedImage } from "@/components/optimized-image"
import { ArrowRight, Camera, Code, Heart } from "lucide-react"
import Link from "next/link"

export function TeamSection() {
  return (
    <div className="container-width">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Behind the Camera</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Meet the passionate individuals who bring Green Roamer's vision to life
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Team Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl">
            <OptimizedImage
              src="/placeholder.svg?height=600&width=800"
              alt="Green Roamer team"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Floating Icons */}
            <motion.div
              className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-3"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <Camera className="h-6 w-6 text-white" />
            </motion.div>

            <motion.div
              className="absolute bottom-6 left-6 bg-white/20 backdrop-blur-sm rounded-full p-3"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              <Heart className="h-6 w-6 text-white" />
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-xl"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>

        {/* Team Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="glass-card p-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gradient">Our Story</h3>

            <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
              <p>
                Green Roamer began as a passion project—a desire to share the incredible beauty and diversity of our
                planet through the lens of adventure and discovery.
              </p>

              <p>
                Our small but dedicated team combines years of travel experience, cinematography expertise, and a deep
                love for nature to create content that not only entertains but inspires action.
              </p>

              <p>
                From scaling remote mountains to diving into pristine waters, we're committed to showcasing the world's
                hidden gems while promoting sustainable and responsible travel.
              </p>
            </div>

            {/* Team Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                { icon: <Camera className="h-5 w-5" />, label: "Authentic Storytelling" },
                { icon: <Heart className="h-5 w-5" />, label: "Environmental Respect" },
                { icon: <Code className="h-5 w-5" />, label: "Technical Excellence" },
              ].map((value, index) => (
                <motion.div
                  key={value.label}
                  className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-primary">{value.icon}</div>
                  <span className="text-sm font-medium">{value.label}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button asChild className="group">
                <Link href="/developer" className="inline-flex items-center space-x-2">
                  <span>Meet the Developer</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
