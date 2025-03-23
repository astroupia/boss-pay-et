"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, HelpCircle, ChevronRight } from "lucide-react"

export default function SupportPage() {
  const router = useRouter()
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert("Your message has been sent. We'll get back to you soon.")
      setSubject("")
      setMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setLoading(false)
    }
  }

  const supportOptions = [
    {
      icon: <Phone className="h-5 w-5 text-[#0a0b25]" />,
      title: "Call Us",
      description: "24/7 Customer Support",
      action: () => (window.location.href = "tel:+18001234567"),
    },
    {
      icon: <Mail className="h-5 w-5 text-[#0a0b25]" />,
      title: "Email Us",
      description: "support@bosspayet.com",
      action: () => (window.location.href = "mailto:support@bosspayet.com"),
    },
    {
      icon: <HelpCircle className="h-5 w-5 text-[#0a0b25]" />,
      title: "FAQs",
      description: "Find answers to common questions",
      action: () => router.push("/profile/support/faq"),
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Help & Support" />

      <div className="p-4 space-y-6">
        <div className="space-y-3">
          {supportOptions.map((option, index) => (
            <button
              key={index}
              className="flex items-center justify-between w-full p-4 bg-[#fff5f1] rounded-xl"
              onClick={option.action}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-[#f8d0bc] flex items-center justify-center">{option.icon}</div>
                <div className="text-left">
                  <div className="font-medium">{option.title}</div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-medium mb-3">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />

            <Textarea
              placeholder="How can we help you?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
            />

            <Button type="submit" className="w-full bg-[#0a0b25]" disabled={loading || !subject || !message}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

