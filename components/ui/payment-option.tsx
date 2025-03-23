"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export interface PaymentOptionProps {
  icon: ReactNode
  title: string
  description?: string
  selected?: boolean
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function PaymentOption({
  icon,
  title,
  description,
  selected = false,
  onClick,
  className,
  disabled = false,
}: PaymentOptionProps) {
  return (
    <button
      className={cn(
        "flex items-center w-full p-4 rounded-xl transition-colors",
        "bg-white hover:bg-gray-50",
        selected && "ring-2 ring-[#0a0b25]",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="h-10 w-10 rounded-md bg-[#f8d0bc] flex items-center justify-center mr-3">{icon}</div>
      <div className="text-left">
        <div className="font-medium">{title}</div>
        {description && <div className="text-sm text-gray-500">{description}</div>}
      </div>
      {selected && (
        <div className="ml-auto h-5 w-5 rounded-full bg-[#0a0b25] flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </button>
  )
}

