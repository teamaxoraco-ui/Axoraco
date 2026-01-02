"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string | undefined;
    variant?: "text" | "circular" | "rectangular" | undefined;
    width?: string | number | undefined;
    height?: string | number | undefined;
    animate?: boolean | undefined;
}

/**
 * Base skeleton loader component for content placeholders.
 * Used to show loading states while content is being fetched.
 * 
 * @param className - Additional CSS classes
 * @param variant - Shape variant: "text" (rounded), "circular", or "rectangular"
 * @param width - Width of the skeleton (number for px, string for any unit)
 * @param height - Height of the skeleton (number for px, string for any unit)
 * @param animate - Whether to show shimmer animation (default: true)
 * 
 * @example
 * <Skeleton className="w-32 h-8" />
 * <Skeleton variant="circular" width={48} height={48} />
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
            role="presentation"
        />
    );
}

/**
 * Text block skeleton - multiple lines of text
 * 
 * @param lines - Number of text lines to show
 * @param className - Additional CSS classes
 */
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
    return (
        <div className={cn("space-y-2", className)} aria-hidden="true" role="presentation">
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={cn("h-4", i === lines - 1 ? "w-3/4" : "w-full")}
                    variant="text"
                />
            ))}
        </div>
    );
}

/**
 * Card skeleton - generic card placeholder
 * 
 * @param className - Additional CSS classes
 */
export function SkeletonCard({ className }: { className?: string }) {
    return (
        <div
            className={cn("p-6 rounded-2xl bg-slate-900/60 border border-slate-800", className)}
            aria-hidden="true"
            role="presentation"
        >
            <Skeleton className="w-12 h-12 mb-4" variant="rectangular" />
            <Skeleton className="w-3/4 h-6 mb-2" variant="text" />
            <Skeleton className="w-full h-4 mb-1" variant="text" />
            <Skeleton className="w-2/3 h-4" variant="text" />
        </div>
    );
}

/**
 * @deprecated Use SkeletonCard instead
 */
export const CardSkeleton = SkeletonCard;

/**
 * Button skeleton placeholder
 * 
 * @param size - Button size variant
 * @param className - Additional CSS classes
 */
export function SkeletonButton({
    size = "md",
    className,
}: {
    size?: "sm" | "md" | "lg";
    className?: string;
}) {
    const sizes = {
        sm: "h-8 w-20",
        md: "h-10 w-28",
        lg: "h-12 w-36",
    };

    return (
        <Skeleton
            className={cn("rounded-full", sizes[size], className)}
            aria-hidden="true"
        />
    );
}

/**
 * Avatar skeleton placeholder
 * 
 * @param size - Avatar size in pixels
 * @param className - Additional CSS classes
 */
export function SkeletonAvatar({
    size = 48,
    className,
}: {
    size?: number;
    className?: string;
}) {
    return (
        <Skeleton
            variant="circular"
            width={size}
            height={size}
            className={className}
        />
    );
}

/**
 * Testimonial card skeleton
 */
export function TestimonialSkeleton() {
    return (
        <div
            className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800"
            aria-hidden="true"
            role="presentation"
        >
            <Skeleton className="w-10 h-10 mb-6" variant="rectangular" />
            <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="w-4 h-4" variant="rectangular" />
                ))}
            </div>
            <SkeletonText lines={3} className="mb-8" />
            <div className="flex items-center gap-4">
                <SkeletonAvatar size={48} />
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
        <div className="text-center mb-16" aria-hidden="true" role="presentation">
            <Skeleton className="w-32 h-8 mx-auto mb-6 rounded-full" />
            <Skeleton className="w-2/3 h-12 mx-auto mb-4" variant="text" />
            <Skeleton className="w-1/2 h-6 mx-auto" variant="text" />
        </div>
    );
}

/**
 * Services grid skeleton for home page
 */
export function ServicesSkeleton() {
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            aria-label="Loading services"
            role="presentation"
        >
            {/* Featured large card */}
            <div className="md:col-span-2 md:row-span-2 p-10 rounded-3xl bg-slate-900/60 border border-slate-800">
                <Skeleton className="w-32 h-8 rounded-full mb-6" />
                <Skeleton className="w-16 h-16 mb-6" />
                <Skeleton className="w-3/4 h-10 mb-4" variant="text" />
                <SkeletonText lines={3} className="max-w-md mb-8" />
                <SkeletonButton size="lg" />
            </div>
            {/* Smaller cards */}
            <SkeletonCard className="h-48" />
            <SkeletonCard className="h-48" />
        </div>
    );
}

/**
 * Stats grid skeleton
 */
export function StatsSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            aria-hidden="true"
            role="presentation"
        >
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="text-center p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <Skeleton className="w-8 h-8 mx-auto mb-4" />
                    <Skeleton className="w-16 h-8 mx-auto mb-2" variant="text" />
                    <Skeleton className="w-20 h-4 mx-auto" variant="text" />
                </div>
            ))}
        </div>
    );
}

