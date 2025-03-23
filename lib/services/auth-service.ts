import Cookies from "js-cookie"
import type { AuthResponse, AuthFormData, User } from "@/types"

// Constants for cookie names and expiration
const AUTH_TOKEN_COOKIE = "auth-token"
const ONBOARDING_COMPLETE_COOKIE = "onboarding-complete"
const AUTH_TOKEN_EXPIRY = 7 // days
const ONBOARDING_EXPIRY = 30 // days

/**
 * Authentication service that integrates with BetterAuth
 */
export const AuthService = {
  /**
   * Sign in a user with email and password
   */
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      // For MVP, simulate a successful login with any credentials
      // In a real implementation, this would validate credentials against an API

      // Create a mock user based on the provided email
      const mockUser = {
        id: "1",
        name: email
          .split("@")[0]
          .split(".")
          .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
          .join(" "),
        email: email,
        avatar: "/placeholder.svg?height=100&width=100",
      }

      // Generate a mock token
      const mockToken = btoa(`${mockUser.id}:${mockUser.email}:${Date.now()}`)

      const mockResponse: AuthResponse = {
        success: true,
        token: mockToken,
        user: mockUser,
      }

      // Set auth token cookie with proper options
      this.setAuthToken(mockResponse.token)

      // Set onboarding complete cookie
      this.setOnboardingComplete()

      // Simulate network delay for a more realistic experience
      await new Promise((resolve) => setTimeout(resolve, 500))

      return mockResponse
    } catch (error) {
      console.error("Sign in error:", error)
      return {
        success: false,
        message: "Invalid email or password",
      }
    }
  },

  /**
   * Sign up a new user
   */
  async signUp(data: AuthFormData): Promise<AuthResponse> {
    try {
      // For MVP, simulate a successful signup
      // Create a mock user based on the provided data
      const mockUser = {
        id: "1",
        name: data.name || data.email.split("@")[0],
        email: data.email,
        avatar: "/placeholder.svg?height=100&width=100",
      }

      // Generate a mock token
      const mockToken = btoa(`${mockUser.id}:${mockUser.email}:${Date.now()}`)

      const mockResponse: AuthResponse = {
        success: true,
        message: "Account created successfully",
        token: mockToken,
        user: mockUser,
      }

      // Set auth token cookie with proper options
      this.setAuthToken(mockResponse.token)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      return mockResponse
    } catch (error) {
      console.error("Sign up error:", error)
      return {
        success: false,
        message: "Failed to create account",
      }
    }
  },

  /**
   * Get the current user
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const token = this.getAuthToken()

      if (!token) {
        return null
      }

      // In a real implementation, this would decode the token or call an API
      // For MVP, extract user info from the mock token
      try {
        const tokenParts = atob(token).split(":")
        if (tokenParts.length >= 2) {
          const id = tokenParts[0]
          const email = tokenParts[1]

          return {
            id,
            name: email
              .split("@")[0]
              .split(".")
              .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
              .join(" "),
            email,
            avatar: "/placeholder.svg?height=100&width=100",
          }
        }
      } catch (e) {
        console.error("Error parsing token:", e)
      }

      // Fallback user data
      return {
        id: "1",
        name: "Guest User",
        email: "guest@example.com",
        avatar: "/placeholder.svg?height=100&width=100",
      }
    } catch (error) {
      console.error("Get current user error:", error)
      return null
    }
  },

  /**
   * Log out the current user
   */
  logout(): void {
    // Remove cookies
    Cookies.remove(AUTH_TOKEN_COOKIE, { path: "/" })
    Cookies.remove(ONBOARDING_COMPLETE_COOKIE, { path: "/" })

    // Clear localStorage
    try {
      localStorage.removeItem(AUTH_TOKEN_COOKIE)
      localStorage.removeItem(ONBOARDING_COMPLETE_COOKIE)
    } catch (e) {
      console.error("Could not clear localStorage:", e)
    }

    // Force reload to clear any in-memory state
    window.location.href = "/auth/signin"
  },

  /**
   * Check if the user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getAuthToken()
  },

  /**
   * Check if the user has completed onboarding
   */
  hasCompletedOnboarding(): boolean {
    const cookie = Cookies.get(ONBOARDING_COMPLETE_COOKIE)
    if (cookie) return true

    // Check localStorage as fallback
    try {
      return localStorage.getItem(ONBOARDING_COMPLETE_COOKIE) === "true"
    } catch (e) {
      return false
    }
  },

  /**
   * Set the auth token cookie
   */
  setAuthToken(token: string): void {
    // Set the cookie with minimal options to ensure it works in all environments
    Cookies.set(AUTH_TOKEN_COOKIE, token, {
      expires: AUTH_TOKEN_EXPIRY,
      path: "/",
      // Only use secure and sameSite in production environments
      ...(window.location.protocol === "https:"
        ? {
            secure: true,
            sameSite: "lax",
          }
        : {}),
    })

    // Also set in localStorage as a fallback
    try {
      localStorage.setItem(AUTH_TOKEN_COOKIE, token)
    } catch (e) {
      console.error("Could not set token in localStorage:", e)
    }
  },

  /**
   * Get the auth token from cookies
   */
  getAuthToken(): string | undefined {
    // Try to get from cookie first
    const cookieToken = Cookies.get(AUTH_TOKEN_COOKIE)
    if (cookieToken) return cookieToken

    // Fall back to localStorage if cookie is not available
    try {
      const localToken = localStorage.getItem(AUTH_TOKEN_COOKIE)
      if (localToken) {
        // Restore the cookie from localStorage
        this.setAuthToken(localToken)
        return localToken
      }
    } catch (e) {
      console.error("Could not get token from localStorage:", e)
    }

    return undefined
  },

  /**
   * Set the onboarding complete cookie
   */
  setOnboardingComplete(): void {
    Cookies.set(ONBOARDING_COMPLETE_COOKIE, "true", {
      expires: ONBOARDING_EXPIRY,
      path: "/",
      // Only use secure and sameSite in production environments
      ...(window.location.protocol === "https:"
        ? {
            secure: true,
            sameSite: "lax",
          }
        : {}),
    })

    // Also set in localStorage as a fallback
    try {
      localStorage.setItem(ONBOARDING_COMPLETE_COOKIE, "true")
    } catch (e) {
      console.error("Could not set onboarding status in localStorage:", e)
    }
  },

  // Other methods omitted for brevity...
}

