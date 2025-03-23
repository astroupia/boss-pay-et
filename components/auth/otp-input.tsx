"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import type { OtpInputProps } from "@/types/auth"

export function OtpInput({ length = 4, value, onChange, error }: OtpInputProps) {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  const handleChange = (index: number, digit: string) => {
    if (!/^\d*$/.test(digit)) return

    const newValue = value.substring(0, index) + digit + value.substring(index + 1)
    onChange(newValue)

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
      setFocusedIndex(index + 1)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
      setFocusedIndex(index - 1)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        {Array.from({ length }, (_, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="text"
            maxLength={1}
            value={value[i] || ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onFocus={() => setFocusedIndex(i)}
            className={`h-12 w-12 rounded-lg border-2 text-center text-xl outline-none ${
              focusedIndex === i ? "border-[#f8d0bc]" : "border-gray-200"
            } ${error ? "border-red-500" : ""}`}
          />
        ))}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

