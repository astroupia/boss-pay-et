"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Contact } from "@/types"
import Link from "next/link"

interface ContactAvatarProps {
  contact: Contact
  onClick?: () => void
  href?: string
  size?: "sm" | "md" | "lg"
}

export function ContactAvatar({ contact, onClick, href, size = "md" }: ContactAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  }

  const avatarComponent = (
    <div className="flex flex-col items-center gap-1 min-w-[60px]">
      <Avatar className={`${sizeClasses[size]} bg-[#f8d0bc]`}>
        {contact.avatar && <AvatarImage src={contact.avatar} alt={contact.name} />}
        <AvatarFallback className="bg-[#f8d0bc] text-[#0a0b25]">{contact.initial}</AvatarFallback>
      </Avatar>
      <span className="text-white text-xs">{contact.name}</span>
    </div>
  )

  if (href) {
    return <Link href={href}>{avatarComponent}</Link>
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="bg-transparent border-0">
        {avatarComponent}
      </button>
    )
  }

  return avatarComponent
}

