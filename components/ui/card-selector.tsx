"use client"

import { useState } from "react"
import { AccountCard } from "./account-card"
import type { Account } from "@/types"

export interface CardSelectorProps {
  accounts: Account[]
  onSelect: (account: Account) => void
  defaultSelected?: string
  className?: string
}

export function CardSelector({ accounts, onSelect, defaultSelected, className }: CardSelectorProps) {
  const [selectedId, setSelectedId] = useState<string>(defaultSelected || accounts[0]?.id || "")

  const handleSelect = (account: Account) => {
    setSelectedId(account.id)
    onSelect(account)
  }

  return (
    <div className={className}>
      <div className="text-sm text-gray-600 mb-2">Select card</div>
      <div className="space-y-2">
        {accounts.map((account) => (
          <AccountCard
            key={account.id}
            account={account}
            selected={selectedId === account.id}
            onClick={() => handleSelect(account)}
          />
        ))}
      </div>
    </div>
  )
}

