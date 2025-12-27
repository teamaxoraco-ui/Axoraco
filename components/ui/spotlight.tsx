"use client"

import { useRef, ReactNode, MouseEvent, useCallback, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

/**
 * Check if device is mobile/touch
 */
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile('ontouchstart' in window || window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return isMobile
}

interface SpotlightCardProps {
    children: ReactNode
    className?: string
    spotlightColor?: string
}

/**
 * SpotlightCard with optimized CSS-only spotlight effect
 * Disabled on mobile for better performance
 */
export function SpotlightCard({
    children,
    className,
    spotlightColor = "rgba(99, 102, 241, 0.15)"
}: SpotlightCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const spotlightRef = useRef<HTMLDivElement>(null)
    const rafRef = useRef<number | null>(null)
    const isMobile = useIsMobile()

    const handleMouseMove = useCallback(({ clientX, clientY }: MouseEvent) => {
        if (isMobile || !ref.current || !spotlightRef.current) return
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
    }, [spotlightColor, isMobile])

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            className={cn("group relative", className)}
        >
            {/* Spotlight effect - desktop only */}
            {!isMobile && (
                <div
                    ref={spotlightRef}
                    className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
                />
            )}
            {/* Mobile: Subtle gradient border glow instead */}
            {isMobile && (
                <div
                    className="absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    style={{
                        background: `linear-gradient(135deg, ${spotlightColor}, transparent 50%)`,
                    }}
                />
            )}
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
 * Disabled on mobile for better performance, shows gradient instead
 */
export function SpotlightContainer({
    children,
    className,
    spotlightColor = "rgba(99, 102, 241, 0.12)"
}: SpotlightContainerProps) {
    const ref = useRef<HTMLDivElement>(null)
    const spotlightRef = useRef<HTMLDivElement>(null)
    const rafRef = useRef<number | null>(null)
    const isMobile = useIsMobile()

    const handleMouseMove = useCallback(({ clientX, clientY }: MouseEvent) => {
        if (isMobile || !ref.current || !spotlightRef.current) return
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
    }, [spotlightColor, isMobile])

    return (
        <div
            ref={ref}
            onMouseMove={isMobile ? undefined : handleMouseMove}
            className={cn("relative", className)}
        >
            {children}
            {/* Desktop: Mouse-following spotlight */}
            {!isMobile && (
                <div
                    ref={spotlightRef}
                    className="pointer-events-none absolute inset-0 z-20"
                />
            )}
            {/* Mobile: Static animated gradient for visual appeal */}
            {isMobile && (
                <div
                    className="pointer-events-none absolute inset-0 z-20 animate-gradient-shift"
                    style={{
                        background: `radial-gradient(ellipse at 50% 0%, ${spotlightColor}, transparent 60%)`,
                        backgroundSize: '200% 200%',
                    }}
                />
            )}
        </div>
    )
}
