"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Clock, Globe, Camera } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    description: "Based in Sri Lanka, Traveling across Europe",
    details: "Currently exploring the beautiful landscapes of both regions",
  },
  {
    icon: Mail,
    title: "Email",
    description: "hello@greenroamer.com",
    details: "We typically respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Phone",
    description: "+94 123 456 789",
    details: "Available during Sri Lankan business hours",
  },
  {
    icon: Clock,
    title: "Response Time",
    description: "24-48 hours",
    details: "We're often in remote locations, but we'll get back to you!",
  },
  {
    icon: Globe,
    title: "Social Media",
    description: "@GreenRoamer",
    details: "Follow our adventures on all platforms",
  },
  {
    icon: Camera,
    title: "Media Inquiries",
    description: "Press & Collaborations",
    details: "For media requests and partnership opportunities",
  },
]

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
        <p className="text-muted-foreground mb-8">
          We're passionate about sharing our travel experiences and connecting with fellow adventurers. Whether you have
          questions, feedback, or collaboration ideas, we'd love to hear from you.
        </p>

        <div className="space-y-6">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-primary font-medium">{item.description}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.details}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="glass-card p-6 text-center"
      >
        <h3 className="text-lg font-semibold mb-2">Quick Response Guarantee</h3>
        <p className="text-muted-foreground text-sm">
          We're committed to responding to all inquiries within 24-48 hours, even when we're exploring remote
          destinations!
        </p>
      </motion.div>
    </motion.div>
  )
}
