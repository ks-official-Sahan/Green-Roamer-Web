"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navigation/navbar"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { greenRoamerData } from "@/data/green-roamer-data"
import type { VideoData } from "@/data/green-roamer-data"

// Components
import { VideoCard } from "@/components/video-card"
import { FilterSidebar } from "@/components/filter-sidebar"
import { VideoModal } from "@/components/video-modal"
import { EmptyState } from "@/components/empty-state"
import { ContentLoader } from "@/components/loading-states/content-loader"

export default function ExplorePage() {
  // State for videos and filtering
  const [videos, setVideos] = useState<VideoData[]>([])
  const [filteredVideos, setFilteredVideos] = useState<VideoData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showNav, setShowNav] = useState(true)

  // Filter states
  const [filters, setFilters] = useState({
    type: "all", // "all", "videos", "shorts"
    country: "all",
    tags: [] as string[],
    search: "",
  })

  // Refs
  const headerRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLElement>(null)

  // Check if mobile
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false

  // Load videos data
  useEffect(() => {
    try {
      // Simulate loading delay
      const timer = setTimeout(() => {
        if (greenRoamerData && greenRoamerData.videos) {
          // Combine videos and shorts
          const allVideos = [
            ...greenRoamerData.videos.map((video) => ({ ...video, type: "video" })),
            ...greenRoamerData.shorts.map((short) => ({ ...short, type: "short" })),
          ]
          setVideos(allVideos)
          setFilteredVideos(allVideos)
          setIsLoading(false)
        } else {
          setError("Failed to load video data")
          setIsLoading(false)
        }
      }, 800)

      return () => clearTimeout(timer)
    } catch (error) {
      setError("An error occurred while loading videos")
      setIsLoading(false)
    }
  }, [])

  // Handle scroll direction for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowNav(false)
      } else {
        // Scrolling up
        setShowNav(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  // Apply filters
  useEffect(() => {
    if (videos.length === 0) return

    let results = [...videos]

    // Filter by type
    if (filters.type !== "all") {
      results = results.filter((video) => (filters.type === "videos" ? video.type === "video" : video.type === "short"))
    }

    // Filter by country
    if (filters.country !== "all") {
      results = results.filter((video) => video.locationHints?.toLowerCase().includes(filters.country.toLowerCase()))
    }

    // Filter by tags
    if (filters.tags.length > 0) {
      results = results.filter((video) =>
        filters.tags.some((tag) => video.tags?.some((videoTag) => videoTag.toLowerCase().includes(tag.toLowerCase()))),
      )
    }

    // Filter by search
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      results = results.filter(
        (video) =>
          video.title.toLowerCase().includes(searchTerm) ||
          video.tags?.some((tag) => tag.toLowerCase().includes(searchTerm)),
      )
    }

    setFilteredVideos(results)
  }, [filters, videos])

  // Reset filters
  const resetFilters = () => {
    setFilters({
      type: "all",
      country: "all",
      tags: [],
      search: "",
    })

    if (isMobile) {
      setFilterOpen(false)
    }
  }

  // Extract unique countries from videos
  const countries = [
    ...new Set(
      videos
        .map((video) => {
          const location = video.locationHints
          if (!location) return null

          // Extract country name - this is a simple extraction, might need refinement
          if (location.includes("Sri Lanka")) return "Sri Lanka"
          if (location.includes("Italy")) return "Italy"
          if (location.includes("Switzerland")) return "Switzerland"

          return null
        })
        .filter(Boolean),
    ),
  ]

  // Extract popular tags
  const popularTags = [...new Set(videos.flatMap((video) => video.tags || []))].slice(0, 15)

  // Handle video click
  const handleVideoClick = (video: VideoData) => {
    setSelectedVideo(video)
  }

  // Close modal
  const closeModal = () => {
    setSelectedVideo(null)
  }

  // Toggle filter sidebar
  const toggleFilter = () => {
    setFilterOpen((prev) => !prev)
  }

  return (
    <div className="min-h-screen w-full">
      {/* Sticky Navigation */}
      <div
        className={`sticky top-0 z-50 w-full transition-transform duration-300 ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Navbar />
      </div>

      <main ref={mainRef} className="relative min-h-screen">
        {/* Page Header */}
        <div
          ref={headerRef}
          className="relative py-16 md:py-24 px-6 md:px-10 bg-gradient-to-r from-primary/10 to-accent/10"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gradient">Explore Adventures</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover our collection of breathtaking travel videos and short adventures
              </p>
            </motion.div>
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden fixed bottom-6 right-6 z-40">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={toggleFilter} size="lg" className="rounded-full shadow-lg">
              {filterOpen ? <X /> : <SlidersHorizontal />}
              <span className="ml-2">{filterOpen ? "Close" : "Filters"}</span>
            </Button>
          </motion.div>
        </div>

        {/* Main Content Area */}
        <div className="py-10 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filter Sidebar - Desktop */}
              <div className="hidden md:block w-64 shrink-0">
                <div className="sticky top-24">
                  <FilterSidebar
                    filters={filters}
                    setFilters={setFilters}
                    countries={countries}
                    popularTags={popularTags}
                    resetFilters={resetFilters}
                    totalVideos={filteredVideos.length}
                  />
                </div>
              </div>

              {/* Filter Sidebar - Mobile */}
              <AnimatePresence>
                {filterOpen && (
                  <motion.div
                    className="fixed inset-0 z-30 md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={toggleFilter} />
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-4/5 max-w-xs bg-card shadow-xl"
                      initial={{ x: "-100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "-100%" }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                      <div className="p-4 h-full overflow-y-auto">
                        <FilterSidebar
                          filters={filters}
                          setFilters={setFilters}
                          countries={countries}
                          popularTags={popularTags}
                          resetFilters={resetFilters}
                          totalVideos={filteredVideos.length}
                          isMobile
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Videos Grid */}
              <div className="flex-1">
                {isLoading ? (
                  <ContentLoader type="videos" count={9} message="Loading amazing adventures..." />
                ) : error ? (
                  <EmptyState
                    title="Failed to load videos"
                    description={error}
                    variant="offline"
                    action={{
                      label: "Try Again",
                      onClick: () => window.location.reload(),
                    }}
                  />
                ) : filteredVideos.length === 0 ? (
                  <EmptyState
                    title="No videos found"
                    description="Try adjusting your filters to find what you're looking for."
                    variant="search"
                    action={{
                      label: "Reset Filters",
                      onClick: resetFilters,
                    }}
                  />
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-muted-foreground">
                        Showing <span className="font-medium">{filteredVideos.length}</span> results
                      </p>
                      <Button variant="outline" size="sm" onClick={resetFilters}>
                        Reset Filters
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredVideos.map((video, index) => (
                        <VideoCard
                          key={video.videoId}
                          video={video}
                          index={index}
                          onClick={() => handleVideoClick(video)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Video Modal */}
      <AnimatePresence>{selectedVideo && <VideoModal video={selectedVideo} onClose={closeModal} />}</AnimatePresence>
    </div>
  )
}
