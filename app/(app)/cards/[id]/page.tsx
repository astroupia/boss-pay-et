"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Lock, CreditCard, AlertTriangle, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { CardDetails } from "@/types"
import { PageTransition } from "@/components/ui/page-transition"
import { CardDetailHeader } from "@/components/ui/card-detail-header"
import { DetailItem } from "@/components/ui/detail-item"
import { CardAction } from "@/components/ui/card-action"
import { formatCurrency } from "@/lib/utils"
import { motion } from "framer-motion"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Mock data for cards
const cards: { [key: string]: CardDetails } = {
  "1": {
    id: "1",
    type: "visa",
    number: "4358123412344253",
    currency: "USD",
    expiry: "12/24",
    balance: 4863.27,
    color: "peach",
    isDefault: true,
  },
  "2": {
    id: "2",
    type: "mastercard",
    number: "5412123498768912",
    currency: "EUR",
    expiry: "09/25",
    balance: 2150.5,
    color: "blue",
    isDefault: false,
  },
  "3": {
    id: "3",
    type: "mastercard",
    number: "5412789012345678",
    currency: "USD",
    expiry: "03/26",
    balance: 1250.75,
    color: "dark",
    isDefault: false,
  },
}

export default function CardDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [card, setCard] = useState<CardDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [showCardNumber, setShowCardNumber] = useState(false)

  // Fetch card data
  useEffect(() => {
    const fetchCard = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Get card by ID
        const cardData = cards[params.id] || cards["1"]
        setCard(cardData)
      } catch (error) {
        console.error("Failed to fetch card", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCard()
  }, [params.id])

  // Card actions
  const handleChangePIN = () => {
    if (!card) return
    router.push(`/cards/${card.id}/pin`)
  }

  const handleBlockCard = () => {
    // In a real app, this would call an API to block the card
    alert("Card blocked successfully")
  }

  const handleReportLost = () => {
    if (!card) return
    // In a real app, this would navigate to a form to report a lost card
    router.push(`/cards/${card.id}/report-lost`)
  }

  if (loading || !card) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Card limits
  const limits = [
    { type: "Daily ATM", amount: 1000, currency: card.currency },
    { type: "Daily purchase", amount: 5000, currency: card.currency },
    { type: "Online payment", amount: 3000, currency: card.currency },
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-900">
        <PageHeader title="Card Details" />

        <div className="p-4 space-y-6">
          {/* Card Display */}
          <div className="relative">
            <CardDetailHeader card={card} showCardNumber={showCardNumber} />

            <button
              className="absolute top-4 right-4 bg-white/20 dark:bg-black/20 rounded-full p-2"
              onClick={() => setShowCardNumber(!showCardNumber)}
            >
              {showCardNumber ? <EyeOff className="h-5 w-5 text-white" /> : <Eye className="h-5 w-5 text-white" />}
            </button>

            <div className="absolute top-4 right-16">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={handleChangePIN}>Change PIN</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleBlockCard}>Block Card</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleReportLost}>Report Lost</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Card Limits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">Card Limits</h2>
            <div className="space-y-3">
              {limits.map((limit, index) => (
                <DetailItem key={index} label={limit.type} value={formatCurrency(limit.amount, limit.currency)} />
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <CardAction icon={<Lock className="h-4 w-4" />} label="Change PIN" onClick={handleChangePIN} />

            <CardAction
              icon={<AlertTriangle className="h-4 w-4" />}
              label="Block Card"
              onClick={handleBlockCard}
              variant="destructive"
            />

            <CardAction
              icon={<CreditCard className="h-4 w-4" />}
              label="Report Lost or Stolen"
              onClick={handleReportLost}
              variant="destructive"
            />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

