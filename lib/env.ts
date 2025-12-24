/**
 * @fileoverview Environment variable validation using Zod.
 * Validates required environment variables at build/runtime.
 */

import { z } from "zod";

/**
 * Schema for environment variables
 */
const envSchema = z.object({
    // Site URL
    NEXT_PUBLIC_SITE_URL: z
        .string()
        .url()
        .default("https://axoraco.vercel.app"),

    // Analytics (optional)
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
    NEXT_PUBLIC_GTM_CONTAINER_ID: z.string().optional(),

    // Discord webhook (required for contact form)
    DISCORD_CONTACT_WEBHOOK_URL: z.string().url().optional(),
});

/**
 * Validated environment variables
 */
export const env = envSchema.parse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_GTM_CONTAINER_ID: process.env.NEXT_PUBLIC_GTM_CONTAINER_ID,
    DISCORD_CONTACT_WEBHOOK_URL: process.env.DISCORD_CONTACT_WEBHOOK_URL,
});

/**
 * Type-safe environment variable access
 */
export type Env = z.infer<typeof envSchema>;
