"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
    className?: string;
    children?: React.ReactNode;
    variant?: "hero" | "section" | "card";
}

/**
 * Animated gradient background component
 * Creates premium visual effects with moving gradients
 */
export function AnimatedGradient({
    className,
    children,
    variant = "section",
}: AnimatedGradientProps) {
    const variants = {
        hero: {
            colors: ["from-indigo-500/20", "via-purple-500/20", "to-pink-500/20"],
            size: "w-[800px] h-[600px]",
            blur: "blur-[120px]",
        },
        section: {
            colors: ["from-indigo-600/10", "via-purple-600/10", "to-pink-600/10"],
            size: "w-[600px] h-[400px]",
            blur: "blur-[100px]",
        },
        card: {
            colors: ["from-indigo-500/10", "via-purple-500/10", "to-pink-500/10"],
            size: "w-[300px] h-[200px]",
            blur: "blur-[80px]",
        },
    };

    const config = variants[variant];

    return (
        <div className={cn("relative overflow-hidden", className)}>
            {/* Primary gradient orb */}
            <motion.div
                className={cn(
                    "absolute pointer-events-none rounded-full bg-gradient-to-br",
                    config.colors[0],
                    config.colors[1],
                    config.colors[2],
                    config.size,
                    config.blur
                )}
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ top: "10%", left: "20%" }}
            />

            {/* Secondary gradient orb */}
            <motion.div
                className={cn(
                    "absolute pointer-events-none rounded-full bg-gradient-to-br from-purple-500/15 to-cyan-500/15",
                    config.size,
                    config.blur
                )}
                animate={{
                    x: [0, -80, 0],
                    y: [0, 60, 0],
                    scale: [1.1, 1, 1.1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ bottom: "20%", right: "10%" }}
            />

            {/* Tertiary accent */}
            <motion.div
                className="absolute pointer-events-none w-[400px] h-[400px] rounded-full bg-gradient-to-br from-pink-500/10 to-orange-500/10 blur-[100px]"
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            />

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}

/**
 * Mesh gradient background - more subtle, for sections
 */
export function MeshGradient({ className }: { className?: string }) {
    return (
        <div
            className={cn("absolute inset-0 pointer-events-none opacity-30", className)}
            style={{
                background: `
                    radial-gradient(at 40% 20%, hsla(263, 86%, 54%, 0.15) 0px, transparent 50%),
                    radial-gradient(at 80% 0%, hsla(232, 86%, 54%, 0.15) 0px, transparent 50%),
                    radial-gradient(at 0% 50%, hsla(343, 86%, 54%, 0.1) 0px, transparent 50%),
                    radial-gradient(at 80% 50%, hsla(199, 86%, 54%, 0.1) 0px, transparent 50%),
                    radial-gradient(at 0% 100%, hsla(263, 86%, 54%, 0.1) 0px, transparent 50%),
                    radial-gradient(at 80% 100%, hsla(232, 86%, 54%, 0.1) 0px, transparent 50%)
                `,
            }}
        />
    );
}
