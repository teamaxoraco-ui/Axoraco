"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { motion } from "framer-motion"

interface ErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Application error:", error)
    }, [error])

    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full text-center"
            >
                {/* Error Icon */}
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                    <AlertTriangle className="w-10 h-10 text-red-500" aria-hidden="true" />
                </div>

                {/* Error Message */}
                <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
                <p className="text-slate-400 mb-8 leading-relaxed">
                    We apologize for the inconvenience. An unexpected error has occurred.
                    Please try again or return to the home page.
                </p>

                {/* Error Details (Development only) */}
                {process.env.NODE_ENV === "development" && error.message && (
                    <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-left">
                        <p className="text-xs text-red-400 font-mono break-all">
                            {error.message}
                        </p>
                        {error.digest && (
                            <p className="text-xs text-slate-500 mt-2">
                                Error ID: {error.digest}
                            </p>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105"
                        aria-label="Try again"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <span className="relative flex items-center gap-2">
                            <RefreshCw className="w-5 h-5" aria-hidden="true" />
                            Try Again
                        </span>
                    </button>

                    <Link
                        href="/"
                        className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                        aria-label="Return to home page"
                    >
                        <Home className="w-5 h-5" aria-hidden="true" />
                        Go Home
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}
