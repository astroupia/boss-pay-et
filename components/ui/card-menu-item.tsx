"use client"

import type { CardDetails } from "@/types"
import { formatCurrency, maskCardNumber } from "@/lib/utils"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardMenuItemProps {
  card: CardDetails
  className?: string
  onClick?: () => void
}

export function CardMenuItem({ card, className = "", onClick }: CardMenuItemProps) {
  const getCardColor = () => {
    switch (card.color) {
      case "peach":
        return "bg-gradient-to-r from-[#f8d49a] to-[#f8c066]"
      case "blue":
        return "bg-gradient-to-r from-[#66c4f8] to-[#5db9f8]"
      case "dark":
        return "bg-[#0a0b25]"
      default:
        return "bg-gradient-to-r from-[#a8c0ff] to-[#8f9fff]"
    }
  }

  const content = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        `${getCardColor()} rounded-xl p-4 shadow-md transition-all duration-200`,
        card.color === "dark" ? "text-white" : "text-gray-900",
        className,
      )}
    >
      <div className="flex justify-between items-center">
        <div className="text-sm">{maskCardNumber(card.number)}</div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-4">{card.type === "visa" ? "VISA" : "MC"}</div>
          {card.isDefault && <div className="bg-white/20 rounded-full px-2 py-0.5 text-xs">Default</div>}
        </div>
      </div>
      <div className="mt-2 text-lg font-medium">{formatCurrency(card.balance, card.currency)}</div>
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

