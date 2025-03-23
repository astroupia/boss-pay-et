"use client"

import type React from "react"

import { useState } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { AuthInput } from "@/components/auth/auth-input"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // In a real app, this would send a password reset email
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/auth/reset-password")
    } catch (err) {
      setError("Failed to send reset email")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PageHeader title="Forgot password" />

      <div className="flex-1 p-4">
        <p className="mb-8 text-gray-600">
          Please enter your email address. You will receive a link to create a new password via email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput
            icon={<Mail className="h-5 w-5" />}
            type="email"
            placeholder="Email"
            value={email}
            onChange={setEmail}
            error={error}
          />

          <Button type="submit" className="w-full bg-[#0a0b25] text-white" disabled={loading || !email}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </form>
      </div>
    </div>
  )
}

