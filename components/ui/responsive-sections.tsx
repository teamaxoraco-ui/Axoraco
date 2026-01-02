"use client"

import dynamic from "next/dynamic"
import { TrustLite } from "./trust-lite"
import { ProcessLite } from "./process-lite"
import { TestimonialsLite } from "./testimonials-lite"
import { CTALite } from "./cta-lite"
import { useMediaQuery } from "@/hooks/use-media-query"

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
    const isDesktop = useMediaQuery("(min-width: 768px)")
    return isDesktop ? <TrustFull /> : <TrustLite />
}

export function ResponsiveProcess() {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    return isDesktop ? <ProcessFull /> : <ProcessLite />
}

export function ResponsiveTestimonials() {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    return isDesktop ? <TestimonialsFull /> : <TestimonialsLite />
}

export function ResponsiveCTA() {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    return isDesktop ? <CTAFull /> : <CTALite />
}
