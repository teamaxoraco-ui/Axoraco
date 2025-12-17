"use client"

import { motion } from "framer-motion"
import { Mic, Zap, BarChart, PhoneCall, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { CTASection } from "@/components/ui/cta-section"
import { SpotlightCard, SpotlightContainer } from "@/components/ui/spotlight"
import Link from "next/link"
import { smoothSpring } from "@/lib/animations"

const features = [
    {
        title: "Natural Language Understanding",
        description: "Our bots understand context, nuance, and intent, enabling human-like conversations.",
        icon: Mic,
    },
    {
        title: "Instant Scalability",
        description: "Handle thousands of concurrent calls without compromising quality or latency.",
        icon: Zap,
    },
    {
        title: "Real-time Analytics",
        description: "Gain actionable insights from every interaction with detailed dashboards.",
        icon: BarChart,
    },
    {
        title: "24/7 Availability",
        description: "Never miss a lead. Your AI agent works round the clock to capture opportunities.",
        icon: PhoneCall,
    },
]

const benefits = [
    "Reduce staffing costs by up to 70%",
    "Handle unlimited concurrent calls",
    "Zero wait times for customers",
    "Consistent brand voice every time",
    "Seamless CRM integration",
    "Multi-language support",
]

export default function AIVoicePageClient() {
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
                            <Mic className="w-4 h-4" />
                            <span>AI Voice Technology</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Voice AI That <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                Actually Listens.
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 sm:mb-10">
                            Replace rigid IVR systems with fluid, intelligent conversations.
                            Our AI Voice Agents handle appointments, support, and sales with human-level empathy.
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
                                        Get Started
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                            <Link
                                href="/consulting"
                                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2"
                            >
                                Book a Call
                                <Sparkles className="w-4 h-4 text-indigo-400" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                        {features.map((feature, index) => (
                            <SpotlightCard key={index} className="rounded-3xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-all duration-300 h-full"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20">
                                        <feature.icon className="w-7 h-7 text-indigo-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        {feature.description}
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
                        className="mb-24 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-indigo-950/50 to-slate-900/50 border border-indigo-500/20"
                    >
                        <h2 className="text-3xl font-bold text-center mb-8">Why Choose AI Voice?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {benefits.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    {benefit}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Industries */}
                    <div className="mb-24">
                        <h2 className="text-3xl font-bold text-center mb-4">Industries We Serve</h2>
                        <p className="text-slate-400 text-center mb-12">Powering voice automation across sectors</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {["Real Estate", "Healthcare", "E-commerce", "Legal", "Finance", "Hospitality", "Recruitment", "Logistics"].map((industry, i) => (
                                <SpotlightCard key={i} className="rounded-xl">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-center font-medium text-slate-300 hover:text-white hover:border-indigo-500/30 transition-all cursor-default"
                                    >
                                        {industry}
                                    </motion.div>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>

                    {/* Audio Visualization */}
                    <SpotlightCard className="rounded-3xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 md:p-12 text-center backdrop-blur-sm hover:border-indigo-500/30 transition-colors"
                        >
                            <div className="flex items-center justify-center gap-1.5 mb-8 h-20">
                                {[...Array(24)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className={`w-1.5 bg-gradient-to-t from-indigo-600 to-purple-500 rounded-full ${i % 2 === 0 ? '' : 'hidden sm:block'}`}
                                        animate={{ height: [16, 48, 16] }}
                                        transition={{
                                            duration: 1.2,
                                            repeat: Infinity,
                                            delay: i * 0.05,
                                            ease: "easeInOut",
                                        }}
                                    />
                                ))}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Hear the Difference</h3>
                            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                                Listen to a sample conversation between our AI agent and a customer booking an appointment.
                            </p>
                            <Link
                                href="/consulting"
                                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                <span className="relative">Book a Call</span>
                            </Link>
                        </motion.div>
                    </SpotlightCard>
                </div>
            </SpotlightContainer>

            <CTASection />
            <Footer />
        </main>
    )
}
