"use client"

import type React from "react"

import { useState } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Flag } from "lucide-react"

export default function VerifyPhonePage() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState("+17 ")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (phoneNumber.length < 8) {
      setError("Please enter a valid phone number")
      return
    }

    setLoading(true)
    setError("")

    try {
      // In a real app, this would send a verification code
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/auth/verify")
    } catch (err) {
      setError("Failed to send verification code")
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.startsWith("+17")) {
      setPhoneNumber(value)
    } else {
      setPhoneNumber("+17 " + value.replace("+17 ", ""))
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PageHeader title="Verify your phone number" />

      <div className="flex-1 p-4">
        <p className="mb-8 text-gray-600">We need to verify your phone number before creating your account.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Flag className="h-5 w-5" />
            </div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="w-full rounded-lg bg-[#fff5f1] p-3 pl-10 outline-none focus:ring-2 focus:ring-[#f8d0bc]"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full bg-[#0a0b25] text-white" disabled={loading}>
            {loading ? "Sending..." : "Confirm"}
          </Button>
        </form>
      </div>
    </div>
  )
}

