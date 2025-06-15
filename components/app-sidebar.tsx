"use client"

import { Home, Search, Video, Camera, MapPin, Info, Contact, Heart, DollarSign, Code, Shield } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { greenRoamerData } from "@/data/green-roamer-data"
import { cn } from "@/lib/utils"

// Menu items
const mainItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Explore",
    url: "/explore",
    icon: Search,
  },
  {
    title: "Videos",
    url: "/videos",
    icon: Video,
  },
  {
    title: "Shorts",
    url: "/shorts",
    icon: Camera,
  },
  {
    title: "Destinations",
    url: "/destinations",
    icon: MapPin,
  },
]

const secondaryItems = [
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
  {
    title: "Contact",
    url: "/contact",
    icon: Contact,
  },
  {
    title: "Support",
    url: "/support",
    icon: Heart,
  },
  {
    title: "Donate",
    url: "/donate",
    icon: DollarSign,
  },
]

const hiddenItems = [
  {
    title: "Developer",
    url: "/developer",
    icon: Code,
  },
  {
    title: "Admin",
    url: "/admin",
    icon: Shield,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  const sidebarVariants = {
    closed: {
      width: "64px",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      width: "240px",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  }

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: 0.1,
      },
    },
  }

  return (
    <Sidebar collapsible="icon" className="glass-effect border-r border-white/10 dark:border-white/5">
      <SidebarHeader className="border-b border-white/10 dark:border-white/5 p-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage
                src={greenRoamerData.channelInfo.profileImage || "/placeholder.svg"}
                alt={greenRoamerData.channelInfo.title}
              />
              <AvatarFallback className="bg-primary/10 text-primary">GR</AvatarFallback>
            </Avatar>
          </motion.div>
          <motion.div
            className="group-data-[collapsible=icon]:hidden"
            variants={menuItemVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <h2 className="text-lg font-semibold text-gradient">Green Roamer</h2>
            <p className="text-sm text-muted-foreground">Travel & Adventure</p>
          </motion.div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={cn(
                      "transition-all duration-300",
                      pathname === item.url ? "bg-accent/20 text-accent hover:bg-accent/30" : "hover:bg-accent/10",
                    )}
                  >
                    <Link href={item.url} className="focus-visible">
                      <item.icon
                        className={cn("transition-transform duration-300", pathname === item.url && "text-accent")}
                      />
                      <motion.span variants={menuItemVariants} initial="closed" animate="open" exit="closed">
                        {item.title}
                      </motion.span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Community</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={cn(
                      "transition-all duration-300",
                      pathname === item.url ? "bg-accent/20 text-accent hover:bg-accent/30" : "hover:bg-accent/10",
                    )}
                  >
                    <Link href={item.url} className="focus-visible">
                      <item.icon
                        className={cn("transition-transform duration-300", pathname === item.url && "text-accent")}
                      />
                      <motion.span variants={menuItemVariants} initial="closed" animate="open" exit="closed">
                        {item.title}
                      </motion.span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {hiddenItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={cn(
                      "transition-all duration-300",
                      pathname === item.url ? "bg-accent/20 text-accent hover:bg-accent/30" : "hover:bg-accent/10",
                    )}
                  >
                    <Link href={item.url} className="focus-visible">
                      <item.icon
                        className={cn("transition-transform duration-300", pathname === item.url && "text-accent")}
                      />
                      <motion.span variants={menuItemVariants} initial="closed" animate="open" exit="closed">
                        {item.title}
                      </motion.span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 dark:border-white/5 p-4">
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <motion.div
            className="group-data-[collapsible=icon]:hidden"
            variants={menuItemVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <p className="text-xs text-muted-foreground">© 2024 Green Roamer</p>
          </motion.div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
