"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  balance?: number;
  currency?: string;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
}

export function AnimatedCard({
  balance,
  currency,
  cardNumber,
  cardHolder,
  expiryDate,
  className,
  onClick,
  delay = 0,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4",
        className
      )}
      onClick={onClick}
    >
      <div className="text-2xl font-bold">
        {new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: currency || "USD",
        }).format(balance || 0)}
      </div>
      <div className="mt-4 space-y-2">
        <div className="text-sm text-gray-500">Card Number</div>
        <div className="font-mono">
          {cardNumber
            ?.replace(/(\d{4})/g, "$1 ")
            .replace(/(?=(\d{4} ){3})\d/g, "*") || "****-****-****-****"}
        </div>
        <div className="text-sm text-gray-500">Card Holder</div>
        <div>{cardHolder || "Card Holder"}</div>
        <div className="text-sm text-gray-500">Expiry Date</div>
        <div>{expiryDate || "MM/YY"}</div>
      </div>
    </motion.div>
  );
}
