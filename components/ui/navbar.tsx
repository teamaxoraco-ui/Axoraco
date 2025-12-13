"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const navLinks = [
    { name: "Solutions", href: "/solutions", color: "from-indigo-400 to-blue-400" },
    { name: "AI Voice", href: "/ai-voice", color: "from-purple-400 to-pink-400" },
    { name: "Web Dev", href: "/web-dev", color: "from-cyan-400 to-teal-400" },
    { name: "About", href: "/about", color: "from-amber-400 to-orange-400" },
    { name: "Contact", href: "/contact", color: "from-rose-400 to-red-400" },
]

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isMobileMenuOpen])

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "glass py-4" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                    AXORACO
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="group relative px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full overflow-hidden transition-all hover:shadow-[0_0_25px_-5px_rgba(99,102,241,0.5)] hover:scale-105"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                        <span className="relative">Get Started</span>
                    </Link>
                </div>

                {/* Hamburger Button */}
                <button
                    className="md:hidden relative w-12 h-12 flex items-center justify-center -mr-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    <div className="relative w-6 h-5 flex flex-col justify-between">
                        <motion.span
                            animate={isMobileMenuOpen
                                ? { rotate: 45, y: 9, width: "100%" }
                                : { rotate: 0, y: 0, width: "100%" }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-0 left-0 w-full h-0.5 bg-white origin-left"
                        />
                        <motion.span
                            animate={isMobileMenuOpen
                                ? { opacity: 0, x: -10 }
                                : { opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-white"
                        />
                        <motion.span
                            animate={isMobileMenuOpen
                                ? { rotate: -45, y: -9, width: "100%" }
                                : { rotate: 0, y: 0, width: "100%" }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-white origin-left"
                        />
                    </div>
                </button>
            </div>

            {/* Premium Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden border-t border-indigo-500/20"
                        style={{
                            backgroundColor: "rgba(15, 23, 42, 0.98)",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                        }}
                    >
                        <div className="flex flex-col p-6 gap-2">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.08, duration: 0.3 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="group flex items-center gap-3 py-3 text-lg font-semibold text-white transition-all duration-300"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {/* Colorful dot indicator */}
                                        <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${link.color} opacity-60 group-active:opacity-100 group-active:scale-150 transition-all`} />
                                        {/* Link text with gradient on active */}
                                        <span className="group-active:text-transparent group-active:bg-clip-text group-active:bg-gradient-to-r group-active:from-indigo-400 group-active:to-purple-400">
                                            {link.name}
                                        </span>
                                        {/* Arrow indicator */}
                                        <span className="ml-auto text-slate-500 group-active:text-indigo-400 transition-colors">→</span>
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Premium CTA with glow */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-4"
                            >
                                <Link
                                    href="/contact"
                                    className="relative block w-full px-6 py-4 text-center font-bold text-white rounded-2xl overflow-hidden"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {/* Animated gradient background */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient-x" />
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 blur-xl opacity-50" />
                                    <span className="relative flex items-center justify-center gap-2">
                                        Get Started
                                        <span className="text-lg">✨</span>
                                    </span>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
