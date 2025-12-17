"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import Link from "next/link"

interface MagneticButtonProps {
    children: React.ReactNode
    href?: string
    onClick?: () => void
    className?: string
    magnetStrength?: number
}

export function MagneticButton({
    children,
    href,
    onClick,
    className = "",
    magnetStrength = 0.4
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const springConfig = { damping: 15, stiffness: 300 }
    const springX = useSpring(x, springConfig)
    const springY = useSpring(y, springConfig)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        x.set((e.clientX - centerX) * magnetStrength)
        y.set((e.clientY - centerY) * magnetStrength)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    const content = (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            whileTap={{ scale: 0.95 }}
            className={`inline-block ${className}`}
        >
            {children}
        </motion.div>
    )

    if (href) {
        return <Link href={href}>{content}</Link>
    }

    return <button onClick={onClick}>{content}</button>
}
