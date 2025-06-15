import { Suspense } from "react"
import { Navbar } from "@/components/navigation/navbar"
import { DestinationsHero } from "@/components/destinations/hero"
import { DestinationsMap } from "@/components/destinations/map"
import { CountrySidebar } from "@/components/destinations/country-sidebar"
import { DestinationSections } from "@/components/destinations/destination-sections"
import { ScrollProgress } from "@/components/scroll-progress"
import { Skeleton } from "@/components/ui/skeleton"

export default function DestinationsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ScrollProgress />

      {/* Hero Section with 3D Background */}
      <Suspense fallback={<div className="h-[50vh] bg-gradient-to-b from-background to-background/50" />}>
        <DestinationsHero />
      </Suspense>

      <main className="relative">
        <div className="container-width py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar with Country List */}
            <div className="w-full lg:w-1/4 lg:sticky lg:top-24 lg:self-start">
              <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                <CountrySidebar />
              </Suspense>
            </div>

            {/* Main Content Area */}
            <div className="w-full lg:w-3/4">
              {/* Interactive Map */}
              <div className="mb-12">
                <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-xl" />}>
                  <DestinationsMap />
                </Suspense>
              </div>

              {/* Country Sections */}
              <Suspense
                fallback={
                  <div className="space-y-8">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="space-y-4">
                        <Skeleton className="h-10 w-48" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {[1, 2, 3, 4, 5, 6].map((j) => (
                            <Skeleton key={j} className="h-64 w-full" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                }
              >
                <DestinationSections />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
