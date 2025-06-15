"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { VideoCard } from "@/components/video-card"
import { VideoModal } from "@/components/video-modal"
import { VideoFilters } from "@/components/videos/video-filters"
import { SkeletonGrid } from "@/components/skeleton-grid"
import { EmptyState } from "@/components/empty-state"
import { ErrorBoundary } from "@/components/error-boundary"
import { getCountryFromLocation } from "@/lib/destinations-utils"
import type { VideoData } from "@/data/green-roamer-data"

interface VideoGridProps {
  videos: VideoData[]
  type: "videos" | "shorts"
}

interface Filters {
  tags: string[]
  country: string
  duration: string
  search: string
}

export function VideoGrid({ videos, type }: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<Filters>({
    tags: [],
    country: "all",
    duration: "all",
    search: "",
  })

  // Extract unique data for filters
  const { countries, popularTags } = useMemo(() => {
    const countrySet = new Set<string>()
    const tagMap = new Map<string, number>()

    videos.forEach((video) => {
      // Extract country from location hints
      if (video.locationHints) {
        const country = getCountryFromLocation(video.locationHints)
        if (country) countrySet.add(country)
      }

      // Count tags
      video.tags?.forEach((tag) => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
      })
    })

    const countries = Array.from(countrySet).sort()
    const popularTags = Array.from(tagMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([tag]) => tag)

    return { countries, popularTags }
  }, [videos])

  // Filter videos based on current filters
  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      // Search filter
      if (filters.search && !video.title.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }

      // Tags filter
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some((tag) =>
          video.tags?.some((videoTag) => videoTag.toLowerCase().includes(tag.toLowerCase())),
        )
        if (!hasMatchingTag) return false
      }

      // Country filter
      if (filters.country !== "all") {
        const videoCountry = video.locationHints ? getCountryFromLocation(video.locationHints) : null
        if (videoCountry !== filters.country) return false
      }

      // Duration filter
      if (filters.duration !== "all") {
        const duration = video.durationSeconds
        switch (filters.duration) {
          case "short":
            if (duration > 60) return false
            break
          case "medium":
            if (duration <= 60 || duration > 600) return false
            break
          case "long":
            if (duration <= 600) return false
            break
        }
      }

      return true
    })
  }, [videos, filters])

  const resetFilters = () => {
    setFilters({
      tags: [],
      country: "all",
      duration: "all",
      search: "",
    })
  }

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <section className="section-padding" data-scroll-target>
        <div className="container-width">
          <div className="mb-8">
            <div className="h-20 bg-muted/20 rounded-lg animate-pulse mb-4" />
          </div>
          <SkeletonGrid count={type === "shorts" ? 12 : 9} variant="video" />
        </div>
      </section>
    )
  }

  return (
    <ErrorBoundary>
      <section className="section-padding" data-scroll-target>
        <div className="container-width">
          {/* Filters */}
          <VideoFilters
            filters={filters}
            setFilters={setFilters}
            countries={countries}
            popularTags={popularTags}
            resetFilters={resetFilters}
            totalVideos={filteredVideos.length}
            type={type}
          />

          {/* Video Grid */}
          <AnimatePresence mode="wait">
            {filteredVideos.length === 0 ? (
              <EmptyState
                variant="video"
                title="No videos found"
                description="Try adjusting your filters or search terms to find more content."
                action={{
                  label: "Reset Filters",
                  onClick: resetFilters,
                }}
              />
            ) : (
              <motion.div
                key="video-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {filteredVideos.map((video, index) => (
                  <VideoCard key={video.videoId} video={video} index={index} onClick={() => setSelectedVideo(video)} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Video Modal */}
          <AnimatePresence>
            {selectedVideo && <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
          </AnimatePresence>
        </div>
      </section>
    </ErrorBoundary>
  )
}
