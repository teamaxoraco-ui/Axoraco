"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { SpotlightCard } from "@/components/ui/spotlight"
import Image from "next/image"

interface Testimonial {
    id: number
    quote: string
    author: string
    role: string
    image: string
    company: string
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "Axraco's AI agents handled 15,000 calls in the first week. Our booking rate tripled.",
        author: "Sarah Jenkins",
        role: "COO",
        company: "TechFlow",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    },
    {
        id: 2,
        quote: "The web architecture they built is blazing fast. Our SEO rankings skyrocketed.",
        author: "Michael Chen",
        role: "Founder",
        company: "Nexus",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    },
    {
        id: 3,
        quote: "Professional, futuristic, and incredibly effective. The best agency we've worked with.",
        author: "Elena Rodriguez",
        role: "VP Marketing",
        company: "Solaris",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
    },
]

export function Testimonials() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium">
                        <Star className="w-4 h-4 fill-purple-400" aria-hidden="true" />
                        <span>Client Success Stories</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Trusted by Industry Leaders
                    </h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">
                        See what our partners say about automating with Axoraco.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <SpotlightCard
                            key={testimonial.id}
                            className="rounded-3xl"
                            spotlightColor="rgba(168, 85, 247, 0.12)"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                                className="relative p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-500 h-full"
                            >
                                <div className="relative z-10">
                                    {/* Quote Icon */}
                                    <div className="mb-6">
                                        <Quote className="w-10 h-10 text-indigo-500/30" aria-hidden="true" />
                                    </div>

                                    {/* Stars */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" aria-hidden="true" />
                                        ))}
                                    </div>

                                    {/* Quote Text */}
                                    <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                                        &ldquo;{testimonial.quote}&rdquo;
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-700 group-hover:ring-purple-500/50 transition-all">
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.author}
                                                fill
                                                className="object-cover"
                                                sizes="48px"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">{testimonial.author}</h4>
                                            <p className="text-sm text-indigo-400">
                                                {testimonial.role}, <span className="text-slate-500">{testimonial.company}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    )
}
