"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { PageTransition } from "@/components/ui/page-transition"
import { CreditCard, Check } from "lucide-react"
import { FormField } from "@/components/ui/form-field"
import { cn } from "@/lib/utils"

export default function AddCardPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  })
  const [errors, setErrors] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  })
  const [formValid, setFormValid] = useState(false)

  // Determine card type based on first digits
  const getCardType = (number: string) => {
    const cleaned = number.replace(/\D/g, "")
    if (!cleaned) return "unknown"

    // Visa
    if (cleaned.startsWith("4")) return "visa"

    // Mastercard
    if (/^5[1-5]/.test(cleaned)) return "mastercard"

    // Amex
    if (/^3[47]/.test(cleaned)) return "amex"

    // Discover
    if (/^6(?:011|5)/.test(cleaned)) return "discover"

    return "unknown"
  }

  const cardType = getCardType(formData.cardNumber)

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "")
    const isAmex = getCardType(digits) === "amex"

    if (isAmex) {
      // Format: XXXX XXXXXX XXXXX (4-6-5)
      return digits
        .replace(/(\d{4})/, "$1 ")
        .replace(/(\d{4}) (\d{6})/, "$1 $2 ")
        .substring(0, 17)
    } else {
      // Format: XXXX XXXX XXXX XXXX (4-4-4-4)
      return digits
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .substring(0, 19)
    }
  }

  // Format expiry date as MM/YY
  const formatExpiryDate = (value: string) => {
    let digits = value.replace(/\D/g, "")

    if (digits.length <= 2) return digits

    // Ensure month is between 01-12
    let month = digits.substring(0, 2)
    if (month.startsWith("0") && month !== "0") {
      // Valid month starting with 0
    } else if (month.startsWith("1") && Number.parseInt(month) <= 12) {
      // Valid month starting with 1
    } else if (
      month.startsWith("2") ||
      month.startsWith("3") ||
      month.startsWith("4") ||
      month.startsWith("5") ||
      month.startsWith("6") ||
      month.startsWith("7") ||
      month.startsWith("8") ||
      month.startsWith("9")
    ) {
      // Invalid month starting with 2-9, convert to 0X format
      const updatedMonth = "0" + month.charAt(0)
      const updatedDigits = updatedMonth + digits.substring(1)
      return formatExpiryDate(updatedDigits)
    } else if (month === "00") {
      const updatedMonth = "01" 
      const updatedDigits = updatedMonth + digits.substring(2)
      return formatExpiryDate(updatedDigits)
    } else if (Number.parseInt(month) > 12) {
      month = "12"
      const digitsTemp = month + digits.substring(2)
      digits = digitsTemp
    }

    return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`
  }

  // Validate card number using Luhn algorithm
  const validateCardNumber = (number: string) => {
    const digits = number.replace(/\D/g, "")

    if (!digits) return "Card number is required"
    if (digits.length < 15 || digits.length > 16) return "Card number must be 15-16 digits"

    // Luhn algorithm
    let sum = 0
    let shouldDouble = false

    // Loop from right to left
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = Number.parseInt(digits.charAt(i))

      if (shouldDouble) {
        digit *= 2
        if (digit > 9) digit -= 9
      }

      sum += digit
      shouldDouble = !shouldDouble
    }

    if (sum % 10 !== 0) return "Invalid card number"

    return null
  }

  // Validate expiry date
  const validateExpiryDate = (date: string) => {
    const expiryPattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/

    if (!date) return "Expiry date is required"
    if (!expiryPattern.test(date)) return "Enter a valid expiry date (MM/YY)"

    const [month, year] = date.split("/")
    const expMonth = Number.parseInt(month)
    const expYear = Number.parseInt("20" + year)

    const now = new Date()
    const currentMonth = now.getMonth() + 1
    const currentYear = now.getFullYear()

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return "Card has expired"
    }

    return null
  }

  // Validate CVV
  const validateCVV = (cvv: string) => {
    const digits = cvv.replace(/\D/g, "")
    const expectedLength = cardType === "amex" ? 4 : 3

    if (!digits) return "CVV is required"
    if (digits.length !== expectedLength) return `CVV must be ${expectedLength} digits`

    return null
  }

  // Validate cardholder name
  const validateCardholderName = (name: string) => {
    if (!name.trim()) return "Cardholder name is required"
    if (name.trim().length < 3) return "Name must be at least 3 characters"
    if (!/^[a-zA-Z\s'-]+$/.test(name)) return "Name contains invalid characters"

    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Check form validity whenever form data changes
  useEffect(() => {
    const cardNumberError = validateCardNumber(formData.cardNumber)
    const nameError = validateCardholderName(formData.cardholderName)
    const expiryError = validateExpiryDate(formData.expiryDate)
    const cvvError = validateCVV(formData.cvv)

    setErrors({
      cardNumber: cardNumberError || "",
      cardholderName: nameError || "",
      expiryDate: expiryError || "",
      cvv: cvvError || "",
    })

    setFormValid(
      !cardNumberError &&
        !nameError &&
        !expiryError &&
        !cvvError &&
        formData.cardNumber.trim() !== "" &&
        formData.cardholderName.trim() !== "" &&
        formData.expiryDate.trim() !== "" &&
        formData.cvv.trim() !== "",
    )
  }, [formData, cardType])

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
        <PageHeader title="Add Card" backHref="/profile/payment-methods" />

        <div className="p-4">
          {success ? (
            <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 dark:bg-green-900 rounded-full mb-4">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Card Added Successfully</h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                Your card has been added to your payment methods.
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              {/* Card Preview */}
              <div
                className={cn(
                  "h-48 rounded-xl p-4 mb-6 relative overflow-hidden",
                  cardType === "visa"
                    ? "bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800"
                    : cardType === "mastercard"
                      ? "bg-gradient-to-br from-red-400 to-orange-600 dark:from-red-600 dark:to-orange-800"
                      : cardType === "amex"
                        ? "bg-gradient-to-br from-teal-400 to-teal-600 dark:from-teal-600 dark:to-teal-800"
                        : cardType === "discover"
                          ? "bg-gradient-to-br from-orange-400 to-orange-600 dark:from-orange-600 dark:to-orange-800"
                          : "bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-800",
                  "flex flex-col justify-between",
                )}
              >
                <div className="flex justify-between items-start">
                  <div className="text-white text-lg font-medium">{formData.cardholderName || "Your Name"}</div>
                  <div className="h-10 w-16 flex items-center justify-center">
                    {cardType === "visa" && <div className="text-white font-bold text-xl">VISA</div>}
                    {cardType === "mastercard" && <div className="text-white font-bold text-xl">MC</div>}
                    {cardType === "amex" && <div className="text-white font-bold text-xl">AMEX</div>}
                    {cardType === "discover" && <div className="text-white font-bold text-xl">DISC</div>}
                  </div>
                </div>

                <div className="text-white text-xl tracking-wider font-mono">
                  {formData.cardNumber || "•••• •••• •••• ••••"}
                </div>

                <div className="flex justify-between items-end">
                  <div className="text-white text-sm">
                    <div className="opacity-70 text-xs mb-1">Expires</div>
                    {formData.expiryDate || "MM/YY"}
                  </div>
                  <div className="text-white text-sm">
                    <div className="opacity-70 text-xs mb-1">CVV</div>
                    {formData.cvv ? "•".repeat(formData.cvv.length) : "•••"}
                  </div>
                </div>

                <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-10 pointer-events-none"></div>
              </div>

              {/* Card Form */}
              <form onSubmit={handleSubmit}>
                <FormField
                  label="Card Number"
                  htmlFor="cardNumber"
                  name="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  error={errors.cardNumber}
                  maxLength={19}
                  icon={<CreditCard className="h-5 w-5 text-gray-400" />}
                  inputMode="numeric"
                  autoComplete="cc-number"
                  required
                  formatter={formatCardNumber}
                  validator={validateCardNumber}
                />

                <FormField
                  label="Cardholder Name"
                  htmlFor="cardholderName"
                  name="cardholderName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.cardholderName}
                  onChange={handleInputChange}
                  error={errors.cardholderName}
                  autoComplete="cc-name"
                  required
                  validator={validateCardholderName}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Expiry Date"
                    htmlFor="expiryDate"
                    name="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    error={errors.expiryDate}
                    maxLength={5}
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    required
                    formatter={formatExpiryDate}
                    validator={validateExpiryDate}
                  />

                  <FormField
                    label="CVV"
                    htmlFor="cvv"
                    name="cvv"
                    type="text"
                    placeholder={cardType === "amex" ? "4 digits" : "3 digits"}
                    value={formData.cvv}
                    onChange={handleInputChange}
                    error={errors.cvv}
                    maxLength={cardType === "amex" ? 4 : 3}
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    required
                    validator={validateCVV}
                  />
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
                    "Add Card"
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