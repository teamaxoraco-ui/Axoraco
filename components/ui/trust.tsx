"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useSpring, useMotionValue } from "framer-motion"
import { SpotlightCard, SpotlightContainer } from "@/components/ui/spotlight"
import { TrendingUp } from "lucide-react"

const metrics = [
    {
        id: 1,
        value: 99.9,
        suffix: "%",
        label: "Uptime Guarantee",
    },
    {
        id: 2,
        value: 10,
        suffix: "k+",
        label: "Calls Automated",
    },
    {
        id: 3,
        value: 50,
        suffix: "+",
        label: "Websites Shipped",
    },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, {
        damping: 50,
        stiffness: 100,
    })
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    useEffect(() => {
        if (isInView) {
            motionValue.set(value)
        }
    }, [isInView, value, motionValue])

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = latest.toFixed(value % 1 === 0 ? 0 : 1) + suffix
            }
        })
    }, [springValue, suffix, value])

    return <span ref={ref} className="text-4xl md:text-6xl font-bold text-white tabular-nums" />
}

export function Trust() {
    return (
        <SpotlightContainer className="py-24 bg-slate-900/50 border-y border-slate-800 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
                        <TrendingUp className="w-4 h-4" aria-hidden="true" />
                        <span>Our Track Record</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Proven at Scale
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg">
                        Enterprise-grade infrastructure trusted by forward-thinking teams worldwide
                    </p>
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {metrics.map((metric, index) => (
                        <SpotlightCard
                            key={metric.id}
                            className="rounded-2xl"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                                className="relative text-center p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-indigo-500/30 transition-colors duration-300"
                            >
                                <div className="relative z-10">
                                    <div className="mb-3">
                                        <Counter value={metric.value} suffix={metric.suffix} />
                                    </div>
                                    <p className="text-indigo-400 font-medium tracking-wide uppercase text-sm">
                                        {metric.label}
                                    </p>
                                </div>
                            </motion.div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </SpotlightContainer>
    )
}
