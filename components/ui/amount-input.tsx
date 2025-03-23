"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { DollarSign } from "lucide-react"
import { useState } from "react"

export interface AmountInputProps {
  value: string
  onChange: (value: string) => void
  currency?: string
  placeholder?: string
  className?: string
  showCurrencyIcon?: boolean
}

export function AmountInput({
  value,
  onChange,
  currency = "$",
  placeholder = "0.00",
  className,
  showCurrencyIcon = true,
}: AmountInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimal point
    const newValue = e.target.value.replace(/[^0-9.]/g, "")
    onChange(newValue)
  }

  return (
    <div className={cn("relative", className)}>
      {showCurrencyIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
          {currency === "$" ? (
            <DollarSign className="h-5 w-5 text-blue-500" />
          ) : (
            <span className="text-blue-500 font-medium">{currency}</span>
          )}
        </div>
      )}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          "w-full h-12 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 text-lg",
          "focus:outline-none transition-all",
          isFocused ? "ring-2 ring-blue-500 border-transparent" : "",
          showCurrencyIcon ? "pl-14" : "pl-3",
        )}
      />
    </div>
  )
}

