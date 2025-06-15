"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navigation/navbar"
import { SupportHero } from "@/components/support/support-hero"
import { FAQSection } from "@/components/support/faq-section"
import { SupportCategories } from "@/components/support/support-categories"
import { LiveSupportForm } from "@/components/support/live-support-form"
import { FloatingContactButton } from "@/components/support/floating-contact-button"
import { ErrorBoundary } from "@/components/error-boundary"

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <Navbar />
        <main className="relative">
          <SupportHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-padding"
          >
            <div className="container-width">
              <div className="space-y-16">
                <SupportCategories selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

                <FAQSection searchQuery={searchQuery} selectedCategory={selectedCategory} />

                <LiveSupportForm />
              </div>
            </div>
          </motion.section>
        </main>

        <FloatingContactButton />
      </div>
    </ErrorBoundary>
  )
}
