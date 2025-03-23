"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CurrencyCard } from "@/components/ui/currency-card";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/ui/page-transition";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import BottomNavigation from "@/components/layout/bottom-navigation";
import type { Currency } from "@/types";

// Mock data for currencies
const mockCurrencies: Currency[] = [
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    flag: "🇺🇸",
    rate: 1,
    inverse: 1,
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    flag: "🇪🇺",
    rate: 0.85,
    inverse: 1.18,
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    flag: "🇬🇧",
    rate: 0.73,
    inverse: 1.37,
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    flag: "🇯🇵",
    rate: 110.2,
    inverse: 0.0091,
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "C$",
    flag: "🇨🇦",
    rate: 1.25,
    inverse: 0.8,
  },
];

export default function ExchangePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
    null
  );

  useEffect(() => {
    // Simulate API call
    const fetchCurrencies = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/currencies');
        // const data = await response.json();

        // Using mock data for now
        setTimeout(() => {
          setCurrencies(mockCurrencies);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Failed to load currencies");
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency);
  };

  const handleContinue = () => {
    if (selectedCurrency) {
      router.push(`/exchange/details?currency=${selectedCurrency.code}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
        <PageHeader title="Currency Exchange" />

        <div className="p-4 space-y-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-5 text-white">
            <h2 className="text-lg font-semibold mb-2">Exchange Rate</h2>
            <p className="text-sm opacity-80 mb-4">
              Select a currency to see the latest exchange rates and make a
              conversion
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-70">Base Currency</div>
                <div className="text-xl font-bold">USD</div>
              </div>
              <ArrowRight className="h-5 w-5 opacity-70" />
              <div>
                <div className="text-sm opacity-70">Selected Currency</div>
                <div className="text-xl font-bold">
                  {selectedCurrency ? selectedCurrency.code : "Select"}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white">
              Select Currency
            </h3>
            <div className="space-y-3">
              {currencies.map((currency) => (
                <CurrencyCard
                  key={currency.code}
                  currency={currency}
                  selected={selectedCurrency?.code === currency.code}
                  onClick={() => handleCurrencySelect(currency)}
                />
              ))}
            </div>
          </div>

          <Button
            onClick={handleContinue}
            disabled={!selectedCurrency}
            className="w-full bg-[#0a0b25] hover:bg-[#1a1b35]"
          >
            Continue
          </Button>
        </div>

        <BottomNavigation activeItem="exchange" />
      </div>
    </PageTransition>
  );
}
