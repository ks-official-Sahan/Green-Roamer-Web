"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

const ctaItems = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Support Our Mission",
    description:
      "Help us continue documenting the world's most beautiful places",
    href: "/donate",
    buttonText: "Support Us",
    color: "from-red-500/20 to-pink-500/20",
    hoverColor: "group-hover:from-red-500/30 group-hover:to-pink-500/30",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Share Your Feedback",
    description:
      "Tell us about your favorite destinations or suggest new adventures",
    href: "/feedback",
    buttonText: "Give Feedback",
    color: "from-blue-500/20 to-cyan-500/20",
    hoverColor: "group-hover:from-blue-500/30 group-hover:to-cyan-500/30",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Get in Touch",
    description: "Have a collaboration idea or just want to say hello?",
    href: "/contact",
    buttonText: "Contact Us",
    color: "from-green-500/20 to-emerald-500/20",
    hoverColor: "group-hover:from-green-500/30 group-hover:to-emerald-500/30",
  },
];

export function CTASection() {
  return (
    <div className="container-width">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
          Join Our Journey
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Be part of the Green Roamer community and help us explore the world
          together
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ctaItems.map((item, index) => (
          <motion.div
            key={item.title}
            className="stagger-item group relative"
            initial={{ opacity: 0, y: 60, rotationX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotationX: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              ease: [0.17, 0.67, 0.83, 0.67],
            }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <div className="glass-card p-8 h-full flex flex-col relative overflow-hidden">
              {/* Background Gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} ${item.hoverColor} transition-all duration-500 -z-10`}
                initial={false}
              />

              {/* Icon */}
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 text-primary group-hover:bg-primary/20 transition-colors duration-300"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                {item.icon}
              </motion.div>

              {/* Content */}
              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-bold text-foreground">
                  {item.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* CTA Button */}
              <motion.div
                className="mt-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild className="w-full group/btn">
                  <Link
                    href={item.href}
                    className="inline-flex items-center justify-center space-x-2"
                  >
                    <span>{item.buttonText}</span>
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>

              {/* Hover Glow Effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(255,255,255,0.1), transparent 70%)",
                }}
              />
            </div>

            {/* Floating Decoration */}
            <motion.div
              className="absolute -top-2 -right-2 w-4 h-4 bg-primary/30 rounded-full blur-sm"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.5,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom Decoration */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-primary mx-auto rounded-full" />
        <p className="text-sm text-muted-foreground mt-4 italic">
          "Adventure awaits those who dare to explore"
        </p>
      </motion.div>
    </div>
  );
}
