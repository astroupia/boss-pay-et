import type React from "react"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  token?: string
  user?: User
}

export interface AuthFormData {
  name?: string
  email: string
  password?: string
  phoneNumber?: string
  confirmPassword? : string
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  authInitialized: boolean
  hasCompletedOnboarding: boolean
  login: (email: string, password: string) => Promise<AuthResponse>
  signup: (data: AuthFormData) => Promise<AuthResponse>
  logout: () => void
  setOnboardingComplete: () => void
}

export interface AuthInputProps {
  type: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  icon?: React.ReactNode
  endIcon?: React.ReactNode
  error?: string
  autoComplete?: string
}

export interface SocialAuthButtonProps {
  provider: "google" | "facebook" | "apple"
  onClick: () => void
}

export interface OtpInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  error?: string
}

export interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  showBackButton?: boolean
  backHref?: string
  className?: string
}

