"use client"

import { motion } from "framer-motion"
import { VideoCard } from "@/components/video-card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useState } from "react"
import type { VideoData } from "@/data/green-roamer-data"

interface VideoGridProps {
  videos: VideoData[]
}

export function VideoGrid({ videos }: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <>
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <VideoCard key={video.videoId} video={video} index={index} onClick={() => setSelectedVideo(video)} />
        ))}
      </motion.div>

      {/* Video Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedVideo && (
            <div className="flex flex-col">
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{selectedVideo.title}</h3>
                <p className="text-muted-foreground line-clamp-3">{selectedVideo.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
