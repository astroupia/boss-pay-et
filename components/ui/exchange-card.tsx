"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { ArrowDown, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Currency } from "@/types";

interface ExchangeCardProps {
  fromCurrency: Currency;
  toCurrency: Currency;
  rate: number;
  className?: string;
  onExchange?: () => void;
  onSwap?: () => void;
}

export function ExchangeCard({
  fromCurrency,
  toCurrency,
  rate,
  className,
  onExchange,
  onSwap,
}: ExchangeCardProps) {
  const [amount, setAmount] = useState<string>("100");
  const numericAmount = Number.parseFloat(amount) || 0;
  const convertedAmount = (numericAmount * rate).toFixed(2);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setAmount(value);
  };

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden",
        className
      )}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Currency Exchange
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Rate: 1 {fromCurrency.code} = {rate} {toCurrency.code}
          </div>
        </div>

        {/* From Currency */}
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="relative w-8 h-8 mr-2 overflow-hidden rounded-full">
              <Image
                src={fromCurrency.flag}
                alt={`${fromCurrency.name} flag`}
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/placeholder.svg?height=32&width=32";
                }}
              />
            </div>
            <div>
              <span className="font-medium text-gray-900 dark:text-white">
                {fromCurrency.name}
              </span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                ({fromCurrency.code})
              </span>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter amount"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
              {fromCurrency.symbol || fromCurrency.code}
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-2">
          <button
            onClick={onSwap}
            className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowDown className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* To Currency */}
        <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="relative w-8 h-8 mr-2 overflow-hidden rounded-full">
              <Image
                src={toCurrency.flag}
                alt={`${toCurrency.name} flag`}
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/placeholder.svg?height=32&width=32";
                }}
              />
            </div>
            <div>
              <span className="font-medium text-gray-900 dark:text-white">
                {toCurrency.name}
              </span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                ({toCurrency.code})
              </span>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              value={convertedAmount}
              readOnly
              className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none"
              placeholder="Converted amount"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
              {toCurrency.symbol || toCurrency.code}
            </div>
          </div>
        </div>

        {/* Exchange Button */}
        <button
          onClick={onExchange}
          className="w-full mt-4 p-3 bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center justify-center transition-colors"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Exchange Now
        </button>
      </div>
    </div>
  );
}
