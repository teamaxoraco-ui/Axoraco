"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Check } from "lucide-react";

const COOKIE_CONSENT_KEY = "axoraco-cookie-consent";

/**
 * GDPR-compliant cookie consent banner
 * Remembers user preference in localStorage
 */
export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check consent status after component mounts (client-side localStorage access)
    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!consent) {
            setTimeout(() => setIsVisible(true), 1500);
        }
        setIsLoading(false);
    }, []);
    /* eslint-enable react-hooks/set-state-in-effect */

    const handleAccept = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
        setIsVisible(false);
        // Trigger analytics if needed
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("consent", "update", {
                analytics_storage: "granted",
            });
        }
    };

    const handleDecline = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
        setIsVisible(false);
    };

    if (isLoading) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
                >
                    <div className="max-w-4xl mx-auto rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-800 shadow-2xl shadow-black/50 p-4 md:p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            {/* Icon */}
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                                <Cookie className="w-5 h-5 text-indigo-400" />
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-white font-semibold mb-1">We value your privacy</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    We use cookies to enhance your experience, analyze site traffic, and for marketing purposes.
                                    By clicking &quot;Accept&quot;, you consent to our use of cookies.{" "}
                                    <a href="/privacy" className="text-indigo-400 hover:text-indigo-300 underline">
                                        Learn more
                                    </a>
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <button
                                    onClick={handleDecline}
                                    className="flex-1 md:flex-none px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <X className="w-4 h-4" />
                                    Decline
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 md:flex-none px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
                                >
                                    <Check className="w-4 h-4" />
                                    Accept
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Extend Window interface for gtag
declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}
