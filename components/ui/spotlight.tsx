"use client"

import { useRef, ReactNode, MouseEvent } from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

interface SpotlightCardProps {
    children: ReactNode
    className?: string
    spotlightColor?: string
}

export function SpotlightCard({
    children,
    className,
    spotlightColor = "rgba(99, 102, 241, 0.15)"
}: SpotlightCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ clientX, clientY }: MouseEvent) {
        if (!ref.current) return
        const { left, top } = ref.current.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            className={cn("group relative", className)}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`,
                }}
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

export function SpotlightContainer({
    children,
    className,
    spotlightColor = "rgba(99, 102, 241, 0.08)"
}: SpotlightContainerProps) {
    const ref = useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ clientX, clientY }: MouseEvent) {
        if (!ref.current) return
        const { left, top } = ref.current.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            className={cn("relative", className)}
        >
            <motion.div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 60%)`,
                }}
            />
            {children}
        </div>
    )
}
