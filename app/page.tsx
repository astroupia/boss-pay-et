"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import BottomNavigation from "@/components/layout/bottom-navigation"
import { UserHeader } from "@/components/layout/user-header"
import { CardDisplay } from "@/components/ui/card-display"
import { ActionButton } from "@/components/ui/action-button"
import { ContactAvatar } from "@/components/ui/contact-avatar"
import { TransactionItem } from "@/components/ui/transaction-item"
import { useAccounts } from "@/lib/hooks/use-accounts"
import { useTransactions } from "@/lib/hooks/use-transactions"
import { useContacts } from "@/lib/hooks/use-contacts"

export default function Dashboard() {
  const { user, loading} = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const { accounts } = useAccounts()
  const { transactions } = useTransactions()
  const { contacts } = useContacts()

  useEffect(() => {
    

    // If not loading and no user, redirect to sign in
    if (!loading && !user) {
      router.push("/auth/signin")
      return
    }

    // If we have a user, we can stop loading
    if (user) {
      setIsLoading(false)
    }
  }, [user, loading, router])

  // Show loading state while checking authentication
  if (isLoading || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0b25]">
        <LoadingSpinner size="lg" className="text-white" />
        <p className="mt-4 text-white">Loading your dashboard...</p>
      </div>
    )
  }

  // Icons for action buttons
  const receiveIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="white" strokeWidth="2" />
      <path d="M16 10L12 14L8 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  const transferIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
      <path d="M12 8V16M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  const paymentIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
      <path
        d="M12 7V17M12 7H10M12 7H14M12 17H9M12 17H15M8 12H16"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )

  // Card icon for header
  const cardIcon = (
    <div className="bg-orange-500 rounded-md p-1">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 10H21M7 15H8M12 15H13"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" strokeWidth="2" />
      </svg>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0b25]">
      {/* Header */}
      <UserHeader user={user || undefined} rightElement={cardIcon} />

      {/* Card Carousel */}
      <div className="px-4 py-2 overflow-x-auto">
        <div className="flex gap-4">
          {accounts.map((account) => (
            <CardDisplay key={account.id} account={account} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2 px-4 py-4">
        <ActionButton icon={receiveIcon} label="Receive Payment" href="/transfers/receive" />
        <ActionButton icon={transferIcon} label="Money Transfer" href="/transfers/new" />
        <ActionButton icon={paymentIcon} label="Make a Payment" href="/payments" />
      </div>

      {/* Quick Money Transfer */}
      <div className="px-4 py-2">
        <h2 className="text-white text-base mb-4">Quick money transfer to:</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {contacts.map((contact) => (
            <ContactAvatar key={contact.id} contact={contact} href={`/transfers/new?contact=${contact.id}`} />
          ))}
          <div className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className="h-12 w-12 rounded-full bg-[#f8d0bc] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 5V19M5 12H19"
                  stroke="#0a0b25"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-white text-xs">Choose</span>
          </div>
        </div>
      </div>

      {/* Latest Transactions */}
      <div className="px-4 py-2 flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-base">Latest transactions</h2>
          <Button variant="ghost" size="icon" className="text-white">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-2">
          {transactions.slice(0, 3).map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeItem="home" />
    </div>
  )
}

