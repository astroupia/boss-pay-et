import type React from "react"
import { cn } from "@/lib/utils"

interface CurvedHeaderProps {
  children: React.ReactNode
  className?: string
}

export function CurvedHeader({ children, className }: CurvedHeaderProps) {
  return (
    <div
      className={cn(
        "relative w-full bg-gradient-to-r from-[#0a0b25] to-[#1a1b35] text-white",
        "pt-8 pb-12 px-4",
        "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-8",
        "after:bg-white dark:after:bg-gray-900 after:rounded-t-[40px]",
        className,
      )}
    >
      {children}
    </div>
  )
}

