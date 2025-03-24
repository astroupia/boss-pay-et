"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { TransactionItemV2 } from "@/components/transactions/transaction-item-v2"
import { Input } from "@/components/ui/input"
import { Search, Calendar } from "lucide-react"
import BottomNavigation from "@/components/layout/bottom-navigation"
import type { TransactionDetails } from "@/types/transaction"
import { motion } from "framer-motion"
import { PageTransition } from "@/components/ui/page-transition"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"

// Mock data for transactions
const mockTransactions: TransactionDetails[] = [
  {
    id: "1",
    name: "Lucian Pennington",
    category: "Money transfer",
    amount: 136.0,
    currency: "USD",
    date: "Today",
    time: "14:30",
    recipient: "Lucian Pennington",
    cardNumber: "**** 4253",
    fee: 0,
    residualBalance: 4863.27,
    type: "incoming",
    status: "completed",
  },
  {
    id: "2",
    name: "Electricity",
    category: "Utility bills",
    amount: -245.27,
    currency: "USD",
    date: "Today",
    time: "10:15",
    recipient: "Electric Company",
    cardNumber: "**** 4253",
    fee: 0,
    residualBalance: 4727.27,
    type: "outgoing",
    status: "completed",
  },
  {
    id: "3",
    name: "Paypal",
    category: "Deposits",
    amount: 500.0,
    currency: "USD",
    date: "Today",
    time: "09:45",
    recipient: "Your Account",
    cardNumber: "**** 4253",
    fee: 0,
    residualBalance: 4972.54,
    type: "incoming",
    status: "completed",
  },
  {
    id: "4",
    name: "ATM",
    category: "Cash withdrawal",
    amount: -1500.0,
    currency: "USD",
    date: "Apr 17, 2023",
    time: "16:20",
    recipient: "ATM Withdrawal",
    cardNumber: "**** 4253",
    fee: 2.5,
    residualBalance: 4472.54,
    type: "outgoing",
    status: "completed",
  },
  {
    id: "5",
    name: "+17000000000",
    category: "Mobile payment",
    amount: -12.0,
    currency: "USD",
    date: "Apr 17, 2023",
    time: "14:45",
    recipient: "Mobile Service",
    cardNumber: "**** 4253",
    fee: 0,
    residualBalance: 4460.54,
    type: "outgoing",
    status: "completed",
  },
  {
    id: "6",
    name: "Amazon",
    category: "Online payments",
    amount: -268.57,
    currency: "USD",
    date: "Apr 15, 2023",
    time: "11:30",
    recipient: "Amazon.com",
    cardNumber: "**** 4253",
    fee: 0,
    residualBalance: 4191.97,
    type: "outgoing",
    status: "completed",
  },
  {
    id: "7",
    name: "eBay",
    category: "Online payments",
    amount: -374.84,
    currency: "USD",
    date: "Apr 15, 2023",
    time: "09:15",
    recipient: "eBay Inc.",
    cardNumber: "**** 4253",
    fee: 0,
    residualBalance: 3817.13,
    type: "outgoing",
    status: "completed",
  },
  {
    id: "8",
    name: "Jovan French",
    category: "Money transfer",
    amount: -110.0,
    currency: "USD",
    date: "Apr 15, 2023",
    time: "08:45",
    recipient: "Jovan French",
    cardNumber: "**** 4253",
    fee: 0,
    residualBalance: 3707.13,
    type: "outgoing",
    status: "completed",
  },
]

// Group transactions by date
const groupTransactionsByDate = (transactions: TransactionDetails[]) => {
  const groups: { [key: string]: TransactionDetails[] } = {}

  transactions.forEach((transaction) => {
    if (!groups[transaction.date]) {
      groups[transaction.date] = []
    }
    groups[transaction.date].push(transaction)
  })

  return Object.entries(groups).map(([date, transactions]) => ({
    date,
    transactions,
  }))
}

export default function TransactionHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions)
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<"all" | "incoming" | "outgoing">("all")

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter transactions based on search query and filter type
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    applyFilters(query, activeFilter)
  }

  const applyFilters = (query: string, filter: "all" | "incoming" | "outgoing") => {
    let filtered = mockTransactions

    // Apply search filter
    if (query) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.name.toLowerCase().includes(query.toLowerCase()) ||
          transaction.category.toLowerCase().includes(query.toLowerCase()),
      )
    }

    // Apply type filter
    if (filter !== "all") {
      filtered = filtered.filter((transaction) => transaction.type === filter)
    }

    setFilteredTransactions(filtered)
  }

  const handleFilterChange = (filter: "all" | "incoming" | "outgoing") => {
    setActiveFilter(filter)
    applyFilters(searchQuery, filter)
  }

  const transactionGroups = groupTransactionsByDate(filteredTransactions)

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
        <PageHeader title="Transaction History" />

        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search transactions"
              className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("all")}
              className={activeFilter === "all" ? "bg-[#0a0b25] dark:bg-blue-600" : ""}
            >
              All
            </Button>
            <Button
              variant={activeFilter === "incoming" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("incoming")}
              className={
                activeFilter === "incoming" ? "bg-green-600" : "text-green-600 border-green-200 dark:border-green-800"
              }
            >
              Incoming
            </Button>
            <Button
              variant={activeFilter === "outgoing" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("outgoing")}
              className={activeFilter === "outgoing" ? "bg-[#0a0b25] dark:bg-blue-600" : ""}
            >
              Outgoing
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 border-gray-200 dark:border-gray-700"
            >
              <Calendar className="h-4 w-4" />
              <span>Filter by Date</span>
            </Button>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No transactions found</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center mt-2">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {transactionGroups.map((group, groupIndex) => (
                <motion.div
                  key={group.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: groupIndex * 0.05 }}
                >
                  <h3 className="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">{group.date}</h3>
                  <div className="space-y-2">
                    {group.transactions.map((transaction, index) => (
                      <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: groupIndex * 0.05 + index * 0.03 }}
                      >
                        <TransactionItemV2 transaction={transaction} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <BottomNavigation activeItem="history" />
      </div>
    </PageTransition>
  )
}

