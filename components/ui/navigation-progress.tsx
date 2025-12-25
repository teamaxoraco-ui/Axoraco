"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

/**
 * Page loading indicator that shows during navigation
 * Displays a gradient progress bar at the top of the screen
 */
export function NavigationProgress() {
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const pathname = usePathname();
    const timersRef = useRef<NodeJS.Timeout[]>([]);

    const startLoading = useCallback(() => {
        setIsLoading(true);
        setProgress(0);

        const timer1 = setTimeout(() => setProgress(30), 100);
        const timer2 = setTimeout(() => setProgress(60), 200);
        const timer3 = setTimeout(() => setProgress(90), 400);
        const timer4 = setTimeout(() => {
            setProgress(100);
            setTimeout(() => setIsLoading(false), 200);
        }, 600);

        timersRef.current = [timer1, timer2, timer3, timer4];
    }, []);

    // This effect intentionally updates state on route change - it's the correct pattern
    // for tracking navigation state in a route-change listener
    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        startLoading();

        return () => {
            timersRef.current.forEach(clearTimeout);
        };
    }, [pathname, startLoading]);
    /* eslint-enable react-hooks/set-state-in-effect */

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed top-0 left-0 right-0 z-[100] h-1"
                >
                    <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-r from-transparent to-pink-500/50 blur-sm" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
