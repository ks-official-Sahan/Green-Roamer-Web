"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface NetworkStatusContextType {
  isOnline: boolean
}

const NetworkStatusContext = createContext<NetworkStatusContextType>({ isOnline: true })

export function useNetworkStatus() {
  return useContext(NetworkStatusContext)
}

export function NetworkStatusProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine)

    // Add event listeners
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return <NetworkStatusContext.Provider value={{ isOnline }}>{children}</NetworkStatusContext.Provider>
}
