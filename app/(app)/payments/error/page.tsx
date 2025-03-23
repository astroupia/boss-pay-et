"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function PaymentErrorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const amount = searchParams?.get("amount") || "364.00"
  const currency = searchParams?.get("currency") || "USD"
  const errorMessage =
    searchParams?.get("message") || "Labore sunt culpa excepteur culpa ipsum. Labore occaecat ex nisi mollit."

  const handleTryAgain = () => {
    // Go back to the payment page
    router.back()
  }

  const handleCancel = () => {
    // Cancel and go to home
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-[#fff5f1] flex flex-col items-center justify-center p-6">
      <div className="mb-6">
        <div className="h-16 w-16 rounded-full border-2 border-red-500 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="#EF4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-2">Oops! Something went wrong</h1>

      <div className="text-3xl font-bold my-6">
        {amount} {currency}
      </div>

      <p className="text-gray-600 text-center mb-12">{errorMessage}</p>

      <div className="w-full space-y-3">
        <Button variant="outline" onClick={handleCancel} className="w-full">
          Cancel
        </Button>
        <Button onClick={handleTryAgain} className="w-full bg-[#0a0b25]">
          Try Again
        </Button>
      </div>
    </div>
  )
}

