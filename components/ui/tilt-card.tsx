"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface TiltCardProps {
    children: React.ReactNode
    className?: string
    tiltAmount?: number
    glareOpacity?: number
}

export function TiltCard({
    children,
    className = "",
    tiltAmount = 10,
    glareOpacity = 0.15
}: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0.5)
    const y = useMotionValue(0.5)

    const springConfig = { damping: 20, stiffness: 300 }
    const rotateX = useSpring(useTransform(y, [0, 1], [tiltAmount, -tiltAmount]), springConfig)
    const rotateY = useSpring(useTransform(x, [0, 1], [-tiltAmount, tiltAmount]), springConfig)

    // Glare effect position
    const glareX = useTransform(x, [0, 1], ["-100%", "200%"])
    const glareY = useTransform(y, [0, 1], ["-100%", "200%"])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        x.set((e.clientX - rect.left) / rect.width)
        y.set((e.clientY - rect.top) / rect.height)
    }

    const handleMouseLeave = () => {
        x.set(0.5)
        y.set(0.5)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            className={`relative ${className}`}
        >
            {children}
            {/* Glare overlay */}
            <motion.div
                className="absolute inset-0 pointer-events-none rounded-inherit overflow-hidden"
                style={{
                    background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,${glareOpacity}) 0%, transparent 50%)`,
                    backgroundPosition: `${glareX}px ${glareY}px`,
                }}
            />
        </motion.div>
    )
}
