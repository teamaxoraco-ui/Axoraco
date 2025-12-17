"use client";

import { motion, Variants } from "framer-motion";

// Smooth spring config for natural motion
export const smoothSpring = {
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
    mass: 1,
};

// Fast spring for snappy interactions
export const snappySpring = {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
};

// Slow spring for dramatic reveals
export const dramaticSpring = {
    type: "spring" as const,
    stiffness: 50,
    damping: 20,
    mass: 1.5,
};

// Buttery smooth easing
export const smoothEase = [0.25, 0.46, 0.45, 0.94];

// Animation variants for reuse
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { ...smoothSpring, duration: 0.6 },
    },
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: smoothSpring,
    },
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: smoothSpring,
    },
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: smoothSpring,
    },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: smoothSpring,
    },
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: smoothSpring,
    },
};

// Hover animations
export const hoverScale = {
    scale: 1.02,
    transition: snappySpring,
};

export const hoverLift = {
    y: -5,
    transition: snappySpring,
};

export const hoverGlow = {
    boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)",
    transition: { duration: 0.3 },
};

// Tap animations
export const tapScale = {
    scale: 0.98,
};

interface SmoothRevealProps {
    children: React.ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
}

/**
 * Smooth reveal animation wrapper
 */
export function SmoothReveal({
    children,
    delay = 0,
    direction = "up",
    className = "",
}: SmoothRevealProps) {
    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...smoothSpring, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface StaggerChildrenProps {
    children: React.ReactNode;
    staggerDelay?: number;
    className?: string;
}

/**
 * Container for staggered children animations
 */
export function StaggerChildren({
    children,
    staggerDelay = 0.1,
    className = "",
}: StaggerChildrenProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * Child item for StaggerChildren
 */
export function StaggerItem({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.div variants={staggerItem} className={className}>
            {children}
        </motion.div>
    );
}

/**
 * Smooth magnetic hover effect
 */
export function MagneticHover({
    children,
    strength = 0.3,
    className = "",
}: {
    children: React.ReactNode;
    strength?: number;
    className?: string;
}) {
    return (
        <motion.div
            whileHover={{ scale: 1 + strength * 0.1 }}
            whileTap={{ scale: 1 - strength * 0.05 }}
            transition={snappySpring}
            className={className}
        >
            {children}
        </motion.div>
    );
}
