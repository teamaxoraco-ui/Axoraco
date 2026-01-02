import { Skeleton } from "@/components/ui/skeleton"

export function SectionSkeleton() {
    return (
        <div className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <Skeleton className="h-10 w-64 mx-auto mb-8" />
                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-48 rounded-2xl" />
                    ))}
                </div>
            </div>
        </div>
    )
}
