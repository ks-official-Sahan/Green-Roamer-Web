"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Clock, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatDuration, formatViewCount } from "@/lib/utils"
import type { VideoData } from "@/data/green-roamer-data"

interface VideoCardProps {
  video: VideoData
  index: number
  onClick: () => void
}

export function VideoCard({ video, index, onClick }: VideoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Extract country from location
  const getCountry = (location: string | undefined) => {
    if (!location) return null
    if (location.includes("Sri Lanka")) return "Sri Lanka"
    if (location.includes("Italy")) return "Italy"
    if (location.includes("Switzerland")) return "Switzerland"
    return null
  }

  const country = getCountry(video.locationHints)

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card
        className="overflow-hidden h-full border border-border/40 bg-card/30 backdrop-blur-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
        onClick={onClick}
      >
        <div className="relative aspect-video overflow-hidden group cursor-pointer">
          {/* Thumbnail */}
          <div className="relative w-full h-full bg-muted/50 animate-pulse">
            {!imageError ? (
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setIsLoaded(true)}
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <span className="text-muted-foreground">Image unavailable</span>
              </div>
            )}
          </div>

          {/* Play button overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-primary/90 rounded-full p-3"
            >
              <Play className="h-8 w-8 text-white" />
            </motion.div>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {formatDuration(video.durationSeconds)}
          </div>

          {/* Video type badge */}
          {video.type && (
            <div className="absolute top-2 left-2">
              <Badge variant={video.type === "video" ? "default" : "secondary"} className="text-xs">
                {video.type === "video" ? "Video" : "Short"}
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-medium line-clamp-2 h-12">{video.title}</h3>

            <div className="flex items-center text-xs text-muted-foreground">
              <Eye className="h-3 w-3 mr-1" />
              <span>{formatViewCount(video.viewCount)} views</span>
            </div>

            <div className="flex flex-wrap gap-1 mt-2">
              {country && (
                <Badge variant="outline" className="text-xs">
                  {country}
                </Badge>
              )}
              {video.tags?.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
