import Link from "next/link"
import type { ReactNode } from "react"

interface ActionButtonProps {
  icon: ReactNode
  label: string | ReactNode
  href: string
  className?: string
}

export function ActionButton({ icon, label, href, className = "" }: ActionButtonProps) {
  return (
    <Link href={href} className="block">
      <div className={`bg-[#0f1033] rounded-xl p-4 flex flex-col items-center justify-center gap-2 ${className}`}>
        <div className="bg-[#0f1033] p-2 rounded-lg">{icon}</div>
        <div className="text-white text-xs text-center">
          {typeof label === "string" ? (
            label.includes(" ") ? (
              <>
                <div>{label.split(" ")[0]}</div>
                <div>{label.split(" ").slice(1).join(" ")}</div>
              </>
            ) : (
              <div>{label}</div>
            )
          ) : (
            label
          )}
        </div>
      </div>
    </Link>
  )
}

