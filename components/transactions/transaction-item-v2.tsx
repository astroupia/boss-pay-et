"use client"

import type { TransactionDetails } from "@/types/transaction"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { ArrowDownLeft, ArrowUpRight, ShoppingBag, CreditCard, Smartphone, DollarSign } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TransactionItemV2Props {
  transaction: TransactionDetails
  className?: string
}

export function TransactionItemV2({ transaction, className = "" }: TransactionItemV2Props) {
  const getIcon = () => {
    if (transaction.type === "incoming") {
      return <ArrowDownLeft className="h-5 w-5 text-white" />
    } else {
      switch (transaction.category.toLowerCase()) {
        case "utility bills":
          return <CreditCard className="h-5 w-5 text-white" />
        case "cash withdrawal":
          return <DollarSign className="h-5 w-5 text-white" />
        case "mobile payment":
          return <Smartphone className="h-5 w-5 text-white" />
        case "online payments":
          return <ShoppingBag className="h-5 w-5 text-white" />
        default:
          return <ArrowUpRight className="h-5 w-5 text-white" />
      }
    }
  }

  const getIconBgColor = () => {
    if (transaction.type === "incoming") {
      return "bg-green-500 dark:bg-green-600"
    } else {
      switch (transaction.category.toLowerCase()) {
        case "utility bills":
          return "bg-blue-500 dark:bg-blue-600"
        case "cash withdrawal":
          return "bg-purple-500 dark:bg-purple-600"
        case "mobile payment":
          return "bg-orange-500 dark:bg-orange-600"
        case "online payments":
          return "bg-pink-500 dark:bg-pink-600"
        default:
          return "bg-[#0a0b25] dark:bg-blue-600"
      }
    }
  }

  return (
    <Link href={`/transactions/${transaction.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm flex justify-between items-center transition-all",
          className,
        )}
      >
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-full ${getIconBgColor()} flex items-center justify-center`}>
            {getIcon()}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{transaction.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <span>{transaction.category}</span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span>{transaction.time}</span>
            </div>
          </div>
        </div>
        <div
          className={`font-medium ${transaction.amount > 0 ? "text-green-500" : "text-gray-800 dark:text-gray-200"}`}
        >
          {transaction.amount > 0 ? "+" : ""}
          {formatCurrency(transaction.amount, transaction.currency)}
        </div>
      </motion.div>
    </Link>
  )
}

