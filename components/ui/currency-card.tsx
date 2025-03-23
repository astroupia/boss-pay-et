"use client";

import { cn } from "@/lib/utils";
import type { Currency } from "@/types";
import Image from "next/image";
import { motion } from "framer-motion";

export interface CurrencyCardProps {
  currency: Currency;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  showRate?: boolean;
}

export function CurrencyCard({
  currency,
  selected = false,
  onClick,
  className,
  showRate = true,
}: CurrencyCardProps) {
  // Function to get country flag image URL based on currency code
  const getCountryFlagUrl = (code: string): string => {
    const countryMap: Record<string, string> = {
      USD: "/flags/us.svg",
      EUR: "/flags/eu.svg",
      GBP: "/flags/gb.svg",
      JPY: "/flags/jp.svg",
      CAD: "/flags/ca.svg",
      AUD: "/flags/au.svg",
      CHF: "/flags/ch.svg",
      CNY: "/flags/cn.svg",
      INR: "/flags/in.svg",
    };

    return countryMap[code] || "/placeholder.svg?height=24&width=24";
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-xl transition-all",
        "bg-white hover:bg-gray-50 border border-transparent",
        selected && "border-[#4da9e4] bg-blue-50 hover:bg-blue-50",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            {currency.flag ? (
              <span className="text-2xl">{currency.flag}</span>
            ) : (
              <Image
                src={getCountryFlagUrl(currency.code) || "/placeholder.svg"}
                alt={currency.code}
                width={40}
                height={40}
                className="object-cover"
              />
            )}
          </div>
          <div className="text-left">
            <div className="font-medium flex items-center">
              <span className="mr-2">{currency.code}</span>
              {selected && (
                <span className="bg-[#4da9e4] text-white text-xs px-2 py-0.5 rounded-full">
                  Selected
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500">{currency.name}</div>
          </div>
        </div>

        {showRate && (
          <div className="text-right">
            <div className="font-medium">{currency.rate.toFixed(2)}</div>
            <div className="text-xs text-gray-500">
              {currency.inverse.toFixed(2)} USD
            </div>
          </div>
        )}
      </div>
    </motion.button>
  );
}
