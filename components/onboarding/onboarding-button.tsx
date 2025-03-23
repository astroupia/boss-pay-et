"use client"

import type { OnboardingButtonProps } from "@/types/onboarding"
import { Button } from "@/components/ui/button"

export function OnboardingButton({ onClick, isLastSlide }: OnboardingButtonProps) {
  return (
    <Button onClick={onClick} className="w-full bg-[#f8d0bc] text-[#0a0b25] hover:bg-[#f8c0ac]">
      {isLastSlide ? "Get Started" : "Next"}
    </Button>
  )
}

