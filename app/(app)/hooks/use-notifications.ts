"use client"

import { useState, useEffect } from "react"
import type { Notification } from "@/types"

// Mock data for notifications
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Your loan application has been approved!",
    date: "2023-04-12T12:47:00",
    type: "success",
    read: false,
  },
  {
    id: "2",
    title: "The loan repayment period expires!",
    message: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    date: "2023-04-12T12:47:00",
    type: "warning",
    read: false,
  },
  {
    id: "3",
    title: "Your loan application was rejected!",
    message: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    date: "2023-04-12T12:47:00",
    type: "error",
    read: false,
  },
  {
    id: "4",
    title: "Your piggy bank is full!",
    date: "2023-04-12T12:47:00",
    type: "success",
    read: false,
  },
]

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [unreadCount, setUnreadCount] = useState(0)

  // Load read status from localStorage
  const getStoredReadStatus = () => {
    try {
      const stored = localStorage.getItem('notification-read-status')
      return stored ? JSON.parse(stored) : {}
    } catch (err) {
      return {}
    }
  }

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Get stored read status
        const readStatus = getStoredReadStatus()
        
        // Apply stored read status to mock notifications
        const notificationsWithStatus = mockNotifications.map(notification => ({
          ...notification,
          read: readStatus[notification.id] || notification.read
        }))

        setNotifications(notificationsWithStatus)
        setUnreadCount(notificationsWithStatus.filter((n) => !n.read).length)
        setLoading(false)
      } catch (err) {
        setError("Failed to load notifications")
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((notification) => 
        notification.id === id ? { ...notification, read: true } : notification
      )
      
      // Store read status
      const readStatus = getStoredReadStatus()
      localStorage.setItem('notification-read-status', JSON.stringify({
        ...readStatus,
        [id]: true
      }))
      
      return updated
    })

    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((notification) => ({ ...notification, read: true }))
      
      // Store all as read
      const readStatus = prev.reduce((acc, notification) => ({
        ...acc,
        [notification.id]: true
      }), {})
      localStorage.setItem('notification-read-status', JSON.stringify(readStatus))
      
      return updated
    })

    setUnreadCount(0)
  }

  return {
    notifications,
    loading,
    error,
    unreadCount,
    markAsRead,
    markAllAsRead,
  }
}

