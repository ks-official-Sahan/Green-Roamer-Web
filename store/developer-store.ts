import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Snapshot {
  id: string
  name: string
  description: string
  createdAt: Date
  createdBy: string
  version: string
}

export interface VisitorData {
  count: number
  currentPage: string
  isConnected: boolean
  recentActivity: Array<{
    id: string
    page: string
    timestamp: Date
    action: string
  }>
}

export interface LogEntry {
  id: string
  type: "info" | "warn" | "error" | "success"
  message: string
  timestamp: Date
}

export interface EnvVariable {
  key: string
  value: string
  isSecret: boolean
  isVisible: boolean
}

export interface SEOData {
  route: string
  title: string
  description: string
  ogImage: string
}

export interface DeploymentStatus {
  isBuilding: boolean
  buildProgress: number
  lastDeployment: Date | null
  status: "idle" | "building" | "success" | "failed"
}

interface DeveloperStore {
  // Snapshots
  snapshots: Snapshot[]
  createSnapshot: (name: string, description: string) => void
  revertToSnapshot: (id: string) => void

  // Visitors
  visitorData: VisitorData
  toggleConnection: () => void
  updateVisitorCount: (count: number) => void

  // System Logs
  logs: LogEntry[]
  addLog: (type: LogEntry["type"], message: string) => void
  clearLogs: () => void

  // Environment Variables
  envVars: EnvVariable[]
  toggleEnvVisibility: (key: string) => void

  // SEO Management
  seoData: SEOData[]
  updateSEO: (route: string, data: Partial<SEOData>) => void

  // Page Visibility
  pageVisibility: Record<string, boolean>
  togglePageVisibility: (page: string) => void

  // Maintenance Mode - Fixed structure
  maintenanceMode: {
    global: boolean
  }
  pageMaintenanceMode: Record<string, boolean>
  toggleMaintenanceMode: () => void
  togglePageMaintenance: (page: string) => void

  // API Controls
  apiStatus: {
    supabase: boolean
    websocket: boolean
    latency: number
  }
  toggleService: (service: "supabase" | "websocket") => void

  // Deployment
  deployment: DeploymentStatus
  triggerBuild: () => void
  resetDeployment: () => void
}

