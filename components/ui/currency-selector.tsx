"use client";

import { useState } from "react";
import { CurrencyCard } from "./currency-card";
import { Input } from "./input";
import { Search } from "lucide-react";
import type { Currency } from "@/types";

export interface CurrencySelectorProps {
  currencies: Currency[];
  onSelect: (currency: Currency) => void;
  selectedCode?: string;
  title?: string;
  className?: string;
}

export function CurrencySelector({
  currencies,
  onSelect,
  selectedCode,
  title = "Select Currency",
  className,
}: CurrencySelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCurrencies = searchQuery
    ? currencies.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currencies;

  return (
    <div className={className}>
      <h3 className="text-lg font-medium mb-3">{title}</h3>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search currencies"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        {filteredCurrencies.map((currency) => (
          <CurrencyCard
            key={currency.code}
            currency={currency}
            selected={currency.code === selectedCode}
            onClick={() => onSelect(currency)}
          />
        ))}

        {filteredCurrencies.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No currencies found matching &quot;{searchQuery}&quot;
          </div>
        )}
      </div>
    </div>
  );
}
