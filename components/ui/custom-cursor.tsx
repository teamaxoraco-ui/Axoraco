"use client"

import { useState, useEffect, useRef } from "react"

/**
 * Lightweight custom cursor using CSS transforms and RAF
 * No framer-motion for maximum performance
 */
export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const cursorRef = useRef<HTMLDivElement>(null)
    const rafRef = useRef<number | null>(null)
    const posRef = useRef({ x: -100, y: -100 })

    useEffect(() => {
        // Skip on touch devices
        if ('ontouchstart' in window) return

        const moveCursor = (e: MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY }

            if (!isVisible) setIsVisible(true)

            // Use RAF for smooth updates
            if (rafRef.current === null) {
                rafRef.current = requestAnimationFrame(() => {
                    if (cursorRef.current) {
                        cursorRef.current.style.transform =
                            `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`
                    }
                    rafRef.current = null
                })
            }
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const isInteractive = Boolean(
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer')
            )
            setIsHovering(isInteractive)
        }

        window.addEventListener('mousemove', moveCursor, { passive: true })
        window.addEventListener('mouseover', handleMouseOver, { passive: true })

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mouseover', handleMouseOver)
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current)
            }
        }
    }, [isVisible])

    if (!isVisible) return null

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference will-change-transform"
            style={{
                width: isHovering ? 48 : 8,
                height: isHovering ? 48 : 8,
                transition: "width 0.15s ease-out, height 0.15s ease-out",
            }}
        />
    )
}
