"use client"

import { motion } from "framer-motion"
import { Plane, Settings, Users, Camera, Globe, MessageCircle } from "lucide-react"

interface SupportCategoriesProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const categories = [
  {
    id: "all",
    name: "All Topics",
    icon: Globe,
    color: "from-blue-500 to-blue-600",
    count: 24,
  },
  {
    id: "travel",
    name: "Travel & Destinations",
    icon: Plane,
    color: "from-green-500 to-green-600",
    count: 8,
  },
  {
    id: "technical",
    name: "Technical Issues",
    icon: Settings,
    color: "from-red-500 to-red-600",
    count: 6,
  },
  {
    id: "community",
    name: "Community",
    icon: Users,
    color: "from-purple-500 to-purple-600",
    count: 5,
  },
  {
    id: "content",
    name: "Content & Videos",
    icon: Camera,
    color: "from-yellow-500 to-yellow-600",
    count: 3,
  },
  {
    id: "feedback",
    name: "Feedback",
    icon: MessageCircle,
    color: "from-pink-500 to-pink-600",
    count: 2,
  },
]

export function SupportCategories({ selectedCategory, onCategoryChange }: SupportCategoriesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
        <p className="text-muted-foreground">Find help topics organized by category</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => onCategoryChange(category.id)}
            className={`glass-card p-6 text-left hover:scale-105 transition-all duration-300 ${
              selectedCategory === category.id ? "ring-2 ring-primary/50" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}
              >
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-muted-foreground">{category.count} articles</span>
            </div>

            <h3 className="font-semibold text-foreground">{category.name}</h3>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
