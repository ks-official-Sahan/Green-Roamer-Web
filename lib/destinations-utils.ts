import type { VideoData } from "@/data/green-roamer-data"

// Extract countries from videos
export function getCountriesFromVideos(videos: VideoData[]): string[] {
  const countries = new Set<string>()

  videos.forEach((video) => {
    const country = getCountryFromLocation(video.locationHints)
    if (country) {
      countries.add(country)
    }
  })

  return Array.from(countries).sort()
}

// Get country from location hint
export function getCountryFromLocation(locationHint: string | undefined): string | null {
  if (!locationHint) return null

  if (locationHint.includes("Sri Lanka")) return "Sri Lanka"
  if (locationHint.includes("Italy")) return "Italy"
  if (locationHint.includes("Switzerland")) return "Switzerland"

  return null
}

// Get videos by country
export function getVideosByCountry(videos: VideoData[], country: string): VideoData[] {
  return videos.filter((video) => {
    const videoCountry = getCountryFromLocation(video.locationHints)
    return videoCountry === country
  })
}

// Get video count by country
export function getCountryVideoCount(videos: VideoData[], country: string): number {
  return getVideosByCountry(videos, country).length
}

// Get coordinates for countries
export function getCountryCoordinates(country: string): [number, number] | null {
  const coordinates: Record<string, [number, number]> = {
    "Sri Lanka": [80.7718, 7.8731],
    Italy: [12.5674, 41.8719],
    Switzerland: [8.2275, 46.8182],
  }

  return coordinates[country] || null
}

// Format duration from seconds
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (minutes < 60) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return `${hours}:${remainingMinutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}

// Format view count
export function formatViewCount(count: string): string {
  const num = Number.parseInt(count, 10)
  if (isNaN(num)) return "0"

  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }

  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }

  return num.toString()
}
