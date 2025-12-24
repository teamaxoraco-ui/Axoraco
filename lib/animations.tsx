"use client";

import { motion, Variants } from "framer-motion";

/**
 * @fileoverview Animation utilities and Framer Motion configurations.
 * Provides reusable spring configs, animation variants, and React components
 * for consistent animations across the application.
 */

// =============================================================================
// SPRING CONFIGURATIONS
// =============================================================================

/**
 * Smooth spring config for natural motion.
 * Best for: page transitions, scroll reveals, general UI animations.
 * 
 * @example
 * <motion.div transition={smoothSpring} />
 */
export const smoothSpring = {
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
    mass: 1,
};

/**
 * Fast spring for snappy interactions.
 * Best for: hover effects, button clicks, quick feedback.
 * 
 * @example
 * <motion.button whileHover={{ scale: 1.05 }} transition={snappySpring} />
 */
export const snappySpring = {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
};

/**
 * Slow spring for dramatic reveals.
 * Best for: hero sections, modals, important content reveals.
 * 
 * @example
 * <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={dramaticSpring} />
 */
export const dramaticSpring = {
    type: "spring" as const,
    stiffness: 50,
    damping: 20,
    mass: 1.5,
};

/**
 * Buttery smooth easing curve (cubic-bezier).
 * Best for: timed animations, CSS-like transitions.
 * 
 * @example
 * transition={{ duration: 0.5, ease: smoothEase }}
 */
export const smoothEase = [0.25, 0.46, 0.45, 0.94];

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

/**
 * Fade in from below with opacity.
 * Best for: content reveals on scroll, staggered lists.
 */
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { ...smoothSpring, duration: 0.6 },
    },
};

/**
 * Fade in from above with opacity.
 * Best for: dropdowns, modals, top-positioned content.
 */
export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: smoothSpring,
    },
};

/**
 * Fade in from the left.
 * Best for: sidebar content, alternating list items.
 */
export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: smoothSpring,
    },
};

/**
 * Fade in from the right.
 * Best for: sidebar content, alternating list items.
 */
export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: smoothSpring,
    },
};

/**
 * Scale in with opacity.
 * Best for: modals, cards, focused content.
 */
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: smoothSpring,
    },
};

/**
 * Container variant for staggered children.
 * Apply to parent with children using staggerItem.
 * 
 * @example
 * <motion.div variants={staggerContainer} initial="hidden" animate="visible">
 *   <motion.div variants={staggerItem}>Item 1</motion.div>
 *   <motion.div variants={staggerItem}>Item 2</motion.div>
 * </motion.div>
 */
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

/**
 * Individual item variant for staggered animations.
 * Use with staggerContainer parent.
 */
export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: smoothSpring,
    },
};

// =============================================================================
// HOVER & TAP ANIMATIONS
// =============================================================================

/**
 * Subtle scale on hover.
 * Apply to whileHover prop.
 */
export const hoverScale = {
    scale: 1.02,
    transition: snappySpring,
};

/**
 * Lift effect on hover (moves up).
 * Apply to whileHover prop.
 */
export const hoverLift = {
    y: -5,
    transition: snappySpring,
};

/**
 * Glow box-shadow on hover.
 * Apply to whileHover prop.
 */
export const hoverGlow = {
    boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)",
    transition: { duration: 0.3 },
};

/**
 * Subtle scale down on tap/click.
 * Apply to whileTap prop.
 */
export const tapScale = {
    scale: 0.98,
};

// =============================================================================
// REACT COMPONENTS
// =============================================================================

interface SmoothRevealProps {
    children: React.ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
}

/**
 * Smooth reveal animation wrapper component.
 * Animates children when they enter the viewport.
 * 
 * @param children - Content to animate
 * @param delay - Animation delay in seconds (default: 0)
 * @param direction - Direction to animate from (default: "up")
 * @param className - Additional CSS classes
 * 
 * @example
 * <SmoothReveal direction="up" delay={0.2}>
 *   <h1>Hello World</h1>
 * </SmoothReveal>
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
 * Container component for staggered children animations.
 * Animates children sequentially when entering viewport.
 * 
 * @param children - Child elements to animate
 * @param staggerDelay - Delay between each child animation (default: 0.1)
 * @param className - Additional CSS classes
 * 
 * @example
 * <StaggerChildren staggerDelay={0.15}>
 *   <StaggerItem><Card /></StaggerItem>
 *   <StaggerItem><Card /></StaggerItem>
 * </StaggerChildren>
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
 * Individual item for use inside StaggerChildren.
 * Fades in with upward movement.
 * 
 * @param children - Content to animate
 * @param className - Additional CSS classes
 * 
 * @example
 * <StaggerItem className="mb-4">
 *   <Card />
 * </StaggerItem>
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
 * Component with magnetic hover effect.
 * Scales slightly on hover with spring physics.
 * 
 * @param children - Content to wrap
 * @param strength - Effect strength multiplier (default: 0.3)
 * @param className - Additional CSS classes
 * 
 * @example
 * <MagneticHover strength={0.5}>
 *   <button>Click Me</button>
 * </MagneticHover>
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
