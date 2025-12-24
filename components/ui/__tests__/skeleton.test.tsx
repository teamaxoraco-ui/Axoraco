/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { Skeleton, SkeletonText, SkeletonCard, SkeletonButton } from "../skeleton";

describe("Skeleton Components", () => {
    describe("Skeleton", () => {
        it("renders with default props", () => {
            const { container } = render(<Skeleton />);
            const skeleton = container.firstChild;
            expect(skeleton).toBeInTheDocument();
            expect(skeleton).toHaveAttribute("aria-hidden", "true");
        });

        it("applies circular variant classes", () => {
            const { container } = render(<Skeleton variant="circular" />);
            const skeleton = container.firstChild;
            expect(skeleton).toHaveClass("rounded-full");
        });

        it("applies custom className", () => {
            const { container } = render(<Skeleton className="custom-class" />);
            expect(container.firstChild).toHaveClass("custom-class");
        });

        it("applies width and height styles", () => {
            const { container } = render(<Skeleton width={100} height={50} />);
            const skeleton = container.firstChild as HTMLElement;
            expect(skeleton.style.width).toBe("100px");
            expect(skeleton.style.height).toBe("50px");
        });
    });

    describe("SkeletonText", () => {
        it("renders multiple lines", () => {
            const { container } = render(<SkeletonText lines={3} />);
            const wrapper = container.firstChild as HTMLElement;
            expect(wrapper.children).toHaveLength(3);
        });

        it("defaults to 3 lines", () => {
            const { container } = render(<SkeletonText />);
            const wrapper = container.firstChild as HTMLElement;
            expect(wrapper.children).toHaveLength(3);
        });

        it("has aria-hidden attribute", () => {
            const { container } = render(<SkeletonText />);
            expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
        });
    });

    describe("SkeletonCard", () => {
        it("renders card skeleton", () => {
            const { container } = render(<SkeletonCard />);
            expect(container.firstChild).toBeInTheDocument();
        });

        it("applies custom className", () => {
            const { container } = render(<SkeletonCard className="my-class" />);
            expect(container.firstChild).toHaveClass("my-class");
        });
    });

    describe("SkeletonButton", () => {
        it("renders with default size", () => {
            const { container } = render(<SkeletonButton />);
            const btn = container.firstChild;
            expect(btn).toHaveClass("rounded-full");
        });

        it("applies large size classes", () => {
            const { container } = render(<SkeletonButton size="lg" />);
            expect(container.firstChild).toHaveClass("h-12");
            expect(container.firstChild).toHaveClass("w-36");
        });

        it("applies small size classes", () => {
            const { container } = render(<SkeletonButton size="sm" />);
            expect(container.firstChild).toHaveClass("h-8");
            expect(container.firstChild).toHaveClass("w-20");
        });
    });
});
