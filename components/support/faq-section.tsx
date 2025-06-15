"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { EmptyState } from "@/components/empty-state"

interface FAQSectionProps {
  searchQuery: string
  selectedCategory: string
}

const faqData = [
  {
    id: "1",
    category: "travel",
    question: "What equipment do you use for filming?",
    answer:
      "We use a combination of professional cameras including Sony A7S III, DJI drones for aerial shots, and various lenses for different scenarios. Our audio setup includes wireless microphones and wind protection for outdoor recording.",
  },
  {
    id: "2",
    category: "travel",
    question: "How do you plan your travel routes?",
    answer:
      "We research destinations extensively using local guides, online resources, and recommendations from fellow travelers. We always prioritize safety and environmental responsibility in our route planning.",
  },
  {
    id: "3",
    category: "technical",
    question: "Why won't videos load on my device?",
    answer:
      "This could be due to slow internet connection, browser compatibility issues, or device limitations. Try refreshing the page, clearing your browser cache, or switching to a different browser.",
  },
  {
    id: "4",
    category: "technical",
    question: "How can I improve video quality?",
    answer:
      "Make sure you have a stable internet connection and select the highest quality option available in the video player. For the best experience, we recommend watching on a desktop or tablet with a good internet connection.",
  },
  {
    id: "5",
    category: "community",
    question: "How can I submit my own travel photos?",
    answer:
      "We love seeing photos from our community! You can share your travel photos by tagging us on social media or sending them through our contact form. We feature the best submissions on our community page.",
  },
  {
    id: "6",
    category: "community",
    question: "Can I suggest destinations for future videos?",
    answer:
      "We're always looking for new and exciting destinations to explore. Send us your suggestions through our feedback form or social media channels.",
  },
  {
    id: "7",
    category: "content",
    question: "How often do you upload new videos?",
    answer:
      "We aim to upload new content weekly, but this can vary depending on our travel schedule and the complexity of the content we're creating. Follow us on social media for the latest updates.",
  },
  {
    id: "8",
    category: "content",
    question: "Can I download videos for offline viewing?",
    answer:
      "Currently, we don't offer direct video downloads. However, you can save videos to your watch later playlist and view them when you have an internet connection.",
  },
]

export function FAQSection({ searchQuery, selectedCategory }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const handleValueChange = (value: string[]) => {
    setOpenItems(value)
  }

  if (filteredFAQs.length === 0) {
    return (
      <EmptyState
        title="No FAQs Found"
        description="Try adjusting your search terms or selecting a different category."
        icon={<Search className="h-12 w-12" />}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">
          {filteredFAQs.length} {filteredFAQs.length === 1 ? "question" : "questions"} found
        </p>
      </div>

      <div className="glass-card p-6">
        <Accordion type="multiple" value={openItems} onValueChange={handleValueChange} className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <AccordionItem
                value={faq.id}
                className="border border-border/50 rounded-lg px-6 py-2 bg-background/50 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-xs">
                      {faq.category}
                    </Badge>
                    <span className="font-medium">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </motion.div>
  )
}
