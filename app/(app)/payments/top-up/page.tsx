"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardSelector } from "@/components/ui/card-selector";
import { PaymentOption } from "@/components/ui/payment-option";
import { SectionHeader } from "@/components/ui/section-header";
import { CreditCard, Smartphone, DollarSign } from "lucide-react";
import type { Account } from "@/types";

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

type TopUpMethod = "card" | "mobile";

export default function TopUpPaymentPage() {
  const router = useRouter();
  const [selectedAccount, setSelectedAccount] = useState<Account>(
    mockAccounts[0]
  );
  const [topUpMethod, setTopUpMethod] = useState<TopUpMethod>("card");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Quick amount options
  const quickAmounts = [50, 100, 200, 500];

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (topUpMethod === "card") {
        router.push("/payments/card?topUp=true");
      } else {
        router.push(
          `/payments/success?amount=${amount}&currency=${selectedAccount.currency}`
        );
      }
    } catch (error) {
      console.error("Top-up failed:", error);
      router.push(
        `/payments/error?amount=${amount}&currency=${selectedAccount.currency}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <PageHeader title="Top-Up" />

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <CardSelector
          accounts={mockAccounts}
          onSelect={setSelectedAccount}
          defaultSelected={selectedAccount.id}
        />

        <SectionHeader title="Top-up method" />

        <div className="space-y-2">
          <PaymentOption
            icon={<CreditCard className="h-5 w-5 text-[#0a0b25]" />}
            title="Card"
            description="Top up using debit or credit card"
            selected={topUpMethod === "card"}
            onClick={() => setTopUpMethod("card")}
          />

          <PaymentOption
            icon={<Smartphone className="h-5 w-5 text-[#0a0b25]" />}
            title="Mobile Payment"
            description="Top up using mobile payment"
            selected={topUpMethod === "mobile"}
            onClick={() => setTopUpMethod("mobile")}
          />
        </div>

        <SectionHeader title="Amount" />

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md bg-[#f8d0bc] flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-[#0a0b25]" />
            </div>
            <Input
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value.replace(/[^0-9.]/g, ""))
              }
              className="pl-14 text-lg"
              placeholder="0.00"
            />
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4">
            {quickAmounts.map((value) => (
              <button
                key={value}
                type="button"
                className={`p-2 rounded-md border transition-colors ${
                  amount === value.toString()
                    ? "bg-[#0a0b25] text-white border-[#0a0b25]"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleQuickAmount(value)}
              >
                ${value}
              </button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#0a0b25] hover:bg-[#1a1b35]"
          disabled={loading || !amount}
        >
          {loading ? "Processing..." : "Continue"}
        </Button>
      </form>
    </div>
  );
}
