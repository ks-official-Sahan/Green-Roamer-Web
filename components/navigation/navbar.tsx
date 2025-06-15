"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, LogOut, Settings, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { greenRoamerData } from "@/data/green-roamer-data"
import { useAuthStore } from "@/store/auth-store"
import { cn } from "@/lib/utils"

// Navigation items with proper route structure
const publicNavItems = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Videos", href: "/videos" },
  { name: "Shorts", href: "/shorts" },
  { name: "Destinations", href: "/destinations" },
  { name: "About", href: "/about" },
]

const communityNavItems = [
  { name: "Developer Info", href: "/developer-info" },
  { name: "Feedback", href: "/feedback" },
  { name: "Support", href: "/support" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const { scrollY } = useScroll()
  const { isAuthenticated, user, logout } = useAuthStore()

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDifference = Math.abs(currentScrollY - lastScrollY.current)

      setIsScrolled(currentScrollY > 20)

      // Only hide/show if scroll difference is significant
      if (scrollDifference > 10) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsHidden(true)
        } else {
          setIsHidden(false)
        }
        lastScrollY.current = currentScrollY
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  // Filter restricted items based on user role
  const getRestrictedNavItems = () => {
    const items = []

    if (user?.role === "developer") {
      items.push({ name: "Developer", href: "/developer", role: "developer" as const })
    }

    if (user?.role === "admin" || user?.role === "developer") {
      items.push({ name: "Admin", href: "/admin", role: "admin" as const })
    }

    return items
  }

  const availableRestrictedItems = getRestrictedNavItems()

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isHidden ? -100 : 0,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          opacity: { duration: 0.2 },
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className={cn(
            "border-b border-white/10 dark:border-white/5 shadow-lg dark:shadow-black/20 transition-all duration-300",
            isScrolled
              ? "bg-white/95 dark:bg-black/95 backdrop-blur-md"
              : "bg-white/70 dark:bg-black/70 backdrop-blur-sm",
          )}
        >
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo Section */}
              <Link
                href="/"
                className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Avatar className="h-10 w-10 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                    <AvatarImage
                      src={greenRoamerData.channelInfo.profileImage || "/placeholder.svg?height=40&width=40"}
                      alt={greenRoamerData.channelInfo.title}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">GR</AvatarFallback>
                  </Avatar>
                </motion.div>
                <div className="hidden sm:block">
                  <motion.h1
                    className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Green Roamer
                  </motion.h1>
                  <motion.p
                    className="text-xs text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Travel & Adventure
                  </motion.p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {publicNavItems.map((item) => (
                  <NavLink key={item.name} href={item.href} isActive={pathname === item.href}>
                    {item.name}
                  </NavLink>
                ))}

                {/* Community Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-9 px-3 text-sm font-medium hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300"
                    >
                      Community
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="center"
                    className="w-48 bg-white/95 dark:bg-black/95 backdrop-blur-md border-white/20 dark:border-white/10"
                  >
                    {communityNavItems.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "w-full cursor-pointer transition-colors duration-200",
                            pathname === item.href && "bg-accent/20 text-accent",
                          )}
                        >
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Restricted Items */}
                {availableRestrictedItems.map((item) => (
                  <NavLink key={item.name} href={item.href} isActive={pathname === item.href}>
                    {item.name}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {item.role}
                    </Badge>
                  </NavLink>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <ThemeToggle />

                {/* Support Us Button */}
                <Button
                  variant="default"
                  size="sm"
                  className="hidden sm:inline-flex hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-primary/25"
                  asChild
                >
                  <Link href="/donate">Support Us</Link>
                </Button>

                {/* User Menu */}
                {isAuthenticated && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <User className="h-4 w-4" />
                        <Badge
                          variant="secondary"
                          className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center"
                        >
                          {user?.role?.charAt(0).toUpperCase()}
                        </Badge>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-white/95 dark:bg-black/95 backdrop-blur-md border-white/20 dark:border-white/10"
                    >
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {/* Mobile Menu Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden hover:bg-white/10 dark:hover:bg-white/5"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.div>
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed top-0 left-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white/95 dark:bg-black/95 backdrop-blur-md border-r border-white/20 dark:border-white/10 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={greenRoamerData.channelInfo.profileImage || "/placeholder.svg?height=40&width=40"}
                        alt={greenRoamerData.channelInfo.title}
                      />
                      <AvatarFallback>GR</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Green Roamer
                      </h2>
                      <p className="text-xs text-muted-foreground">Travel & Adventure</p>
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:bg-white/10 dark:hover:bg-white/5"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-6">
                  {/* Main Navigation */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-3">Navigation</h3>
                    <div className="space-y-1">
                      {publicNavItems.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <MobileNavLink
                            href={item.href}
                            isActive={pathname === item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.name}
                          </MobileNavLink>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Community */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-3">Community</h3>
                    <div className="space-y-1">
                      {communityNavItems.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (publicNavItems.length + index) * 0.1 }}
                        >
                          <MobileNavLink
                            href={item.href}
                            isActive={pathname === item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.name}
                          </MobileNavLink>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Restricted Items */}
                  {availableRestrictedItems.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-3">Admin</h3>
                      <div className="space-y-1">
                        {availableRestrictedItems.map((item, index) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (publicNavItems.length + communityNavItems.length + index) * 0.1 }}
                          >
                            <MobileNavLink
                              href={item.href}
                              isActive={pathname === item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.name}
                              <Badge variant="secondary" className="ml-auto text-xs">
                                {item.role}
                              </Badge>
                            </MobileNavLink>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </nav>

                {/* Footer */}
                <div className="space-y-4 pt-6 border-t border-white/10 dark:border-white/5">
                  <Button
                    variant="default"
                    className="w-full shadow-lg hover:shadow-primary/25"
                    asChild
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href="/donate">Support Us</Link>
                  </Button>

                  {isAuthenticated && (
                    <Button variant="outline" className="w-full" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout ({user?.role})
                    </Button>
                  )}

                  <p className="text-xs text-muted-foreground text-center">© 2024 Green Roamer</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Desktop Navigation Link Component
function NavLink({
  href,
  isActive,
  children,
  className,
}: {
  href: string
  isActive: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md",
        className,
      )}
    >
      <motion.div
        className={cn(
          "px-3 py-2 rounded-md text-sm font-medium transition-all duration-300",
          "hover:bg-white/10 dark:hover:bg-white/5 hover:scale-105",
          isActive ? "text-accent bg-accent/10" : "text-muted-foreground hover:text-foreground",
        )}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
        {isActive && (
          <motion.div
            layoutId="navbar-indicator"
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </motion.div>
    </Link>
  )
}

// Mobile Navigation Link Component
function MobileNavLink({
  href,
  isActive,
  children,
  onClick,
}: {
  href: string
  isActive: boolean
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300",
        "hover:bg-white/10 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isActive ? "text-accent bg-accent/10 border-l-2 border-accent" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </Link>
  )
}
