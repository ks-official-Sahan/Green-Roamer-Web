"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCountriesFromVideos, getCountryVideoCount } from "@/lib/destinations-utils"
import { greenRoamerData } from "@/data/green-roamer-data"
import { cn } from "@/lib/utils"

export function CountrySidebar() {
  const [activeCountry, setActiveCountry] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState(false)

  // Get countries from videos
  const countries = getCountriesFromVideos(greenRoamerData.videos)

  // Handle country click
  const handleCountryClick = (country: string) => {
    setActiveCountry(country)

    // Scroll to country section
    const section = document.getElementById(`country-${country.toLowerCase().replace(/\s+/g, "-")}`)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    // Close mobile dropdown
    setMobileExpanded(false)
  }

  // Update active country based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      for (const country of countries) {
        const sectionId = `country-${country.toLowerCase().replace(/\s+/g, "-")}`
        const section = document.getElementById(sectionId)

        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveCountry(country)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [countries])

  return (
    <>
      {/* Mobile Dropdown */}
      <div className="lg:hidden mb-6">
        <Button variant="outline" className="w-full justify-between" onClick={() => setMobileExpanded(!mobileExpanded)}>
          <span className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            {activeCountry || "All Countries"}
          </span>
          <ChevronDown className={cn("h-4 w-4 transition-transform", mobileExpanded && "rotate-180")} />
        </Button>

        {mobileExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 mt-2 w-full"
          >
            <Card className="overflow-hidden border border-border/50 bg-card/80 backdrop-blur-md">
              <CardContent className="p-2">
                <div className="space-y-1">
                  {countries.map((country) => (
                    <Button
                      key={country}
                      variant={activeCountry === country ? "default" : "ghost"}
                      className="w-full justify-between"
                      onClick={() => handleCountryClick(country)}
                    >
                      <span>{country}</span>
                      <Badge variant="outline">{getCountryVideoCount(greenRoamerData.videos, country)}</Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Card className="overflow-hidden border border-border/50 bg-card/30 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Destinations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 p-2">
              {countries.map((country) => (
                <motion.div key={country} whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant={activeCountry === country ? "default" : "ghost"}
                    className="w-full justify-between"
                    onClick={() => handleCountryClick(country)}
                  >
                    <span>{country}</span>
                    <Badge variant="outline">{getCountryVideoCount(greenRoamerData.videos, country)}</Badge>
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
