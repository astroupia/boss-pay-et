import type { Transaction } from "@/types"
import { formatCurrency, formatDate } from "@/lib/utils"
import Link from "next/link"

interface TransactionItemProps {
  transaction: Transaction
  showDate?: boolean
  className?: string
}

export function TransactionItem({ transaction, showDate = true, className = "" }: TransactionItemProps) {
  const getIcon = () => {
    if (transaction.icon) return transaction.icon

    return transaction.direction === "incoming" ? (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 5V19M12 19L6 13M12 19L18 13"
          stroke="#0a0b25"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 19V5M12 5L6 11M12 5L18 11"
          stroke="#0a0b25"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <Link href={`/transfers/${transaction.id}`}>
      <div className={`bg-[#f8f5f1] rounded-xl p-4 flex justify-between items-center ${className}`}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#f8d0bc] flex items-center justify-center">{getIcon()}</div>
          <div>
            <div className="font-medium">{transaction.name}</div>
            <div className="text-sm text-gray-600">{transaction.type}</div>
            {showDate && <div className="text-xs text-gray-500">{formatDate(transaction.date)}</div>}
          </div>
        </div>
        <div className={`font-medium ${transaction.amount > 0 ? "text-green-500" : "text-gray-800"}`}>
          {transaction.amount > 0 ? "+" : ""}
          {formatCurrency(transaction.amount)}
        </div>
      </div>
    </Link>
  )
}

