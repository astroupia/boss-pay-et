// Consolidate all utility functions here
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency with proper symbol and decimals
export function formatCurrency(amount: number, currency = "USD", locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Format date in a user-friendly way
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)

  if (d.toDateString() === now.toDateString()) {
    return `Today, ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
  } else if (d.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
  } else {
    return d.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
  }
}

// Mask card number (e.g., **** **** **** 1234)
export function maskCardNumber(cardNumber: string): string {
  const last4 = cardNumber.slice(-4)
  return `**** **** **** ${last4}`
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

