"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Mail, Phone } from "lucide-react"

export function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false)

  const contactOptions = [
    {
      icon: Mail,
      label: "Email Support",
      action: () => (window.location.href = "mailto:support@greenroamer.com"),
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Phone,
      label: "Call Us",
      action: () => (window.location.href = "tel:+94123456789"),
      color: "from-green-500 to-green-600",
    },
    {
      icon: MessageCircle,
      label: "Live Chat",
      action: () => {
        // Scroll to live support form
        const form = document.querySelector("[data-live-support]")
        if (form) {
          form.scrollIntoView({ behavior: "smooth" })
        }
      },
      color: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 space-y-3"
          >
            {contactOptions.map((option, index) => (
              <motion.div
                key={option.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={option.action}
                  className={`glass-effect hover:scale-105 transition-all duration-300 bg-gradient-to-r ${option.color} text-white border-0`}
                  size="sm"
                >
                  <option.icon className="w-4 h-4 mr-2" />
                  {option.label}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="w-14 h-14 rounded-full glass-effect hover:scale-110 transition-all duration-300 animate-pulse-glow"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </motion.div>
    </div>
  )
}
