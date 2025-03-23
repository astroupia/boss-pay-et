"use client"

import { formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react"
import type { Notification } from "@/types"

export interface NotificationCardProps {
  notification: Notification
  className?: string
  onClick?: () => void
}

export function NotificationCard({ notification, className, onClick }: NotificationCardProps) {
  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-white" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-white" />
      case "error":
        return <XCircle className="h-5 w-5 text-white" />
      default:
        return <Info className="h-5 w-5 text-white" />
    }
  }

  const getIconBgColor = () => {
    switch (notification.type) {
      case "success":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <button
      className={cn(
        "w-full text-left bg-white rounded-xl p-4 shadow-sm border border-gray-100",
        "transition-all hover:shadow-md",
        notification.read ? "opacity-70" : "",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex gap-3">
        <div className={`h-10 w-10 rounded-full ${getIconBgColor()} flex items-center justify-center shrink-0`}>
          {getIcon()}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{notification.title}</h3>
          {notification.message && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>}
          <p className="text-xs text-gray-500 mt-2">{formatDate(notification.date)}</p>
        </div>
      </div>
    </button>
  )
}

