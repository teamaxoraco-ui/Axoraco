"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
    variant?: "text" | "circular" | "rectangular";
    width?: string | number;
    height?: string | number;
    animate?: boolean;
}

/**
 * Skeleton loader component for content placeholders
 * Used to show loading states while content is being fetched
 */
export function Skeleton({
    className,
    variant = "rectangular",
    width,
    height,
    animate = true,
}: SkeletonProps) {
    const baseStyles = "bg-slate-800/50";

    const variants = {
        text: "rounded h-4",
        circular: "rounded-full",
        rectangular: "rounded-xl",
    };

    const animationStyles = animate
        ? "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-slate-700/30 before:to-transparent"
        : "";

    return (
        <div
            className={cn(baseStyles, variants[variant], animationStyles, className)}
            style={{
                width: typeof width === "number" ? `${width}px` : width,
                height: typeof height === "number" ? `${height}px` : height,
            }}
            aria-hidden="true"
        />
    );
}

/**
 * Card skeleton for loading states
 */
export function CardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn("p-6 rounded-2xl bg-slate-900/60 border border-slate-800", className)}>
            <Skeleton className="w-12 h-12 mb-4" variant="rectangular" />
            <Skeleton className="w-3/4 h-6 mb-2" variant="text" />
            <Skeleton className="w-full h-4 mb-1" variant="text" />
            <Skeleton className="w-2/3 h-4" variant="text" />
        </div>
    );
}

/**
 * Testimonial card skeleton
 */
export function TestimonialSkeleton() {
    return (
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
            <Skeleton className="w-10 h-10 mb-6" variant="rectangular" />
            <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="w-4 h-4" variant="rectangular" />
                ))}
            </div>
            <Skeleton className="w-full h-4 mb-2" variant="text" />
            <Skeleton className="w-full h-4 mb-2" variant="text" />
            <Skeleton className="w-3/4 h-4 mb-8" variant="text" />
            <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12" variant="circular" />
                <div>
                    <Skeleton className="w-24 h-4 mb-1" variant="text" />
                    <Skeleton className="w-32 h-3" variant="text" />
                </div>
            </div>
        </div>
    );
}

/**
 * Page header skeleton
 */
export function PageHeaderSkeleton() {
    return (
        <div className="text-center mb-16">
            <Skeleton className="w-32 h-8 mx-auto mb-6 rounded-full" />
            <Skeleton className="w-2/3 h-12 mx-auto mb-4" variant="text" />
            <Skeleton className="w-1/2 h-6 mx-auto" variant="text" />
        </div>
    );
}
