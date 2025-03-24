"use client";

import { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/ui/page-transition";
import { useAuth } from "@/contexts/auth-context";
import { routes } from "@/lib/routes";
import { AppLayout } from "@/components/layout/app-layout";
import { UserHeader } from "@/components/layout/user-header";
import { useAccounts } from "@/lib/hooks/use-accounts";
import { useTransactions } from "@/lib/hooks/use-transactions";
import { AnimatedCard } from "@/components/ui/animated-card";
import { ActionButton } from "@/components/ui/action-button";
import { TransactionItem } from "@/components/ui/transaction-item";
import { SectionTitle } from "@/components/ui/section-title";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ArrowUpRight, CreditCard, Wallet, ArrowDownLeft } from "lucide-react";
import type { Account, Transaction } from "@/types";

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const { accounts } = useAccounts()
  const { transactions } = useTransactions()
  const recentTransactions = transactions.slice(0, 5)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push(routes.auth.signIn)
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null;
  }

  if (loadingAccounts || loadingTransactions) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const primaryAccount =
    accounts.find((account: Account) => account.isDefault) || accounts[0];

  return (
    <PageTransition>
      <AppLayout
        showHeader={false}
        showBackButton={false}
        activeNavItem="home"
        className="pb-16"
      >
        <UserHeader
          user={{
            id: "1",
            name: "John Doe", // Replace with actual user data from context
            email: "john@example.com",
            avatar: "/avatar.png",
          }}
        />

        <div className="px-4 mt-4">
          <AnimatedCard
            balance={primaryAccount?.balance ?? 0}
            currency={primaryAccount?.currency ?? "USD"}
            cardNumber={primaryAccount?.cardNumber ?? ""}
            expiryDate={primaryAccount?.expiryDate ?? ""}
          />

          <div className="grid grid-cols-4 gap-4 mt-6">
            <ActionButton
              icon={<ArrowUpRight className="h-6 w-6" />}
              label="Send"
              href="/transfers/new"
            />
            <ActionButton
              icon={<ArrowDownLeft className="h-6 w-6" />}
              label="Request"
              href="/transfers/receive"
            />
            <ActionButton
              icon={<CreditCard className="h-6 w-6" />}
              label="Cards"
              href="/transfers/index"
            />
            <ActionButton
              icon={<Wallet className="h-6 w-6" />}
              label="Top Up"
              href="payments/top-up"
            />
          </div>

          <div className="mt-8">
            <SectionTitle title="Recent Transactions" className="mb-4" />

            {recentTransactions.length > 0 ? (
              <div className="space-y-4 mt-4">
                {recentTransactions.map((transaction: Transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    // onClick={() =>
                    //   // router.push(
                    //   //   // `${routes.transactions.details}/${transaction.id}`
                    //   // )
                    // }
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No transactions yet"
                description="Your recent transactions will appear here"
                icon="transaction"
                className="mt-8"
              />
            )}
          </div>
        </div>
      </AppLayout>
    </PageTransition>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
