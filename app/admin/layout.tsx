import type React from "react"
import { Suspense } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminAuthProvider } from "@/components/admin/admin-auth-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { Toaster } from "@/components/ui/toaster"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ErrorBoundary>
      <AdminAuthProvider>
        <div className="flex min-h-screen flex-col md:flex-row">
          <AdminSidebar />
          <div className="flex-1 overflow-auto">
            <AdminHeader />
            <main className="p-4 md:p-6">
              <Suspense fallback={<AdminSkeleton />}>{children}</Suspense>
            </main>
          </div>
          <Toaster />
        </div>
      </AdminAuthProvider>
    </ErrorBoundary>
  )
}

function AdminSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[300px] rounded-xl" />
        ))}
      </div>
    </div>
  )
}
