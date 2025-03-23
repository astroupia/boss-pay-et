"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { PinInput } from "@/components/ui/pin-input"

export default function ChangePINPage() {
  const router = useRouter()
  const [currentPIN, setCurrentPIN] = useState("")
  const [newPIN, setNewPIN] = useState("")
  const [confirmPIN, setConfirmPIN] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate PINs
    if (newPIN.length !== 4) {
      setError("PIN must be 4 digits")
      return
    }

    if (newPIN !== confirmPIN) {
      setError("New PINs don't match")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // In a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message and navigate back
      alert("PIN changed successfully")
      router.back()
    } catch (error) {
      console.error("Failed to change PIN:", error)
      setError("Failed to change PIN. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Change PIN" />

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <PinInput label="Current PIN" value={currentPIN} onChange={setCurrentPIN} />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <PinInput label="New PIN" value={newPIN} onChange={setNewPIN} />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <PinInput label="Confirm New PIN" value={confirmPIN} onChange={setConfirmPIN} />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-[#0a0b25]"
            disabled={loading || !currentPIN || !newPIN || !confirmPIN}
          >
            {loading ? "Changing PIN..." : "Change PIN"}
          </Button>
        </div>
      </form>
    </div>
  )
}

