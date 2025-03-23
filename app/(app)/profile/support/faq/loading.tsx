import { PageHeader } from "@/components/layout/page-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Frequently Asked Questions" />

      <div className="p-4">
        <Skeleton className="h-10 w-full rounded-md mb-6" />

        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, categoryIndex) => (
            <div key={categoryIndex}>
              <Skeleton className="h-6 w-32 mb-3" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, faqIndex) => (
                  <Skeleton key={faqIndex} className="h-16 w-full rounded-xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

