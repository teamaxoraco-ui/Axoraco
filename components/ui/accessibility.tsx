"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FocusTrapProps {
    children: React.ReactNode;
    active: boolean;
    onEscape?: () => void;
}

/**
 * Focus trap component for modal dialogs and mobile menus
 * Traps keyboard focus within the component when active
 */
export function FocusTrap({ children, active, onEscape }: FocusTrapProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!active) return;

        const container = containerRef.current;
        if (!container) return;

        // Get all focusable elements
        const focusableElements = container.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Focus first element when trap activates
        firstElement?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && onEscape) {
                onEscape();
                return;
            }

            if (e.key !== "Tab") return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [active, onEscape]);

    return (
        <div ref={containerRef} aria-modal={active} role={active ? "dialog" : undefined}>
            {children}
        </div>
    );
}

/**
 * Live region for screen reader announcements
 */
export function LiveRegion({ message, priority = "polite" }: { message: string; priority?: "polite" | "assertive" }) {
    const [announcement, setAnnouncement] = useState("");

    // Re-announce message for screen readers by clearing and resetting
    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        if (message) {
            setAnnouncement("");
            setTimeout(() => setAnnouncement(message), 100);
        }
    }, [message]);
    /* eslint-enable react-hooks/set-state-in-effect */

    return (
        <div
            aria-live={priority}
            aria-atomic="true"
            className="sr-only"
        >
            {announcement}
        </div>
    );
}

/**
 * Visible focus indicator for keyboard users
 */
export function FocusRing({ children, className }: { children: React.ReactNode; className?: string }) {
    const [isFocusVisible, setIsFocusVisible] = useState(false);

    return (
        <div
            className={className}
            onFocus={(e) => {
                // Check if focus is from keyboard
                if (e.target.matches(":focus-visible")) {
                    setIsFocusVisible(true);
                }
            }}
            onBlur={() => setIsFocusVisible(false)}
        >
            {children}
            <AnimatePresence>
                {isFocusVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 rounded-inherit ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-950 pointer-events-none"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
