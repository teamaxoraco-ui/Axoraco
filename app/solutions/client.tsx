"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { CTASection } from "@/components/ui/cta-section"
import { SpotlightCard, SpotlightContainer } from "@/components/ui/spotlight"
import { Layers, ArrowRight, CheckCircle2, Sparkles } from "lucide-react"
import Link from "next/link"
import { smoothSpring } from "@/lib/animations"

const steps = [
    { title: "Strategy", desc: "We analyze your workflows to identify high-impact automation opportunities." },
    { title: "Implementation", desc: "Rapid deployment of custom AI agents and robust web infrastructure." },
    { title: "Optimization", desc: "Continuous monitoring and refinement to maximize ROI." }
]

const caseStudies = [
    {
        industry: "Real Estate",
        title: "300% Increase in Qualified Leads",
        quote: "Axoraco's Voice AI agent handled our entire inbound call volume, qualifying leads and booking appointments automatically.",
        company: "Luxury Estates Co.",
        location: "Los Angeles, CA",
        gradient: "from-indigo-500 to-purple-500"
    },
    {
        industry: "FinTech",
        title: "0.1s Latency Global API",
        quote: "We needed a web architecture that could handle millions of transactions. Axoraco delivered a system that is faster than light.",
        company: "Nova Finance",
        location: "New York, NY",
        gradient: "from-cyan-500 to-blue-500"
    },
    {
        industry: "Healthcare",
        title: "85% Reduction in No-Shows",
        quote: "The AI appointment reminder system transformed our patient scheduling. Cancellations dropped dramatically and our staff can focus on care.",
        company: "MedFirst Clinics",
        location: "Chicago, IL",
        gradient: "from-green-500 to-emerald-500"
    },
    {
        industry: "E-commerce",
        title: "24/7 Customer Support at 10% Cost",
        quote: "Our AI chatbot handles 80% of inquiries automatically. Customer satisfaction improved while support costs plummeted.",
        company: "TrendMart",
        location: "Austin, TX",
        gradient: "from-orange-500 to-red-500"
    }
]

const capabilities = [
    "AI Voice Agent Development",
    "Custom CRM Integration",
    "High-Performance Web Apps",
    "Real-time Analytics Dashboards",
    "API Architecture Design",
    "24/7 System Monitoring"
]

export default function SolutionsPageClient() {
    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
            <Navbar />

            {/* Hero Section */}
            <SpotlightContainer className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="container mx-auto max-w-4xl relative z-10 text-center"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
                        <Layers className="w-4 h-4" />
                        <span>Full-Stack Automation</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Solutions</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        From intelligent voice agents to scalable web architecture, we provide the full stack of automation tools your business needs.
                    </p>
                </motion.div>
            </SpotlightContainer>

            {/* Process Steps */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                        {steps.map((step, i) => (
                            <SpotlightCard key={i} className="rounded-3xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-all h-full"
                                >
                                    <div className="text-6xl font-bold text-indigo-500/20 mb-4">0{i + 1}</div>
                                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                                </motion.div>
                            </SpotlightCard>
                        ))}
                    </div>

                    {/* Capabilities Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-24 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-indigo-950/50 to-slate-900/50 border border-indigo-500/20"
                    >
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium">
                                <Sparkles className="w-4 h-4" />
                                <span>Our Capabilities</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold">What We Deliver</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {capabilities.map((cap, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-300 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    {cap}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Success Stories */}
                    <div className="mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl font-bold mb-4 tracking-tight">Success Stories</h2>
                            <p className="text-slate-400">Real results from real clients</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {caseStudies.map((study, i) => (
                                <SpotlightCard key={i} className="rounded-3xl">
                                    <motion.div
                                        initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-all relative overflow-hidden h-full"
                                    >
                                        {/* Gradient accent */}
                                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${study.gradient}`} />

                                        <div className="text-sm text-indigo-400 font-bold uppercase tracking-wider mb-4">{study.industry}</div>
                                        <h3 className="text-2xl font-bold text-white mb-4">{study.title}</h3>
                                        <p className="text-slate-400 mb-6 leading-relaxed">
                                            &ldquo;{study.quote}&rdquo;
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${study.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                                                {study.company[0]}
                                            </div>
                                            <div>
                                                <div className="font-bold text-white">{study.company}</div>
                                                <div className="text-xs text-slate-500">{study.location}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>

                    {/* Mini CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center justify-center"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                            <div className="relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.5)]">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                <span className="relative flex items-center gap-2">
                                    Discuss Your Project
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <CTASection />
            <Footer />
        </main>
    )
}
