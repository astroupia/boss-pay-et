import { PageHeader } from "@/components/layout/page-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Change Password" />

      <div className="p-4 space-y-4">
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />

        <div className="pt-4">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </div>
  )
}

