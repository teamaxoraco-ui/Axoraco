"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface Smooth3DCardProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
}

/**
 * 3D card with smooth tilt on hover
 */
export function Smooth3DCard({ children, className = "", intensity = 10 }: Smooth3DCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [intensity, -intensity]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-intensity, intensity]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

/**
 * Premium glass card with smooth hover
 */
export function GlassCard({ children, className = "", hoverEffect = true }: GlassCardProps) {
    return (
        <motion.div
            {...(hoverEffect ? {
                whileHover: {
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                }
            } : {})}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
            }}
            className={`relative overflow-hidden rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 ${className}`}
        >
            {/* Gradient shine effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}

interface ShimmerCardProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * Card with animated shimmer border
 */
export function ShimmerCard({ children, className = "" }: ShimmerCardProps) {
    return (
        <div className={`relative group ${className}`}>
            {/* Shimmer border */}
            <motion.div
                className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-sm"
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{ backgroundSize: "200% 200%" }}
            />
            <div className="relative rounded-2xl bg-slate-900 p-6">{children}</div>
        </div>
    );
}

interface HoverGlowButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

/**
 * Button with smooth glow on hover
 */
export function HoverGlowButton({ children, className = "", onClick }: HoverGlowButtonProps) {
    return (
        <motion.button
            onClick={onClick}
            className={`relative overflow-hidden ${className}`}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
        >
            {/* Glow effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 blur-xl"
                variants={{
                    hover: { opacity: 0.5, scale: 1.2 },
                }}
                transition={{ duration: 0.3 }}
            />
            {/* Shine effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                variants={{
                    hover: { x: "100%" },
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}

interface RippleButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

/**
 * Button with ripple effect on click
 */
export function RippleButton({ children, className = "", onClick }: RippleButtonProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement("span");
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.className =
            "absolute w-0 h-0 rounded-full bg-white/30 animate-[ripple_0.6s_ease-out] pointer-events-none";
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);

        onClick?.();
    };

    return (
        <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative overflow-hidden ${className}`}
        >
            {children}
        </motion.button>
    );
}
