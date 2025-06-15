"use client"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navigation/navbar"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactInfo } from "@/components/contact/contact-info"
import { ErrorBoundary } from "@/components/error-boundary"

export default function ContactPage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <Navbar />
        <main className="relative">
          <ContactHero />

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-padding"
          >
            <div className="container-width">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <ContactForm />
                <ContactInfo />
              </div>
            </div>
          </motion.section>
        </main>
      </div>
    </ErrorBoundary>
  )
}
