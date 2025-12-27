"use client"

import { Mic, Code, Network, ArrowUpRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { ComponentType } from "react"
import Link from "next/link"

interface Service {
    id: number
    title: string
    description: string
    icon: ComponentType<{ className?: string }>
    className: string
    gradient: string
    featured?: boolean
    href: string
}

const services: Service[] = [
    {
        id: 1,
        title: "AI Voice Bots",
        description: "Human-like conversational agents that handle appointment setting, customer support, and sales calls 24/7.",
        icon: Mic,
        className: "md:col-span-2 md:row-span-2",
        gradient: "from-indigo-500/20 to-purple-500/20",
        featured: true,
        href: "/ai-voice",
    },
    {
        id: 2,
        title: "Web Architecture",
        description: "High-performance, SEO-optimized web solutions.",
        icon: Code,
        className: "md:col-span-1",
        gradient: "from-blue-500/20 to-cyan-500/20",
        featured: false,
        href: "/web-dev",
    },
    {
        id: 3,
        title: "Seamless Integration",
        description: "Connect your entire stack with robust API solutions.",
        icon: Network,
        className: "md:col-span-1",
        gradient: "from-emerald-500/20 to-teal-500/20",
        featured: false,
        href: "/solutions",
    },
]

function ServiceCardLite({ service }: { service: Service }) {
    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1",
                service.featured
                    ? "border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-950/60 to-slate-900/60 p-8 sm:p-10"
                    : "border border-slate-800 bg-slate-900/50 p-6 sm:p-8",
                service.className
            )}
        >
            {/* Gradient Background on Hover */}
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    service.gradient
                )}
            />

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className={service.featured ? "mb-8" : "mb-6"}>
                    {/* Featured Badge */}
                    {service.featured && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 text-xs font-medium">
                            <Sparkles className="w-3 h-3" aria-hidden="true" />
                            <span>Most Popular</span>
                        </div>
                    )}

                    <div className={cn(
                        "rounded-2xl flex items-center justify-center mb-4 transition-colors border",
                        service.featured
                            ? "w-14 h-14 bg-indigo-500/20 border-indigo-500/30 group-hover:bg-indigo-500/30"
                            : "w-12 h-12 bg-slate-800 border-slate-700 group-hover:bg-white/10"
                    )}>
                        <service.icon className={cn(
                            "text-indigo-400 group-hover:text-white transition-colors",
                            service.featured ? "w-7 h-7" : "w-5 h-5"
                        )} />
                    </div>

                    <h3 className={cn(
                        "font-bold text-white mb-2",
                        service.featured ? "text-2xl sm:text-3xl" : "text-xl"
                    )}>
                        {service.title}
                    </h3>
                    <p className={cn(
                        "text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed",
                        service.featured ? "text-base" : "text-sm"
                    )}>
                        {service.description}
                    </p>
                </div>

                <Link
                    href={service.href}
                    className={cn(
                        "inline-flex items-center font-medium transition-colors",
                        service.featured
                            ? "text-sm text-white bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full w-fit border border-white/10"
                            : "text-sm text-indigo-400 group-hover:text-white"
                    )}
                >
                    {service.featured ? "Explore AI Voice" : "Learn more"}
                    <ArrowUpRight className={cn(
                        "ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform",
                        service.featured ? "w-4 h-4" : "w-4 h-4"
                    )} aria-hidden="true" />
                </Link>
            </div>
        </div>
    )
}

export function ServicesLite() {
    return (
        <section className="py-16 sm:py-20 relative">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center animate-fade-in-up">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                        Intelligent Solutions
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
                        Scalable technology designed to automate workflows and enhance user experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service) => (
                        <ServiceCardLite key={service.id} service={service} />
                    ))}
                </div>
            </div>
        </section>
    )
}
