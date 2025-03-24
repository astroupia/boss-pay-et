"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CardSelector } from "@/components/ui/card-selector";
import { IconInput } from "@/components/ui/icon-input";
import { CreditCard, Calendar, Lock } from "lucide-react";
import { PageTransition } from "@/components/ui/page-transition";
import { TransactionSummary } from "@/components/ui/transaction-summary";
import { AmountInput } from "@/components/ui/amount-input";
import type { Account } from "@/types";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Mock data
const mockAccounts: Account[] = [
  {
    id: "1",
    type: "visa",
    name: "APITEX PLATINUM",
    cardNumber: "4358123412344253",
    balance: 4863.27,
    currency: "USD",
    expiryDate: "12/24",
    isDefault: true,
  },
  {
    id: "2",
    type: "mastercard",
    name: "PREMIUM",
    cardNumber: "5412123498768912",
    balance: 65.0,
    currency: "EUR",
    expiryDate: "09/25",
  },
];

export default function CardPaymentPage() {
  const router = useRouter();
  const [selectedAccount, setSelectedAccount] = useState<Account>(
    mockAccounts[0]
  );
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCardNumberChange = (value: string) => {
    // Format card number with spaces every 4 digits
    const formatted = value
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
    setCardNumber(formatted);
  };

  const handleExpiryDateChange = (value: string) => {
    // Format expiry date as MM/YY
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 2) {
      setExpiryDate(cleaned);
    } else {
      setExpiryDate(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate to success page with amount
      router.push(
        `/payments/success?amount=${amount}&currency=${selectedAccount.currency}`
      );
    } catch (error) {
      console.error("Payment failed:", error);
      router.push(
        `/payments/error?amount=${amount}&currency=${selectedAccount.currency}`
      );
    }
  };

  const isFormValid =
    cardNumber.length >= 19 &&
    expiryDate.length === 5 &&
    cvv.length >= 3 &&
    amount.length > 0;

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-900 pb-6">
        <PageHeader title="Card Payment" />

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <CardSelector
            accounts={mockAccounts}
            onSelect={setSelectedAccount}
            defaultSelected={selectedAccount.id}
          />

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-4 shadow-sm">
            <IconInput
              icon={<CreditCard className="h-5 w-5 text-blue-500" />}
              placeholder="Card Number"
              value={cardNumber}
              onChange={handleCardNumberChange}
              type="text"
              maxLength={19}
            />

            <div className="flex gap-3">
              <IconInput
                icon={<Calendar className="h-5 w-5 text-blue-500" />}
                placeholder="MM/YY"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                type="text"
                maxLength={5}
                className="flex-1"
              />

              <IconInput
                icon={<Lock className="h-5 w-5 text-blue-500" />}
                placeholder="CVV"
                value={cvv}
                onChange={setCvv}
                type="password"
                maxLength={4}
                className="flex-1"
              />
            </div>

            <AmountInput
              value={amount}
              onChange={setAmount}
              currency={
                selectedAccount.currency === "USD"
                  ? "$"
                  : selectedAccount.currency
              }
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-0 resize-none focus-visible:ring-0 dark:bg-gray-800 dark:text-white"
              placeholder="Description (optional)"
              rows={3}
            />
          </div>

          <TransactionSummary
            amount={amount || "0"}
            fee="0"
            currency={selectedAccount.currency}
          />

          <Button
            type="submit"
            className="w-full bg-[#0a0b25] hover:bg-[#1a1b35] h-12"
            disabled={loading || !isFormValid}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <LoadingSpinner size="sm" className="mr-2" /> Processing...
              </span>
            ) : (
              "Pay"
            )}
          </Button>
        </form>
      </div>
    </PageTransition>
  );
}
