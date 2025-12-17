"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

interface ParallaxProps {
    children: React.ReactNode;
    offset?: number;
    className?: string;
}

/**
 * Parallax scroll effect component
 * Elements move at different speeds during scroll
 */
export function Parallax({ children, offset = 50, className = "" }: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y: smoothY }}>{children}</motion.div>
        </div>
    );
}

interface ParallaxLayerProps {
    children: React.ReactNode;
    speed?: number;
    className?: string;
}

/**
 * Multi-layer parallax for background effects
 */
export function ParallaxLayer({ children, speed = 0.5, className = "" }: ParallaxLayerProps) {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, (value) => value * speed);
    const smoothY = useSpring(y, { stiffness: 50, damping: 30 });

    return (
        <motion.div style={{ y: smoothY }} className={className}>
            {children}
        </motion.div>
    );
}

/**
 * Hook for smooth parallax values
 */
export function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

interface FloatingElementProps {
    children: React.ReactNode;
    duration?: number;
    distance?: number;
    delay?: number;
    className?: string;
}

/**
 * Smooth floating animation for elements
 */
export function FloatingElement({
    children,
    duration = 6,
    distance = 20,
    delay = 0,
    className = "",
}: FloatingElementProps) {
    return (
        <motion.div
            animate={{
                y: [-distance / 2, distance / 2, -distance / 2],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * Rotating element with smooth animation
 */
export function RotatingElement({
    children,
    duration = 20,
    className = "",
}: {
    children: React.ReactNode;
    duration?: number;
    className?: string;
}) {
    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * Pulsing glow effect
 */
export function PulsingGlow({ className = "" }: { className?: string }) {
    return (
        <motion.div
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className={`absolute rounded-full blur-3xl ${className}`}
        />
    );
}
