import { supabase, saveContact, getContacts, updateContactStatus, isSupabaseAvailable } from "../supabase";

describe("Supabase Database", () => {
    describe("isSupabaseAvailable", () => {
        it("returns false when not configured", () => {
            // Supabase is not configured in test environment
            expect(isSupabaseAvailable()).toBe(false);
        });
    });

    describe("supabase client", () => {
        it("is null when not configured", () => {
            expect(supabase).toBe(null);
        });
    });

    describe("saveContact", () => {
        it("returns error when database not configured", async () => {
            const result = await saveContact({
                name: "John Doe",
                email: "john@example.com",
                message: "Hello world",
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain("not configured");
        });

        it("accepts optional company field", async () => {
            const result = await saveContact({
                name: "John Doe",
                email: "john@example.com",
                company: "Acme Inc",
                message: "Hello world",
            });

            expect(result.success).toBe(false);
        });

        it("accepts optional metadata fields", async () => {
            const result = await saveContact({
                name: "John Doe",
                email: "john@example.com",
                message: "Hello world",
                ip_address: "127.0.0.1",
                user_agent: "Mozilla/5.0",
            });

            expect(result.success).toBe(false);
        });
    });

    describe("getContacts", () => {
        it("returns empty array when not configured", async () => {
            const result = await getContacts();

            expect(result.success).toBe(false);
            expect(result.data).toEqual([]);
        });

        it("accepts limit parameter", async () => {
            const result = await getContacts(10);

            expect(result.success).toBe(false);
        });
    });

    describe("updateContactStatus", () => {
        it("returns error when not configured", async () => {
            const result = await updateContactStatus("some-id", "read");

            expect(result.success).toBe(false);
        });
    });
});
