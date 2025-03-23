"use client"

import { PageHeader } from "@/components/layout/page-header"
import { PaymentMethodCard } from "@/components/ui/payment-method-card"
import { SectionTitle } from "@/components/ui/section-title"
import { CreditCard, Smartphone, Globe, Banknote, Wallet, Receipt } from "lucide-react"
import { PageTransition } from "@/components/ui/page-transition"
import BottomNavigation from "@/components/layout/bottom-navigation"

export default function PaymentsPage() {
  const paymentMethods = [
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: "Card Payment",
      description: "Pay with credit or debit card",
      href: "/payments/card",
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Mobile Payment",
      description: "Pay using your mobile phone",
      href: "/payments/mobile",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "IBAN Payment",
      description: "International bank transfers",
      href: "/payments/iban",
    },
  ]

  const otherServices = [
    {
      icon: <Banknote className="h-5 w-5" />,
      title: "Top-up Payment",
      description: "Add funds to your account",
      href: "/payments/top-up",
    },
    {
      icon: <Wallet className="h-5 w-5" />,
      title: "Fund Transfer",
      description: "Transfer between accounts",
      href: "/transfers/fund",
    },
    {
      icon: <Receipt className="h-5 w-5" />,
      title: "Payment History",
      description: "View your transaction history",
      href: "/transfers/history",
    },
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-900 pb-20">
        <PageHeader title="Payments" />

        <div className="p-4 space-y-6">
          <section>
            <SectionTitle title="Payment Methods" className="text-gray-600 dark:text-gray-400" />
            <div className="space-y-3">
              {paymentMethods.map((method, index) => (
                <PaymentMethodCard
                  key={index}
                  icon={method.icon}
                  title={method.title}
                  description={method.description}
                  href={method.href}
                />
              ))}
            </div>
          </section>

          <section>
            <SectionTitle title="Other Services" className="text-gray-600 dark:text-gray-400" />
            <div className="space-y-3">
              {otherServices.map((service, index) => (
                <PaymentMethodCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  href={service.href}
                />
              ))}
            </div>
          </section>
        </div>

        <BottomNavigation activeItem="home" />
      </div>
    </PageTransition>
  )
}