export const useDeveloperStore = create<DeveloperStore>()(
  persist(
    (set, get) => ({
      // Initial snapshots with proper Date objects
      snapshots: [
        {
          id: "1",
          name: "Initial Setup",
          description: "First snapshot after initial configuration",
          createdAt: new Date("2024-01-15T10:00:00Z"),
          createdBy: "developer",
          version: "1.0.0",
        },
        {
          id: "2",
          name: "Pre-launch",
          description: "Configuration before going live",
          createdAt: new Date("2024-01-20T14:30:00Z"),
          createdBy: "developer",
          version: "1.1.0",
        },
      ],

      createSnapshot: (name: string, description: string) => {
        const newSnapshot: Snapshot = {
          id: Date.now().toString(),
          name,
          description,
          createdAt: new Date(),
          createdBy: "developer",
          version: `1.${get().snapshots.length + 1}.0`,
        }
        set((state) => ({
          snapshots: [...state.snapshots, newSnapshot],
        }))
      },

      revertToSnapshot: (id: string) => {
        // Mock revert functionality
        console.log(`Reverting to snapshot ${id}`)
      },

      // Visitor data
      visitorData: {
        count: 42,
        currentPage: "/developer",
        isConnected: true,
        recentActivity: [
          {
            id: "1",
            page: "/developer",
            timestamp: new Date(),
            action: "page_view",
          },
          {
            id: "2",
            page: "/admin",
            timestamp: new Date(Date.now() - 300000),
            action: "page_view",
          },
        ],
      },

      toggleConnection: () => {
        set((state) => ({
          visitorData: {
            ...state.visitorData,
            isConnected: !state.visitorData.isConnected,
          },
        }))
      },

      updateVisitorCount: (count: number) => {
        set((state) => ({
          visitorData: {
            ...state.visitorData,
            count,
          },
        }))
      },

      // System logs
      logs: [
        {
          id: "1",
          type: "info",
          message: "System initialized successfully",
          timestamp: new Date(),
        },
        {
          id: "2",
          type: "success",
          message: "Database connection established",
          timestamp: new Date(Date.now() - 60000),
        },
        {
          id: "3",
          type: "warn",
          message: "High memory usage detected",
          timestamp: new Date(Date.now() - 120000),
        },
      ],

      addLog: (type: LogEntry["type"], message: string) => {
        const newLog: LogEntry = {
          id: Date.now().toString(),
          type,
          message,
          timestamp: new Date(),
        }
        set((state) => ({
          logs: [newLog, ...state.logs].slice(0, 100), // Keep only last 100 logs
        }))
      },

      clearLogs: () => {
        set({ logs: [] })
      },

      // Environment variables
      envVars: [
        { key: "NEXT_PUBLIC_API_URL", value: "https://api.greenroamer.com", isSecret: false, isVisible: true },
        { key: "DATABASE_URL", value: "postgresql://...", isSecret: true, isVisible: false },
        { key: "SUPABASE_URL", value: "https://project.supabase.co", isSecret: false, isVisible: true },
        { key: "SUPABASE_ANON_KEY", value: "eyJ...", isSecret: true, isVisible: false },
        { key: "STRIPE_SECRET_KEY", value: "sk_test_...", isSecret: true, isVisible: false },
      ],

      toggleEnvVisibility: (key: string) => {
        set((state) => ({
          envVars: state.envVars.map((env) => (env.key === key ? { ...env, isVisible: !env.isVisible } : env)),
        }))
      },

      // SEO data
      seoData: [
        {
          route: "/",
          title: "Green Roamer - Sustainable Travel Adventures",
          description: "Discover eco-friendly travel destinations and sustainable tourism practices.",
          ogImage: "/images/og-home.jpg",
        },
        {
          route: "/videos",
          title: "Travel Videos - Green Roamer",
          description: "Watch inspiring travel videos showcasing sustainable destinations.",
          ogImage: "/images/og-videos.jpg",
        },
        {
          route: "/destinations",
          title: "Eco Destinations - Green Roamer",
          description: "Explore our curated list of sustainable travel destinations.",
          ogImage: "/images/og-destinations.jpg",
        },
      ],

      updateSEO: (route: string, data: Partial<SEOData>) => {
        set((state) => ({
          seoData: state.seoData.map((seo) => (seo.route === route ? { ...seo, ...data } : seo)),
        }))
      },

      // Page visibility
      pageVisibility: {
        "/": true,
        "/videos": true,
        "/destinations": true,
        "/shorts": true,
        "/about": true,
        "/contact": true,
        "/donate": true,
        "/support": true,
        "/feedback": true,
      },

      togglePageVisibility: (page: string) => {
        set((state) => ({
          pageVisibility: {
            ...state.pageVisibility,
            [page]: !state.pageVisibility[page],
          },
        }))
      },

      // Maintenance mode - Fixed structure
      maintenanceMode: {
        global: false,
      },

      pageMaintenanceMode: {
        donate: false,
        shorts: false,
        videos: false,
        explore: false,
        contact: false,
        support: false,
      },

      toggleMaintenanceMode: () => {
        set((state) => ({
          maintenanceMode: {
            ...state.maintenanceMode,
            global: !state.maintenanceMode.global,
          },
        }))
      },

      togglePageMaintenance: (page: string) => {
        set((state) => ({
          pageMaintenanceMode: {
            ...state.pageMaintenanceMode,
            [page]: !state.pageMaintenanceMode[page],
          },
        }))
      },

      // API status
      apiStatus: {
        supabase: true,
        websocket: true,
        latency: 45,
      },

      toggleService: (service: "supabase" | "websocket") => {
        set((state) => ({
          apiStatus: {
            ...state.apiStatus,
            [service]: !state.apiStatus[service],
          },
        }))
      },

      // Deployment
      deployment: {
        isBuilding: false,
        buildProgress: 0,
        lastDeployment: new Date(Date.now() - 3600000), // 1 hour ago
        status: "idle",
      },

      triggerBuild: () => {
        set((state) => ({
          deployment: {
            ...state.deployment,
            isBuilding: true,
            buildProgress: 0,
            status: "building",
          },
        }))

        // Simulate build progress
        const interval = setInterval(() => {
          const current = get()
          if (current.deployment.buildProgress >= 100) {
            clearInterval(interval)
            set((state) => ({
              deployment: {
                ...state.deployment,
                isBuilding: false,
                buildProgress: 100,
                status: "success",
                lastDeployment: new Date(),
              },
            }))
          } else {
            set((state) => ({
              deployment: {
                ...state.deployment,
                buildProgress: Math.min(state.deployment.buildProgress + 10, 100),
              },
            }))
          }
        }, 500)
      },

      resetDeployment: () => {
        set((state) => ({
          deployment: {
            ...state.deployment,
            isBuilding: false,
            buildProgress: 0,
            status: "idle",
          },
        }))
      },
    }),
    {
      name: "developer-store",
      // Custom serialization to handle Date objects
      serialize: (state) => {
        return JSON.stringify(state, (key, value) => {
          if (value instanceof Date) {
            return { __type: "Date", value: value.toISOString() }
          }
          return value
        })
      },
      deserialize: (str) => {
        return JSON.parse(str, (key, value) => {
          if (value && typeof value === "object" && value.__type === "Date") {
            return new Date(value.value)
          }
          return value
        })
      },
    },
  ),
)
