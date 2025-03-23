"use client"

import type { CardDetails } from "@/types"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardItemProps {
  card: CardDetails
  className?: string
  onClick?: () => void
}

export function CardItem({ card, className = "", onClick }: CardItemProps) {
  const getCardIcon = () => {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M7 10H17M7 14H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  const getCardBgColor = (color: string) => {
    switch (color) {
      case "peach":
        return "bg-gradient-to-r from-orange-200 to-orange-300 text-orange-800"
      case "blue":
        return "bg-gradient-to-r from-blue-200 to-blue-300 text-blue-800"
      case "green":
        return "bg-gradient-to-r from-green-200 to-green-300 text-green-800"
      default:
        return "bg-gradient-to-r from-orange-200 to-orange-300 text-orange-800"
    }
  }

  const content = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700",
        "transition-all duration-200",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-md ${getCardBgColor(card.color)} flex items-center justify-center`}>
          {getCardIcon()}
        </div>
        <div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{card.number}</div>
          <div className="font-medium text-gray-900 dark:text-white">{formatCurrency(card.balance, card.currency)}</div>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </motion.div>
  )

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full text-left">
        {content}
      </button>
    )
  }

  return <Link href={`/cards/${card.id}`}>{content}</Link>
}

