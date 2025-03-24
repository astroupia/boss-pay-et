"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { AuthService } from "@/lib/services/auth-service"
import type { User, AuthResponse, AuthFormData, AuthContextType } from "@/types"

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [authInitialized, setAuthInitialized] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Load user on mount
  const loadUser = useCallback(async () => {
    try {
      if (AuthService.isAuthenticated()) {
        const userData = await AuthService.getCurrentUser()
        setUser(userData)
      }
    } catch (error) {
      console.error("Failed to load user:", error)
      // Clear invalid auth state to prevent loops
      if (AuthService.isAuthenticated()) {
        AuthService.logout()
      }
    } finally {
      setLoading(false)
      setAuthInitialized(true)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  // Handle redirect after authentication - with safeguards
  useEffect(() => {
    if (!authInitialized || loading) return

    // Get the callback URL if it exists
    const callbackUrl = searchParams?.get("callbackUrl")
    const decodedCallbackUrl = callbackUrl ? decodeURIComponent(callbackUrl) : null

    // If we're on the signin page and already authenticated, redirect
    if (pathname === "/auth/signin" && user) {
      try {
        if (decodedCallbackUrl && !decodedCallbackUrl.includes("/auth/")) {
          router.push(decodedCallbackUrl)
        } else {
          router.push("/")
        }
      } catch (error) {
        console.error("Navigation error:", error)
        // Fallback to home page if there's an error
        router.push("/")
      }
    }
  }, [authInitialized, loading, user, pathname, router, searchParams])

  // Login function
  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setLoading(true)
    try {
      const response = await AuthService.signIn(email, password)

      if (response.success && response.user) {
        setUser(response.user)

        // Add a small delay to ensure cookie is set before redirect
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      return response
    } catch (error) {
      console.error("Login error:", error)
      return {
        success: false,
        message: "An unexpected error occurred",
      }
    } finally {
      setLoading(false)
    }
  }

  // Signup function
  const signup = async (data: AuthFormData): Promise<AuthResponse> => {
    setLoading(true)
    try {
      const response = await AuthService.signUp(data)

      if (response.success && response.user) {
        setUser(response.user)

        // Add a small delay to ensure cookie is set before redirect
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      return response
    } catch (error) {
      console.error("Signup error:", error)
      return {
        success: false,
        message: "An unexpected error occurred",
      }
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    AuthService.logout()
    // Redirect to login page after logout
    try {
      router.push("/auth/signin")
    } catch (error) {
      console.error("Logout navigation error:", error)
      // Force a page reload as a fallback
      window.location.href = "/auth/signin"
    }
  }

  // Set onboarding complete
  const setOnboardingComplete = () => {
    AuthService.setOnboardingComplete()
  }

  // Context value
  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
   
    hasCompletedOnboarding: AuthService.hasCompletedOnboarding(),
    login,
    signup,
    logout,
    setOnboardingComplete,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

