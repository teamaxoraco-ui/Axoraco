"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Zap, Shield, Clock } from "lucide-react"

export function CTALite() {
    return (
        <section className="py-16 sm:py-20 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-indigo-950/50" />
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center bottom, rgba(99, 102, 241, 0.2) 0%, transparent 60%)",
                    filter: "blur(80px)",
                }}
            />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="max-w-3xl mx-auto animate-fade-in-up">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
                        <Zap className="w-4 h-4" aria-hidden="true" />
                        <span>Ready to Scale?</span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-[1.1]">
                        Ready to{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            Architect
                        </span>
                        <br />
                        Your Reality?
                    </h2>

                    {/* Subheadline */}
                    <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-xl mx-auto px-4">
                        Join forward-thinking companies using Axoraco to scale without limits.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center justify-center"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                            <div className="relative px-6 sm:px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full transition-all duration-300 group-hover:scale-105">
                                <span className="flex items-center gap-2">
                                    Start Your Transformation
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                                </span>
                            </div>
                        </Link>

                        <Link
                            href="/consulting"
                            className="group px-6 py-4 text-slate-400 font-medium hover:text-white transition-colors duration-300 flex items-center gap-2"
                        >
                            Book a Call
                            <Sparkles className="w-4 h-4 group-hover:text-indigo-400 transition-colors" aria-hidden="true" />
                        </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <Shield className="w-4 h-4 text-green-500" aria-hidden="true" />
                            <span>SOC 2 Compliant</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <Clock className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                            <span>24/7 Support</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <Zap className="w-4 h-4 text-yellow-500" aria-hidden="true" />
                            <span>Deploy in 48h</span>
                        </div>
                    </div>

                    {/* Metrics */}
                    <div className="mt-12 pt-8 border-t border-white/5">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white mb-1">50+</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">Companies</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white mb-1">10k+</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">Calls</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white mb-1">99.9%</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">Uptime</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white mb-1">&lt;50ms</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">Latency</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
