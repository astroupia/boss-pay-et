"use client"

import { useState, useEffect } from "react"
import type { Currency } from "@/types"

// Mock data for currencies
const mockCurrencies: Currency[] = [
  { code: "USD", name: "US Dollar", rate: 1, inverse: 1, flag: "🇺🇸" },
  { code: "EUR", name: "Euro", rate: 0.92, inverse: 1.09, flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", rate: 0.79, inverse: 1.27, flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", rate: 150.2, inverse: 0.0067, flag: "🇯🇵" },
  { code: "CAD", name: "Canadian Dollar", rate: 1.35, inverse: 0.74, flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", rate: 1.52, inverse: 0.66, flag: "🇦🇺" },
  { code: "CHF", name: "Swiss Franc", rate: 0.88, inverse: 1.14, flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", rate: 7.23, inverse: 0.14, flag: "🇨🇳" },
]

export function useCurrencies() {
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchCurrencies = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/currencies');
        // const data = await response.json();

        // Using mock data for now
        setCurrencies(mockCurrencies)
        setLoading(false)
      } catch (err) {
        setError("Failed to load currencies")
        setLoading(false)
      }
    }

    fetchCurrencies()
  }, [])

  const getExchangeRate = (from: string, to: string) => {
    const fromCurrency = currencies.find((c) => c.code === from)
    const toCurrency = currencies.find((c) => c.code === to)

    if (!fromCurrency || !toCurrency) return null

    // Calculate the exchange rate
    return fromCurrency.rate / toCurrency.rate
  }

  const convertAmount = (amount: number, from: string, to: string) => {
    const rate = getExchangeRate(from, to)
    if (!rate) return null

    return amount * rate
  }

  return {
    currencies,
    loading,
    error,
    getExchangeRate,
    convertAmount,
  }
}

