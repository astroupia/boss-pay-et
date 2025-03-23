import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "@/types"
import { getInitials } from "@/lib/utils"

interface UserHeaderProps {
  user: User
  rightElement?: React.ReactNode
}

export function UserHeader({ user, rightElement }: UserHeaderProps) {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 border-2 border-white/10">
          {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <span className="text-white font-medium">{user.name}</span>
      </div>
      {rightElement}
    </div>
  )
}

