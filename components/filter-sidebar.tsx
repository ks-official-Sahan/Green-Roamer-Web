"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface FilterSidebarProps {
  filters: {
    type: string
    country: string
    tags: string[]
    search: string
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      type: string
      country: string
      tags: string[]
      search: string
    }>
  >
  countries: string[]
  popularTags: string[]
  resetFilters: () => void
  totalVideos: number
  isMobile?: boolean
}

export function FilterSidebar({
  filters,
  setFilters,
  countries,
  popularTags,
  resetFilters,
  totalVideos,
  isMobile = false,
}: FilterSidebarProps) {
  const [searchValue, setSearchValue] = useState(filters.search)

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchValue }))
    }, 300)

    return () => clearTimeout(timer)
  }, [searchValue, setFilters])

  // Handle type change
  const handleTypeChange = (value: string) => {
    setFilters((prev) => ({ ...prev, type: value }))
  }

  // Handle country change
  const handleCountryChange = (value: string) => {
    setFilters((prev) => ({ ...prev, country: value }))
  }

  // Handle tag toggle
  const handleTagToggle = (tag: string) => {
    setFilters((prev) => {
      const currentTags = [...prev.tags]
      const tagIndex = currentTags.indexOf(tag)

      if (tagIndex === -1) {
        // Add tag
        return { ...prev, tags: [...currentTags, tag] }
      } else {
        // Remove tag
        currentTags.splice(tagIndex, 1)
        return { ...prev, tags: currentTags }
      }
    })
  }

  return (
    <motion.div
      initial={isMobile ? { opacity: 0 } : { opacity: 0, x: -20 }}
      animate={isMobile ? { opacity: 1 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-effect rounded-xl p-5 border border-border/50 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2 text-xs">
          Reset
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search videos..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-8"
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={() => setSearchValue("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Content Type</h3>
        <RadioGroup value={filters.type} onValueChange={handleTypeChange} className="space-y-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="cursor-pointer">
              All
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="videos" id="videos" />
            <Label htmlFor="videos" className="cursor-pointer">
              Videos
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="shorts" id="shorts" />
            <Label htmlFor="shorts" className="cursor-pointer">
              Shorts
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium mb-2">Country</h3>
        <RadioGroup value={filters.country} onValueChange={handleCountryChange} className="space-y-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="country-all" />
            <Label htmlFor="country-all" className="cursor-pointer">
              All Countries
            </Label>
          </div>
          {countries.map((country) => (
            <div key={country} className="flex items-center space-x-2">
              <RadioGroupItem value={country} id={`country-${country}`} />
              <Label htmlFor={`country-${country}`} className="cursor-pointer">
                {country}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium mb-2">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <motion.div key={tag} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Badge
                variant={filters.tags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{totalVideos}</span> results
      </div>
    </motion.div>
  )
}
