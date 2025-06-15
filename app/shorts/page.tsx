import { Navbar } from "@/components/navigation/navbar"
import { VideoGrid } from "@/components/videos/video-grid"
import { VideoHero } from "@/components/videos/video-hero"
import { greenRoamerData } from "@/data/green-roamer-data"

export default function ShortsPage() {
  // Filter for shorts (duration <= 60 seconds)
  const shortsVideos = greenRoamerData.shorts.filter((video) => video.durationSeconds <= 60)

  return (
    <div className="min-h-screen">
      <Navbar />
      <VideoHero title="Short Adventures" subtitle="Quick glimpses into our most stunning discoveries" type="shorts" />
      <VideoGrid videos={shortsVideos} type="shorts" />
    </div>
  )
}
