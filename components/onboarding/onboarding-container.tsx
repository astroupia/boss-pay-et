"use client"

import { useState } from "react"
import type { OnboardingProps } from "@/types/onboarding"
import { OnboardingSlide } from "./slide"
import { ProgressIndicator } from "./progress-indicator"
import { OnboardingButton } from "./onboarding-button"

export function OnboardingContainer({ slides, onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      onComplete()
    } else {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0a0b25] flex flex-col">
      {/* Decorative clouds */}
      <div className="absolute top-12 left-8">
        <div className="w-16 h-8 bg-gray-700/20 rounded-full" />
      </div>
      <div className="absolute top-8 right-12">
        <div className="w-12 h-6 bg-gray-700/20 rounded-full" />
      </div>

      {/* Slides */}
      <div className="flex-1 relative">
        {slides.map((slide) => (
          <OnboardingSlide key={slide.id} {...slide} isActive={currentSlide === slide.id} />
        ))}
      </div>

      {/* Bottom controls */}
      <div className="px-6 pb-12 space-y-8">
        <ProgressIndicator total={slides.length} current={currentSlide} />
        <OnboardingButton onClick={handleNext} isLastSlide={currentSlide === slides.length - 1} />
      </div>
    </div>
  )
}

