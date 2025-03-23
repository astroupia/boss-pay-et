"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

export interface PaymentMethodCardProps {
  icon: ReactNode
  title: string
  description?: string
  href: string
  rightElement?: ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function PaymentMethodCard({
  icon,
  title,
  description,
  href,
  rightElement = <ChevronRight className="h-5 w-5 text-gray-400" />,
  onClick,
  className,
  disabled = false,
}: PaymentMethodCardProps) {
  const content = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700",
        "transition-all duration-200",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
          {icon}
        </div>
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{title}</div>
          {description && <div className="text-sm text-gray-500 dark:text-gray-400">{description}</div>}
        </div>
      </div>
      {rightElement}
    </motion.div>
  )

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full text-left" disabled={disabled}>
        {content}
      </button>
    )
  }

  if (disabled) {
    return content
  }

  return <Link href={href}>{content}</Link>
}

