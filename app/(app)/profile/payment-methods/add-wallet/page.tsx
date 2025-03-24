"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { PageTransition } from "@/components/ui/page-transition"
import { Check, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface WalletOption {
  id: string
  name: string
  icon: string
  description: string
}

const walletOptions: WalletOption[] = [
  {
    id: "apple-pay",
    name: "Apple Pay",
    icon: "🍎",
    description: "Connect your Apple Pay account to make payments with your Apple devices.",
  },
  {
    id: "google-pay",
    name: "Google Pay",
    icon: "🔍",
    description: "Use Google Pay to make quick and secure payments online and in stores.",
  },
  {
    id: "samsung-pay",
    name: "Samsung Pay",
    icon: "📱",
    description: "Link your Samsung Pay wallet for contactless payments with Samsung devices.",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: "💰",
    description: "Connect your PayPal account to make payments and transfers online.",
  },
]

export default function AddWalletPage() {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleWalletSelect = (walletId: string) => {
    setSelectedWallet(walletId)
    setError(null)
  }

  const handleConnect = () => {
    if (!selectedWallet) {
      setError("Please select a wallet to connect")
      return
    }

    setLoading(true)
    setError(null)

    // Simulate API call to connect wallet
    setTimeout(() => {
      // Simulate success for Google Pay and PayPal, error for others
      if (selectedWallet === "google-pay" || selectedWallet === "paypal") {
        setSuccess(true)
        setLoading(false)

        // Reset and navigate back after showing success
        setTimeout(() => {
          // In a real app, this would navigate back to the payment methods page
          window.history.back()
        }, 2000)
      } else {
        setLoading(false)
        setError("Connection failed. This wallet is currently unavailable. Please try again later.")
      }
    }, 1500)
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-900">
        <PageHeader title="Add Digital Wallet" backHref="/profile/payment-methods" />

        <div className="p-4">
          {success ? (
            <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 dark:bg-green-900 rounded-full mb-4">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Wallet Connected</h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                Your digital wallet has been successfully connected to your account.
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-2">Select a Digital Wallet</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Connect a digital wallet to make quick and secure payments.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
                </div>
              )}

              <div className="space-y-3 mb-6">
                {walletOptions.map((wallet) => (
                  <div
                    key={wallet.id}
                    className={cn(
                      "p-4 border rounded-lg cursor-pointer transition-all",
                      "hover:border-blue-500 dark:hover:border-blue-400",
                      selectedWallet === wallet.id
                        ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700",
                    )}
                    onClick={() => handleWalletSelect(wallet.id)}
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl mr-3">
                        {wallet.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{wallet.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{wallet.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleConnect}
                className={cn(
                  "w-full py-3 px-4 rounded-lg font-medium text-white",
                  "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  "transition-colors duration-200",
                  "disabled:opacity-70 disabled:cursor-not-allowed",
                  "flex items-center justify-center",
                )}
                disabled={loading || !selectedWallet}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Connecting...
                  </>
                ) : (
                  "Connect Wallet"
                )}
              </button>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                By connecting a digital wallet, you agree to the terms and conditions of both this application and the
                wallet provider.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

