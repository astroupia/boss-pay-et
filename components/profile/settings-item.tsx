"use client"

import type React from "react"

import { Switch } from "@/components/ui/switch"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

type SettingsItemType = "link" | "toggle" | "info"

interface SettingsItemProps {
  icon: React.ReactNode
  label: string
  type: SettingsItemType
  value?: boolean
  onChange?: (value: boolean) => void
  onClick?: () => void
  rightText?: string
  description?: string
}

export function SettingsItem({
  icon,
  label,
  type,
  value,
  onChange,
  onClick,
  rightText,
  description,
}: SettingsItemProps) {
  const renderRightElement = () => {
    switch (type) {
      case "toggle":
        return <Switch checked={value} onCheckedChange={onChange} />
      case "link":
        return rightText ? (
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">{rightText}</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-400" />
        )
      case "info":
        return <span className="text-sm text-gray-500">{rightText}</span>
      default:
        return null
    }
  }

  return (
    <motion.div
      whileTap={type === "link" ? { scale: 0.98 } : undefined}
      onClick={type === "link" ? onClick : undefined}
      className={`bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center justify-between shadow-sm border border-gray-100 dark:border-gray-700 ${
        type === "link" ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <div className="font-medium dark:text-white">{label}</div>
          {description && <div className="text-sm text-gray-500 dark:text-gray-400">{description}</div>}
        </div>
      </div>
      {renderRightElement()}
    </motion.div>
  )
}

