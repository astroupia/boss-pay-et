"use client"

import { formatCurrency, maskCardNumber } from "@/lib/utils"
import type { Account } from "@/types"
import { cn } from "@/lib/utils"

export interface AccountCardProps {
  account: Account
  selected?: boolean
  onClick?: () => void
  className?: string
}

export function AccountCard({ account, selected = false, onClick, className }: AccountCardProps) {
  const getCardIcon = () => {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="#0a0b25" strokeWidth="2" />
        <path d="M7 10H17M7 14H12" stroke="#0a0b25" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  const getCardBgColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "visa":
        return "bg-[#f8d49a]"
      case "mastercard":
        return "bg-[#a8d8f0]"
      default:
        return "bg-[#f8d49a]"
    }
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-between w-full p-4 bg-white rounded-xl transition-colors",
        selected && "ring-2 ring-[#0a0b25]",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-md ${getCardBgColor(account.type)} flex items-center justify-center`}>
          {getCardIcon()}
        </div>
        <div>
          <div className="text-sm text-gray-600">{maskCardNumber(account.cardNumber)}</div>
          <div className="font-medium">{formatCurrency(account.balance, account.currency)}</div>
        </div>
      </div>
      {selected && (
        <div className="h-5 w-5 rounded-full bg-[#0a0b25] flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </button>
  )
}

