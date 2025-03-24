import type { Transaction } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";

interface TransactionItemProps {
  transaction: Transaction;
  showDate?: boolean;
  className?: string;
  onClick?: () => void;
}

export function TransactionItem({
  transaction,
  showDate = true,
  className = "",
  onClick,
}: TransactionItemProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-[#f8f5f1] rounded-xl p-4 flex justify-between items-center cursor-pointer ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-[#f8d0bc] flex items-center justify-center">
          {transaction.type === "deposit" ? "↓" : "↑"}
        </div>
        <div>
          <div className="font-medium">{transaction.name}</div>
          <div className="text-sm text-gray-600">{transaction.type}</div>
          {showDate && (
            <div className="text-xs text-gray-500">
              {formatDate(transaction.date)}
            </div>
          )}
        </div>
      </div>
      <div
        className={`font-medium ${
          transaction.amount > 0 ? "text-green-500" : "text-gray-800"
        }`}
      >
        {transaction.amount > 0 ? "+" : ""}
        {formatCurrency(transaction.amount)}
      </div>
    </div>
  );
}
