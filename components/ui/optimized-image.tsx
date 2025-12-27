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

    // If Cloudinary is not configured, fallback to Next.js Image
    if (!cloudName) {
        return (
            <div className={className} style={{ position: 'relative', width, height }}>
                <img
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className="w-full h-full object-cover"
                    loading={priority ? "eager" : "lazy"}
                />
            </div>
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
