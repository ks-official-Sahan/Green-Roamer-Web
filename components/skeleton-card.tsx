import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonCardProps {
  variant?: "video" | "destination" | "article" | "compact"
}

export function SkeletonCard({ variant = "video" }: SkeletonCardProps) {
  if (variant === "compact") {
    return (
      <Card className="overflow-hidden border border-border/40 bg-card/30 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === "destination") {
    return (
      <Card className="overflow-hidden border border-border/40 bg-card/30 backdrop-blur-sm">
        <div className="aspect-[4/3] bg-muted/50 relative">
          <Skeleton className="h-full w-full" />
          <div className="absolute bottom-4 left-4 right-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
        <CardContent className="p-4">
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === "article") {
    return (
      <Card className="overflow-hidden border border-border/40 bg-card/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex items-center gap-4 pt-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Default video variant
  return (
    <Card className="overflow-hidden border border-border/40 bg-card/30 backdrop-blur-sm">
      <div className="aspect-video bg-muted/50 relative">
        <Skeleton className="h-full w-full" />
        {/* Duration placeholder */}
        <div className="absolute bottom-2 right-2">
          <Skeleton className="h-5 w-12 rounded" />
        </div>
        {/* Play button placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex items-center gap-2 mt-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="flex gap-1 mt-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
