/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";

// Mock framer-motion
jest.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
        section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <section {...props}>{children}</section>,
        h1: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <h1 {...props}>{children}</h1>,
        p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <p {...props}>{children}</p>,
    },
    useAnimation: () => ({ start: jest.fn() }),
}));

// Mock next/link
jest.mock("next/link", () => ({
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode; href: string }) => (
        <a href={href}>{children}</a>
    ),
}));

import { CTASection } from "../cta-section";

describe("CTASection", () => {
    it("renders the CTA section", () => {
        render(<CTASection />);
        expect(document.querySelector("section")).toBeInTheDocument();
    });

    it("has a heading", () => {
        render(<CTASection />);
        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
    });

    it("has a call-to-action button or link", () => {
        render(<CTASection />);
        const links = screen.getAllByRole("link");
        expect(links.length).toBeGreaterThan(0);
    });

    it("renders descriptive text", () => {
        render(<CTASection />);
        // Should have some descriptive text about getting started
        const text = screen.getByText(/start|contact|get|ready/i);
        expect(text).toBeInTheDocument();
    });
});
