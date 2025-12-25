/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";

// Mock next/navigation
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
    }),
    usePathname: () => "/",
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
        nav: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <nav {...props}>{children}</nav>,
        span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <span {...props}>{children}</span>,
        button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <button {...props}>{children}</button>,
    },
    AnimatePresence: ({ children }: React.PropsWithChildren) => children,
    useAnimation: () => ({ start: jest.fn() }),
}));

import { Navbar } from "../navbar";

describe("Navbar", () => {
    it("renders the logo", () => {
        render(<Navbar />);
        expect(screen.getByText("AXORACO")).toBeInTheDocument();
    });

    it("renders navigation links", () => {
        render(<Navbar />);
        expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("has accessible logo link", () => {
        render(<Navbar />);
        const logo = screen.getByRole("link", { name: /axoraco home/i });
        expect(logo).toHaveAttribute("href", "/");
    });

    it("renders Get Started button", () => {
        render(<Navbar />);
        const ctaButtons = screen.getAllByText(/get started/i);
        expect(ctaButtons.length).toBeGreaterThan(0);
    });

    it("has mobile menu toggle button", () => {
        render(<Navbar />);
        const menuButton = screen.getByRole("button", { name: /toggle menu/i });
        expect(menuButton).toBeInTheDocument();
    });

    it("mobile menu button has correct aria attributes", () => {
        render(<Navbar />);
        const menuButton = screen.getByRole("button", { name: /toggle menu/i });
        expect(menuButton).toHaveAttribute("aria-expanded");
    });
});
