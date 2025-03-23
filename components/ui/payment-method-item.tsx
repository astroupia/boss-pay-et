import type { PaymentMethod } from "@/types"
import Link from "next/link"
import { Info } from "lucide-react"

interface PaymentMethodItemProps {
  method: PaymentMethod
  className?: string
}

export function PaymentMethodItem({ method, className = "" }: PaymentMethodItemProps) {
  return (
    <Link href={method.route}>
      <div className={`flex items-center justify-between p-4 hover:bg-gray-50 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#f8d0bc] flex items-center justify-center">{method.icon}</div>
          <div>
            <div className="font-medium">{method.name}</div>
            {method.description && <div className="text-sm text-gray-500">{method.description}</div>}
          </div>
        </div>
        {method.info ? (
          <Info className="h-5 w-5 text-gray-400" />
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </Link>
  )
}

