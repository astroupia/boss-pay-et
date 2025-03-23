"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

export interface CardActionProps {
  icon: ReactNode
  label: string
  onClick: () => void
  variant?: "default" | "destructive"
  className?: string
  disabled?: boolean
}

export function CardAction({
  icon,
  label,
  onClick,
  variant = "default",
  className,
  disabled = false,
}: CardActionProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={cn("w-full", className)}>
      <Button
        variant="outline"
        className={cn(
          "w-full flex items-center gap-2 justify-center h-12 border-gray-200 dark:border-gray-700",
          variant === "destructive" && "text-red-500 border-red-200 dark:border-red-800",
          disabled && "opacity-50 cursor-not-allowed",
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {icon}
        {label}
      </Button>
    </motion.div>
  )
}

