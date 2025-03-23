import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"

export interface TransactionSummaryProps {
  amount: string | number
  fee?: string | number
  currency?: string
  className?: string
}

export function TransactionSummary({ amount, fee = 0, currency = "USD", className }: TransactionSummaryProps) {
  const numericAmount = typeof amount === "string" ? Number.parseFloat(amount) || 0 : amount
  const numericFee = typeof fee === "string" ? Number.parseFloat(fee) || 0 : fee
  const total = numericAmount + numericFee

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm", className)}>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600 dark:text-gray-400">Amount</span>
        <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(numericAmount, currency)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600 dark:text-gray-400">Fee</span>
        <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(numericFee, currency)}</span>
      </div>
      <div className="border-t pt-2 mt-2 flex justify-between">
        <span className="font-medium text-gray-900 dark:text-white">Total</span>
        <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(total, currency)}</span>
      </div>
    </div>
  )
}

