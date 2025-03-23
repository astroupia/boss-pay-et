"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

interface PinInputProps {
  label?: string
  value: string
  onChange: (value: string) => void
  maxLength?: number
  className?: string
}

export function PinInput({ label, value, onChange, maxLength = 4, className = "" }: PinInputProps) {
  const [visible, setVisible] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "")
    if (newValue.length <= maxLength) {
      onChange(newValue)
    }
  }

  return (
    <div className={className}>
      {label && <div className="text-sm text-gray-600 mb-1">{label}</div>}
      <div className="relative">
        <Input
          type={visible ? "text" : "password"}
          value={value}
          onChange={handleChange}
          className="pr-10"
          maxLength={maxLength}
          placeholder="Enter PIN"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </div>
  )
}

