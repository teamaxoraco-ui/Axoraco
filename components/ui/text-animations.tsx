"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
}

/**
 * Character-by-character text reveal animation
 */
export function TextReveal({
    text,
    className = "",
    delay = 0,
    staggerDelay = 0.03,
}: TextRevealProps) {
    const characters = useMemo(() => text.split(""), [text]);

    return (
        <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: delay,
                    },
                },
            }}
            className={className}
            aria-label={text}
        >
            {characters.map((char, i) => (
                <motion.span
                    key={`${char}-${i}`}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 12,
                            },
                        },
                    }}
                    className="inline-block"
                    style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
}

interface WordRevealProps {
    text: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
    highlightWords?: string[];
    highlightClass?: string;
}

/**
 * Word-by-word text reveal animation
 */
export function WordReveal({
    text,
    className = "",
    delay = 0,
    staggerDelay = 0.08,
    highlightWords = [],
    highlightClass = "text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400",
}: WordRevealProps) {
    const words = useMemo(() => text.split(" "), [text]);

    return (
        <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: delay,
                    },
                },
            }}
            className={className}
        >
            {words.map((word, i) => (
                <motion.span
                    key={`${word}-${i}`}
                    variants={{
                        hidden: { opacity: 0, y: 30, rotateX: -90 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            transition: {
                                type: "spring",
                                stiffness: 80,
                                damping: 15,
                            },
                        },
                    }}
                    className={`inline-block mr-[0.25em] ${highlightWords.includes(word.toLowerCase()) ? highlightClass : ""
                        }`}
                    style={{ transformOrigin: "bottom" }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
}

interface TypewriterProps {
    text: string;
    className?: string;
    delay?: number;
    speed?: number;
}

/**
 * Typewriter effect for text
 */
export function Typewriter({
    text,
    className = "",
    delay = 0,
    speed = 0.05,
}: TypewriterProps) {
    const characters = useMemo(() => text.split(""), [text]);

    return (
        <motion.span className={className}>
            {characters.map((char, i) => (
                <motion.span
                    key={`${char}-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: delay + i * speed,
                        duration: 0,
                    }}
                    style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                >
                    {char}
                </motion.span>
            ))}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"
            />
        </motion.span>
    );
}

interface GradientTextProps {
    children: React.ReactNode;
    gradient?: string;
    className?: string;
    animate?: boolean;
}

/**
 * Animated gradient text
 */
export function GradientText({
    children,
    gradient = "from-indigo-400 via-purple-400 to-pink-400",
    className = "",
    animate = true,
}: GradientTextProps) {
    return (
        <motion.span
            className={`text-transparent bg-clip-text bg-gradient-to-r ${gradient} ${className}`}
            animate={
                animate
                    ? {
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }
                    : undefined
            }
            transition={
                animate
                    ? {
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                    }
                    : undefined
            }
            style={animate ? { backgroundSize: "200% 200%" } : undefined}
        >
            {children}
        </motion.span>
    );
}

/**
 * Glowing text effect
 */
export function GlowingText({
    children,
    color = "rgba(99, 102, 241, 0.5)",
    className = "",
}: {
    children: React.ReactNode;
    color?: string;
    className?: string;
}) {
    return (
        <motion.span
            animate={{
                textShadow: [
                    `0 0 10px ${color}`,
                    `0 0 20px ${color}`,
                    `0 0 10px ${color}`,
                ],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className={className}
        >
            {children}
        </motion.span>
    );
}
