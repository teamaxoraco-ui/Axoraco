"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
    children: React.ReactNode;
}

/**
 * Smooth page transition wrapper
 */
export function SmoothPageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    duration: 0.4,
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

/**
 * Slide page transition
 */
export function SlidePageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

/**
 * Fade scale page transition
 */
export function FadeScaleTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

/**
 * Curtain reveal transition
 */
export function CurtainTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div key={pathname} className="relative">
                {/* Curtain overlay */}
                <motion.div
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "top" }}
                    className="fixed inset-0 bg-indigo-600 z-50"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

interface SectionTransitionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

/**
 * Section reveal on scroll
 */
export function SectionReveal({ children, className = "", delay = 0 }: SectionTransitionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 20,
                delay,
            }}
            className={className}
        >
            {children}
        </motion.section>
    );
}
