"use client"

import { useState, useEffect } from "react"
import type { Contact } from "@/types"

// Mock data for contacts
const mockContacts: Contact[] = [
  { id: "1", name: "Jazmine C.", initial: "J", accountNumber: "**** 1234" },
  { id: "2", name: "Bryan C.", initial: "B", accountNumber: "**** 5678" },
  { id: "3", name: "Dalia H.", initial: "D", accountNumber: "**** 9012" },
  { id: "4", name: "Marcus B.", initial: "M", accountNumber: "**** 3456" },
  { id: "5", name: "Angel B.", initial: "A", accountNumber: "**** 7890" },
]

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchContacts = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/contacts');
        // const data = await response.json();

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Using mock data for now
        setContacts(mockContacts)
        setLoading(false)
      } catch (err) {
        setError("Failed to load contacts")
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  return {
    contacts,
    loading,
    error,
  }
}

