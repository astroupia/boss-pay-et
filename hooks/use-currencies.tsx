"use client"

import { useState, useEffect } from "react"
import type { Currency } from "../types"

// Mock data for currencies
const mockCurrencies: Currency[] = [
  { code: "GBP", name: "British Pound", rate: 0.866, inverse: 1.155, flag: "🇬🇧" },
  { code: "CHF", name: "Swiss Franc", rate: 0.963, inverse: 1.039, flag: "🇨🇭" },
  { code: "EUR", name: "Euro", rate: 1, inverse: 0.999, flag: "🇪🇺" },
  { code: "CAD", name: "Canadian Dollar", rate: 1.32, inverse: 0.759, flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", rate: 1.48, inverse: 0.674, flag: "🇦🇺" },
  { code: "CNY", name: "Chinese Yuan Renminbi", rate: 6.96, inverse: 0.144, flag: "🇨🇳" },
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

