"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, MapPin, Phone, Send, Clock, Shield, Zap, CheckCircle2, AlertCircle, ExternalLink, XCircle } from "lucide-react"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { SpotlightCard, SpotlightContainer } from "@/components/ui/spotlight"
import { LoadingSpinner } from "@/components/ui/button"
import { companyInfo } from "@/lib/json-ld"

interface FormState {
    firstName: string
    lastName: string
    email: string
    message: string
}

type SubmitStatus = "idle" | "loading" | "success" | "error"
type EmailStatus = "idle" | "valid" | "invalid" | "checking" | "neutral" // Added neutral status

export default function ContactPageClient() {
    const [formData, setFormData] = useState<FormState>({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    })
    const [status, setStatus] = useState<SubmitStatus>("idle")
    const [errorMessage, setErrorMessage] = useState("")
    const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle")
    const [emailFeedback, setEmailFeedback] = useState("") // Renamed from emailError to verify feedback type

    // Helper to set email status with message
    const setEmailState = (status: EmailStatus, message: string) => {
        setEmailStatus(status)
        setEmailFeedback(message)
    }

    // Verify email function (called only on submit)
    const verifyEmailOnSubmit = async (email: string): Promise<boolean> => {
        // Basic format check first (client-side)
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
        if (!emailRegex.test(email)) {
            setEmailState("invalid", "Please enter a valid email address")
            return false
        }

        setEmailState("checking", "")

        try {
            const response = await fetch("/api/verify-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })

            const result = await response.json()

            if (result.valid) {
                // Check verification confidence
                if (result.confidence === "low") {
                    setEmailState("neutral", "Email address format is valid")
                } else {
                    setEmailState("valid", "Email verified successfully")
                }
                return true
            } else {
                setEmailState("invalid", result.reason || "Invalid email address")
                return false
            }
        } catch {
            // On network error, assume valid (neutral)
            setEmailState("neutral", "Email address accepted")
            return true
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }))

        // Reset email status on change (but don't verify yet)
        if (id === "email") {
            if (emailStatus !== "idle") {
                setEmailState("idle", "")
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // 1. Verify Email First (Conserve Quota: Only check now)
        const isEmailValid = await verifyEmailOnSubmit(formData.email)
        if (!isEmailValid) {
            setStatus("error")
            setErrorMessage("Please fix the email address before submitting")
            return
        }

        setStatus("loading")
        setErrorMessage("")

        try {
            // Combine firstName and lastName for the API
            const payload = {
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                message: formData.message,
            }

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            const data = await response.json()

            if (!response.ok) {
                // Handle specific validation errors from Zod
                if (data.details && Array.isArray(data.details)) {
                    const validationMsg = data.details.map((d: { message: string }) => d.message).join(". ")
                    throw new Error(validationMsg || data.error)
                }
                throw new Error(data.error || "Something went wrong")
            }

            setStatus("success")
            setFormData({ firstName: "", lastName: "", email: "", message: "" })
            setEmailState("idle", "")
        } catch (error) {
            setStatus("error")
            setErrorMessage(error instanceof Error ? error.message : "Failed to send message")
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30" suppressHydrationWarning>
            <Navbar />

            <SpotlightContainer className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 mb-6 sm:mb-8 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-medium">
                                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>Get In Touch</span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 tracking-tight">
                                Let&apos;s Build the <br className="hidden sm:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                    Future Together.
                                </span>
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 sm:mb-12 leading-relaxed">
                                Ready to automate your operations? Schedule a consultation or send us a message.
                            </p>

                            <div className="space-y-3 sm:space-y-4">
                                {/* Email */}
                                <SpotlightCard className="rounded-xl sm:rounded-2xl">
                                    <a
                                        href={companyInfo.emailLink}
                                        className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-colors group"
                                        aria-label="Send us an email"
                                    >
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 flex-shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                                            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-base sm:text-lg font-semibold mb-0.5 sm:mb-1 flex items-center gap-2">
                                                Email Us
                                                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                                            </h4>
                                            <p className="text-sm sm:text-base text-slate-400 group-hover:text-slate-300 transition-colors">{companyInfo.email}</p>
                                        </div>
                                    </a>
                                </SpotlightCard>

                                {/* Phone */}
                                <SpotlightCard className="rounded-xl sm:rounded-2xl">
                                    <a
                                        href={companyInfo.phoneLink}
                                        className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-colors group"
                                        aria-label="Call us"
                                    >
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 flex-shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                                            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-base sm:text-lg font-semibold mb-0.5 sm:mb-1 flex items-center gap-2">
                                                Call Us
                                                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                                            </h4>
                                            <p className="text-sm sm:text-base text-slate-400 group-hover:text-slate-300 transition-colors">{companyInfo.phoneFormatted}</p>
                                        </div>
                                    </a>
                                </SpotlightCard>

                                {/* Address */}
                                <SpotlightCard className="rounded-xl sm:rounded-2xl">
                                    <a
                                        href={companyInfo.address.mapsLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-colors group"
                                        aria-label="View location on Google Maps"
                                    >
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 flex-shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-base sm:text-lg font-semibold mb-0.5 sm:mb-1 flex items-center gap-2">
                                                Our Location
                                                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                                            </h4>
                                            <p className="text-sm sm:text-base text-slate-400 group-hover:text-slate-300 transition-colors">{companyInfo.address.full}</p>
                                        </div>
                                    </a>
                                </SpotlightCard>
                            </div>

                            <div className="mt-6 sm:mt-10 flex flex-wrap gap-4 sm:gap-6">
                                {[
                                    { icon: Shield, text: "Secure & Private" },
                                    { icon: Clock, text: "Response in 24h" },
                                    { icon: Zap, text: "Free Consultation" },
                                ].map((badge, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                                        <badge.icon className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                                        {badge.text}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <SpotlightCard className="rounded-2xl sm:rounded-3xl">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="bg-slate-900/60 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-sm hover:border-indigo-500/30 transition-colors"
                            >
                                <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Send Us a Message</h2>
                                <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8">We&apos;ll get back to you within 24 hours.</p>

                                {/* Success Message */}
                                <AnimatePresence mode="wait">
                                    {status === "success" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-start gap-3"
                                            role="alert"
                                            aria-live="polite"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-green-400 font-medium">Message sent successfully!</p>
                                                <p className="text-green-400/70 text-sm">We&apos;ll get back to you within 24 hours.</p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {status === "error" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3"
                                            role="alert"
                                            aria-live="polite"
                                        >
                                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-red-400 font-medium">Failed to send message</p>
                                                <p className="text-red-400/70 text-sm">{errorMessage}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                        <div className="space-y-1 sm:space-y-2">
                                            <label htmlFor="firstName" className="text-xs sm:text-sm font-medium text-slate-300">First Name</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div className="space-y-1 sm:space-y-2">
                                            <label htmlFor="lastName" className="text-xs sm:text-sm font-medium text-slate-300">Last Name <span className="text-slate-500">(optional)</span></label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>


                                    <div className="space-y-1 sm:space-y-2">
                                        <label htmlFor="email" className="text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-2">
                                            Email
                                            {emailStatus === "checking" && (
                                                <LoadingSpinner size="sm" />
                                            )}
                                            {emailStatus === "valid" && (
                                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                            )}
                                            {emailStatus === "neutral" && (
                                                <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-500 flex items-center justify-center">
                                                    <span className="w-1 h-1 bg-slate-500 rounded-full" />
                                                </div>
                                            )}
                                            {emailStatus === "invalid" && (
                                                <XCircle className="w-3.5 h-3.5 text-red-500" />
                                            )}
                                            {emailStatus === "checking" && (
                                                <span className="text-xs text-yellow-400">Verifying...</span>
                                            )}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className={`w-full bg-slate-950/50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none transition-all ${emailStatus === "valid"
                                                    ? "border-2 border-green-500 focus:border-green-500 focus:ring-1 focus:ring-green-500/20"
                                                    : emailStatus === "invalid"
                                                        ? "border-2 border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                                                        : emailStatus === "neutral"
                                                            ? "border-2 border-slate-600 focus:border-slate-500 focus:ring-1 focus:ring-slate-500/20"
                                                            : emailStatus === "checking"
                                                                ? "border-2 border-yellow-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20"
                                                                : "border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                                                    }`}
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                        {emailStatus === "invalid" && emailFeedback && (
                                            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {emailFeedback}
                                            </p>
                                        )}
                                        {emailStatus === "valid" && (
                                            <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" />
                                                {emailFeedback}
                                            </p>
                                        )}
                                        {emailStatus === "neutral" && (
                                            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                                <div className="w-3 h-3 rounded-full border border-slate-500 flex items-center justify-center">
                                                    <span className="w-0.5 h-0.5 bg-slate-500 rounded-full" />
                                                </div>
                                                {emailFeedback}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-1 sm:space-y-2">
                                        <label htmlFor="message" className="text-xs sm:text-sm font-medium text-slate-300">Message</label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-950/50 border border-slate-700 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none"
                                            placeholder="Tell us about your project..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="group relative w-full overflow-hidden rounded-lg sm:rounded-xl disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                        <div className="relative px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center gap-2 text-white font-bold text-sm sm:text-base">
                                            {status === "loading" ? (
                                                <>
                                                    <LoadingSpinner size="sm" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </form>
                            </motion.div>
                        </SpotlightCard>
                    </div>
                </div>
            </SpotlightContainer>

            <Footer />
        </main>
    )
}
