"use client"

import dynamic from "next/dynamic"
import { TrustLite } from "./trust-lite"
import { ProcessLite } from "./process-lite"
import { TestimonialsLite } from "./testimonials-lite"
import { CTALite } from "./cta-lite"

// Lazy load full versions only on desktop
const TrustFull = dynamic(() => import("./trust").then(mod => ({ default: mod.Trust })), {
    ssr: false,
    loading: () => <TrustLite />,
})

const ProcessFull = dynamic(() => import("./process").then(mod => ({ default: mod.Process })), {
    ssr: false,
    loading: () => <ProcessLite />,
})

const TestimonialsFull = dynamic(() => import("./testimonials").then(mod => ({ default: mod.Testimonials })), {
    ssr: false,
    loading: () => <TestimonialsLite />,
})

const CTAFull = dynamic(() => import("./cta-section").then(mod => ({ default: mod.CTASection })), {
    ssr: false,
    loading: () => <CTALite />,
})

export function ResponsiveTrust() {
    return (
        <>
            <div className="md:hidden"><TrustLite /></div>
            <div className="hidden md:block"><TrustFull /></div>
        </>
    )
}

export function ResponsiveProcess() {
    return (
        <>
            <div className="md:hidden"><ProcessLite /></div>
            <div className="hidden md:block"><ProcessFull /></div>
        </>
    )
}

export function ResponsiveTestimonials() {
    return (
        <>
            <div className="md:hidden"><TestimonialsLite /></div>
            <div className="hidden md:block"><TestimonialsFull /></div>
        </>
    )
}

export function ResponsiveCTA() {
    return (
        <>
            <div className="md:hidden"><CTALite /></div>
            <div className="hidden md:block"><CTAFull /></div>
        </>
    )
}
