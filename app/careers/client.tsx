"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { SpotlightCard, SpotlightContainer } from "@/components/ui/spotlight"
import { ArrowRight, Briefcase, Heart, Zap, MapPin, Clock, Users, Sparkles } from "lucide-react"
import Link from "next/link"

const values = [
    { icon: Zap, label: "Move Fast", desc: "Ship weekly, iterate constantly" },
    { icon: Heart, label: "Love Work", desc: "Passion drives everything" },
    { icon: Briefcase, label: "Build Big", desc: "Think 10x, not 10%" }
]

const jobs = [
    { title: "Senior AI Engineer", type: "Full-time", loc: "Remote / NY", department: "Engineering" },
    { title: "Frontend Architect", type: "Full-time", loc: "Remote", department: "Engineering" },
    { title: "Growth Marketing Lead", type: "Full-time", loc: "London", department: "Marketing" },
]

const perks = [
    "Competitive salary + equity",
    "Unlimited PTO",
    "Remote-first culture",
    "Health, dental & vision",
    "Learning budget ($2k/year)",
    "Latest MacBook Pro"
]

export default function CareersPageClient() {
    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
            <Navbar />

            {/* Hero Section */}
            <SpotlightContainer className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 text-center overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="container mx-auto max-w-4xl relative z-10"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium">
                        <Users className="w-4 h-4" />
                        <span>We're Hiring</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Revolution</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed">
                        We're building the operating system for the automated enterprise.
                        If you're obsessed with efficiency, AI, and beautiful code, you belong here.
                    </p>

                    {/* Values */}
                    <div className="flex flex-wrap justify-center gap-6 mb-16">
                        {values.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/30 transition-colors min-w-[140px]"
                            >
                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                    <item.icon className="w-6 h-6 text-purple-400" />
                                </div>
                                <span className="font-bold text-white">{item.label}</span>
                                <span className="text-xs text-slate-500">{item.desc}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </SpotlightContainer>

            {/* Perks Section */}
            <section className="py-16 px-6 bg-slate-900/30 border-y border-slate-800">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
                            <Sparkles className="w-4 h-4" />
                            <span>Benefits</span>
                        </div>
                        <h2 className="text-2xl font-bold">Why Join Axoraco?</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {perks.map((perk, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-center text-slate-300 text-sm"
                            >
                                {perk}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-2xl font-bold mb-8">Open Positions</h2>
                    <div className="space-y-4">
                        {jobs.map((job, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between hover:border-indigo-500/50 transition-all cursor-pointer"
                            >
                                <div>
                                    <div className="text-xs text-indigo-400 font-medium uppercase tracking-wider mb-1">
                                        {job.department}
                                    </div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                                        {job.title}
                                    </h3>
                                    <div className="flex gap-4 text-sm text-slate-500 mt-2">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {job.type}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {job.loc}
                                        </span>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center p-8 rounded-2xl bg-slate-900/30 border border-slate-800"
                    >
                        <p className="text-slate-400 mb-4">Don't see your role?</p>
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <span className="relative flex items-center gap-2">
                                Send Your Resume
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
