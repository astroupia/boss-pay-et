import { PageHeader } from "@/components/layout/page-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Language" />

      <div className="p-4">
        <div className="space-y-2 mb-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>

        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  )
}

