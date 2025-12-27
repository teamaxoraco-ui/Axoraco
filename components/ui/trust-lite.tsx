"use client"

import { TrendingUp } from "lucide-react"

const metrics = [
    { id: 1, value: "99.9%", label: "Uptime Guarantee" },
    { id: 2, value: "10k+", label: "Calls Automated" },
    { id: 3, value: "50+", label: "Websites Shipped" },
]

export function TrustLite() {
    return (
        <section className="py-16 sm:py-20 bg-slate-900/50 border-y border-slate-800">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
                        <TrendingUp className="w-4 h-4" aria-hidden="true" />
                        <span>Our Track Record</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                        Proven at Scale
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base px-4">
                        Enterprise-grade infrastructure trusted worldwide
                    </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    {metrics.map((metric) => (
                        <div
                            key={metric.id}
                            className="text-center p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-indigo-500/30 transition-colors duration-300"
                        >
                            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                {metric.value}
                            </div>
                            <p className="text-indigo-400 font-medium tracking-wide uppercase text-sm">
                                {metric.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
