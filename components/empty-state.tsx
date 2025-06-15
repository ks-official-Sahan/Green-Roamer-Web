"use client"

import type React from "react"

import { motion } from "framer-motion"
import { FileX, Search, Wifi, MapPin, Video, Heart, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  variant?: "default" | "search" | "offline" | "location" | "video" | "favorite" | "comment"
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  size?: "sm" | "md" | "lg"
}

const iconMap = {
  default: FileX,
  search: Search,
  offline: Wifi,
  location: MapPin,
  video: Video,
  favorite: Heart,
  comment: MessageSquare,
}

const variantConfig = {
  default: {
    title: "No content available",
    description: "We couldn't find any content to display at the moment.",
    bgColor: "bg-muted/50",
  },
  search: {
    title: "No results found",
    description: "Try adjusting your search terms or filters.",
    bgColor: "bg-blue-500/10",
  },
  offline: {
    title: "You're offline",
    description: "Check your internet connection and try again.",
    bgColor: "bg-orange-500/10",
  },
  location: {
    title: "No destinations found",
    description: "We haven't explored this area yet. Stay tuned for future adventures!",
    bgColor: "bg-green-500/10",
  },
  video: {
    title: "No videos available",
    description: "We're working on creating more amazing content for you.",
    bgColor: "bg-purple-500/10",
  },
  favorite: {
    title: "No favorites yet",
    description: "Start exploring and save your favorite content here.",
    bgColor: "bg-red-500/10",
  },
  comment: {
    title: "No comments yet",
    description: "Be the first to share your thoughts!",
    bgColor: "bg-indigo-500/10",
  },
}

export function EmptyState({ title, description, icon, variant = "default", action, size = "md" }: EmptyStateProps) {
  const config = variantConfig[variant]
  const IconComponent = iconMap[variant]

  const finalTitle = title || config.title
  const finalDescription = description || config.description
  const finalIcon = icon || (
    <IconComponent className={size === "sm" ? "h-8 w-8" : size === "lg" ? "h-16 w-16" : "h-12 w-12"} />
  )

  const containerSize = {
    sm: "py-8 px-4",
    md: "py-12 px-6",
    lg: "py-16 px-8",
  }

  const iconSize = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
  }

  const titleSize = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`glass-card text-center ${containerSize[size]} my-8`}
    >
      <motion.div
        className={`mx-auto mb-6 ${iconSize[size]} rounded-full ${config.bgColor} flex items-center justify-center text-muted-foreground relative overflow-hidden`}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
      >
        {/* Animated background pulse */}
        <motion.div
          className="absolute inset-0 rounded-full bg-current opacity-10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <motion.div
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          {finalIcon}
        </motion.div>
      </motion.div>

      <motion.h3
        className={`${titleSize[size]} font-semibold mb-2`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {finalTitle}
      </motion.h3>

      <motion.p
        className="text-muted-foreground mb-6 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {finalDescription}
      </motion.p>

      {action && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Button
            variant="default"
            onClick={action.onClick}
            className="animate-pulse-glow"
            {...(action.href ? { asChild: true } : {})}
          >
            {action.href ? <Link href={action.href}>{action.label}</Link> : action.label}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}
