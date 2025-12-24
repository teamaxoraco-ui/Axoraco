// Jest setup file
// Add custom matchers and global setup for tests

import "@testing-library/jest-dom";

// Mock next/navigation
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn(),
            back: jest.fn(),
            forward: jest.fn(),
        };
    },
    usePathname() {
        return "/";
    },
    useSearchParams() {
        return new URLSearchParams();
    },
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }) => <div {...props}>{children}</div>,
        span: ({ children, ...props }) => <span {...props}>{children}</span>,
        button: ({ children, ...props }) => <button {...props}>{children}</button>,
        a: ({ children, ...props }) => <a {...props}>{children}</a>,
        nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
        section: ({ children, ...props }) => <section {...props}>{children}</section>,
        main: ({ children, ...props }) => <main {...props}>{children}</main>,
        h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
        h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
        p: ({ children, ...props }) => <p {...props}>{children}</p>,
    },
    AnimatePresence: ({ children }) => children,
    useMotionValue: () => ({
        set: jest.fn(),
        get: () => 0,
    }),
    useSpring: (value) => value,
    useMotionTemplate: (...args) => args.join(""),
}));

// Suppress console warnings in tests
const originalWarn = console.warn;
beforeAll(() => {
    console.warn = (...args) => {
        if (
            typeof args[0] === "string" &&
            args[0].includes("ReactDOM.render is no longer supported")
        ) {
            return;
        }
        originalWarn.apply(console, args);
    };
});

afterAll(() => {
    console.warn = originalWarn;
});
