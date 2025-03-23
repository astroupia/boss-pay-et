"use client"

import { useState, useEffect } from "react"
import type { Transaction } from "../types"

// Mock data for transactions
const mockTransactions: Transaction[] = [
  {
    id: "1",
    name: "Lucian Pennington",
    type: "Money transfer",
    amount: 136.0,
    date: "2023-06-15T14:30:00",
    direction: "incoming",
    status: "completed",
  },
  {
    id: "2",
    name: "Electricity",
    type: "Utility bills",
    amount: -245.27,
    date: "2023-06-14T10:15:00",
    direction: "outgoing",
    status: "completed",
  },
  {
    id: "3",
    name: "Paypal",
    type: "Deposits",
    amount: 500.0,
    date: "2023-06-10T09:45:00",
    direction: "incoming",
    status: "completed",
  },
  {
    id: "4",
    name: "Jazmine C.",
    type: "Money transfer",
    amount: -75.0,
    date: "2023-06-08T16:20:00",
    direction: "outgoing",
    status: "completed",
  },
  {
    id: "5",
    name: "Grocery Store",
    type: "Shopping",
    amount: -120.35,
    date: "2023-06-05T18:30:00",
    direction: "outgoing",
    status: "completed",
  },
]

export function useTransactions(filter?: "incoming" | "outgoing" | "all") {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchTransactions = async () => {
      try {
        // In a real app, this would be an API call with filter params
        // const response = await fetch(`/api/transactions?filter=${filter || 'all'}`);
        // const data = await response.json();

        // Using mock data for now
        let filteredTransactions = mockTransactions

        if (filter && filter !== "all") {
          filteredTransactions = mockTransactions.filter((t) => t.direction === filter)
        }

        setTransactions(filteredTransactions)
        setLoading(false)
      } catch (err) {
        setError("Failed to load transactions")
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [filter])

  return {
    transactions,
    loading,
    error,
  }
}

