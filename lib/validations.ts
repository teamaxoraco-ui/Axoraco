/**
 * @fileoverview Form validation schemas using Zod.
 * Provides type-safe validation for all forms.
 */

import { z } from "zod";

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be less than 100 characters")
        .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters")
        .transform(s => s.trim()),

    email: z
        .string()
        .email("Please enter a valid email address")
        .max(254, "Email is too long"),

    company: z
        .string()
        .max(100, "Company name must be less than 100 characters")
        .optional(),

    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(5000, "Message must be less than 5000 characters"),
});

/**
 * Newsletter signup schema
 */
export const newsletterSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address")
        .max(254, "Email is too long"),
});

/**
 * Type exports for form data
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;

/**
 * Validate contact form data
 * @returns Validation result with errors or data
 */
export function validateContactForm(data: unknown) {
    return contactFormSchema.safeParse(data);
}

/**
 * Validate newsletter data
 * @returns Validation result with errors or data
 */
export function validateNewsletter(data: unknown) {
    return newsletterSchema.safeParse(data);
}
