import type { ProgressIndicatorProps } from "@/types/onboarding"

export function ProgressIndicator({ total, current }: ProgressIndicatorProps) {
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-1 w-8 rounded-full transition-colors duration-300 ${
            i === current ? "bg-[#f8d0bc]" : "bg-gray-600"
          }`}
        />
      ))}
    </div>
  )
}

