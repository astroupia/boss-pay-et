import Image from "next/image"
import type { SlideProps } from "@/types/onboarding"
import { cn } from "@/lib/utils"

export function OnboardingSlide({ title, description, image, imageAlt, isActive }: SlideProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center px-6 transition-opacity duration-300",
        isActive ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      <div className="relative h-48 w-48 mb-8">
        <Image src={image || "/placeholder.svg"} alt={imageAlt} fill className="object-contain" priority />
      </div>
      <h1 className="text-2xl font-bold text-white text-center mb-4">{title}</h1>
      <p className="text-gray-400 text-center max-w-xs">{description}</p>
    </div>
  )
}

