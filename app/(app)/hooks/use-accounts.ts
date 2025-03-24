"use client"

import { useState, useEffect } from "react"
import type { Account } from "@/types"

// Mock data for accounts
const mockAccounts: Account[] = [
  {
    id: "1",
    type: "visa",
    name: "APITEX PLATINUM",
    cardNumber: "4358123412344253",
    balance: 4863.27,
    currency: "USD",
    isDefault: true,
  },
  {
    id: "2",
    type: "mastercard",
    name: "PREMIUM",
    cardNumber: "5412123498768912",
    balance: 65.0,
    currency: "EUR",
  },
]

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchAccounts = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/accounts');
        // const data = await response.json();

        // Using mock data for now
        setAccounts(mockAccounts)
        setLoading(false)
      } catch (err) {
        setError("Failed to load accounts")
        setLoading(false)
      }
    }

    fetchAccounts()
  }, [])

  const getDefaultAccount = () => accounts.find((account) => account.isDefault) || accounts[0]

  return {
    accounts,
    loading,
    error,
    getDefaultAccount,
  }
}

