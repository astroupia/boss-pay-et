"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function PinPage() {
  const router = useRouter()
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")

  // Mock user data - in a real app, this would come from your auth state
  const user = {
    name: "Briley Henderson",
    email: "brileyhenderson@mail.com",
    avatar: "/placeholder.svg?height=100&width=100",
  }

  const handleDigitClick = (digit: string) => {
    if (pin.length < 4) {
      setPin((prev) => prev + digit)
    }
  }

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1))
  }

  const handleBiometricAuth = () => {
    // In a real app, this would trigger biometric authentication
    console.log("Biometric authentication triggered")
  }

  useEffect(() => {
    if (pin.length === 4) {
      // In a real app, this would verify the PIN
      if (pin === "1234") {
        router.push("/")
      } else {
        setError("Incorrect PIN")
        setPin("")
      }
    }
  }, [pin, router])

  return (
    <div className="flex min-h-screen flex-col items-center bg-white p-6">
      <div className="mb-8 mt-8 flex flex-col items-center">
        <Avatar className="mb-4 h-20 w-20">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-[#f8d0bc]">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-bold">{user.name}</h1>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      <div className="mb-8 flex justify-center space-x-2">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className={`h-3 w-3 rounded-full ${i < pin.length ? "bg-[#0a0b25]" : "bg-gray-300"}`} />
        ))}
      </div>

      {error && <p className="mb-4 text-center text-sm text-red-500">{error}</p>}

      <div className="grid w-full max-w-xs grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <button
            key={digit}
            onClick={() => handleDigitClick(digit.toString())}
            className="flex h-16 w-16 items-center justify-center rounded-lg bg-white text-2xl font-medium shadow-sm hover:bg-gray-50"
          >
            {digit}
          </button>
        ))}
        <button
          onClick={handleBiometricAuth}
          className="flex h-16 w-16 items-center justify-center rounded-lg bg-white text-2xl shadow-sm hover:bg-gray-50"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M12 15C10.3431 15 9 13.6569 9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <rect x="3" y="3" width="18" height="18" rx="9" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
        <button
          onClick={() => handleDigitClick("0")}
          className="flex h-16 w-16 items-center justify-center rounded-lg bg-white text-2xl font-medium shadow-sm hover:bg-gray-50"
        >
          0
        </button>
        <button
          onClick={handleDelete}
          className="flex h-16 w-16 items-center justify-center rounded-lg bg-white text-2xl shadow-sm hover:bg-gray-50"
        >
          ✕
        </button>
      </div>

      <div className="mt-8 flex flex-col items-center space-y-2">
        <Link href="/auth/forgot-password" className="text-sm text-[#f8d0bc]">
          Lost your password?
        </Link>
        <Link href="/auth/signin" className="text-sm text-[#f8d0bc]">
          Switch user
        </Link>
      </div>
    </div>
  )
}

