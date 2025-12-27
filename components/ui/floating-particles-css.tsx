"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function FloatingParticlesCSS() {
    // Generate random particles only once on mount to avoid hydration mismatch
    // But for CSS particles we typically want them static or simple. 
    // Let's use a fixed set of particles with different animation delays.

    const particles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${10 + Math.random() * 20}s`,
        size: `${2 + Math.random() * 3}px`,
        opacity: 0.1 + Math.random() * 0.4
    }))

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full bg-indigo-400 animate-float"
                    style={{
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                        opacity: p.opacity,
                        animationDelay: p.delay,
                        animationDuration: p.duration,
                    }}
                />
            ))}
        </div>
    )
}
