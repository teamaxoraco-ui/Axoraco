"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

/**
 * Animated number counter that counts up when in view
 * Great for statistics and metrics
 */
export function AnimatedCounter({
    value,
    suffix = "",
    prefix = "",
    duration = 2,
    className = "",
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            setDisplayValue(Math.floor(easeOutQuart * value));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setDisplayValue(value);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [isInView, value, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}
            {displayValue.toLocaleString()}
            {suffix}
        </span>
    );
}

interface StatCardProps {
    value: number;
    suffix?: string;
    label: string;
    gradient?: string;
}

/**
 * Stat card with animated counter
 */
export function StatCard({ value, suffix = "", label, gradient = "from-indigo-500 to-purple-500" }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-all"
        >
            <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>
                <AnimatedCounter value={value} suffix={suffix} />
            </div>
            <div className="text-slate-400 text-sm">{label}</div>
        </motion.div>
    );
}

/**
 * Stats section with multiple animated counters
 */
export function StatsSection() {
    const stats = [
        { value: 500, suffix: "+", label: "Clients Served", gradient: "from-indigo-500 to-purple-500" },
        { value: 99.9, suffix: "%", label: "Uptime Guarantee", gradient: "from-green-500 to-emerald-500" },
        { value: 2, suffix: "M+", label: "Calls Handled", gradient: "from-cyan-500 to-blue-500" },
        { value: 24, suffix: "/7", label: "Support Available", gradient: "from-orange-500 to-red-500" },
    ];

    return (
        <section className="py-20 px-6">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Trusted by Industry Leaders
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Numbers that speak for themselves
                    </p>
                </motion.div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, i) => (
                        <StatCard key={i} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
}
