/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";

// Mock framer-motion
jest.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
        section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <section {...props}>{children}</section>,
    },
    useMotionValue: () => ({ set: jest.fn(), get: () => 0 }),
    useSpring: (v: number) => v,
    useMotionTemplate: (...args: unknown[]) => args.join(""),
}));

import { Services } from "../services";

describe("Services", () => {
    it("renders the services section", () => {
        render(<Services />);
        const heading = screen.getByRole("heading", { name: /intelligent solutions/i });
        expect(heading).toBeInTheDocument();
    });

    it("renders service cards", () => {
        render(<Services />);
        // Should have AI Voice Bots and Web Development
        expect(screen.getByText(/ai voice bots/i)).toBeInTheDocument();
        expect(screen.getByText(/web development/i)).toBeInTheDocument();
    });

    it("has accessible structure", () => {
        render(<Services />);
        // Should have proper section with ID for navigation
        const section = document.querySelector("#services");
        expect(section).toBeInTheDocument();
    });

    it("renders service descriptions", () => {
        render(<Services />);
        // Check for description content
        expect(screen.getByText(/automate/i)).toBeInTheDocument();
    });
});
