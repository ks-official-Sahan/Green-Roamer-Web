import { SkeletonCard } from "@/components/skeleton-card"

interface SkeletonGridProps {
  count?: number
  variant?: "video" | "destination" | "article" | "compact"
  columns?: {
    default: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

export function SkeletonGrid({
  count = 9,
  variant = "video",
  columns = { default: 1, sm: 2, md: 2, lg: 3 },
}: SkeletonGridProps) {
  const getGridClasses = () => {
    const { default: def, sm, md, lg, xl } = columns
    let classes = `grid grid-cols-${def}`

    if (sm) classes += ` sm:grid-cols-${sm}`
    if (md) classes += ` md:grid-cols-${md}`
    if (lg) classes += ` lg:grid-cols-${lg}`
    if (xl) classes += ` xl:grid-cols-${xl}`

    return `${classes} gap-6`
  }

  return (
    <div className={getGridClasses()}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} variant={variant} />
      ))}
    </div>
  )
}
