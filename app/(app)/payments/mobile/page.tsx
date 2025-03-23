"use client";

import type React from "react";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { useAccounts } from "@/lib/hooks/use-accounts";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Smartphone } from "lucide-react";
import { PageTransition } from "@/components/ui/page-transition";
import { AmountInput } from "@/components/ui/amount-input";
import { TransactionSummary } from "@/components/ui/transaction-summary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { IconInput } from "@/components/ui/icon-input";

export default function MobilePaymentPage() {
  const router = useRouter();
  const { accounts, getDefaultAccount } = useAccounts();
  const defaultAccount = getDefaultAccount();

  const [phoneNumber, setPhoneNumber] = useState("+17 ");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhoneNumberChange = (value: string) => {
    // Keep the +17 prefix
    if (value.startsWith("+17")) {
      setPhoneNumber(value);
    } else {
      setPhoneNumber("+17 " + value.replace("+17 ", ""));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push("/payments/confirmation");
    } catch (err) {
      console.error("Payment failed", err);
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-900">
        <PageHeader title="Mobile Payment" />

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <IconInput
              icon={<Smartphone className="h-5 w-5 text-blue-500" />}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="+17 xxxxxxxxxx"
              type="tel"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <AmountInput
              value={amount}
              onChange={setAmount}
              currency={defaultAccount?.currency || "USD"}
            />
          </div>

          <div className="flex justify-between text-sm">
            <div className="text-gray-600 dark:text-gray-400">
              Your balance:{" "}
              {formatCurrency(
                defaultAccount?.balance || 4863.27,
                defaultAccount?.currency || "USD"
              )}
            </div>
            <div className="text-gray-600 dark:text-gray-400">No fees</div>
          </div>

          <TransactionSummary
            amount={amount || "0"}
            currency={defaultAccount?.currency || "USD"}
          />

          <Button
            type="submit"
            className="w-full bg-[#0a0b25] hover:bg-[#1a1b35] h-12"
            disabled={
              loading || !amount || !phoneNumber || phoneNumber === "+17 "
            }
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <LoadingSpinner size="sm" className="mr-2" /> Processing...
              </span>
            ) : (
              "Confirm"
            )}
          </Button>
        </form>
      </div>
    </PageTransition>
  );
}
