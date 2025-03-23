"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  delay?: number
}

export function AnimatedCard({ children, className, onClick, delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-sm", className)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

