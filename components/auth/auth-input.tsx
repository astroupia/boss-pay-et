"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import type { AuthInputProps } from "@/types/auth"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function AuthInput({
  icon,
  placeholder,
  type,
  value,
  onChange,
  error,
  className = "",
  required = false,
  autoComplete,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const isPassword = type === "password"

  return (
    <div className="relative w-full">
      <div className="relative">
        {icon && (
          <div
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
              isFocused ? "text-[#4da9e4]" : "text-gray-400",
            )}
          >
            {icon}
          </div>
        )}
        <input
          type={showPassword ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full rounded-lg bg-[#f8f8f8] dark:bg-gray-800 p-3",
            icon ? "pl-10" : "pl-3",
            isPassword ? "pr-10" : "pr-3",
            "outline-none transition-all",
            isFocused ? "ring-2 ring-[#4da9e4]" : "",
            error ? "border border-red-500" : "border border-transparent",
            "dark:text-white dark:placeholder-gray-400",
            className,
          )}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-red-500">
          {error}
        </motion.p>
      )}
    </div>
  )
}

