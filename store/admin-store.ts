import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface SiteContent {
  siteName: string
  tagline: string
  heroTitle: string
  heroSubtitle: string
  aboutContent: string
  developerBlurb: string
  footerText: string
}

export interface FeedbackItem {
  id: string
  name: string
  email: string
  category: string
  message: string
  date: string
  isRead: boolean
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "developer" | "user"
  status: "active" | "banned"
  joinDate: string
}

export interface AnalyticsData {
  totalVisits: number
  dailyAverage: number
  topPage: string
  bounceRate: number
  avgSessionDuration: string
}

interface AdminState {
  siteContent: SiteContent
  feedback: FeedbackItem[]
  users: User[]
  analytics: AnalyticsData
  updateSiteContent: (content: Partial<SiteContent>) => void
  markFeedbackAsRead: (id: string) => void
  deleteFeedback: (id: string) => void
  updateUserRole: (id: string, role: "admin" | "developer" | "user") => void
  toggleUserStatus: (id: string) => void
}

const defaultSiteContent: SiteContent = {
  siteName: "Green Roamer",
  tagline: "Unveiling the Natural Beauty of Europe and Sri Lanka",
  heroTitle: "Discover Hidden Gems",
  heroSubtitle: "Join us on breathtaking adventures through Europe's landscapes and Sri Lanka's pristine nature",
  aboutContent:
    "Green Roamer is your gateway to extraordinary hiking experiences that blend the breathtaking beauty of Europe with the enchanting nature of Sri Lanka.",
  developerBlurb:
    "Built with passion by Sahan Sachintha, a full-stack developer dedicated to creating immersive travel experiences.",
  footerText: "© 2024 Green Roamer. All rights reserved. Explore responsibly.",
}

const mockFeedback: FeedbackItem[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    category: "General",
    message: "Amazing content! The hiking guides are incredibly detailed and helpful.",
    date: "2024-01-15",
    isRead: false,
  },
  {
    id: "2",
    name: "Marco Silva",
    email: "marco@example.com",
    category: "Technical",
    message: "The website loads very fast and the design is beautiful. Great work!",
    date: "2024-01-14",
    isRead: true,
  },
  {
    id: "3",
    name: "Emma Chen",
    email: "emma@example.com",
    category: "Content",
    message: "Would love to see more content about winter hiking in the Alps.",
    date: "2024-01-13",
    isRead: false,
  },
]

const mockUsers: User[] = [
  {
    id: "1",
    name: "Sahan Sachintha",
    email: "sahan@greenroamer.com",
    role: "developer",
    status: "active",
    joinDate: "2023-12-01",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@greenroamer.com",
    role: "admin",
    status: "active",
    joinDate: "2023-12-01",
  },
  {
    id: "3",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "active",
    joinDate: "2024-01-10",
  },
]

const mockAnalytics: AnalyticsData = {
  totalVisits: 12847,
  dailyAverage: 342,
  topPage: "/destinations",
  bounceRate: 23.4,
  avgSessionDuration: "4m 32s",
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      siteContent: defaultSiteContent,
      feedback: mockFeedback,
      users: mockUsers,
      analytics: mockAnalytics,

      updateSiteContent: (content) => {
        set((state) => ({
          siteContent: { ...state.siteContent, ...content },
        }))
      },

      markFeedbackAsRead: (id) => {
        set((state) => ({
          feedback: state.feedback.map((item) => (item.id === id ? { ...item, isRead: true } : item)),
        }))
      },

      deleteFeedback: (id) => {
        set((state) => ({
          feedback: state.feedback.filter((item) => item.id !== id),
        }))
      },

      updateUserRole: (id, role) => {
        set((state) => ({
          users: state.users.map((user) => (user.id === id ? { ...user, role } : user)),
        }))
      },

      toggleUserStatus: (id) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, status: user.status === "active" ? "banned" : "active" } : user,
          ),
        }))
      },
    }),
    {
      name: "admin-storage",
    },
  ),
)
