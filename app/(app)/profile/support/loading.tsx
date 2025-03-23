import { PageHeader } from "@/components/layout/page-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Help & Support" />

      <div className="p-4 space-y-6">
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>

        <div>
          <Skeleton className="h-6 w-40 mb-3" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}

