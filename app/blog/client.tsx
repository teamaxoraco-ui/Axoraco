"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { SpotlightCard, SpotlightContainer } from "@/components/ui/spotlight"
import { Calendar, User, ArrowRight, BookOpen, Sparkles } from "lucide-react"
import Link from "next/link"

const posts = [
    {
        title: "The Death of the IVR System",
        excerpt: "Why traditional phone trees are costing you customers and how Voice AI is changing the game forever.",
        date: "Nov 28, 2024",
        author: "Daksh",
        tag: "AI Voice",
        gradient: "from-indigo-500 to-purple-500",
        readTime: "5 min read"
    },
    {
        title: "Scaling Next.js to 1 Million Users",
        excerpt: "A technical breakdown of the architecture required to handle massive traffic spikes without downtime.",
        date: "Nov 15, 2024",
        author: "Aniket",
        tag: "Engineering",
        gradient: "from-cyan-500 to-blue-500",
        readTime: "8 min read"
    },
    {
        title: "Automation is not about replacing humans",
        excerpt: "It's about empowering them. Here's our philosophy on human-in-the-loop AI systems and why it matters.",
        date: "Nov 02, 2024",
        author: "Yagna",
        tag: "Strategy",
        gradient: "from-purple-500 to-pink-500",
        readTime: "4 min read"
    }
]

const categories = ["All", "AI Voice", "Engineering", "Strategy", "Case Studies"]

export default function BlogPageClient() {
    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
            <Navbar />

            <SpotlightContainer className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
                <div className="container mx-auto max-w-6xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
                            <BookOpen className="w-4 h-4" />
                            <span>Our Blog</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Thoughts</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
                            Deep dives into AI, automation, and the future of work.
                        </p>
                    </motion.div>

                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${i === 0
                                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                    : "bg-slate-900/50 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Featured Post */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12"
                    >
                        <div className="group grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-all cursor-pointer">
                            <div className="aspect-[16/10] rounded-2xl bg-slate-800 relative overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${posts[0].gradient} opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500`} />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="px-3 py-1 bg-indigo-500/80 backdrop-blur-md rounded-full text-xs font-medium text-white">
                                        Featured
                                    </span>
                                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/10">
                                        {posts[0].tag}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                                    {posts[0].title}
                                </h2>
                                <p className="text-slate-400 mb-6 leading-relaxed">
                                    {posts[0].excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            {posts[0].author}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {posts[0].date}
                                        </div>
                                    </div>
                                    <span className="text-sm text-indigo-400">{posts[0].readTime}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Post Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {posts.slice(1).map((post, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                                className="group flex flex-col h-full rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden hover:border-indigo-500/30 transition-all cursor-pointer"
                            >
                                <div className="h-48 bg-slate-800 relative overflow-hidden">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-500`} />
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/10">
                                        {post.tag}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-800 pt-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                {post.author}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {post.date}
                                            </div>
                                        </div>
                                        <span className="text-indigo-400">{post.readTime}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Newsletter CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-indigo-950/50 to-slate-900/50 border border-indigo-500/20 text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
                            <Sparkles className="w-4 h-4" />
                            <span>Newsletter</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay in the Loop</h2>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto">
                            Get weekly insights on AI automation, engineering best practices, and industry trends.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-5 py-3 bg-slate-900/50 border border-slate-700 rounded-full text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                            />
                            <button className="group px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)] transition-all flex items-center justify-center gap-2">
                                Subscribe
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </SpotlightContainer>

            <Footer />
        </main>
    )
}
