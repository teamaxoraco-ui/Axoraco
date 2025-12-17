import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Home, Search } from "lucide-react";

export const metadata: Metadata = {
    title: "404 - Page Not Found | Axoraco",
    description: "The page you're looking for doesn't exist. Let's get you back on track.",
};

export default function NotFound() {
    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
            <Navbar />
            <div className="pt-32 pb-20 px-6 flex items-center justify-center min-h-[80vh]">
                <div className="text-center max-w-xl mx-auto">
                    {/* Animated 404 */}
                    <div className="relative mb-8">
                        <span className="text-[12rem] md:text-[16rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 select-none leading-none">
                            404
                        </span>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full bg-indigo-500/10 blur-3xl" />
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                        Page Not Found
                    </h1>
                    <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                        Let&apos;s get you back to automating reality.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="group relative inline-flex items-center justify-center"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                            <div className="relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105 flex items-center gap-2">
                                <Home className="w-4 h-4" />
                                Back to Home
                            </div>
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                        >
                            <Search className="w-4 h-4" />
                            Contact Support
                        </Link>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-16 pt-8 border-t border-slate-800">
                        <p className="text-sm text-slate-500 mb-4">Popular pages:</p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            {[
                                { name: "AI Voice Bots", href: "/ai-voice" },
                                { name: "Web Development", href: "/web-dev" },
                                { name: "Solutions", href: "/solutions" },
                                { name: "About Us", href: "/about" },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-indigo-400 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
