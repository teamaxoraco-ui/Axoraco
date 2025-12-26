"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap, Shield, Clock } from "lucide-react"
import Link from "next/link"
import { smoothSpring } from "@/lib/animations"
import { SpotlightContainer } from "@/components/ui/spotlight"

// Animation variants for staggered entry with smooth springs
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            ...smoothSpring,
            duration: 0.7,
        },
    },
}

const floatVariants = {
    animate: {
        y: [-8, 8, -8],
        transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut" as const,
        },
    },
}

export function Hero() {
    return (
        <SpotlightContainer className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
            {/* === AURORA BACKGROUND SYSTEM === */}
            <div className="absolute inset-0 bg-slate-950" />

            {/* Primary Aurora Blob - Static on mobile for performance */}
            <div
                className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[400px] md:h-[600px] rounded-full"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.15) 40%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />

            {/* Secondary Aurora - Hidden on mobile for performance */}
            <div
                className="hidden md:block absolute top-[10%] right-[10%] w-[600px] h-[400px] rounded-full"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.25) 0%, transparent 60%)",
                    filter: "blur(80px)",
                }}
            />

            {/* Tertiary Accent Glow - Hidden on mobile for performance */}
            <div
                className="hidden md:block absolute bottom-[20%] left-[5%] w-[500px] h-[500px] rounded-full"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.2) 0%, transparent 60%)",
                    filter: "blur(100px)",
                }}
            />

            {/* Grid Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* === MAIN CONTENT === */}
            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                {/* Text Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-2xl"
                >
                    {/* Badge */}
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 text-sm font-medium backdrop-blur-md"
                    >
                        <Sparkles className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                        <span>The Future of Automation is Here</span>
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-tight text-white mb-4 sm:mb-6 leading-[1.08]"
                    >
                        Automating Reality.
                        <br />
                        <span className="relative inline-block">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                Elevating Business.
                            </span>
                            {/* Underline glow effect */}
                            <motion.span
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full origin-left"
                            />
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={itemVariants}
                        className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 sm:mb-10 leading-relaxed max-w-lg"
                    >
                        Axoraco merges intelligent AI Voice Bots with bespoke Web Architecture
                        to scale your operations beyond human limits.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                        {/* Primary CTA - Magnetic Button */}
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center justify-center"
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

                            <div className="relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.5)]">
                                {/* Rotating shine effect */}
                                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.15),transparent)] animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                {/* Shimmer overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                                <span className="relative flex items-center gap-2">
                                    Get Started
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                                </span>
                            </div>
                        </Link>

                        {/* Secondary CTA */}
                        <Link
                            href="/solutions"
                            className="group px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2"
                        >
                            View Solutions
                            <Zap className="w-4 h-4 text-indigo-400 group-hover:text-white transition-colors" aria-hidden="true" />
                        </Link>
                    </motion.div>

                    {/* Trust Badges - Unified colors */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-400"
                    >
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                            <span>Enterprise-Grade Security</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                            <span>24/7 Deployment</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                            <span>50+ Companies</span>
                        </div>
                    </motion.div>

                    {/* Consolidated Social Proof */}
                    <motion.div variants={itemVariants} className="mt-12 flex items-center gap-4">
                        <div className="flex -space-x-3">
                            {["from-indigo-500 to-purple-500", "from-purple-500 to-pink-500", "from-pink-500 to-rose-500", "from-rose-500 to-orange-500"].map((gradient, i) => (
                                <div
                                    key={i}
                                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} border-2 border-slate-950 flex items-center justify-center text-white text-xs font-bold`}
                                >
                                    {["T", "N", "S", "Q"][i]}
                                </div>
                            ))}
                        </div>
                        <div>
                            <p className="text-white font-semibold">Trusted by Industry Leaders</p>
                            <p className="text-slate-400 text-sm">TechFlow, Nexus, Solaris & more</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* === VISUAL ELEMENT === */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ delay: 0.5, duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
                    className="relative hidden lg:block"
                    style={{ perspective: "1000px" }}
                >
                    <motion.div
                        variants={floatVariants}
                        animate="animate"
                        className="relative w-full aspect-square max-w-lg mx-auto"
                    >
                        {/* Background glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl" />

                        {/* Main Card */}
                        <div className="relative w-full h-full border border-white/10 rounded-3xl bg-slate-900/40 backdrop-blur-xl p-8 shadow-2xl shadow-indigo-500/10">
                            {/* Inner glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 rounded-3xl" />

                            {/* Clean Visual - No floating shapes, just the terminal */}

                            {/* Code Terminal */}
                            <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/70 rounded-xl border border-white/10 font-mono text-xs backdrop-blur-md shadow-xl">
                                <div className="flex gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="space-y-1.5 text-slate-400">
                                    <p>
                                        <span className="text-purple-400">const</span>{" "}
                                        <span className="text-white">agent</span>{" "}
                                        <span className="text-slate-500">=</span>{" "}
                                        <span className="text-purple-400">await</span>{" "}
                                        <span className="text-blue-400">axoraco</span>
                                        <span className="text-slate-500">.</span>
                                        <span className="text-yellow-400">deploy</span>
                                        <span className="text-slate-500">()</span>;
                                    </p>
                                    <p className="text-slate-600">{"// Scaling operations..."}</p>
                                    <p>
                                        <span className="text-white">agent</span>
                                        <span className="text-slate-500">.</span>
                                        <span className="text-yellow-400">optimize</span>
                                        <span className="text-slate-500">(</span>
                                        <span className="text-green-400">&quot;revenue&quot;</span>
                                        <span className="text-slate-500">)</span>;
                                    </p>
                                    <motion.p
                                        animate={{ opacity: [1, 0.3, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="text-green-400"
                                    >
                                        ✓ Deployed successfully
                                    </motion.p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* === LIVE TICKER === */}
            <div className="absolute bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-md border-t border-white/5 py-3 overflow-hidden z-20">
                <motion.div
                    animate={{ x: ["0%", "-33.33%"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="flex items-center gap-8 whitespace-nowrap text-xs font-mono text-indigo-400"
                >
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center gap-8">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                SYSTEM STATUS: ONLINE
                            </span>
                            <span className="text-slate-600">•</span>
                            <span>ACTIVE AGENTS: 842</span>
                            <span className="text-slate-600">•</span>
                            <span>CALLS PROCESSED (24H): 14,203</span>
                            <span className="text-slate-600">•</span>
                            <span>AVG LATENCY: 42ms</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-green-400">NEW DEPLOYMENT: v2.4.0 ✓</span>
                            <span className="text-slate-600">•</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </SpotlightContainer>
    )
}
