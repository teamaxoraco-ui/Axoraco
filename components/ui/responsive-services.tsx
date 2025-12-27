"use client"

import dynamic from "next/dynamic"
import { ServicesLite } from "./services-lite"

// Lazy load full Services only on desktop
const ServicesFull = dynamic(() => import("./services").then(mod => ({ default: mod.Services })), {
    ssr: false,
    loading: () => <ServicesLite />,
})

/**
 * ResponsiveServices - Shows lightweight CSS-only version on mobile,
 * full animated version on desktop.
 */
export function ResponsiveServices() {
    return (
        <>
            <div className="md:hidden">
                <ServicesLite />
            </div>
            <div className="hidden md:block">
                <ServicesFull />
            </div>
        </>
    )
}
