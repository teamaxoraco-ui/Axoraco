"use client"

import { useState } from "react"
import Link from "next/link"
import { Github, Twitter, Linkedin, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const footerLinks = {
    solutions: [
        { name: "AI Voice Bots", href: "/ai-voice" },
        { name: "Web Development", href: "/web-dev" },
        { name: "API Integration", href: "/solutions" },
        { name: "Consulting", href: "/consulting" },
    ],
    company: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ],
    legal: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
    ],
}

const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "GitHub", icon: Github, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
]

type SubmitStatus = "idle" | "loading" | "success" | "error"

export function Footer() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<SubmitStatus>("idle")
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setStatus("loading")
        setErrorMessage("")

        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Subscription failed")
            }

            setStatus("success")
            setEmail("")
        } catch (error) {
            setStatus("error")
            setErrorMessage(error instanceof Error ? error.message : "Failed to subscribe")
        }
    }

    return (
        <footer
            className="bg-slate-950 border-t border-slate-800 relative overflow-hidden"
            role="contentinfo"
            aria-label="Site footer"
        >
            {/* Subtle top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Main Footer Content */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-white mb-4 block">
                            AXORACO
                        </Link>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            Automating reality and elevating business through intelligent AI Voice Bots and bespoke Web Architecture.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-4 h-4" aria-hidden="true" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Solutions Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Solutions</h4>
                        <ul className="space-y-3">
                            {footerLinks.solutions.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                                    >
                                        {link.name}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                                    >
                                        {link.name}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / CTA Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Stay Updated</h4>
                        <p className="text-slate-400 text-sm mb-4">
                            Join 1,200+ operators. Weekly automation insights, zero fluff.
                        </p>

                        {/* Success/Error Messages */}
                        <AnimatePresence mode="wait">
                            {status === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center gap-2"
                                    role="alert"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    <span className="text-green-400 text-sm">Subscribed!</span>
                                </motion.div>
                            )}
                            {status === "error" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2"
                                    role="alert"
                                >
                                    <AlertCircle className="w-4 h-4 text-red-500" />
                                    <span className="text-red-400 text-sm">{errorMessage}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-6">
                            <label htmlFor="footer-newsletter-email" className="sr-only">Email address</label>
                            <div className="flex gap-2">
                                <input
                                    id="footer-newsletter-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="flex-1 px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full text-sm hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)] transition-all disabled:opacity-70"
                                >
                                    {status === "loading" ? "..." : "Subscribe"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} Axoraco. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-slate-500">
                        {footerLinks.legal.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="hover:text-slate-300 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
