"use client"

import { MenuItem } from "@/components/ui/menu-item"
import { SectionTitle } from "@/components/ui/section-title"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { User, CreditCard, Bell, Shield, HelpCircle, LogOut, Moon, Languages } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "@/contexts/theme-context"
import { AppLayout } from "@/components/layout/app-layout"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { motion } from "framer-motion"
import { AnimatedCard } from "@/components/ui/animated-card"

export default function SettingsPage() {
  const { user, logout, loading } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await logout()
  }

  if (loading) {
    return (
      <AppLayout title="Settings" activeNavItem="more">
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner size="lg" />
        </div>
      </AppLayout>
    )
  }

  if (!user) {
    return null
  }

  return (
    <AppLayout title="Settings" activeNavItem="more" contentClassName="bg-[#fff5f1] dark:bg-gray-900">
      <div className="p-4 space-y-6">
        {/* Profile Section */}
        <AnimatedCard className="p-4 flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-[#f8d0bc]">
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name} />
            ) : (
              <AvatarFallback className="bg-[#f8d0bc] text-[#0a0b25] text-xl">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>

          <div>
            <h2 className="font-medium text-lg dark:text-white">{user.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
          </div>
        </AnimatedCard>

        {/* Account Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <SectionTitle title="Account" className="text-gray-600 dark:text-gray-400" />
          <div className="space-y-3">
            <MenuItem
              icon={<User className="h-5 w-5 text-[#0a0b25] dark:text-[#f8d0bc]" />}
              label="Personal Information"
              href="/profile/edit"
            />
            <MenuItem
              icon={<CreditCard className="h-5 w-5 text-[#0a0b25] dark:text-[#f8d0bc]" />}
              label="Payment Methods"
              href="/cards"
            />
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <SectionTitle title="Preferences" className="text-gray-600 dark:text-gray-400" />
          <div className="space-y-3">
            <AnimatedCard className="flex items-center justify-between p-4" delay={0.1}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-[#f8d0bc] flex items-center justify-center">
                  <Moon className="h-5 w-5 text-[#0a0b25]" />
                </div>
                <span className="font-medium dark:text-white">Dark Mode</span>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
            </AnimatedCard>

            <AnimatedCard className="flex items-center justify-between p-4" delay={0.15}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-[#f8d0bc] flex items-center justify-center">
                  <Bell className="h-5 w-5 text-[#0a0b25]" />
                </div>
                <span className="font-medium dark:text-white">Notifications</span>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </AnimatedCard>

            <MenuItem
              icon={<Languages className="h-5 w-5 text-[#0a0b25] dark:text-[#f8d0bc]" />}
              label="Language"
              href="/profile/language"
              rightElement={<span className="text-gray-500 dark:text-gray-400">English</span>}
            />
          </div>
        </motion.div>

        {/* Support & Security */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <SectionTitle title="Support & Security" className="text-gray-600 dark:text-gray-400" />
          <div className="space-y-3">
            <MenuItem
              icon={<Shield className="h-5 w-5 text-[#0a0b25] dark:text-[#f8d0bc]" />}
              label="Security"
              href="/profile/security"
            />
            <MenuItem
              icon={<HelpCircle className="h-5 w-5 text-[#0a0b25] dark:text-[#f8d0bc]" />}
              label="Help & Support"
              href="/profile/support"
            />
            <MenuItem
              icon={<LogOut className="h-5 w-5 text-red-500" />}
              label={loggingOut ? "Logging out..." : "Log Out"}
              href="#"
              className="text-red-500"
              onClick={handleLogout}
              disabled={loggingOut}
              rightElement={loggingOut ? <LoadingSpinner size="sm" /> : null}
            />
          </div>
        </motion.div>
      </div>
    </AppLayout>
  )
}

