"use client"

import { motion } from "framer-motion"
import { SkeletonGrid } from "@/components/skeleton-grid"

interface ContentLoaderProps {
  type: "videos" | "destinations" | "articles" | "grid"
  count?: number
  message?: string
}

export function ContentLoader({ type, count = 6, message }: ContentLoaderProps) {
  const getVariant = () => {
    switch (type) {
      case "videos":
        return "video"
      case "destinations":
        return "destination"
      case "articles":
        return "article"
      default:
        return "video"
    }
  }

  const getColumns = () => {
    switch (type) {
      case "videos":
        return { default: 1, sm: 2, md: 2, lg: 3 }
      case "destinations":
        return { default: 1, sm: 2, md: 3, lg: 4 }
      case "articles":
        return { default: 1, md: 2 }
      default:
        return { default: 1, sm: 2, lg: 3 }
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      {message && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-muted-foreground">{message}</p>
        </motion.div>
      )}

      <SkeletonGrid count={count} variant={getVariant()} columns={getColumns()} />
    </motion.div>
  )
}
