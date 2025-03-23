"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { CardMenuItem } from "@/components/ui/card-menu-item"
import { Button } from "@/components/ui/button"
import { Plus, BanknoteIcon as Bank } from "lucide-react"
import type { CardDetails, BankAccount } from "@/types"
import { PageTransition } from "@/components/ui/page-transition"
import { SectionTitle } from "@/components/ui/section-title"
import { PaymentMethodCard } from "@/components/ui/payment-method-card"
import { motion } from "framer-motion"
import BottomNavigation from "@/components/layout/bottom-navigation"

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
    number: "4358********4253",
    currency: "USD",
    expiry: "12/24",
    balance: 6547.27,
    color: "blue",
  },
]

const ongoingCredits: CardDetails[] = [
  {
    id: "3",
    type: "mastercard",
    number: "4358********4253",
    currency: "USD",
    expiry: "12/24",
    balance: 4863.27,
    color: "dark",
  },
]

const accounts: BankAccount[] = [
  {
    id: "1",
    type: "entrepreneur",
    number: "US****************4571",
    balance: 39863.62,
    currency: "USD",
  },
]

export default function CardMenuPage() {
  const [loading, setLoading] = useState(false)

  const handleAddCard = () => {
    setLoading(true)
    // In a real app, this would navigate to an add card page
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-900 pb-20">
        <PageHeader title="Card Menu" />

        <div className="p-4 space-y-6">
          <section>
            <SectionTitle title="Cards" className="text-gray-600 dark:text-gray-400" />
            <div className="space-y-3">
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CardMenuItem card={card} />
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle title="Ongoing Credits" className="text-gray-600 dark:text-gray-400" />
            <div className="space-y-3">
              {ongoingCredits.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <CardMenuItem card={card} />
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle title="Entrepreneur Accounts" className="text-gray-600 dark:text-gray-400" />
            <div className="space-y-3">
              {accounts.map((account, index) => (
                <motion.div
                  key={account.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <PaymentMethodCard
                    icon={<Bank className="h-5 w-5" />}
                    title="Entrepreneur Account"
                    description={account.number}
                    href={`/accounts/${account.id}`}
                    rightElement={
                      <div className="text-right">
                        <div className="font-medium">
                          {account.balance.toLocaleString()} {account.currency}
                        </div>
                      </div>
                    }
                  />
                </motion.div>
              ))}
            </div>
          </section>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <Button
              variant="outline"
              className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 h-12"
              onClick={handleAddCard}
              disabled={loading}
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Card
            </Button>
          </motion.div>
        </div>

        <BottomNavigation activeItem="cards" />
      </div>
    </PageTransition>
  )
}

