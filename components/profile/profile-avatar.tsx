"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Camera } from "lucide-react"

interface ProfileAvatarProps {
  name: string
  src?: string
  size?: "sm" | "md" | "lg"
  editable?: boolean
  onEdit?: () => void
  className?: string
}

export function ProfileAvatar({ name, src, size = "md", editable = false, onEdit, className }: ProfileAvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const sizeClasses = {
    sm: "h-10 w-10 text-sm",
    md: "h-16 w-16 text-lg",
    lg: "h-24 w-24 text-xl",
  }

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold overflow-hidden",
          sizeClasses[size],
        )}
      >
        {src ? (
          <Image
            src={src || "/placeholder.svg"}
            alt={name}
            width={size === "lg" ? 96 : size === "md" ? 64 : 40}
            height={size === "lg" ? 96 : size === "md" ? 64 : 40}
            className="object-cover w-full h-full"
          />
        ) : (
          getInitials(name)
        )}
      </div>

      {editable && (
        <button
          onClick={onEdit}
          className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md border border-gray-200 dark:border-gray-700"
        >
          <Camera className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </button>
      )}
    </div>
  )
}

