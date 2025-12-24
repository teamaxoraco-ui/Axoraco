"use client"

import { Skeleton, SkeletonText, SkeletonCard } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Navbar Skeleton */}
            <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-6">
                <div className="container mx-auto flex items-center justify-between">
                    <Skeleton className="h-8 w-32" />
                    <div className="hidden md:flex items-center gap-8">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-28 rounded-full" />
                    </div>
                </div>
            </nav>

            {/* Hero Skeleton */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <Skeleton className="h-8 w-48 rounded-full" />
                            <div className="space-y-4">
                                <Skeleton className="h-16 w-full" />
                                <Skeleton className="h-16 w-3/4" />
                            </div>
                            <SkeletonText lines={3} className="max-w-lg" />
                            <div className="flex gap-4 pt-4">
                                <Skeleton className="h-14 w-40 rounded-full" />
                                <Skeleton className="h-14 w-40 rounded-full" />
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <SkeletonCard className="aspect-square max-w-lg mx-auto" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Skeleton */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16 space-y-4">
                        <Skeleton className="h-12 w-80 mx-auto" />
                        <Skeleton className="h-6 w-96 mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SkeletonCard className="h-80" />
                        <SkeletonCard className="h-40" />
                        <SkeletonCard className="h-40" />
                    </div>
                </div>
            </section>
        </div>
    )
}
