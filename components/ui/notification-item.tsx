"use client"

import type { Notification } from "@/types"
import { formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface NotificationItemProps {
  notification: Notification
  className?: string
  onClick?: () => void
}

export function NotificationItem({ notification, className = "", onClick }: NotificationItemProps) {
  const getIconByType = () => {
    switch (notification.type) {
      case "success":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12L10 17L19 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "warning":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 8V12M12 16H12.01"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "error":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      default:
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 8V12M12 16H12.01"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
    }
  }

  const getColorByType = () => {
    switch (notification.type) {
      case "success":
        return "bg-blue-500"
      case "warning":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <button
      className={cn(
        "bg-white rounded-xl p-4 border border-gray-100 shadow-sm w-full text-left",
        notification.read ? "opacity-70" : "",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex gap-3">
        <div className={`h-6 w-6 rounded-full ${getColorByType()} flex items-center justify-center text-white`}>
          {getIconByType()}
        </div>
        <div className="flex-1">
          <p className="font-medium">{notification.title}</p>
          {notification.message && <p className="text-sm text-gray-600 mt-1">{notification.message}</p>}
          <p className="text-xs text-gray-500 mt-1">{formatDate(notification.date)}</p>
        </div>
      </div>
    </button>
  )
}

