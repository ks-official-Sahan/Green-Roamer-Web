"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useAuthStore } from "@/store/auth-store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart3,
  FileText,
  Home,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  Video,
  Code,
  Database,
  Globe,
  Shield,
  Menu,
  X,
} from "lucide-react"

interface SidebarLink {
  title: string
  href: string
  icon: React.ElementType
  roles: Array<"admin" | "developer">
}

const links: SidebarLink[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["admin", "developer"],
  },
  {
    title: "Content",
    href: "/admin/content",
    icon: FileText,
    roles: ["admin", "developer"],
  },
  {
    title: "Media",
    href: "/admin/media",
    icon: ImageIcon,
    roles: ["admin", "developer"],
  },
  {
    title: "Videos",
    href: "/admin/videos",
    icon: Video,
    roles: ["admin", "developer"],
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    roles: ["admin", "developer"],
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
    roles: ["admin", "developer"],
  },
  {
    title: "Comments",
    href: "/admin/comments",
    icon: MessageSquare,
    roles: ["admin", "developer"],
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["admin", "developer"],
  },
  {
    title: "Developer Portal",
    href: "/admin/developer",
    icon: Code,
    roles: ["developer"],
  },
  {
    title: "Database",
    href: "/admin/developer/database",
    icon: Database,
    roles: ["developer"],
  },
  {
    title: "API",
    href: "/admin/developer/api",
    icon: Globe,
    roles: ["developer"],
  },
  {
    title: "Security",
    href: "/admin/developer/security",
    icon: Shield,
    roles: ["developer"],
  },
]

export function AdminSidebar() {
  const { userRole } = useAuthStore()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const filteredLinks = links.filter((link) => link.roles.includes(userRole as "admin" | "developer"))

  const sidebarVariants = {
    open: {
      width: "240px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      width: "0px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-3 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r bg-background md:relative md:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary" />
            <span className="text-lg font-semibold">Green Roamer</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-4 py-6">
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              className="mb-6 flex items-center gap-2 px-2 py-1 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-4 w-4" />
              <span>Back to Site</span>
            </Link>

            {filteredLinks.map((link) => {
              const isActive = pathname === link.href

              return (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                  <span
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      isActive ? "bg-accent text-accent-foreground" : "transparent",
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.title}</span>
                  </span>
                </Link>
              )
            })}
          </nav>
        </ScrollArea>
        <div className="mt-auto border-t p-4">
          <p className="text-xs text-muted-foreground">&copy; 2024 Green Roamer</p>
        </div>
      </motion.aside>
    </>
  )
}
