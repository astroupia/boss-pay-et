"use client"

import { useRouter } from "next/navigation"
import { OnboardingContainer } from "@/components/onboarding/onboarding-container"
import type { OnboardingSlide } from "@/types/onboarding"
import { useAuth } from "@/contexts/auth-context"

const slides: OnboardingSlide[] = [
  {
    id: 0,
    title: "Welcome to BossPayet!",
    description: "The easiest way to send money internationally with competitive exchange rates.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/02%20Onboarding%202.jpg-zw6N0LlOlXWZsZ8wz1tx7phAp6K266.jpeg",
    imageAlt: "Welcome to BossPayet",
  },
  {
    id: 1,
    title: "Get a new card in a few clicks!",
    description: "Manage your cards and make payments securely from anywhere in the world.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/03%20Onboarding%203.jpg-53ydYFhnjVRIhWRvZMN3TVcQdrvWCV.jpeg",
    imageAlt: "Get a new card",
  },
  {
    id: 2,
    title: "Easy payments all over the world!",
    description: "Send money to friends and family with just a few taps, no matter where they are.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/04%20Onboarding%204.jpg-gYfW2sba3j7xesI114rNhwIwjgPWKw.jpeg",
    imageAlt: "Global payments",
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { setOnboardingComplete } = useAuth()

  const handleComplete = () => {
    // Mark onboarding as complete
    setOnboardingComplete()

    // Redirect to sign up/sign in
    router.push("/auth/signup")
  }

  return <OnboardingContainer slides={slides} onComplete={handleComplete} />
}

