"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LockKeyhole } from "lucide-react"

export default function ResetSuccessPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="mb-6 rounded-full bg-[#f8d0bc] p-4">
        <LockKeyhole className="h-12 w-12 text-[#0a0b25]" />
      </div>

      <h1 className="mb-2 text-2xl font-bold">Your password has been reset!</h1>
      <p className="mb-8 text-center text-gray-600">You can now use your new password to sign in to your account.</p>

      <Button onClick={() => router.push("/auth/signin")} className="w-full bg-[#0a0b25] text-white">
        Done
      </Button>
    </div>
  )
}

