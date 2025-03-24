"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { PageTransition } from "@/components/ui/page-transition"
import { FormField } from "@/components/ui/form-field"
import { Check, HelpCircle, Building, User, Hash } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function AddBankPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    bankName: "",
    accountType: "checking",
    routingNumber: "",
    accountNumber: "",
    accountHolderName: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState({
    bankName: "",
    accountType: "",
    routingNumber: "",
    accountNumber: "",
    accountHolderName: "",
    agreeToTerms: "",
  })
  const [formValid, setFormValid] = useState(false)

  // Validate bank name
  const validateBankName = (name: string) => {
    if (!name.trim()) return "Bank name is required"
    if (name.trim().length < 2) return "Bank name must be at least 2 characters"
    return null
  }

  // Validate routing number
  const validateRoutingNumber = (number: string) => {
    const digits = number.replace(/\D/g, "")

    if (!digits) return "Routing number is required"
    if (digits.length !== 9) return "Routing number must be 9 digits"

    // Simple checksum validation for US routing numbers
    const weights = [3, 7, 1, 3, 7, 1, 3, 7, 1]
    let sum = 0

    for (let i = 0; i < 9; i++) {
      sum += Number.parseInt(digits.charAt(i)) * weights[i]
    }

    if (sum % 10 !== 0) return "Invalid routing number"

    return null
  }

  // Validate account number
  const validateAccountNumber = (number: string) => {
    const digits = number.replace(/\D/g, "")

    if (!digits) return "Account number is required"
    if (digits.length < 8) return "Account number must be at least 8 digits"
    if (digits.length > 17) return "Account number must be at most 17 digits"

    return null
  }

  // Validate account holder name
  const validateAccountHolderName = (name: string) => {
    if (!name.trim()) return "Account holder name is required"
    if (name.trim().length < 3) return "Name must be at least 3 characters"
    if (!/^[a-zA-Z\s'-]+$/.test(name)) return "Name contains invalid characters"

    return null
  }

  // Format routing number
  const formatRoutingNumber = (value: string) => {
    return value.replace(/\D/g, "").substring(0, 9)
  }

  // Format account number
  const formatAccountNumber = (value: string) => {
    return value.replace(/\D/g, "").substring(0, 17)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      accountType: value,
    })
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      agreeToTerms: checked,
    })

    if (errors.agreeToTerms) {
      setErrors({
        ...errors,
        agreeToTerms: "",
      })
    }
  }

  // Check form validity whenever form data changes
  useEffect(() => {
    const bankNameError = validateBankName(formData.bankName)
    const routingNumberError = validateRoutingNumber(formData.routingNumber)
    const accountNumberError = validateAccountNumber(formData.accountNumber)
    const accountHolderNameError = validateAccountHolderName(formData.accountHolderName)
    const agreeToTermsError = !formData.agreeToTerms ? "You must agree to the terms and conditions" : null

    setErrors({
      bankName: bankNameError || "",
      accountType: "",
      routingNumber: routingNumberError || "",
      accountNumber: accountNumberError || "",
      accountHolderName: accountHolderNameError || "",
      agreeToTerms: agreeToTermsError || "",
    })

    setFormValid(
      !bankNameError &&
        !routingNumberError &&
        !accountNumberError &&
        !accountHolderNameError &&
        !agreeToTermsError &&
        formData.bankName.trim() !== "" &&
        formData.routingNumber.trim() !== "" &&
        formData.accountNumber.trim() !== "" &&
        formData.accountHolderName.trim() !== "" &&
        formData.agreeToTerms,
    )
  }, [formData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formValid) {
      setLoading(true)

      // Simulate API call
      setTimeout(() => {
        setLoading(false)
        setSuccess(true)

        // Reset form after showing success
        setTimeout(() => {
          // In a real app, this would navigate back to the payment methods page
          window.history.back()
        }, 2000)
      }, 1500)
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-900">
        <PageHeader title="Link Bank Account" backHref="/profile/payment-methods" />

        <div className="p-4">
          {success ? (
            <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 dark:bg-green-900 rounded-full mb-4">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Bank Account Linked</h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                Your bank account has been successfully linked to your profile.
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Secure Connection</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Your bank account information is encrypted and securely stored. We never store your full account
                  details on our servers.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <FormField
                  label="Bank Name"
                  htmlFor="bankName"
                  name="bankName"
                  type="text"
                  placeholder="Enter your bank name"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  error={errors.bankName}
                  icon={<Building className="h-5 w-5 text-gray-400" />}
                  required
                  validator={validateBankName}
                />

                <div className="mb-4">
                  <Label htmlFor="accountType" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Account Type
                  </Label>
                  <Select value={formData.accountType} onValueChange={handleSelectChange}>
                    <SelectTrigger id="accountType" className="w-full mt-1">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Checking Account</SelectItem>
                      <SelectItem value="savings">Savings Account</SelectItem>
                      <SelectItem value="business">Business Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="routingNumber" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Routing Number
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span>
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>The 9-digit number on the bottom left of your check</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormField
                    htmlFor="routingNumber"
                    name="routingNumber"
                    type="text"
                    placeholder="123456789"
                    value={formData.routingNumber}
                    onChange={handleInputChange}
                    error={errors.routingNumber}
                    icon={<Hash className="h-5 w-5 text-gray-400" />}
                    inputMode="numeric"
                    maxLength={9}
                    required
                    formatter={formatRoutingNumber}
                    validator={validateRoutingNumber}
                    label=""
                  />
                </div>

                <FormField
                  label="Account Number"
                  htmlFor="accountNumber"
                  name="accountNumber"
                  type="text"
                  placeholder="Enter your account number"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  error={errors.accountNumber}
                  icon={<Hash className="h-5 w-5 text-gray-400" />}
                  inputMode="numeric"
                  required
                  formatter={formatAccountNumber}
                  validator={validateAccountNumber}
                />

                <FormField
                  label="Account Holder Name"
                  htmlFor="accountHolderName"
                  name="accountHolderName"
                  type="text"
                  placeholder="Enter the name on the account"
                  value={formData.accountHolderName}
                  onChange={handleInputChange}
                  error={errors.accountHolderName}
                  icon={<User className="h-5 w-5 text-gray-400" />}
                  required
                  validator={validateAccountHolderName}
                />

                <div className="mt-6">
                  <div className="flex items-start">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <div className="ml-2">
                      <Label htmlFor="agreeToTerms" className="text-sm text-gray-700 dark:text-gray-300">
                        I authorize this application to access my bank account information and initiate transactions as
                        needed.
                      </Label>
                      {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className={cn(
                    "w-full py-3 px-4 mt-6 rounded-lg font-medium text-white",
                    "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                    "transition-colors duration-200",
                    "disabled:opacity-70 disabled:cursor-not-allowed",
                    "flex items-center justify-center",
                  )}
                  disabled={loading || !formValid}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Link Bank Account"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

