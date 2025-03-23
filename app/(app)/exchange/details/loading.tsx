import { PageHeader } from "@/components/layout/page-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0b25]">
      <PageHeader title="Exchange Details" />

      <div className="p-4 space-y-6">
        <Skeleton className="h-64 w-full rounded-xl bg-[#0f1033]" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </div>
  )
}

