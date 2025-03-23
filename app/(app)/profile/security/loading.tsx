import { PageHeader } from "@/components/layout/page-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Security" />

      <div className="p-4 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}

        <div className="pt-4">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </div>
  )
}

