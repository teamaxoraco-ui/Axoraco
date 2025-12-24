"use client"

import { Component, ReactNode } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorWrapperProps {
    children: ReactNode
    /** Fallback UI to show when error occurs */
    fallback?: ReactNode
    /** Section name for error reporting */
    sectionName?: string
    /** Callback when error is caught */
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorWrapperState {
    hasError: boolean
    error: Error | null
}

/**
 * Reusable ErrorBoundary wrapper for sections.
 * Provides graceful error handling with a fallback UI.
 * 
 * @example
 * <ErrorWrapper sectionName="Hero">
 *   <Hero />
 * </ErrorWrapper>
 * 
 * @example
 * <ErrorWrapper fallback={<CustomFallback />}>
 *   <ComplexComponent />
 * </ErrorWrapper>
 */
export class ErrorWrapper extends Component<ErrorWrapperProps, ErrorWrapperState> {
    constructor(props: ErrorWrapperProps) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): ErrorWrapperState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error(`Error in ${this.props.sectionName || "component"}:`, error, errorInfo)
        this.props.onError?.(error, errorInfo)
    }

    handleReset = (): void => {
        this.setState({ hasError: false, error: null })
    }

    render(): ReactNode {
        if (this.state.hasError) {
            // Custom fallback takes priority
            if (this.props.fallback) {
                return this.props.fallback
            }

            // Default fallback UI
            return (
                <div className="w-full py-12 px-6">
                    <div className="max-w-md mx-auto text-center">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-amber-500" aria-hidden="true" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                            {this.props.sectionName
                                ? `Failed to load ${this.props.sectionName}`
                                : "Something went wrong"}
                        </h3>
                        <p className="text-slate-400 text-sm mb-4">
                            This section couldn&apos;t load properly. Please try again.
                        </p>
                        <button
                            onClick={this.handleReset}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
                            aria-label="Retry loading this section"
                        >
                            <RefreshCw className="w-4 h-4" aria-hidden="true" />
                            Try Again
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

/**
 * Higher-order component to wrap any component with error boundary
 * 
 * @example
 * const SafeHero = withErrorBoundary(Hero, "Hero Section")
 */
export function withErrorBoundary<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    sectionName?: string
) {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component"

    const WithErrorBoundary = (props: P) => (
        <ErrorWrapper sectionName={sectionName || displayName}>
            <WrappedComponent {...props} />
        </ErrorWrapper>
    )

    WithErrorBoundary.displayName = `WithErrorBoundary(${displayName})`
    return WithErrorBoundary
}
