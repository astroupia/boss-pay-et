import type React from "react"
import { cn } from "@/lib/utils"

export interface DetailItemProps {
  label: string
  value: React.ReactNode
  className?: string
}

export function DetailItem({ label, value, className }: DetailItemProps) {
  return (
    <div className={cn("flex justify-between items-center py-2", className)}>
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="font-medium text-gray-900 dark:text-white">{value}</span>
    </div>
  )
}

