"use client"

import { useRef } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles, Zap, Shield, Clock } from "lucide-react"
import { AnimatedCounter } from "./animated-counter"
import { smoothSpring } from "@/lib/animations"

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
    const ref = useRef<HTMLAnchorElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const springConfig = { damping: 25, stiffness: 400 }
    const springX = useSpring(x, springConfig)
    const springY = useSpring(y, springConfig)

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        x.set((e.clientX - centerX) * 0.15)
        y.set((e.clientY - centerY) * 0.15)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.a
            ref={ref}
            href={href}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center justify-center"
        >
            {children}
        </motion.a>
    )
}

export function CTASection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
    }

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="py-16 sm:py-24 md:py-32 relative overflow-hidden"
        >
            {/* === BACKGROUND SYSTEM === */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-indigo-950/50" />

            {/* Spotlight that follows mouse */}
            <motion.div
                className="absolute pointer-events-none"
                style={{
                    background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(99, 102, 241, 0.12), transparent 60%)`,
                    inset: 0,
                }}
            />

            {/* Primary Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center bottom, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.15) 30%, transparent 60%)",
                    filter: "blur(100px)",
                }}
            />

            {/* Floating Orbs */}
            <motion.div
                animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-[15%] w-64 h-64 rounded-full opacity-30"
                style={{
                    background: "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 60%)",
                    filter: "blur(60px)",
                }}
            />
            <motion.div
                animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-32 right-[10%] w-48 h-48 rounded-full opacity-30"
                style={{
                    background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 60%)",
                    filter: "blur(50px)",
                }}
            />

            {/* === CONTENT === */}
            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium backdrop-blur-sm"
                    >
                        <Zap className="w-4 h-4" aria-hidden="true" />
                        <span>Ready to Scale?</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 tracking-tight leading-[1.1]"
                    >
                        Ready to{" "}
                        <span className="relative inline-block">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                Architect
                            </span>
                            <motion.span
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 origin-left"
                            />
                        </span>
                        <br />
                        Your Reality?
                    </motion.h2>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto px-4"
                    >
                        Join the forward-thinking companies using Axoraco to
                        scale without limits. Your transformation starts with one conversation.
                    </motion.p>

                    {/* CTA Button - Magnetic */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <MagneticButton href="/contact">
                            {/* Outer Glow Ring */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500" />

                            {/* Button */}
                            <div className="relative px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base sm:text-lg rounded-full overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_50px_-5px_rgba(99,102,241,0.6)]">
                                {/* Animated gradient overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                />

                                {/* Shimmer */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                                <span className="relative flex items-center gap-3">
                                    Start Your Transformation
                                    <motion.span
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <ArrowRight className="w-5 h-5" aria-hidden="true" />
                                    </motion.span>
                                </span>
                            </div>
                        </MagneticButton>

                        {/* Secondary CTA */}
                        <Link
                            href="/consulting"
                            className="group px-8 py-5 text-slate-400 font-medium rounded-full hover:text-white transition-colors duration-300 flex items-center gap-2"
                        >
                            Book a Call
                            <Sparkles className="w-4 h-4 group-hover:text-indigo-400 transition-colors" aria-hidden="true" />
                        </Link>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                        className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400"
                    >
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                            <Shield className="w-4 h-4 text-green-500" aria-hidden="true" />
                            <span>SOC 2 Compliant</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                            <Clock className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                            <span>24/7 Support</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                            <Zap className="w-4 h-4 text-yellow-500" aria-hidden="true" />
                            <span>Deploy in 48 Hours</span>
                        </div>
                    </motion.div>

                    {/* Metric Highlight */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={smoothSpring}
                        className="mt-16 pt-12 border-t border-white/5"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ ...smoothSpring, delay: 0.1 }}
                                className="text-center"
                            >
                                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                    <AnimatedCounter value={50} suffix="+" />
                                </div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">
                                    Companies Scaled
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ ...smoothSpring, delay: 0.2 }}
                                className="text-center"
                            >
                                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                    <AnimatedCounter value={10} suffix="k+" />
                                </div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">
                                    Calls Automated
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ ...smoothSpring, delay: 0.3 }}
                                className="text-center"
                            >
                                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                    <AnimatedCounter value={99.9} suffix="%" />
                                </div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">
                                    Uptime SLA
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ ...smoothSpring, delay: 0.4 }}
                                className="text-center"
                            >
                                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                    <AnimatedCounter value={50} prefix="<" suffix="ms" />
                                </div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">
                                    Avg Latency
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
