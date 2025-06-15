"use client"
import { motion } from "framer-motion"

interface SplitTextProps {
  text: string
  className?: string
  animation?: {
    hidden: any
    visible: (i: number) => any
  }
}

export function SplitText({ text, className = "", animation }: SplitTextProps) {
  const words = text.split(" ")
  const defaultAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  const animationToUse = animation || defaultAnimation

  return (
    <h1 className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          custom={i}
          initial="hidden"
          animate="visible"
          variants={animationToUse}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  )
}
