import {
    captureException,
    captureMessage,
    isSentryConfigured,
    captureReactError,
} from "../error-tracking";

describe("Error Tracking", () => {
    let consoleErrorSpy: jest.SpyInstance;
    let consoleWarnSpy: jest.SpyInstance;
    let consoleInfoSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
        consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
        consoleInfoSpy = jest.spyOn(console, "info").mockImplementation();
        jest.spyOn(console, "log").mockImplementation();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("isSentryConfigured", () => {
        it("returns false when DSN is not set", () => {
            // DSN is not set in test environment
            expect(isSentryConfigured()).toBe(false);
        });
    });

    describe("captureException", () => {
        it("logs error to console", () => {
            const error = new Error("Test error");
            captureException(error);

            expect(consoleErrorSpy).toHaveBeenCalled();
        });

        it("logs error with context", () => {
            const error = new Error("Test error");
            captureException(error, { userId: "123", action: "test" });

            expect(consoleErrorSpy).toHaveBeenCalled();
        });

        it("handles non-Error objects", () => {
            captureException("string error");
            expect(consoleErrorSpy).toHaveBeenCalled();
        });

        it("handles null/undefined", () => {
            captureException(null);
            captureException(undefined);
            expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
        });
    });

    describe("captureMessage", () => {
        it("logs info messages", () => {
            captureMessage("Info message", "info");
            expect(consoleInfoSpy).toHaveBeenCalled();
        });

        it("logs warning messages", () => {
            captureMessage("Warning message", "warning");
            expect(consoleWarnSpy).toHaveBeenCalled();
        });

        it("logs error messages", () => {
            captureMessage("Error message", "error");
            expect(consoleErrorSpy).toHaveBeenCalled();
        });

        it("defaults to info level", () => {
            captureMessage("Default message");
            expect(consoleInfoSpy).toHaveBeenCalled();
        });

        it("includes context in log", () => {
            captureMessage("Test", "info", { key: "value" });
            expect(consoleInfoSpy).toHaveBeenCalled();
        });
    });

    describe("captureReactError", () => {
        it("captures React error boundary errors", () => {
            const error = new Error("React render error");
            const errorInfo = { componentStack: "<Component>\n<App>" };

            captureReactError(error, errorInfo);

            expect(consoleErrorSpy).toHaveBeenCalled();
        });
    });
});
