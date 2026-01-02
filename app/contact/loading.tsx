import { Skeleton } from "@/components/ui/skeleton"

/**
 * Loading UI for contact page
 */
export default function ContactLoading() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Left column skeleton */}
                    <div className="space-y-6">
                        <Skeleton className="h-8 w-32 rounded-full" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <div className="space-y-4 mt-8">
                            <Skeleton className="h-20 w-full rounded-2xl" />
                            <Skeleton className="h-20 w-full rounded-2xl" />
                            <Skeleton className="h-20 w-full rounded-2xl" />
                        </div>
                    </div>

                    {/* Right column (form) skeleton */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8">
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-5 w-64 mb-8" />
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <Skeleton className="h-12 rounded-xl" />
                                <Skeleton className="h-12 rounded-xl" />
                            </div>
                            <Skeleton className="h-12 w-full rounded-xl" />
                            <Skeleton className="h-32 w-full rounded-xl" />
                            <Skeleton className="h-14 w-full rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
