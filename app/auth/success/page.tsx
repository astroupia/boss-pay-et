"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useEffect } from "react"

export default function SuccessPage() {
  const router = useRouter()
  const { setOnboardingComplete } = useAuth()

  useEffect(() => {
    // Mark onboarding as complete
    setOnboardingComplete()
  }, [setOnboardingComplete])

  const handleDone = () => {
    router.push("/")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="mb-6 rounded-full bg-[#f8d0bc] p-4">
        <CheckCircle className="h-12 w-12 text-[#0a0b25]" />
      </div>

      <h1 className="mb-2 text-2xl font-bold">Account created!</h1>
      <p className="mb-8 text-center text-gray-600">Your account has been created successfully.</p>

      <Button onClick={handleDone} className="w-full bg-[#0a0b25] text-white">
        Done
      </Button>
    </div>
  )
}

