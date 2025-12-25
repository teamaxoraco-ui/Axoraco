// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require("next/jest");

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files
    dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
    // Add more setup options before each test is run
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

    // Test environment
    testEnvironment: "jsdom",

    // Module path aliases matching tsconfig
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
    },

    // Test file patterns
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)",
    ],

    // Coverage configuration
    collectCoverageFrom: [
        "app/**/*.{js,jsx,ts,tsx}",
        "components/**/*.{js,jsx,ts,tsx}",
        "lib/**/*.{js,jsx,ts,tsx}",
        "!**/*.d.ts",
        "!**/node_modules/**",
    ],

    // Ignore patterns
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/", "<rootDir>/e2e/"],

    // Transform ignore patterns for Next.js
    transformIgnorePatterns: [
        "/node_modules/",
        "^.+\\.module\\.(css|sass|scss)$",
    ],
};

module.exports = createJestConfig(customJestConfig);
