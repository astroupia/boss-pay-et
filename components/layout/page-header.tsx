"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Search } from "lucide-react"
import type { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  showBackButton?: boolean
  showSearch?: boolean
  rightElement?: ReactNode
  onSearchClick?: () => void
  backHref?: string
  className?: string
  titleClassName?: string
}

export function PageHeader({
  title,
  showBackButton = true,
  showSearch = false,
  rightElement,
  onSearchClick,
  backHref,
  className,
  titleClassName,
}: PageHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (backHref) {
      router.push(backHref)
    } else {
      router.back()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex items-center p-4 bg-[#0a0b25] dark:bg-[#0a0b25] text-white sticky top-0 z-10", className)}
    >
      {showBackButton && (
        <Button
          variant="ghost"
          size="icon"
          className="text-white mr-2 hover:bg-white/10 transition-colors"
          onClick={handleBack}
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      )}
      <h1 className={cn("text-white text-lg font-medium flex-1 text-center", titleClassName)}>{title}</h1>
      {showSearch && (
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 transition-colors"
          onClick={onSearchClick}
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>
      )}
      {rightElement && rightElement}
    </motion.div>
  )
}

