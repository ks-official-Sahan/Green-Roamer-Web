"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

interface VideoFiltersProps {
  filters: {
    tags: string[]
    country: string
    duration: string
    search: string
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      tags: string[]
      country: string
      duration: string
      search: string
    }>
  >
  countries: string[]
  popularTags: string[]
  resetFilters: () => void
  totalVideos: number
  type: "videos" | "shorts"
}

export function VideoFilters({
  filters,
  setFilters,
  countries,
  popularTags,
  resetFilters,
  totalVideos,
  type,
}: VideoFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(filters.search)

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    setFilters((prev) => ({ ...prev, search: value }))
  }

  const handleTagToggle = (tag: string) => {
    setFilters((prev) => {
      const currentTags = [...prev.tags]
      const tagIndex = currentTags.indexOf(tag)

      if (tagIndex === -1) {
        return { ...prev, tags: [...currentTags, tag] }
      } else {
        currentTags.splice(tagIndex, 1)
        return { ...prev, tags: currentTags }
      }
    })
  }

  const handleCountryChange = (value: string) => {
    setFilters((prev) => ({ ...prev, country: value }))
  }

  const handleDurationChange = (value: string) => {
    setFilters((prev) => ({ ...prev, duration: value }))
  }

  const hasActiveFilters =
    filters.tags.length > 0 || filters.country !== "all" || filters.duration !== "all" || filters.search

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="glass-effect rounded-xl p-6 border border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Filter {type === "videos" ? "Videos" : "Shorts"}</h2>
            <Badge variant="secondary" className="ml-2">
              {totalVideos} results
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Clear All
              </Button>
            )}

            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="md:hidden">
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={`Search ${type}...`}
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchValue && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
              onClick={() => handleSearchChange("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Collapsible Filters */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="md:block">
          <CollapsibleContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Country Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Country</Label>
                <Select value={filters.country} onValueChange={handleCountryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Duration Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Duration</Label>
                <Select value={filters.duration} onValueChange={handleDurationChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Durations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Durations</SelectItem>
                    <SelectItem value="short">Under 1 minute</SelectItem>
                    <SelectItem value="medium">1-10 minutes</SelectItem>
                    <SelectItem value="long">10+ minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Active Filters Count */}
              <div className="flex items-end">
                <div className="text-sm text-muted-foreground">
                  {hasActiveFilters && (
                    <span>
                      {filters.tags.length + (filters.country !== "all" ? 1 : 0) + (filters.duration !== "all" ? 1 : 0)}{" "}
                      active filters
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Popular Tags</Label>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <motion.div key={tag} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Badge
                      variant={filters.tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer transition-colors hover:bg-primary/20"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                      {filters.tags.includes(tag) && <X className="ml-1 h-3 w-3" />}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Active Tags */}
            <AnimatePresence>
              {filters.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/10 pt-4"
                >
                  <Label className="text-sm font-medium mb-2 block">Active Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {filters.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="default"
                        className="cursor-pointer"
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                        <X className="ml-1 h-3 w-3" />
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </motion.div>
  )
}
