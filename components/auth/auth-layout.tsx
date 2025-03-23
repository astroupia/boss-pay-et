import type { AuthLayoutProps } from "@/types/auth"
import { cn } from "@/lib/utils"

export function AuthLayout({
  children,
  title,
  subtitle,
  showBackButton = true,
  backHref = "/auth/signin",
  className,
}: AuthLayoutProps) {
  return (
    <div className={cn("flex min-h-screen flex-col bg-white dark:bg-gray-900", className)}>
      <div className="relative h-48 bg-gradient-to-r from-[#0a0b25] to-[#4da9e4]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[url('/auth-pattern.svg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </div>
      <div className="relative -mt-20 flex flex-1 flex-col rounded-t-3xl bg-white dark:bg-gray-900 px-4 pt-6 pb-4">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          {subtitle && <p className="mt-2 text-gray-600 dark:text-gray-400">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  )
}

