"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to Sentry or console
        console.error("Global error:", error);
    }, [error]);

    return (
        <html lang="en">
            <body className="bg-slate-950 text-white min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-md mx-auto p-8"
                >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
                    <p className="text-slate-400 mb-6">
                        We apologize for the inconvenience. Please try again.
                    </p>
                    <button
                        onClick={reset}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full font-medium transition-colors"
                    >
                        Try Again
                    </button>
                </motion.div>
            </body>
        </html>
    );
}
