"use client"

import { ArrowRight, Sparkles, Zap, Shield, Clock } from "lucide-react"
import Link from "next/link"

// Pure CSS animations - no framer-motion bundle on mobile
export function HeroLite() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-slate-950" />

            {/* Aurora - CSS only */}
            <div
                className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full animate-pulse-slow"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.15) 40%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-2xl animate-fade-in-up">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 text-sm font-medium backdrop-blur-md animate-fade-in">
                        <Sparkles className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                        <span>The Future of Automation is Here</span>
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-[1.08] animate-fade-in-up animation-delay-100">
                        Automating Reality.
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            Elevating Business.
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 sm:mb-10 leading-relaxed max-w-lg animate-fade-in-up animation-delay-200">
                        Axoraco merges intelligent AI Voice Bots with bespoke Web Architecture
                        to scale your operations beyond human limits.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center justify-center"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                            <div className="relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105">
                                <span className="relative flex items-center gap-2">
                                    Get Started
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                                </span>
                            </div>
                        </Link>

                        <Link
                            href="/solutions"
                            className="group px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2"
                        >
                            View Solutions
                            <Zap className="w-4 h-4 text-indigo-400 group-hover:text-white transition-colors" aria-hidden="true" />
                        </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-400 animate-fade-in-up animation-delay-400">
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
                    </div>

                    {/* Social Proof */}
                    <div className="mt-10 flex items-center gap-4 animate-fade-in-up animation-delay-400">
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
                    </div>
                </div>
            </div>
        </section>
    )
}
