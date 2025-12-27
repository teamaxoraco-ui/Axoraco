"use client"

import { useRef, ReactNode, MouseEvent, useCallback } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps {
    children: ReactNode
    className?: string
    spotlightColor?: string
}

/**
 * SpotlightCard with optimized CSS-only spotlight effect
 */
export function SpotlightCard({
    children,
    className,
    spotlightColor = "rgba(99, 102, 241, 0.15)"
}: SpotlightCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const spotlightRef = useRef<HTMLDivElement>(null)
    const rafRef = useRef<number | null>(null)

    const handleMouseMove = useCallback(({ clientX, clientY }: MouseEvent) => {
        if (!ref.current || !spotlightRef.current) return

        // Throttle with RAF
        if (rafRef.current !== null) return

        rafRef.current = requestAnimationFrame(() => {
            if (!ref.current || !spotlightRef.current) return
            const { left, top } = ref.current.getBoundingClientRect()
            const x = clientX - left
            const y = clientY - top
            spotlightRef.current.style.background =
                `radial-gradient(600px circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`
            rafRef.current = null
        })
    }, [spotlightColor])

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            className={cn("group relative", className)}
        >
            <div
                ref={spotlightRef}
                className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
            />
            {children}
        </div>
    )
}

interface SpotlightContainerProps {
    children: ReactNode
    className?: string
    spotlightColor?: string
}

/**
 * SpotlightContainer with optimized CSS-only spotlight effect
 */
export function SpotlightContainer({
    children,
    className,
    spotlightColor = "rgba(99, 102, 241, 0.12)"
}: SpotlightContainerProps) {
    const ref = useRef<HTMLDivElement>(null)
    const spotlightRef = useRef<HTMLDivElement>(null)
    const rafRef = useRef<number | null>(null)

    const handleMouseMove = useCallback(({ clientX, clientY }: MouseEvent) => {
        if (!ref.current || !spotlightRef.current) return

        // Throttle with RAF
        if (rafRef.current !== null) return

        rafRef.current = requestAnimationFrame(() => {
            if (!ref.current || !spotlightRef.current) return
            const { left, top } = ref.current.getBoundingClientRect()
            const x = clientX - left
            const y = clientY - top
            spotlightRef.current.style.background =
                `radial-gradient(800px circle at ${x}px ${y}px, ${spotlightColor}, transparent 50%)`
            rafRef.current = null
        })
    }, [spotlightColor])

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            className={cn("relative", className)}
        >
            {children}
            <div
                ref={spotlightRef}
                className="pointer-events-none absolute inset-0 z-20"
            />
        </div>
    )
}
