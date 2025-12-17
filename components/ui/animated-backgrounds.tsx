"use client";

import { motion } from "framer-motion";

/**
 * Morphing blob background animation
 */
export function MorphingBlobs() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Primary blob */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20 blur-[100px]"
                animate={{
                    x: [0, 100, 50, 0],
                    y: [0, -50, 100, 0],
                    scale: [1, 1.2, 0.9, 1],
                    borderRadius: ["40%", "60%", "30%", "40%"],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ top: "10%", left: "20%" }}
            />

            {/* Secondary blob */}
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-600/15 to-pink-600/15 blur-[80px]"
                animate={{
                    x: [0, -80, 20, 0],
                    y: [0, 60, -40, 0],
                    scale: [1.1, 0.9, 1.2, 1.1],
                    borderRadius: ["50%", "40%", "60%", "50%"],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ bottom: "10%", right: "15%" }}
            />

            {/* Tertiary blob */}
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-cyan-600/10 to-blue-600/10 blur-[60px]"
                animate={{
                    x: [0, 60, -30, 0],
                    y: [0, -30, 60, 0],
                    scale: [0.9, 1.1, 1, 0.9],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ top: "50%", left: "40%" }}
            />
        </div>
    );
}

/**
 * Animated gradient mesh background
 */
export function GradientMesh() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        "radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
                        "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
                        "radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
                    ],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}

/**
 * Animated grid pattern background
 */
export function AnimatedGrid() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)`,
                    backgroundSize: "50px 50px",
                }}
                animate={{
                    backgroundPosition: ["0 0", "50px 50px"],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
            {/* Fade edges */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
        </div>
    );
}

/**
 * Floating orbs background
 */
export function FloatingOrbs() {
    const orbs = [
        { size: 300, x: "10%", y: "20%", color: "from-indigo-500/20 to-purple-500/20", delay: 0 },
        { size: 200, x: "70%", y: "60%", color: "from-purple-500/15 to-pink-500/15", delay: 2 },
        { size: 250, x: "80%", y: "10%", color: "from-cyan-500/15 to-blue-500/15", delay: 4 },
        { size: 180, x: "30%", y: "70%", color: "from-pink-500/10 to-orange-500/10", delay: 1 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {orbs.map((orb, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-3xl`}
                    style={{
                        width: orb.size,
                        height: orb.size,
                        left: orb.x,
                        top: orb.y,
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        x: [-10, 10, -10],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: orb.delay,
                    }}
                />
            ))}
        </div>
    );
}

/**
 * Noise texture overlay
 */
export function NoiseOverlay({ opacity = 0.03 }: { opacity?: number }) {
    return (
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                opacity,
            }}
        />
    );
}
