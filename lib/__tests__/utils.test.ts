import { cn } from "../utils";

describe("Utils", () => {
    describe("cn (classname merge)", () => {
        it("merges class names", () => {
            expect(cn("foo", "bar")).toBe("foo bar");
        });

        it("handles undefined values", () => {
            expect(cn("foo", undefined, "bar")).toBe("foo bar");
        });

        it("handles null values", () => {
            expect(cn("foo", null, "bar")).toBe("foo bar");
        });

        it("handles boolean conditions", () => {
            const truthy = true;
            const falsy = false;
            expect(cn("foo", truthy && "bar", falsy && "baz")).toBe("foo bar");
        });

        it("deduplicates Tailwind classes", () => {
            // tailwind-merge should handle conflicting classes
            expect(cn("p-4", "p-8")).toBe("p-8");
        });

        it("handles arrays", () => {
            expect(cn(["foo", "bar"])).toBe("foo bar");
        });

        it("handles empty input", () => {
            expect(cn()).toBe("");
        });

        it("handles complex combinations", () => {
            const truthy = true;
            const falsy = false;
            const result = cn(
                "base-class",
                truthy && "conditional-true",
                falsy && "conditional-false",
                undefined,
                { "object-true": true, "object-false": false },
                ["array-1", "array-2"]
            );
            expect(result).toContain("base-class");
            expect(result).toContain("conditional-true");
            expect(result).not.toContain("conditional-false");
            expect(result).toContain("object-true");
            expect(result).not.toContain("object-false");
        });
    });
});
