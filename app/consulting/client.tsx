"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { SpotlightContainer } from "@/components/ui/spotlight"
import { Calendar, CheckCircle2, Clock, Video, Users, Sparkles, ExternalLink } from "lucide-react"
import { companyInfo } from "@/lib/json-ld"

const benefits = [
    "Audit your current workflows",
    "Identify high-ROI automation opportunities",
    "Draft a preliminary technical roadmap",
    "Provide a custom quote — no obligation"
]

export default function ConsultingPageClient() {
    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
            <Navbar />

            <SpotlightContainer className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
                <div className="container mx-auto max-w-5xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
                                <Calendar className="w-4 h-4" />
                                <span>Free Strategy Session</span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                                Book a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Strategy Session</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed">
                                Let&apos;s discuss your automation roadmap. In this complimentary 30-minute call, we will:
                            </p>

                            <ul className="space-y-4 mb-12">
                                {benefits.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        className="flex items-start gap-3 text-slate-300"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Session Details */}
                            <div className="flex flex-wrap gap-6 mb-10 text-sm text-slate-400">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-indigo-400" />
                                    30 minutes
                                </div>
                                <div className="flex items-center gap-2">
                                    <Video className="w-4 h-4 text-indigo-400" />
                                    Video call
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-indigo-400" />
                                    With founding team
                                </div>
                            </div>

                            {/* Testimonial */}
                            <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="w-4 h-4 text-indigo-400" />
                                    <span className="text-xs text-indigo-400 uppercase tracking-wider font-medium">Client Feedback</span>
                                </div>
                                <p className="text-slate-300 italic leading-relaxed">
                                    &ldquo;The strategy session alone was worth more than the entire project cost with our previous agency.&rdquo;
                                </p>
                                <div className="mt-4 text-sm font-bold text-white">
                                    — CEO, TechFlow
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="bg-slate-900/60 border border-slate-800 rounded-3xl p-2 min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-sm"
                        >
                            {/* Calendly CTA */}
                            <div className="text-center p-8">
                                <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Calendar className="w-10 h-10 text-indigo-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Select a Time</h3>
                                <p className="text-slate-400 text-sm mb-8 max-w-xs mx-auto">
                                    Choose a time slot that works for your schedule. We&apos;re available globally.
                                </p>

                                {/* Calendly Button */}
                                <a
                                    href={companyInfo.calendly}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)]"
                                    aria-label="Book a call on Calendly"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    <span className="relative flex items-center gap-2">
                                        <Calendar className="w-5 h-5" />
                                        Book Your Free Call
                                        <ExternalLink className="w-4 h-4" />
                                    </span>
                                </a>

                                <p className="text-xs text-slate-500 mt-6">
                                    Powered by Calendly
                                </p>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
                        </motion.div>
                    </div>
                </div>
            </SpotlightContainer>

            <Footer />
        </main>
    )
}

