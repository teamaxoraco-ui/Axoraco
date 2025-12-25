/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";

// Mock framer-motion
jest.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
        section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <section {...props}>{children}</section>,
        span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <span {...props}>{children}</span>,
    },
    useAnimation: () => ({ start: jest.fn() }),
    useInView: () => true,
}));

import { Footer } from "../footer";

describe("Footer", () => {
    it("renders the footer", () => {
        render(<Footer />);
        expect(document.querySelector("footer")).toBeInTheDocument();
    });

    it("renders company name", () => {
        render(<Footer />);
        expect(screen.getByText(/axoraco/i)).toBeInTheDocument();
    });

    it("renders copyright notice", () => {
        render(<Footer />);
        const year = new Date().getFullYear().toString();
        expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
    });

    it("renders navigation links", () => {
        render(<Footer />);
        expect(screen.getByText(/about/i)).toBeInTheDocument();
        expect(screen.getByText(/contact/i)).toBeInTheDocument();
    });

    it("renders social media links", () => {
        render(<Footer />);
        // Check for social link presence by looking for external links
        const links = document.querySelectorAll('a[href*="twitter"], a[href*="linkedin"], a[href*="github"], a[href*="x.com"]');
        expect(links.length).toBeGreaterThan(0);
    });

    it("renders legal links", () => {
        render(<Footer />);
        expect(screen.getByText(/privacy/i)).toBeInTheDocument();
        expect(screen.getByText(/terms/i)).toBeInTheDocument();
    });
});
