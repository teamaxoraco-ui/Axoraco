/**
 * Design System Constants
 * Central source of truth for all "magic numbers" in the UI.
 * Used to maintain consistency across effects, particles, and layout.
 */

export const DESIGN_SYSTEM = {
    HERO: {
        BLOB_1: { WIDTH: "800px", HEIGHT: "400px", BLUR: "60px" },
        BLOB_2: { WIDTH: "600px", HEIGHT: "400px", BLUR: "800px" },
        BLOB_3: { WIDTH: "500px", HEIGHT: "500px", BLUR: "100px" },
        MOBILE_BLOB: { WIDTH: "800px", HEIGHT: "400px", BLUR: "60px" },
        PERSPECTIVE: "1000px",
        GRID_SIZE: "60px 60px",
    },
    SPOTLIGHT: {
        SIZE_DEFAULT: "600px",
        SIZE_LARGE: "800px",
        OPACITY_DEFAULT: 0.15,
        OPACITY_LARGE: 0.5,
    },
    EFFECTS: {
        BLUR_SM: "10px",
        BLUR_MD: "24px",
        BLUR_LG: "60px",
        BLUR_XL: "100px",
        BLUR_2XL: "120px",
    },
    SIZING: {
        TESTIMONIAL_BLOB: { WIDTH: "800px", HEIGHT: "400px" },
        PROCESS_BLOB: { WIDTH: "600px", HEIGHT: "600px" },
    }
} as const;
