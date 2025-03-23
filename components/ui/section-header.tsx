import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export interface SectionHeaderProps {
  title: string
  description?: string
  rightElement?: ReactNode
  className?: string
}

export function SectionHeader({ title, description, rightElement, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-4", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{title}</h2>
        {rightElement}
      </div>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
    </div>
  )
}

