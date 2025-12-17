"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface RevealOnScrollProps {
    children: React.ReactNode
    className?: string
    direction?: "up" | "down" | "left" | "right"
    delay?: number
}

export function RevealOnScroll({
    children,
    className = "",
    direction = "up",
}: RevealOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.2 1"]
    })

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

    // Pre-compute all possible transforms at the top level (hooks must be called unconditionally)
    const transformUp = useTransform(scrollYProgress, [0, 1], [60, 0])
    const transformDown = useTransform(scrollYProgress, [0, 1], [-60, 0])
    const transformLeft = useTransform(scrollYProgress, [0, 1], [60, 0])
    const transformRight = useTransform(scrollYProgress, [0, 1], [-60, 0])

    // Select the appropriate transform based on direction
    const getTransformForDirection = () => {
        switch (direction) {
            case "up": return transformUp
            case "down": return transformDown
            case "left": return transformLeft
            case "right": return transformRight
        }
    }

    const transform = getTransformForDirection()
    const isHorizontal = direction === "left" || direction === "right"

    return (
        <motion.div
            ref={ref}
            style={{
                opacity,
                [isHorizontal ? "x" : "y"]: transform,
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
