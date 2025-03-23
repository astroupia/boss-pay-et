"use client"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { useState, useEffect, type ReactNode, type ChangeEvent } from "react"
import { Check, AlertCircle } from "lucide-react"

export interface FormFieldProps {
  label: string
  htmlFor: string
  children?: ReactNode
  error?: string
  className?: string
  type?: string
  name?: string
  value?: string
  placeholder?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  maxLength?: number
  icon?: ReactNode
  inputMode?: "text" | "numeric" | "tel" | "email" | "url" | "search" | "none" | "decimal"
  autoComplete?: string
  required?: boolean
  pattern?: string
  onBlur?: () => void
  validator?: (value: string) => string | null
  formatter?: (value: string) => string
}

export function FormField({
  label,
  htmlFor,
  children,
  error,
  className,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  maxLength,
  icon,
  inputMode,
  autoComplete,
  required,
  pattern,
  onBlur,
  validator,
  formatter,
  ...props
}: FormFieldProps) {
  const [localValue, setLocalValue] = useState(value || "")
  const [localError, setLocalError] = useState(error || "")
  const [isDirty, setIsDirty] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)

  useEffect(() => {
    setLocalValue(value || "")
  }, [value])

  useEffect(() => {
    setLocalError(error || "")
  }, [error])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value

    // Apply formatter if provided
    if (formatter) {
      newValue = formatter(newValue)
    }

    setLocalValue(newValue)
    setIsDirty(true)

    // Validate on change if validator provided
    if (validator) {
      const validationError = validator(newValue)
      setLocalError(validationError || "")
      setIsValid(validationError === null && newValue.length > 0)
    } else {
      // Basic required validation
      if (required && newValue.trim() === "") {
        setLocalError(`${label} is required`)
        setIsValid(false)
      } else {
        setLocalError("")
        setIsValid(newValue.length > 0)
      }
    }

    // Call parent onChange
    if (onChange) {
      const event = {
        ...e,
        target: {
          ...e.target,
          value: newValue,
        },
      } as ChangeEvent<HTMLInputElement>
      onChange(event)
    }
  }

  const handleBlur = () => {
    setIsFocused(false)

    // Validate on blur
    if (validator && isDirty) {
      const validationError = validator(localValue)
      setLocalError(validationError || "")
      setIsValid(validationError === null && localValue.length > 0)
    } else if (required && localValue.trim() === "" && isDirty) {
      setLocalError(`${label} is required`)
      setIsValid(false)
    }

    if (onBlur) {
      onBlur()
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  return (
    <div className={cn("space-y-2 mb-4", className)}>
      <Label htmlFor={htmlFor} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      {children ? (
        children
      ) : (
        <div className="relative">
          {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}

          <input
            type={type}
            id={htmlFor}
            name={name || htmlFor}
            className={cn(
              "block w-full px-3 py-3 border rounded-lg transition-all duration-200",
              "focus:outline-none focus:ring-2",
              "bg-white dark:bg-gray-900",
              "text-gray-900 dark:text-gray-100",
              "border-gray-300 dark:border-gray-700",
              icon ? "pl-10" : "",
              localError
                ? "border-red-500 focus:ring-red-500"
                : isValid
                  ? "border-green-500 focus:ring-green-500"
                  : "focus:ring-blue-500",
            )}
            placeholder={placeholder}
            value={localValue}
            onChange={handleChange}
            maxLength={maxLength}
            inputMode={inputMode}
            autoComplete={autoComplete}
            required={required}
            pattern={pattern}
            onBlur={handleBlur}
            onFocus={handleFocus}
            aria-invalid={localError ? "true" : "false"}
            aria-describedby={localError ? `${htmlFor}-error` : undefined}
            {...props}
          />

          {isValid && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Check className="h-5 w-5 text-green-500" />
            </div>
          )}

          {localError && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
          )}
        </div>
      )}

      {localError && (
        <p id={`${htmlFor}-error`} className="text-sm text-red-500 dark:text-red-400 mt-1">
          {localError}
        </p>
      )}
    </div>
  )
}

