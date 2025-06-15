"use client"

import { motion } from "framer-motion"
import { useAdminStore } from "@/store/admin-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, Clock, MousePointer } from "lucide-react"

export function AnalyticsSummary() {
  const { analytics } = useAdminStore()

  const stats = [
    {
      title: "Total Visits",
      value: analytics.totalVisits.toLocaleString(),
      icon: Users,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      title: "Daily Average",
      value: analytics.dailyAverage.toString(),
      icon: TrendingUp,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
    },
    {
      title: "Avg Session",
      value: analytics.avgSessionDuration,
      icon: Clock,
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
    {
      title: "Bounce Rate",
      value: `${analytics.bounceRate}%`,
      icon: MousePointer,
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="bg-white/10 dark:bg-black/10 border-white/20 backdrop-blur-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            Analytics Summary
          </CardTitle>
          <CardDescription className="text-muted-foreground">Website performance and visitor insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-lg ${stat.bgColor} border ${stat.borderColor} hover:scale-105 transition-transform duration-200`}
              >
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-5 h-5 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                  <span className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Top Page</span>
              <span className="text-sm text-muted-foreground">{analytics.topPage}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Engagement Score</span>
                <span className="text-sm text-muted-foreground">{Math.round(100 - analytics.bounceRate)}%</span>
              </div>
              <Progress value={100 - analytics.bounceRate} className="h-2 bg-white/10" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
