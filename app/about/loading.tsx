import { Skeleton } from "@/components/ui/skeleton"

/**
 * Loading UI for About page
 */
export default function AboutLoading() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16 px-6">
            <div className="container mx-auto max-w-6xl">
                {/* Hero skeleton */}
                <div className="text-center mb-16">
                    <Skeleton className="h-8 w-40 mx-auto mb-6 rounded-full" />
                    <Skeleton className="h-16 w-3/4 mx-auto mb-4" />
                    <Skeleton className="h-6 w-1/2 mx-auto" />
                </div>

                {/* Team grid skeleton */}
                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="text-center">
                            <Skeleton className="h-32 w-32 rounded-full mx-auto mb-4" />
                            <Skeleton className="h-6 w-32 mx-auto mb-2" />
                            <Skeleton className="h-4 w-24 mx-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
