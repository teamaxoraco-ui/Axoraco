// Jest setup file
// Add custom matchers and global setup for tests

import "@testing-library/jest-dom";

// Mock window.matchMedia for tests that use it
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

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

// Mock next/server for API route tests
jest.mock("next/server", () => {
    const originalModule = jest.requireActual("next/server");
    return {
        ...originalModule,
        NextRequest: class MockNextRequest extends Request {
            constructor(input, init) {
                super(input, init);
                this.nextUrl = new URL(input);
            }
        },
    };
});

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
