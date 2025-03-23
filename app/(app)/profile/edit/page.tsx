"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/layout/page-header"
import { ProfileAvatar } from "@/components/profile/profile-avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { PersonalInfoFormData } from "@/types/profile"
import { PageTransition } from "@/components/ui/page-transition"
import { FormField } from "@/components/ui/form-field"
import { motion } from "framer-motion"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function EditProfilePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<PersonalInfoFormData>({
    name: "Briley Henderson",
    phoneNumber: "+17 123456789",
    email: "briley@example.com",
    dateOfBirth: "01/15/1990",
    address: "123 Main St, New York, NY 10001",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof PersonalInfoFormData, string>>>({})
  const [loading, setLoading] = useState(false)

  const handleChange = (field: keyof PersonalInfoFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when field is edited
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validate = () => {
    const newErrors: Partial<Record<keyof PersonalInfoFormData, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setLoading(true)

    try {
      // In a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.back()
    } catch (error) {
      console.error("Failed to update profile", error)
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-900">
        <PageHeader title="Edit Personal Info" />

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div className="flex justify-center mb-6">
            <ProfileAvatar name={formData.name} editable onEdit={() => {}} size="lg" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4"
          >
            <FormField label="Full Name" htmlFor="name" error={errors.name}>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Full name"
                className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </FormField>

            <FormField label="Phone Number" htmlFor="phoneNumber" error={errors.phoneNumber}>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">🇺🇸</div>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  className="pl-10 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="Phone number"
                />
              </div>
            </FormField>

            <FormField label="Email" htmlFor="email" error={errors.email}>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email"
                className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </FormField>

            <FormField label="Date of Birth" htmlFor="dateOfBirth" error={errors.dateOfBirth}>
              <Input
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                placeholder="MM/DD/YYYY"
                className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </FormField>

            <FormField label="Address" htmlFor="address" error={errors.address}>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="Enter your address"
                className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </FormField>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Button
              type="submit"
              className="w-full bg-[#0a0b25] hover:bg-[#1a1b35] dark:bg-blue-600 dark:hover:bg-blue-700 h-12"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <LoadingSpinner size="sm" className="mr-2" /> Saving...
                </span>
              ) : (
                "Save"
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </PageTransition>
  )
}

