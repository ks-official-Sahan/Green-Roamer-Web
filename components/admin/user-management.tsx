"use client"

import { motion } from "framer-motion"
import { useAdminStore } from "@/store/admin-store"
import { useAuthStore } from "@/store/auth-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Users, Shield, Ban } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function UserManagement() {
  const { users, updateUserRole, toggleUserStatus } = useAdminStore()
  const { userRole } = useAuthStore()
  const { toast } = useToast()

  // Only show to developers
  if (userRole !== "developer") {
    return null
  }

  const handleRoleChange = (userId: string, newRole: "admin" | "developer" | "user") => {
    updateUserRole(userId, newRole)
    toast({
      title: "Role Updated",
      description: `User role has been updated to ${newRole}.`,
    })
  }

  const handleStatusToggle = (userId: string) => {
    toggleUserStatus(userId)
    toast({
      title: "Status Updated",
      description: "User status has been updated.",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-white/10 dark:bg-black/10 border-white/20 backdrop-blur-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent flex items-center gap-2">
            <Users className="w-6 h-6 text-orange-400" />
            User Management
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage user roles and permissions (Developer Only)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Joined {formatDistanceToNow(new Date(user.joinDate), { addSuffix: true })}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Role Selector */}
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <Select
                        value={user.role}
                        onValueChange={(value: "admin" | "developer" | "user") => handleRoleChange(user.id, value)}
                      >
                        <SelectTrigger className="w-32 bg-white/5 border-white/10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="developer">Developer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Status Badge */}
                    <Badge
                      variant={user.status === "active" ? "default" : "destructive"}
                      className={
                        user.status === "active"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }
                    >
                      {user.status}
                    </Badge>

                    {/* Status Toggle */}
                    <div className="flex items-center gap-2">
                      <Ban className="w-4 h-4 text-muted-foreground" />
                      <Switch
                        checked={user.status === "active"}
                        onCheckedChange={() => handleStatusToggle(user.id)}
                        className="data-[state=checked]:bg-green-500"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
