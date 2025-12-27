"use client"

import { Search, Code2, Rocket, CheckCircle2 } from "lucide-react"


const steps = [
    {
        id: 1,
        title: "Audit & Strategy",
        description: "We analyze your current infrastructure and identify automation opportunities.",
        icon: Search,
        details: ["Infrastructure analysis", "Opportunity mapping", "ROI projection"],
    },
    {
        id: 2,
        title: "Build & Integrate",
        description: "Our engineers develop custom AI agents and web architectures tailored to your needs.",
        icon: Code2,
        details: ["Custom AI development", "API integration", "Quality assurance"],
    },
    {
        id: 3,
        title: "Launch & Scale",
        description: "We deploy your solution and provide ongoing optimization for maximum growth.",
        icon: Rocket,
        details: ["Seamless deployment", "Performance monitoring", "Continuous optimization"],
    },
]

export function ProcessLite() {
    return (
        <section className="py-16 sm:py-20 relative">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
                        <Rocket className="w-4 h-4" aria-hidden="true" />
                        <span>Simple 3-Step Process</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                        How It Works
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base px-4">
                        A streamlined process to transform your business in weeks, not months.
                    </p>
                </div>

                {/* Steps */}
                <div className="space-y-8 max-w-2xl mx-auto">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-colors duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                                    <step.icon className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div>
                                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs mb-2">
                                        Step 0{step.id}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-slate-400 text-sm mb-4">{step.description}</p>
                                    <ul className="space-y-1.5">
                                        {step.details.map((detail, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
                                                <CheckCircle2 className="w-4 h-4 text-green-500/70" aria-hidden="true" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
