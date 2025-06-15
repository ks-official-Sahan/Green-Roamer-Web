"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type React from "react"

interface BentoGridProps {
  className?: string
  children?: React.ReactNode
}

interface BentoGridItemProps {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
  children?: React.ReactNode
}

export const BentoGrid = ({ className, children }: BentoGridProps) => {
  return (
    <div className={cn("grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto", className)}>
      {children}
    </div>
  )
}

export const BentoGridItem = ({ className, title, description, header, icon, children }: BentoGridItemProps) => {
  return (
    <motion.div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        "glass-effect border-white/20 hover:border-white/30",
        className,
      )}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">{title}</div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">{description}</div>
        {children}
      </div>
    </motion.div>
  )
}
