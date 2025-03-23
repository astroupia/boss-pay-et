"use client"

import type React from "react"
import { useState } from "react"
import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthInput } from "@/components/auth/auth-input"
import { SocialAuthButton } from "@/components/auth/social-auth-button"
import { Button } from "@/components/ui/button"
import { User, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import type { AuthFormData } from "@/types/auth"

export default function SignUpPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const [formData, setFormData] = useState<AuthFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof AuthFormData, string>>>({})

  const validate = () => {
    const newErrors: Partial<Record<keyof AuthFormData, string>> = {}

    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)

    try {
      const response = await signup(formData)

      if (response.success) {
        router.push("/auth/verify-phone")
      } else {
        setErrors({ email: response.message || "Registration failed. Please try again." })
      }
    } catch (err) {
      setErrors({ email: "An unexpected error occurred. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Create Account" subtitle="Sign up to get started">
      <div className="flex-1 p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput
            icon={<User className="h-5 w-5" />}
            type="text"
            placeholder="Full name"
            value={formData.name || ""}
            onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
            error={errors.name}
            required
            autoComplete="name"
          />

          <AuthInput
            icon={<Mail className="h-5 w-5" />}
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))}
            error={errors.email}
            required
            autoComplete="email"
          />

          <AuthInput
            icon={<Lock className="h-5 w-5" />}
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(value) => setFormData((prev) => ({ ...prev, password: value }))}
            error={errors.password}
            required
            autoComplete="new-password"
          />

          <AuthInput
            icon={<Lock className="h-5 w-5" />}
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword || ""}
            onChange={(value) => setFormData((prev) => ({ ...prev, confirmPassword: value }))}
            error={errors.confirmPassword}
            required
            autoComplete="new-password"
          />

          <Button type="submit" className="w-full bg-[#0a0b25] text-white" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <div className="mt-6">
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-[#f8d0bc]">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative bg-white px-4 text-sm text-gray-500">Or sign up with</div>
          </div>

          <div className="mt-4 flex justify-center space-x-4">
            <SocialAuthButton provider="google" onClick={() => {}} />
            <SocialAuthButton provider="facebook" onClick={() => {}} />
            <SocialAuthButton provider="apple" onClick={() => {}} />
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

