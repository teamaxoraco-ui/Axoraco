"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion"
import { Search, Code2, Rocket, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { MouseEvent } from "react"

interface Step {
    id: number
    title: string
    description: string
    icon: React.ComponentType<{ className?: string }>
    details: string[]
}

const steps: Step[] = [
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

function ProcessCard({ step, index }: { step: Step; index: number }) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={cn(
                "relative flex items-start gap-8 md:gap-16",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            )}
        >
            {/* Icon Marker */}
            <motion.div
                whileHover={{ scale: 1.1 }}
                className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-slate-900 border-2 border-slate-700 flex items-center justify-center z-10 group hover:border-indigo-500 hover:bg-indigo-500/10 transition-all duration-300 shadow-lg shadow-slate-950/50"
            >
                <step.icon className="w-7 h-7 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            </motion.div>

            {/* Content Card */}
            <div className={cn(
                "flex-1 ml-24 md:ml-0",
                index % 2 === 0 ? "md:text-right md:pr-16" : "md:text-left md:pl-16"
            )}>
                <div
                    onMouseMove={handleMouseMove}
                    className="group relative p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-300 overflow-hidden"
                >
                    {/* Spotlight Effect */}
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                        style={{
                            background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(99, 102, 241, 0.12), transparent 80%)`,
                        }}
                    />

                    <div className="relative z-10">
                        {/* Step Number */}
                        <div className={cn(
                            "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-sm mb-4",
                            index % 2 === 0 ? "md:float-right md:ml-4" : "md:float-left md:mr-4"
                        )}>
                            Step 0{step.id}
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3 clear-both">
                            {step.title}
                        </h3>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            {step.description}
                        </p>

                        {/* Details List */}
                        <ul className={cn(
                            "space-y-2",
                            index % 2 === 0 ? "md:text-right" : "md:text-left"
                        )}>
                            {step.details.map((detail, i) => (
                                <li
                                    key={i}
                                    className={cn(
                                        "flex items-center gap-2 text-sm text-slate-500",
                                        index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    )}
                                >
                                    <CheckCircle2 className="w-4 h-4 text-green-500/70" aria-hidden="true" />
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Spacer for the other side */}
            <div className="hidden md:block flex-1" />
        </motion.div>
    )
}

export function Process() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"])

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
                {/* Section Header with Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
                        <Rocket className="w-4 h-4" aria-hidden="true" />
                        <span>Simple 3-Step Process</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        How It Works
                    </h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">
                        A streamlined process to transform your business in weeks, not months.
                    </p>
                </motion.div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Vertical Line Background */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 md:-translate-x-1/2" />

                    {/* Vertical Line Fill (Animated) */}
                    <motion.div
                        style={{ height: lineHeight }}
                        className="absolute left-8 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500 md:-translate-x-1/2 origin-top"
                    />

                    <div className="space-y-16">
                        {steps.map((step, index) => (
                            <ProcessCard key={step.id} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
