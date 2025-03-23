"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { formatCurrency, maskCardNumber } from "@/lib/utils"
import { AmountInput } from "@/components/ui/amount-input"
import { TransactionSummary } from "@/components/ui/transaction-summary"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { motion } from "framer-motion"
import type { Account, Contact } from "@/types"

export interface TransferFormProps {
  fromAccount?: Account | null
  selectedContact?: Contact | null
  onSubmit: (amount: string, note: string) => Promise<void>
  onChangeContact: () => void
}

export function TransferForm({ fromAccount, selectedContact, onSubmit, onChangeContact }: TransferFormProps) {
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || Number.parseFloat(amount) <= 0) return

    setLoading(true)

    try {
      await onSubmit(amount, note)
    } catch (error) {
      console.error("Transfer failed", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 py-2 flex-1 space-y-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-4 border-gray-100 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="mb-4">
              <Label htmlFor="amount" className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
                Amount
              </Label>
              <AmountInput value={amount} onChange={setAmount} currency={fromAccount?.currency || "USD"} />
            </div>

            <div className="mb-4">
              <Label htmlFor="from" className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
                From
              </Label>
              <div className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mr-3 text-blue-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M7 10H17M7 14H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">{fromAccount?.name || "Main Account"}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {fromAccount?.cardNumber ? maskCardNumber(fromAccount.cardNumber) : "**** 4253"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {fromAccount ? formatCurrency(fromAccount.balance, fromAccount.currency) : "$4,863.27"}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="to" className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
                To
              </Label>
              <div className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                <Avatar className="h-10 w-10 bg-blue-50 dark:bg-blue-900/20 mr-3">
                  <AvatarFallback className="bg-blue-50 dark:bg-blue-900/20 text-blue-500">
                    {selectedContact?.initial || "J"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {selectedContact?.name || "Jazmine C."}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedContact?.accountNumber || "**** 8912"}
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-500" onClick={onChangeContact} type="button">
                  Change
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="note" className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
                Note (optional)
              </Label>
              <Input
                id="note"
                placeholder="What's this for?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <TransactionSummary amount={amount || "0"} fee="0" currency={fromAccount?.currency || "USD"} className="mb-4" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Button
          type="submit"
          className="w-full bg-[#0a0b25] hover:bg-[#1a1b35] dark:bg-blue-600 dark:hover:bg-blue-700 h-12"
          disabled={loading || !amount || Number.parseFloat(amount) <= 0}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <LoadingSpinner size="sm" className="mr-2" /> Processing...
            </span>
          ) : (
            "Send Money"
          )}
        </Button>
      </motion.div>
    </form>
  )
}

