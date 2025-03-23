import type { TransactionGroup } from "@/types/transaction"
import { TransactionItem } from "./transaction-item"

interface TransactionListProps {
  groups: TransactionGroup[]
}

export function TransactionList({ groups }: TransactionListProps) {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.date}>
          <h3 className="text-sm text-gray-500 mb-2">{group.date}</h3>
          <div className="space-y-2">
            {group.transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

