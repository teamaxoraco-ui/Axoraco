import {
    debounce,
    throttle,
    prefersReducedMotion,
    isSlowConnection,
    imageLoadingProps,
} from "../performance";

describe("Performance Utilities", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe("debounce", () => {
        it("delays function execution", () => {
            const fn = jest.fn();
            const debouncedFn = debounce(fn, 100);

            debouncedFn();
            expect(fn).not.toHaveBeenCalled();

            jest.advanceTimersByTime(100);
            expect(fn).toHaveBeenCalledTimes(1);
        });

        it("cancels previous calls", () => {
            const fn = jest.fn();
            const debouncedFn = debounce(fn, 100);

            debouncedFn();
            debouncedFn();
            debouncedFn();

            jest.advanceTimersByTime(100);
            expect(fn).toHaveBeenCalledTimes(1);
        });

        it("passes arguments correctly", () => {
            const fn = jest.fn();
            const debouncedFn = debounce(fn, 100);

            debouncedFn("arg1", "arg2");
            jest.advanceTimersByTime(100);

            expect(fn).toHaveBeenCalledWith("arg1", "arg2");
        });
    });

    describe("throttle", () => {
        it("executes immediately on first call", () => {
            const fn = jest.fn();
            const throttledFn = throttle(fn, 100);

            throttledFn();
            expect(fn).toHaveBeenCalledTimes(1);
        });

        it("ignores calls within throttle period", () => {
            const fn = jest.fn();
            const throttledFn = throttle(fn, 100);

            throttledFn();
            throttledFn();
            throttledFn();

            expect(fn).toHaveBeenCalledTimes(1);
        });

        it("allows calls after throttle period", () => {
            const fn = jest.fn();
            const throttledFn = throttle(fn, 100);

            throttledFn();
            jest.advanceTimersByTime(100);
            throttledFn();

            expect(fn).toHaveBeenCalledTimes(2);
        });
    });

    describe("prefersReducedMotion", () => {
        it("returns false on server", () => {
            const originalWindow = global.window;
            // @ts-expect-error - intentionally undefined for test
            delete global.window;

            expect(prefersReducedMotion()).toBe(false);

            global.window = originalWindow;
        });
    });

    describe("isSlowConnection", () => {
        it("returns false when navigator unavailable", () => {
            const originalNavigator = global.navigator;
            // @ts-expect-error - intentionally undefined for test
            delete global.navigator;

            expect(isSlowConnection()).toBe(false);

            global.navigator = originalNavigator;
        });
    });

    describe("imageLoadingProps", () => {
        it("has lazy loading props", () => {
            expect(imageLoadingProps.lazy.loading).toBe("lazy");
            expect(imageLoadingProps.lazy.decoding).toBe("async");
        });

        it("has eager loading props", () => {
            expect(imageLoadingProps.eager.loading).toBe("eager");
            expect(imageLoadingProps.eager.fetchPriority).toBe("high");
        });
    });
});
