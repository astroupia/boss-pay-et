"use client"

import { useState, useEffect, useCallback } from "react"
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

  useEffect(() => {
    // Simulate API call
    const fetchNotifications = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/notifications');
        // const data = await response.json();

        // Using mock data for now
        setNotifications(mockNotifications)
        setUnreadCount(mockNotifications.filter((n) => !n.read).length)
        setLoading(false)
      } catch (err) {
        setError("Failed to load notifications")
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  // Use useCallback to memoize the function to prevent recreation on each render
  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => {
      // Check if the notification is already read to prevent unnecessary updates
      const notification = prev.find((n) => n.id === id)
      if (notification && notification.read) return prev

      return prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification))
    })

    setUnreadCount((prev) => Math.max(0, prev - 1))
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => {
      // Check if all notifications are already read
      if (prev.every((n) => n.read)) return prev

      return prev.map((notification) => ({ ...notification, read: true }))
    })

    setUnreadCount(0)
  }, [])

  return {
    notifications,
    loading,
    error,
    unreadCount,
    markAsRead,
    markAllAsRead,
  }
}

