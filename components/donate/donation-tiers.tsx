"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coffee, Camera, Plane, Star } from "lucide-react"

interface DonationTiersProps {
  onSelectAmount: (amount: number) => void
  customAmount: string
  onCustomAmountChange: (amount: string) => void
}

const donationTiers = [
  {
    amount: 5,
    icon: Coffee,
    title: "Buy us a Coffee",
    description: "Help fuel our early morning hikes",
    color: "from-amber-500 to-orange-500",
  },
  {
    amount: 10,
    icon: Camera,
    title: "Support Our Content",
    description: "Help us create better videos",
    color: "from-blue-500 to-cyan-500",
  },
  {
    amount: 25,
    icon: Plane,
    title: "Fund an Adventure",
    description: "Support our next destination",
    color: "from-green-500 to-emerald-500",
  },
  {
    amount: 50,
    icon: Star,
    title: "Become a Patron",
    description: "Get exclusive behind-the-scenes content",
    color: "from-purple-500 to-pink-500",
    popular: true,
  },
]

export function DonationTiers({ onSelectAmount, customAmount, onCustomAmountChange }: DonationTiersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Choose Your Support Level</h2>
        <p className="text-muted-foreground">Every contribution helps us continue our journey</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {donationTiers.map((tier, index) => (
          <motion.div
            key={tier.amount}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative"
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div
              className={`glass-card p-6 text-center hover:scale-105 transition-all duration-300 ${tier.popular ? "ring-2 ring-primary/50" : ""}`}
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center`}
              >
                <tier.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-bold mb-2">${tier.amount}</h3>
              <h4 className="font-semibold mb-2">{tier.title}</h4>
              <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>

              <Button
                onClick={() => onSelectAmount(tier.amount)}
                className="w-full transition-all duration-300 hover:scale-105"
                variant={tier.popular ? "default" : "outline"}
              >
                Donate ${tier.amount}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass-card p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-center">Custom Amount</h3>
        <div className="flex gap-4 max-w-md mx-auto">
          <div className="flex-1">
            <Label htmlFor="customAmount" className="sr-only">
              Custom donation amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="customAmount"
                type="number"
                min="1"
                step="0.01"
                value={customAmount}
                onChange={(e) => onCustomAmountChange(e.target.value)}
                placeholder="Enter amount"
                className="pl-8"
              />
            </div>
          </div>
          <Button
            onClick={() => onSelectAmount(Number.parseFloat(customAmount) || 0)}
            disabled={!customAmount || Number.parseFloat(customAmount) <= 0}
            className="transition-all duration-300 hover:scale-105"
          >
            Donate
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
