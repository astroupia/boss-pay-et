import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({ icon, title, description, actionLabel, actionHref, className = "" }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-6 ${className}`}>
      <div className="mb-4 text-gray-400">{icon}</div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>

      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button className="bg-[#0a0b25] hover:bg-[#1a1b35]">{actionLabel}</Button>
        </Link>
      )}
    </div>
  )
}

