import { create } from "zustand"
import { persist } from "zustand/middleware"

type UserRole = "admin" | "developer" | "user"

interface User {
  id: string
  username: string
  role: UserRole
  email?: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (username: string, role: UserRole) => string // Returns redirect path
  logout: () => void
  canAccessAdmin: () => boolean
  canAccessDeveloper: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,

      login: (username: string, role: UserRole) => {
        const user: User = {
          id: `user_${Date.now()}`,
          username,
          role,
          email: `${username}@greenroamer.com`,
        }

        set({ isAuthenticated: true, user })

        // Return appropriate redirect path based on role
        if (role === "developer") {
          return "/developer"
        } else if (role === "admin") {
          return "/admin"
        }
        return "/"
      },

      logout: () => {
        set({ isAuthenticated: false, user: null })
      },

      canAccessAdmin: () => {
        const { user } = get()
        return user?.role === "admin" || user?.role === "developer"
      },

      canAccessDeveloper: () => {
        const { user } = get()
        return user?.role === "developer"
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
