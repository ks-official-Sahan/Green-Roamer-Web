"use client"

import { useEffect, useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { useMediaQuery } from "@/hooks/use-media-query"

interface LenisProviderProps {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  const pathname = usePathname()
  const [lenis, setLenis] = useState<any>(null)
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const initLenis = async () => {
      const Lenis = (await import("lenis")).default

      const instance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      })

      function raf(time: number) {
        instance.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
      setLenis(instance)

      return instance
    }

    const lenisInstance = initLenis()

    return () => {
      lenisInstance.then((instance) => {
        if (instance) {
          instance.destroy()
        }
      })
    }
  }, [prefersReducedMotion])

  // Reset scroll position on route change
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
  }, [pathname, lenis])

  return <>{children}</>
}
