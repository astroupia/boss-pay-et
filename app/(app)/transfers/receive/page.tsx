"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/ui/section-title"
import { CardItem } from "@/components/ui/card-item"
import { QrCode, Share2 } from "lucide-react"
import type { CardDetails } from "@/types"
import { PageTransition } from "@/components/ui/page-transition"
import BottomNavigation from "@/components/layout/bottom-navigation"

// Mock data
const cards: CardDetails[] = [
  {
    id: "1",
    type: "visa",
    number: "**** **** **** 7895",
    currency: "USD",
    expiry: "12/24",
    balance: 4863.27,
    color: "peach",
    isDefault: true,
  },
  {
    id: "2",
    type: "mastercard",
    number: "**** **** **** 4321",
    currency: "EUR",
    expiry: "09/25",
    balance: 2150.5,
    color: "blue",
    isDefault: false,
  },
]

export default function ReceivePaymentPage() {
  const [selectedCard, setSelectedCard] = useState<CardDetails>(cards[0])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Payment Details",
          text: `Send money to my account: ${selectedCard.number}`,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing", error)
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert(`Copy this account number: ${selectedCard.number}`)
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-900 pb-20">
        <PageHeader title="Receive Payment" />

        <div className="flex-1 p-4 space-y-4">
          <SectionTitle title="Select card to receive payment" className="text-gray-600 dark:text-gray-400" />

          <div className="space-y-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`cursor-pointer transition-all ${card.id === selectedCard.id ? "ring-2 ring-[#0a0b25] dark:ring-blue-500" : ""}`}
                onClick={() => setSelectedCard(card)}
              >
                <CardItem card={card} />
              </div>
            ))}
          </div>

          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center shadow-sm">
            <div className="mb-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl text-blue-500">
              <QrCode className="h-8 w-8" />
            </div>

            <div className="w-48 h-48 bg-[#0a0b25] rounded-lg flex items-center justify-center mb-4">
              {/* QR Code placeholder */}
              <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="40" y="40" width="20" height="20" fill="white" />
                <rect x="60" y="40" width="20" height="20" fill="white" />
                <rect x="80" y="40" width="20" height="20" fill="white" />
                <rect x="40" y="60" width="20" height="20" fill="white" />
                <rect x="80" y="60" width="20" height="20" fill="white" />
                <rect x="100" y="60" width="20" height="20" fill="white" />
                <rect x="40" y="80" width="20" height="20" fill="white" />
                <rect x="60" y="80" width="20" height="20" fill="white" />
                <rect x="80" y="80" width="20" height="20" fill="white" />
                <rect x="40" y="100" width="20" height="20" fill="white" />
                <rect x="80" y="100" width="20" height="20" fill="white" />
                <rect x="100" y="100" width="20" height="20" fill="white" />
              </svg>
            </div>

            <div className="text-center mb-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Account number</div>
              <div className="font-medium text-gray-900 dark:text-white">{selectedCard.number}</div>
            </div>

            <Button
              variant="outline"
              className="flex items-center gap-2 border-gray-200 dark:border-gray-700"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              Share payment details
            </Button>
          </div>
        </div>

        <BottomNavigation activeItem="home" />
      </div>
    </PageTransition>
  )
}

