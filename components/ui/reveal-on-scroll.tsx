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
    delay = 0
}: RevealOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.2 1"]
    })

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

    const getTransform = () => {
        switch (direction) {
            case "up": return useTransform(scrollYProgress, [0, 1], [60, 0])
            case "down": return useTransform(scrollYProgress, [0, 1], [-60, 0])
            case "left": return useTransform(scrollYProgress, [0, 1], [60, 0])
            case "right": return useTransform(scrollYProgress, [0, 1], [-60, 0])
        }
    }

    const transform = getTransform()
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
