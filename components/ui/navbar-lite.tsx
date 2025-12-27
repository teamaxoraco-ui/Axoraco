"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const navLinks = [
    { name: "Solutions", href: "/solutions", color: "from-indigo-400 to-blue-400" },
    { name: "AI Voice", href: "/ai-voice", color: "from-purple-400 to-pink-400" },
    { name: "Web Dev", href: "/web-dev", color: "from-cyan-400 to-teal-400" },
    { name: "About", href: "/about", color: "from-amber-400 to-orange-400" },
    { name: "Contact", href: "/contact", color: "from-rose-400 to-red-400" },
]

export function NavbarLite() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [isMobileMenuOpen])

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "glass py-4" : "bg-transparent py-6"
            )}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-white" aria-label="Axoraco Home">
                    AXORACO
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8" role="menubar" aria-label="Main menu">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                            role="menuitem"
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

                {/* Hamburger Button - CSS Only */}
                <button
                    className="md:hidden relative w-12 h-12 flex items-center justify-center -mr-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    <div className="relative w-6 h-5 flex flex-col justify-between">
                        <span
                            className={cn(
                                "absolute top-0 left-0 w-full h-0.5 bg-white transition-all duration-200 origin-left",
                                isMobileMenuOpen && "rotate-45 translate-y-[9px]"
                            )}
                        />
                        <span
                            className={cn(
                                "absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-white transition-all duration-200",
                                isMobileMenuOpen && "opacity-0 -translate-x-2"
                            )}
                        />
                        <span
                            className={cn(
                                "absolute bottom-0 left-0 w-full h-0.5 bg-white transition-all duration-200 origin-left",
                                isMobileMenuOpen && "-rotate-45 -translate-y-[9px]"
                            )}
                        />
                    </div>
                </button>
            </div>

            {/* Mobile Menu - CSS Only */}
            <div
                className={cn(
                    "md:hidden overflow-hidden border-t border-indigo-500/20 transition-all duration-300",
                    isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}
                style={{
                    backgroundColor: "rgba(15, 23, 42, 0.98)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                }}
                role="menu"
                aria-label="Mobile navigation menu"
            >
                <div className="flex flex-col p-6 gap-2">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="group flex items-center gap-3 py-3 text-lg font-semibold text-white transition-all duration-300"
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${link.color} opacity-60 group-active:opacity-100 group-active:scale-150 transition-all`} />
                            <span className="group-active:text-transparent group-active:bg-clip-text group-active:bg-gradient-to-r group-active:from-indigo-400 group-active:to-purple-400">
                                {link.name}
                            </span>
                            <span className="ml-auto text-slate-500 group-active:text-indigo-400 transition-colors">→</span>
                        </Link>
                    ))}

                    <div className="mt-4">
                        <Link
                            href="/contact"
                            className="relative block w-full px-6 py-4 text-center font-bold text-white rounded-2xl overflow-hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient-x" />
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 blur-xl opacity-50" />
                            <span className="relative flex items-center justify-center gap-2">
                                Get Started
                                <span className="text-lg">✨</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
