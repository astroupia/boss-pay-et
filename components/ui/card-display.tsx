import { Card, CardContent } from "@/components/ui/card"
import type { Account } from "@/types"
import { formatCurrency, maskCardNumber } from "@/lib/utils"
import Image from "next/image"

interface CardDisplayProps {
  account: Account
  className?: string
  showBalance?: boolean
}

export function CardDisplay({ account, className = "", showBalance = true }: CardDisplayProps) {
  const getGradient = (type: string) => {
    switch (type) {
      case "visa":
        return "bg-gradient-to-r from-[#f8d49a] to-[#f8c066]"
      case "mastercard":
        return "bg-gradient-to-r from-[#66c4f8] to-[#5db9f8]"
      default:
        return "bg-gradient-to-r from-[#a8c0ff] to-[#8f9fff]"
    }
  }

  const getCardLogo = (type: string) => {
    switch (type) {
      case "visa":
        return "VISA"
      case "mastercard":
        return <Image src="/icons/mastercard.svg" alt="Mastercard" width={30} height={20} className="inline-block" />
      default:
        return type.toUpperCase()
    }
  }

  return (
    <Card
      className={`min-w-[300px] h-[160px] rounded-xl ${getGradient(account.type)} border-0 flex-shrink-0 ${className}`}
    >
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div className="flex justify-between">
          <div className="text-blue-900 font-bold">{getCardLogo(account.type)}</div>
          <div className="text-black/70 text-sm">{account.name}</div>
        </div>
        <div className="text-black/70 text-sm">{maskCardNumber(account.cardNumber)}</div>
        {showBalance && (
          <div>
            <div className="text-xs text-black/70">BALANCE</div>
            <div className="text-3xl font-bold text-black flex items-baseline">
              {formatCurrency(account.balance, account.currency)
                .split(".")
                .map((part, index) =>
                  index === 0 ? (
                    <span key="whole" className="mr-1">
                      {part}
                    </span>
                  ) : (
                    <span key="decimal" className="text-lg">
                      .{part} {account.currency}
                    </span>
                  ),
                )}
            </div>
          </div>
        )}
        <div className="self-end">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z"
              fill="black"
            />
            <path
              d="M18 12C18 13.5913 17.3679 15.1174 16.2426 16.2426C15.1174 17.3679 13.5913 18 12 18C10.4087 18 8.88258 17.3679 7.75736 16.2426C6.63214 15.1174 6 13.5913 6 12"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}

