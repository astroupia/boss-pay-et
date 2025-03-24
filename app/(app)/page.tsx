"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageTransition } from "@/components/ui/page-transition"
import { useAuth } from "@/contexts/auth-context"
import { routes } from "@/lib/routes"
import { AppLayout } from "@/components/layout/app-layout"
import UserHeader from "@/components/layout/user-header"
import { useAccounts } from "@/lib/hooks/use-accounts"
import { useTransactions } from "@/lib/hooks/use-transactions"
import { AnimatedCard } from "@/components/ui/animated-card"
import { ActionButton } from "@/components/ui/action-button"
import { TransactionItem } from "@/components/ui/transaction-item"
import { SectionTitle } from "@/components/ui/section-title"
import { EmptyState } from "@/components/ui/empty-state"
import { ArrowUpRight, CreditCard, Wallet, ArrowDownLeft } from "lucide-react"

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
    return null
  }

  const primaryAccount = accounts.find((account) => account.isPrimary) || accounts[0]

  return (
    <PageTransition>
      <AppLayout showHeader={false} showBackButton={false} activeNavItem="home" className="pb-16">
        <UserHeader />

        <div className="px-4 mt-4">
          <AnimatedCard
            balance={primaryAccount?.balance || 0}
            currency={primaryAccount?.currency || "USD"}
            cardNumber={primaryAccount?.cardNumber || ""}
            cardHolder={primaryAccount?.cardHolder || ""}
            expiryDate={primaryAccount?.expiryDate || ""}
          />

          <div className="grid grid-cols-4 gap-4 mt-6">
            <ActionButton
              icon={<ArrowUpRight className="h-6 w-6" />}
              label="Send"
              onClick={() => router.push(routes.transfers.new)}
              color="blue"
            />
            <ActionButton
              icon={<ArrowDownLeft className="h-6 w-6" />}
              label="Request"
              onClick={() => router.push(routes.transfers.receive)}
              color="purple"
            />
            <ActionButton
              icon={<CreditCard className="h-6 w-6" />}
              label="Cards"
              onClick={() => router.push(routes.cards.index)}
              color="green"
            />
            <ActionButton
              icon={<Wallet className="h-6 w-6" />}
              label="Top Up"
              onClick={() => router.push(routes.payments.topUp)}
              color="orange"
            />
          </div>

          <div className="mt-8">
            <SectionTitle
              title="Recent Transactions"
              actionText="View All"
              onActionClick={() => router.push(routes.transactions.history)}
            />

            {recentTransactions.length > 0 ? (
              <div className="space-y-4 mt-4">
                {recentTransactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onClick={() => router.push(`${routes.transactions.details}/${transaction.id}`)}
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
  )
}

