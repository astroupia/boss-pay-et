"use client"

import type React from "react"

import { useState } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { AuthInput } from "@/components/auth/auth-input"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    setError("")

    try {
      // In a real app, this would reset the password
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/auth/reset-success")
    } catch (err) {
      setError("Failed to reset password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PageHeader title="New password" />

      <div className="flex-1 p-4">
        <p className="mb-8 text-gray-600">Enter new password and confirm.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput
            icon={<Lock className="h-5 w-5" />}
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={setPassword}
          />

          <AuthInput
            icon={<Lock className="h-5 w-5" />}
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={error}
          />

          <Button type="submit" className="w-full bg-[#0a0b25] text-white" disabled={loading}>
            {loading ? "Changing..." : "Change Password"}
          </Button>
        </form>
      </div>
    </div>
  )
}

