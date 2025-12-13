"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { SpotlightCard, SpotlightContainer } from "@/components/ui/spotlight"
import { Flag, Globe, Zap, Shield, Heart, ArrowRight, Target, Award, TrendingUp } from "lucide-react"
import Link from "next/link"

const stats = [
    { label: "Countries Served", value: "12+", icon: Globe },
    { label: "Active Agents", value: "500+", icon: Zap },
    { label: "Client Retention", value: "98%", icon: Heart },
    { label: "Projects Delivered", value: "150+", icon: Award },
]

const timeline = [
    { year: "2023", title: "The Inception", desc: "Axoraco was founded with a single mission: to democratize AI automation for businesses of all sizes." },
    { year: "2024", title: "Rapid Expansion", desc: "Launched our proprietary Voice AI engine and expanded operations to 3 continents with enterprise clients." },
    { year: "2025", title: "The Future", desc: "Building the world's first autonomous enterprise operating system, redefining how businesses scale." },
]

const values = [
    {
        title: "Innovation First",
        desc: "We don't follow trends; we set them. Every solution we build pushes the boundaries of what's possible.",
        icon: Zap
    },
    {
        title: "Radical Transparency",
        desc: "Open communication, clear expectations, and honest feedback. Trust is the foundation of every partnership.",
        icon: Shield
    },
    {
        title: "Global Mindset",
        desc: "Building technology for a borderless, connected world. Our solutions scale across markets and cultures.",
        icon: Globe
    },
    {
        title: "Results-Driven",
        desc: "Every feature, every line of code is measured against real business impact. ROI is our north star.",
        icon: Target
    },
]

const differentiators = [
    "End-to-end automation expertise",
    "Enterprise-grade security standards",
    "Dedicated success managers",
    "24/7 global support coverage",
    "Proven scalability to millions of transactions",
    "Continuous optimization & iteration"
]

export default function AboutPageClient() {
    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
            <Navbar />

            {/* Hero Section */}
            <SpotlightContainer className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 mb-6 sm:mb-8 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-medium">
                            <Flag className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>About Axoraco</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 tracking-tight px-2">
                            Architects of the{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                Automated Future
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mb-8 sm:mb-12 max-w-2xl mx-auto px-2">
                            We build the intelligent systems that power the next generation of business.
                            From AI-driven voice agents to scalable web infrastructure.
                        </p>
                    </motion.div>
                </div>
            </SpotlightContainer>

            {/* Mission Statement */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 border-y border-slate-800 bg-slate-900/30">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 mb-4 sm:mb-6 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs sm:text-sm font-medium">
                            <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Our Mission</span>
                        </div>
                        <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white leading-relaxed px-2">
                            "To eliminate the friction between human intention and business execution through intelligent automation."
                        </blockquote>
                    </motion.div>
                </div>
            </section>

            {/* Global Impact Stats */}
            <section className="py-16 sm:py-20 px-4 sm:px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        {stats.map((stat, i) => (
                            <SpotlightCard key={i} className="rounded-xl sm:rounded-2xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-slate-900/60 border border-slate-800 text-center hover:border-indigo-500/30 transition-colors"
                                >
                                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400 mx-auto mb-2 sm:mb-4" />
                                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">{stat.value}</div>
                                    <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider">{stat.label}</div>
                                </motion.div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <SpotlightContainer className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
                <div className="container mx-auto max-w-6xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10 sm:mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 mb-4 sm:mb-6 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-medium">
                            <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Our Principles</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 tracking-tight">Core Values</h2>
                        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto px-2">
                            The principles that guide every decision and partnership.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {values.map((value, i) => (
                            <SpotlightCard key={i} className="rounded-2xl sm:rounded-3xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-950/50 border border-slate-800 hover:border-indigo-500/30 transition-all h-full"
                                >
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4 sm:mb-6 border border-indigo-500/20">
                                        <value.icon className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-400" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{value.title}</h3>
                                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed">{value.desc}</p>
                                </motion.div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </SpotlightContainer>

            {/* Timeline */}
            <section className="py-16 sm:py-24 px-4 sm:px-6">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10 sm:mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 mb-4 sm:mb-6 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs sm:text-sm font-medium">
                            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Our Journey</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Building the Future</h2>
                    </motion.div>

                    <div className="relative">
                        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 sm:-translate-x-1/2" />

                        <div className="space-y-8 sm:space-y-12">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="relative pl-10 sm:pl-0"
                                >
                                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-indigo-500 border-4 border-slate-950 shadow-lg shadow-indigo-500/30" />

                                    <div className={`sm:flex items-center ${i % 2 === 0 ? "sm:flex-row-reverse" : ""}`}>
                                        <div className="hidden sm:block sm:w-1/2" />
                                        <SpotlightCard className={`sm:w-1/2 ${i % 2 === 0 ? "sm:pr-12 md:pr-16" : "sm:pl-12 md:pl-16"} rounded-xl sm:rounded-2xl`}>
                                            <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-colors ${i % 2 === 0 ? "sm:text-right" : ""}`}>
                                                <span className="text-indigo-400 font-mono text-xs sm:text-sm mb-1 sm:mb-2 block">{item.year}</span>
                                                <h3 className="text-base sm:text-xl font-bold text-white mb-1 sm:mb-2">{item.title}</h3>
                                                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </SpotlightCard>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Axoraco */}
            <section className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8 sm:mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 mb-4 sm:mb-6 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-medium">
                            <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Why Us</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 tracking-tight">The Axoraco Difference</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {differentiators.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-slate-900/50 border border-slate-800 text-sm sm:text-base text-slate-300"
                            >
                                <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                                {item}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <SpotlightContainer className="py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
                <div className="container mx-auto max-w-3xl text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-tight px-2">
                            Ready to Transform Your Operations?
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-10 px-2">
                            Let's discuss how Axoraco can help you achieve operational excellence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                            <Link
                                href="/contact"
                                className="group relative inline-flex items-center justify-center"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                                <div className="relative px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base sm:text-lg rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    <span className="relative flex items-center gap-2 sm:gap-3">
                                        Get Started
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                            <Link
                                href="/solutions"
                                className="px-6 sm:px-10 py-4 sm:py-5 bg-white/5 border border-white/10 text-white font-medium text-base sm:text-lg rounded-full hover:bg-white/10 transition-all"
                            >
                                View Our Work
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </SpotlightContainer>

            <Footer />
        </main>
    )
}
