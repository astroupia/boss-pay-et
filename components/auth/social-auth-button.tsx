"use client"

import { FcGoogle } from "react-icons/fc"
import { FaApple, FaFacebook } from "react-icons/fa"
import type { SocialAuthButtonProps } from "@/types/auth"

export function SocialAuthButton({ provider, onClick }: SocialAuthButtonProps) {
  const getIcon = () => {
    switch (provider) {
      case "google":
        return <FcGoogle className="h-5 w-5" />
      case "facebook":
        return <FaFacebook className="h-5 w-5 text-blue-600" />
      case "apple":
        return <FaApple className="h-5 w-5" />
      default:
        return null
    }
  }

  const getLabel = () => {
    switch (provider) {
      case "google":
        return "Google"
      case "facebook":
        return "Facebook"
      case "apple":
        return "Apple"
      default:
        return ""
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center w-full py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      {getIcon()}
      <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">{getLabel()}</span>
    </button>
  )
}

