import type { ReactNode } from "react"
import BottomNavigation from "@/components/layout/bottom-navigation"
import { PageHeader } from "@/components/layout/page-header"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/types"

interface AppLayoutProps {
  children: ReactNode
  title?: string
  showHeader?: boolean
  showBackButton?: boolean
  showBottomNav?: boolean
  activeNavItem?: NavItem
  headerRightElement?: ReactNode
  showSearch?: boolean
  onSearchClick?: () => void
  backHref?: string
  className?: string
  headerClassName?: string
  contentClassName?: string
}

export function AppLayout({
  children,
  title,
  showHeader = true,
  showBackButton = true,
  showBottomNav = true,
  activeNavItem = "home",
  headerRightElement,
  showSearch = false,
  onSearchClick,
  backHref,
  className,
  headerClassName,
  contentClassName,
}: AppLayoutProps) {
  return (
    <div className={cn("flex flex-col min-h-screen bg-[#f8f9fa] dark:bg-[#121212]", className)}>
      {showHeader && title && (
        <PageHeader
          title={title}
          showBackButton={showBackButton}
          showSearch={showSearch}
          rightElement={headerRightElement}
          onSearchClick={onSearchClick}
          backHref={backHref}
          className={headerClassName}
        />
      )}

      <main className={cn("flex-1", contentClassName)}>{children}</main>

      {showBottomNav && <BottomNavigation activeItem={activeNavItem} />}
    </div>
  )
}

