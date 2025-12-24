"use client"

import { motion } from "framer-motion"
import { Code2, Layers, Rocket, ShieldCheck, ArrowRight, CheckCircle2, Sparkles } from "lucide-react"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { CTASection } from "@/components/ui/cta-section"
import { SpotlightCard, SpotlightContainer } from "@/components/ui/spotlight"
import Link from "next/link"

const technologies = [
    "Next.js", "React", "TypeScript", "Tailwind CSS",
    "Node.js", "PostgreSQL", "AWS", "Framer Motion"
]

const processSteps = [
    {
        title: "Discovery",
        description: "We dive deep into your business goals and user needs to create the perfect blueprint.",
        icon: Layers,
    },
    {
        title: "Development",
        description: "Agile sprints with regular updates and transparent, clean code architecture.",
        icon: Code2,
    },
    {
        title: "Security",
        description: "Enterprise-grade security best practices baked in from day one.",
        icon: ShieldCheck,
    },
    {
        title: "Deployment",
        description: "CI/CD pipelines for zero-downtime updates and global edge deployment.",
        icon: Rocket,
    },
]

const benefits = [
    "Lightning-fast page loads (<100ms TTFB)",
    "SEO-optimized architecture",
    "Mobile-first responsive design",
    "Accessibility (WCAG 2.1 AA)",
    "Analytics & conversion tracking",
    "Scalable infrastructure",
]

export default function WebDevPageClient() {
    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
            <Navbar />

            <SpotlightContainer className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
                <div className="container mx-auto max-w-6xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto mb-20"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-medium">
                            <Code2 className="w-4 h-4" />
                            <span>Web Development</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Web Architecture <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                                Built for Scale.
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 sm:mb-10">
                            We don&apos;t just build websites; we engineer digital ecosystems.
                            Performance, SEO, and user experience are baked into every line of code.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="group relative inline-flex items-center justify-center"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                                <div className="relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.5)]">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    <span className="relative flex items-center gap-2">
                                        Start Your Project
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                            <Link
                                href="/solutions"
                                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2"
                            >
                                View Case Studies
                            </Link>
                        </div>
                    </motion.div>

                    {/* Tech Stack */}
                    <div className="mb-24">
                        <h3 className="text-center text-slate-500 font-medium mb-8 uppercase tracking-widest text-sm">
                            Our Tech Stack
                        </h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {technologies.map((tech, index) => (
                                <motion.div
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="px-6 py-3 rounded-full bg-slate-900/50 border border-slate-800 text-slate-300 font-medium hover:border-cyan-500/50 hover:text-white transition-all"
                                >
                                    {tech}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Process Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                        {processSteps.map((step, index) => (
                            <SpotlightCard key={index} className="rounded-2xl" spotlightColor="rgba(6, 182, 212, 0.12)">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all h-full"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                                        <step.icon className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </motion.div>
                            </SpotlightCard>
                        ))}
                    </div>

                    {/* Benefits Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-cyan-950/50 to-slate-900/50 border border-cyan-500/20"
                    >
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-medium">
                                <Sparkles className="w-4 h-4" />
                                <span>What You Get</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold">Every Build Includes</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {benefits.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-300 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    {benefit}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </SpotlightContainer>

            <CTASection />
            <Footer />
        </main>
    )
}
