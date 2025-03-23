"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { useCurrencies } from "@/app/(app)/hooks/use-currencies";
import { ExchangeCard } from "@/components/ui/exchange-card";
import type { Currency } from "@/types";

export default function ExchangeDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currencies, convertAmount } = useCurrencies();

  const fromCode = searchParams?.get("from") || "USD";
  const toCode = searchParams?.get("to") || "EUR";
  const initialAmount = searchParams?.get("amount") || "100";

  const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);
  const [amount, setAmount] = useState(initialAmount);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  // Set currencies once loaded
  useEffect(() => {
    if (currencies.length > 0 && (!fromCurrency || !toCurrency)) {
      const from = currencies.find((c) => c.code === fromCode) || currencies[0];
      const to = currencies.find((c) => c.code === toCode) || currencies[1];
      setFromCurrency(from);
      setToCurrency(to);
    }
  }, [currencies, fromCode, toCode, fromCurrency, toCurrency]);

  // Calculate converted amount and exchange rate
  useEffect(() => {
    if (fromCurrency && toCurrency && amount) {
      const result = convertAmount(
        Number(amount),
        fromCurrency.code,
        toCurrency.code
      );
      setConvertedAmount(result);

      // Calculate exchange rate
      const rate = convertAmount(1, fromCurrency.code, toCurrency.code);
      setExchangeRate(rate);
    }
  }, [fromCurrency, toCurrency, amount, convertAmount]);

  const handleSwap = () => {
    if (fromCurrency && toCurrency) {
      router.push(
        `/exchange/details?from=${toCurrency.code}&to=${fromCurrency.code}&amount=${amount}`
      );
    }
  };

  const handleAmountChange = (value: string) => {
    // Only allow numbers and decimals
    const newValue = value.replace(/[^0-9.]/g, "");
    setAmount(newValue);
  };

  const handleExchange = () => {
    if (fromCurrency && toCurrency) {
      router.push(
        `/payments/success?amount=${amount}&currency=${fromCurrency.code}&description=Exchanged to ${toCurrency.code}`
      );
    }
  };

  if (!fromCurrency || !toCurrency) {
    return null; // Loading state
  }

  return (
    <div className="min-h-screen bg-[#0a0b25]">
      <PageHeader title="Exchange Details" />

      <div className="p-4 space-y-6">
        <ExchangeCard
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          rate={exchangeRate || 0}
          className="bg-white dark:bg-gray-800"
          onExchange={handleExchange}
          onSwap={handleSwap}
        />

        <div className="bg-white rounded-xl p-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Exchange Rate</span>
            <span className="font-medium">
              1 {fromCurrency.code} ={" "}
              {exchangeRate !== null ? exchangeRate.toFixed(4) : "0.00"}{" "}
              {toCurrency.code}
            </span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Fee</span>
            <span className="font-medium">0.00 {fromCurrency.code}</span>
          </div>

          <div className="border-t pt-2 mt-2 flex justify-between">
            <span className="font-medium">Total</span>
            <span className="font-bold">
              {amount} {fromCurrency.code}
            </span>
          </div>
        </div>

        <Button
          onClick={handleExchange}
          className="w-full bg-[#4da9e4] hover:bg-[#3d99d4] text-white"
          disabled={!amount || Number(amount) <= 0}
        >
          Exchange Now
        </Button>
      </div>
    </div>
  );
}
