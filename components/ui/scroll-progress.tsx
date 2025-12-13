"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    // Very fast spring: high stiffness for instant response
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 500,
        damping: 30,
        restDelta: 0.0001
    })

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-[100]"
            style={{ scaleX }}
        />
    )
}
