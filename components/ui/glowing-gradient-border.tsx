"use client"

import { useState, useEffect, useCallback } from "react"

interface GlowingGradientBorderProps {
    children: React.ReactNode
    className?: string
    borderWidth?: number
    animated?: boolean
}

export function GlowingGradientBorder({
    children,
    className = "",
    borderWidth = 2,
    animated = true
}: GlowingGradientBorderProps) {
    const [rotation, setRotation] = useState(0)

    useEffect(() => {
        if (!animated) return

        const interval = setInterval(() => {
            setRotation(r => (r + 1) % 360)
        }, 20)

        return () => clearInterval(interval)
    }, [animated])

    return (
        <div className={`relative ${className}`}>
            {/* Gradient border */}
            <div
                className="absolute -inset-[2px] rounded-[inherit] z-0"
                style={{
                    background: `conic-gradient(from ${rotation}deg, #6366f1, #a855f7, #ec4899, #6366f1)`,
                    padding: borderWidth,
                }}
            />
            {/* Glow effect */}
            <div
                className="absolute -inset-[2px] rounded-[inherit] z-0 blur-xl opacity-50"
                style={{
                    background: `conic-gradient(from ${rotation}deg, #6366f1, #a855f7, #ec4899, #6366f1)`,
                }}
            />
            {/* Content */}
            <div className="relative z-10 bg-slate-950 rounded-[inherit]">
                {children}
            </div>
        </div>
    )
}
