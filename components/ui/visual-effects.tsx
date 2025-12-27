"use client"

import { useRef, useEffect, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface TextRevealProps {
    children: string
    className?: string
    delay?: number  // Delay before animation starts (ms)
    stagger?: number  // Delay between each word (ms)
    once?: boolean  // Only animate once
}

/**
 * TextReveal - Animates text word-by-word on scroll into view
 * Uses Intersection Observer + CSS animations for performance
 */
export function TextReveal({
    children,
    className,
    delay = 0,
    stagger = 50,
    once = true
}: TextRevealProps) {
    const containerRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        container.classList.add('animate-reveal')
                        if (once) observer.disconnect()
                    } else if (!once) {
                        container.classList.remove('animate-reveal')
                    }
                })
            },
            { threshold: 0.2 }
        )

        observer.observe(container)
        return () => observer.disconnect()
    }, [once])

    const words = children.split(' ')

    return (
        <span ref={containerRef} className={cn("inline", className)}>
            {words.map((word, i) => (
                <span
                    key={i}
                    className="inline-block opacity-0 translate-y-4 transition-all duration-500 ease-out"
                    style={{
                        transitionDelay: `${delay + i * stagger}ms`,
                    }}
                >
                    {word}
                    {i < words.length - 1 && '\u00A0'}
                </span>
            ))}
            <style jsx>{`
                .animate-reveal span {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </span>
    )
}

interface FloatingElementProps {
    className?: string
    size?: 'sm' | 'md' | 'lg'
    speed?: 'slow' | 'medium' | 'fast'
    color?: string
}

/**
 * FloatingElement - CSS-only animated floating orb/shape
 */
export function FloatingElement({
    className,
    size = 'md',
    speed = 'medium',
    color = "rgba(99, 102, 241, 0.1)"
}: FloatingElementProps) {
    const sizes = {
        sm: 'w-32 h-32',
        md: 'w-48 h-48',
        lg: 'w-64 h-64'
    }

    const durations = {
        slow: '20s',
        medium: '12s',
        fast: '6s'
    }

    return (
        <div
            className={cn(
                "absolute rounded-full blur-3xl pointer-events-none animate-float",
                sizes[size],
                className
            )}
            style={{
                background: color,
                animationDuration: durations[speed],
            }}
        />
    )
}

interface GradientBackgroundProps {
    children: ReactNode
    className?: string
}

/**
 * AnimatedGradientBackground - Slow-moving gradient background
 */
export function AnimatedGradientBackground({
    children,
    className
}: GradientBackgroundProps) {
    return (
        <div className={cn("relative overflow-hidden", className)}>
            {/* Animated gradient overlay */}
            <div
                className="absolute inset-0 -z-10 animate-gradient-shift"
                style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 50%, rgba(236, 72, 153, 0.05) 100%)',
                    backgroundSize: '400% 400%',
                }}
            />
            {children}
        </div>
    )
}
