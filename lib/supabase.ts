/**
 * @fileoverview Supabase client for database operations.
 * 
 * Setup:
 * 1. Create account at supabase.com (free tier: 500MB database)
 * 2. Create a new project
 * 3. Go to Project Settings > API
 * 4. Copy the Project URL and anon public key
 * 
 * Database Schema (run in SQL Editor):
 * 
 * ```sql
 * CREATE TABLE contacts (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   name TEXT NOT NULL,
 *   email TEXT NOT NULL,
 *   company TEXT,
 *   message TEXT NOT NULL,
 *   ip_address TEXT,
 *   user_agent TEXT,
 *   created_at TIMESTAMPTZ DEFAULT NOW(),
 *   status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived'))
 * );
 * 
 * -- Enable Row Level Security
 * ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
 * 
 * -- Create index for faster queries
 * CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
 * CREATE INDEX idx_contacts_email ON contacts(email);
 * ```
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";

// Check if Supabase is configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

// Create Supabase client (only if configured)
// On server side, this will use the Service Role Key if provided (bypassing RLS)
// On client side, this will use the Anon Key
export const supabase: SupabaseClient | null = isSupabaseConfigured
    ? createClient(supabaseUrl!, supabaseKey!)
    : null;

// Types
export interface Contact {
    id?: string;
    name: string;
    email: string;
    company?: string;
    message: string;
    ip_address?: string;
    user_agent?: string;
    created_at?: string;
    status?: "new" | "read" | "replied" | "archived";
}

export interface ContactResult {
    success: boolean;
    id?: string;
    error?: string;
}

/**
 * Save a contact form submission to the database
 * 
 * @param contact - Contact form data
 * @returns Result with success status and contact ID
 */
export async function saveContact(contact: Contact): Promise<ContactResult> {
    if (!supabase) {
        logger.warn("Supabase not configured - contact not saved to database");
        return { success: false, error: "Database not configured" };
    }

    try {
        const { data, error } = await supabase
            .from("contacts")
            .insert([contact])
            .select("id")
            .single();

        if (error) {
            logger.error("Failed to save contact", { error: error.message });
            return { success: false, error: error.message };
        }

        return { success: true, id: data.id };
    } catch (error) {
        logger.error("Supabase error", {}, error as Error);
        return { success: false, error: "Database error" };
    }
}

/**
 * Get all contacts (for admin dashboard)
 */
export async function getContacts(limit: number = 50) {
    if (!supabase) {
        return { success: false, data: [], error: "Database not configured" };
    }

    const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) {
        return { success: false, data: [], error: error.message };
    }

    return { success: true, data: data || [] };
}

/**
 * Update contact status
 */
export async function updateContactStatus(
    id: string,
    status: Contact["status"]
): Promise<ContactResult> {
    if (!supabase) {
        return { success: false, error: "Database not configured" };
    }

    const { error } = await supabase
        .from("contacts")
        .update({ status })
        .eq("id", id);

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, id };
}

/**
 * Check if Supabase is available
 */
export function isSupabaseAvailable(): boolean {
    return isSupabaseConfigured && supabase !== null;
}
