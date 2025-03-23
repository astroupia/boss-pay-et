"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const amount = searchParams?.get("amount") || "364.00"
  const currency = searchParams?.get("currency") || "USD"
  const description =
    searchParams?.get("description") || "Labore sunt culpa excepteur culpa ipsum. Labore occaecat ex nisi mollit."

  const handleSendReceipt = () => {
    // In a real app, this would send a receipt
    console.log("Sending receipt...")
  }

  const handleDone = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-[#fff5f1] flex flex-col items-center justify-center p-6">
      <div className="mb-6">
        <div className="h-16 w-16 rounded-full bg-[#4da9e4] flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
            <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-2">Your payment has been processed!</h1>

      <div className="text-3xl font-bold my-6">
        {amount} {currency}
      </div>

      <p className="text-gray-600 text-center mb-12">{description}</p>

      <div className="w-full space-y-3">
        <Button variant="outline" onClick={handleSendReceipt} className="w-full">
          Send Receipt
        </Button>
        <Button onClick={handleDone} className="w-full bg-[#0a0b25]">
          Done
        </Button>
      </div>
    </div>
  )
}

