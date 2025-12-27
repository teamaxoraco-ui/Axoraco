"use client";

import { CldImage } from "next-cloudinary";

interface OptimizedImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    priority?: boolean;
}

/**
 * Optimized image component using Cloudinary CDN.
 * Automatically optimizes format, compression, and delivery.
 * Falls back to standard image if Cloudinary is not configured.
 */
export function OptimizedImage({
    src,
    alt,
    width,
    height,
    className,
    priority = false,
}: OptimizedImageProps) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    // If Cloudinary is not configured, use a placeholder or fallback
    if (!cloudName) {
        return (
            <div
                className={`bg-gradient-to-br from-slate-800 to-slate-900 ${className}`}
                style={{ width, height }}
                aria-label={alt}
            />
        );
    }

    return (
        <CldImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            priority={priority}
            format="auto"
            quality="auto"
            loading={priority ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
    );
}
