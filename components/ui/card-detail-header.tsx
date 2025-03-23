"use client"

import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import { motion } from "framer-motion"
import type { CardDetails } from "@/types"

export interface CardDetailHeaderProps {
  card: CardDetails
  showCardNumber?: boolean
  className?: string
}

export function CardDetailHeader({ card, showCardNumber = false, className }: CardDetailHeaderProps) {
  const getCardGradient = (color: string) => {
    switch (color) {
      case "peach":
        return "bg-gradient-to-r from-[#f8d49a] to-[#f8c066]"
      case "blue":
        return "bg-gradient-to-r from-[#66c4f8] to-[#5db9f8]"
      case "dark":
        return "bg-[#0a0b25] text-white"
      default:
        return "bg-gradient-to-r from-[#a8c0ff] to-[#8f9fff]"
    }
  }

  // Format card number with spaces for better readability
  const formatCardNumber = (number: string) => {
    return number.replace(/(\d{4})/g, "$1 ").trim()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(`${getCardGradient(card.color)} rounded-xl p-6 relative shadow-md`, className)}
    >
      <div className="mb-8">
        <div className="text-lg font-bold mb-1">{card.type.toUpperCase()}</div>
        <div className="flex items-center gap-2">
          <div className="text-lg">
            {showCardNumber ? formatCardNumber(card.number) : formatCardNumber(card.number)}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <div className="text-sm opacity-70">BALANCE</div>
          <div className="text-2xl font-bold">{formatCurrency(card.balance, card.currency)}</div>
        </div>
        <div>
          <div className="text-sm opacity-70">EXPIRES</div>
          <div className="text-lg">{card.expiry}</div>
        </div>
      </div>
    </motion.div>
  )
}

