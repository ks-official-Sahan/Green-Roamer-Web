import { Navbar } from "@/components/navigation/navbar"
import { VideoGrid } from "@/components/videos/video-grid"
import { VideoHero } from "@/components/videos/video-hero"
import { greenRoamerData } from "@/data/green-roamer-data"

export default function VideosPage() {
  // Filter for long-form videos (duration > 60 seconds)
  const longFormVideos = greenRoamerData.videos.filter((video) => video.durationSeconds > 60)

  return (
    <div className="min-h-screen">
      <Navbar />
      <VideoHero
        title="Our Videos"
        subtitle="Cinematic journeys through breathtaking landscapes and hidden gems"
        type="videos"
      />
      <VideoGrid videos={longFormVideos} type="videos" />
    </div>
  )
}
