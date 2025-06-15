"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navigation/navbar"
import { DonateHero } from "@/components/donate/donate-hero"
import { DonationTiers } from "@/components/donate/donation-tiers"
import { PaymentOptions } from "@/components/donate/payment-options"
import { DonationModal } from "@/components/donate/donation-modal"
import { ErrorBoundary } from "@/components/error-boundary"

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(0)
  const [customAmount, setCustomAmount] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [donationMessage, setDonationMessage] = useState("")

  const handleDonate = (amount: number) => {
    setSelectedAmount(amount)
    setShowModal(true)
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <Navbar />
        <main className="relative">
          <DonateHero />

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-padding"
          >
            <div className="container-width">
              <div className="max-w-4xl mx-auto space-y-12">
                <DonationTiers
                  onSelectAmount={handleDonate}
                  customAmount={customAmount}
                  onCustomAmountChange={setCustomAmount}
                />

                <PaymentOptions />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="glass-card p-6"
                >
                  <h3 className="text-xl font-semibold mb-4">Add a Message (Optional)</h3>
                  <textarea
                    value={donationMessage}
                    onChange={(e) => setDonationMessage(e.target.value)}
                    placeholder="Share why you're supporting Green Roamer..."
                    className="w-full h-32 p-4 rounded-lg border border-border bg-background/50 backdrop-blur-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  />
                </motion.div>
              </div>
            </div>
          </motion.section>
        </main>

        <DonationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          amount={selectedAmount || Number.parseFloat(customAmount) || 0}
          message={donationMessage}
        />
      </div>
    </ErrorBoundary>
  )
}
