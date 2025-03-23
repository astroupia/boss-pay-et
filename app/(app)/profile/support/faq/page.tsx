"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface FAQ {
  question: string
  answer: string
  category: string
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqs: FAQ[] = [
    {
      question: "How do I add a new card?",
      answer:
        "To add a new card, go to the Cards section from the bottom navigation, then tap on the 'Add New Card' button at the bottom of the screen. Follow the instructions to enter your card details.",
      category: "Cards",
    },
    {
      question: "What are the transfer limits?",
      answer:
        "Transfer limits vary depending on your account type and verification status. Standard accounts can transfer up to $5,000 per day. Premium accounts can transfer up to $10,000 per day. You can view your specific limits in the Card Details section.",
      category: "Transfers",
    },
    {
      question: "How long do international transfers take?",
      answer:
        "International transfers typically take 1-3 business days to complete, depending on the destination country and banking system. Some transfers to major corridors may be completed within minutes.",
      category: "Transfers",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we use industry-standard encryption and security measures to protect your data. We never store your full card details on your device, and all communications with our servers are encrypted.",
      category: "Security",
    },
    {
      question: "What should I do if I lose my card?",
      answer:
        "If you lose your card, you should immediately report it as lost in the app. Go to Card Details, tap the menu in the top right, and select 'Report Lost'. This will block your card to prevent unauthorized use.",
      category: "Security",
    },
    {
      question: "How do I change my PIN?",
      answer:
        "To change your PIN, go to Card Details, tap the menu in the top right, and select 'Change PIN'. You'll need to enter your current PIN and then your new PIN twice to confirm.",
      category: "Cards",
    },
    {
      question: "What currencies are supported?",
      answer:
        "We currently support USD, EUR, GBP, CAD, AUD, JPY, and many more. You can see the full list of supported currencies in the Exchange section of the app.",
      category: "Exchange",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact customer support through the Help & Support section in your profile. We offer 24/7 support via chat, email, and phone.",
      category: "General",
    },
  ]

  const filteredFAQs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqs

  // Group FAQs by category
  const groupedFAQs: { [key: string]: FAQ[] } = {}
  filteredFAQs.forEach((faq) => {
    if (!groupedFAQs[faq.category]) {
      groupedFAQs[faq.category] = []
    }
    groupedFAQs[faq.category].push(faq)
  })

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Frequently Asked Questions" />

      <div className="p-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search FAQs"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-6">
          {Object.entries(groupedFAQs).map(([category, categoryFaqs]) => (
            <div key={category}>
              <h2 className="text-lg font-medium mb-3">{category}</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {categoryFaqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category}-${index}`}
                    className="border rounded-xl bg-[#fff5f1] px-4"
                  >
                    <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {Object.keys(groupedFAQs).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No FAQs found matching your search. Try different keywords.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

