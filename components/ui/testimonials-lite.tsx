"use client"

import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
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

export function TestimonialsLite() {
    return (
        <section className="py-16 sm:py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium">
                        <Star className="w-4 h-4 fill-purple-400" aria-hidden="true" />
                        <span>Client Success Stories</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                        Trusted by Industry Leaders
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto px-4">
                        See what our partners say about automating with Axoraco.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/30 transition-colors duration-300"
                        >
                            <Quote className="w-8 h-8 text-indigo-500/30 mb-4" aria-hidden="true" />

                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" aria-hidden="true" />
                                ))}
                            </div>

                            <p className="text-base text-slate-300 mb-6 leading-relaxed">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>

                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-slate-700">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.author}
                                        fill
                                        className="object-cover"
                                        sizes="40px"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">{testimonial.author}</h4>
                                    <p className="text-xs text-indigo-400">
                                        {testimonial.role}, <span className="text-slate-500">{testimonial.company}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
