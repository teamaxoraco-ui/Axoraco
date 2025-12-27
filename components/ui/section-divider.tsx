"use client"

export function SectionDivider({
    position = "bottom",
    fill = "bg-slate-950",
    height = "h-16 sm:h-24",
    className = ""
}: {
    position?: "top" | "bottom",
    fill?: string,
    height?: string,
    className?: string
}) {
    // Hide entirely on mobile to improve LCP/performance
    return (
        <div className={`absolute left-0 w-full overflow-hidden leading-none z-10 ${position === "top" ? "top-0 rotate-180" : "bottom-0"} ${height} ${className}`}>
            <svg
                className="relative block w-full h-full"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
            >
                <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    className="fill-current text-slate-950"
                    fill="currentColor"
                />
            </svg>
            {/* Subtle glow line */}
            <div className={`absolute left-0 w-full h-px opacity-20 bg-gradient-to-r from-transparent via-indigo-500 to-transparent ${position === "top" ? "bottom-0" : "top-0"}`} />
        </div>
    )
}
