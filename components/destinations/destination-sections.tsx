"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { getCountriesFromVideos, getVideosByCountry } from "@/lib/destinations-utils"
import { greenRoamerData } from "@/data/green-roamer-data"
import { VideoGrid } from "@/components/destinations/video-grid"
import { EmptyState } from "@/components/empty-state"
import { Flag } from "lucide-react"

export function DestinationSections() {
  // Get countries from videos
  const countries = getCountriesFromVideos(greenRoamerData.videos)

  return (
    <div className="space-y-24">
      {countries.map((country) => (
        <CountrySection key={country} country={country} />
      ))}
    </div>
  )
}

function CountrySection({ country }: { country: string }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Get videos for this country
  const videos = getVideosByCountry(greenRoamerData.videos, country)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <motion.section
      id={`country-${country.toLowerCase().replace(/\s+/g, "-")}`}
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="scroll-mt-24"
      aria-labelledby={`heading-${country.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <motion.h2
        id={`heading-${country.toLowerCase().replace(/\s+/g, "-")}`}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
        className="text-3xl font-bold mb-8 text-gradient"
      >
        {country}
      </motion.h2>

      {videos.length > 0 ? (
        <VideoGrid videos={videos} />
      ) : (
        <EmptyState
          icon={<Flag className="h-12 w-12" />}
          title={`No videos for ${country}`}
          description="We couldn't find any videos for this destination yet."
        />
      )}
    </motion.section>
  )
}
