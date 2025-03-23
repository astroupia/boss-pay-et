"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"

interface StatusScreenProps {
  type: "success" | "error"
  title: string
  description?: string
  amount: number
  currency: string
  primaryAction: {
    label: string
    onClick: () => void
  }
  secondaryAction: {
    label: string
    onClick: () => void
  }
}

export function StatusScreen({
  type,
  title,
  description,
  amount,
  currency,
  primaryAction,
  secondaryAction,
}: StatusScreenProps) {
  return (
    <div className="min-h-screen bg-[#fff5f1] flex flex-col items-center justify-center p-6">
      <div className="mb-6">
        {type === "success" ? (
          <div className="h-16 w-16 rounded-full bg-[#4da9e4] flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
        ) : (
          <div className="h-16 w-16 rounded-full bg-red-500 flex items-center justify-center">
            <XCircle className="h-8 w-8 text-white" />
          </div>
        )}
      </div>

      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      {description && <p className="text-gray-600 text-center mb-6">{description}</p>}

      <div className="text-3xl font-bold mb-8">
        {amount.toFixed(2)} {currency}
      </div>

      <div className="w-full space-y-3">
        <Button onClick={primaryAction.onClick} className="w-full bg-[#0a0b25]">
          {primaryAction.label}
        </Button>
        <Button variant="outline" onClick={secondaryAction.onClick} className="w-full">
          {secondaryAction.label}
        </Button>
      </div>
    </div>
  )
}

