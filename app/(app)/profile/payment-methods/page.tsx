"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { CardItem } from "@/components/ui/card-item";
import { SectionTitle } from "@/components/ui/section-title";
import { PageTransition } from "@/components/ui/page-transition";
import { CreditCard, Wallet, BanknoteIcon as Bank } from "lucide-react";
import { PaymentMethodCard } from "@/components/ui/payment-method-card";
import type { CardDetails } from "@/types";

// Mock data
const cards: CardDetails[] = [
  {
    id: "1",
    type: "visa",
    number: "4358********4253",
    currency: "USD",
    expiry: "12/24",
    balance: 4863.27,
    color: "peach",
    isDefault: true,
  },
  {
    id: "2",
    type: "mastercard",
    number: "5412********8912",
    currency: "EUR",
    expiry: "09/25",
    balance: 2150.5,
    color: "blue",
    isDefault: false,
  },
];

const bankAccounts = [
  {
    id: "1",
    name: "Checking Account",
    number: "US****************4571",
    balance: 39863.62,
    currency: "USD",
  },
];

export default function PaymentMethodsPage() {
  const [loading, setLoading] = useState(false);

  const handleAddCard = () => {
    setLoading(true);
    // In a real app, this would navigate to an add card page
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-900">
        <PageHeader title="Payment Methods" backHref="/profile" />

        <div className="p-4 space-y-6">
          <section>
            <SectionTitle
              title="Cards"
              className="text-gray-600 dark:text-gray-400"
            />
            <div className="space-y-3">
              {cards.map((card) => (
                <CardItem key={card.id} card={card} />
              ))}
            </div>
          </section>

          <section>
            <SectionTitle
              title="Bank Accounts"
              className="text-gray-600 dark:text-gray-400"
            />
            <div className="space-y-3">
              {bankAccounts.map((account) => (
                <PaymentMethodCard
                  key={account.id}
                  icon={<Bank className="h-5 w-5" />}
                  title={account.name}
                  description={account.number}
                  href={`/profile/payment-methods/bank/${account.id}`}
                  rightElement={
                    <div className="text-right">
                      <div className="font-medium">
                        {account.balance.toLocaleString()} {account.currency}
                      </div>
                    </div>
                  }
                />
              ))}
            </div>
          </section>

          <section>
            <SectionTitle
              title="Add Payment Method"
              className="text-gray-600 dark:text-gray-400"
            />
            <div className="space-y-3">
              <PaymentMethodCard
                icon={<CreditCard className="h-5 w-5" />}
                title="Add Credit/Debit Card"
                description="Add a new card to your account"
                href="/profile/payment-methods/add-card"
              />
              <PaymentMethodCard
                icon={<Bank className="h-5 w-5" />}
                title="Link Bank Account"
                description="Connect your bank account"
                href="/profile/payment-methods/add-bank"
              />
              <PaymentMethodCard
                icon={<Wallet className="h-5 w-5" />}
                title="Add Digital Wallet"
                description="Connect Apple Pay, Google Pay, etc."
                href="/profile/payment-methods/add-wallet"
              />
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

export const dynamic = "force-dynamic";
