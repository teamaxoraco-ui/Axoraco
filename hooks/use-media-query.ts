"use client"

import { useState, useEffect } from "react"

/**
 * Custom hook to detect media query matches
 * @param query - CSS media query string (e.g., "(max-width: 768px)")
 * @returns boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia(query).matches;
    })

    useEffect(() => {
        const mediaQuery = window.matchMedia(query)

        const handler = (event: MediaQueryListEvent) => {
            setMatches(event.matches)
        }

        mediaQuery.addEventListener("change", handler)
        return () => mediaQuery.removeEventListener("change", handler)
    }, [query])

    return matches
}
