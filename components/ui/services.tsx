"use client"

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { Mic, Code, Network, ArrowUpRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { MouseEvent, ComponentType } from "react"
import Link from "next/link"
import { SpotlightContainer } from "@/components/ui/spotlight"

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
    description: "Human-like conversational agents that handle appointment setting, customer support, and sales calls 24/7. Powered by advanced NLP for natural interactions.",
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

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-3xl transition-all duration-500",
        service.featured
          ? "border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-950/60 to-slate-900/60 p-10"
          : "border border-slate-800 bg-slate-900/50 p-8",
        service.className
      )}
    >
      {/* Premium Animated Border for Featured Card */}
      {service.featured && (
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
          <div className="absolute inset-[-200%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_140deg,rgba(99,102,241,0.6)_160deg,transparent_180deg)]" />
        </div>
      )}

      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(99, 102, 241, 0.15), transparent 80%)`,
        }}
      />

      {/* Gradient Background */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          service.gradient
        )}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className={service.featured ? "mb-12" : "mb-8"}>
          {/* Featured Badge */}
          {service.featured && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 text-xs font-medium">
              <Sparkles className="w-3 h-3" aria-hidden="true" />
              <span>Most Popular</span>
            </div>
          )}

          <div className={cn(
            "rounded-2xl flex items-center justify-center mb-6 transition-colors border",
            service.featured
              ? "w-16 h-16 bg-indigo-500/20 border-indigo-500/30 group-hover:bg-indigo-500/30"
              : "w-12 h-12 bg-slate-800 border-slate-700 group-hover:bg-white/10 group-hover:border-white/20"
          )}>
            <service.icon className={cn(
              "text-indigo-400 group-hover:text-white transition-colors",
              service.featured ? "w-8 h-8" : "w-6 h-6"
            )} />
          </div>

          <h3 className={cn(
            "font-bold text-white mb-3",
            service.featured ? "text-3xl md:text-4xl" : "text-2xl"
          )}>
            {service.title}
          </h3>
          <p className={cn(
            "text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed",
            service.featured ? "text-lg max-w-md" : "text-base"
          )}>
            {service.description}
          </p>
        </div>

        <Link
          href={service.href}
          className={cn(
            "inline-flex items-center font-medium transition-colors",
            service.featured
              ? "text-base text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full w-fit border border-white/10"
              : "text-sm text-indigo-400 group-hover:text-white"
          )}
        >
          {service.featured ? "Explore AI Voice" : "Learn more"}
          <ArrowUpRight className={cn(
            "ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform",
            service.featured ? "w-5 h-5" : "w-4 h-4"
          )} aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  )
}

export function Services() {
  return (
    <SpotlightContainer className="py-16 sm:py-20 md:py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
            Intelligent Solutions
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
            Scalable technology designed to automate workflows and enhance user experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </SpotlightContainer>
  )
}
