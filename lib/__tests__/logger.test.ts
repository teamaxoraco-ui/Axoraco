import { logger } from "../logger";

describe("Logger", () => {
    let consoleSpy: {
        debug: jest.SpyInstance;
        info: jest.SpyInstance;
        warn: jest.SpyInstance;
        error: jest.SpyInstance;
        log: jest.SpyInstance;
    };

    beforeEach(() => {
        consoleSpy = {
            debug: jest.spyOn(console, "debug").mockImplementation(),
            info: jest.spyOn(console, "info").mockImplementation(),
            warn: jest.spyOn(console, "warn").mockImplementation(),
            error: jest.spyOn(console, "error").mockImplementation(),
            log: jest.spyOn(console, "log").mockImplementation(),
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("info", () => {
        it("logs info messages", () => {
            logger.info("Test message");
            expect(consoleSpy.info).toHaveBeenCalled();
        });

        it("includes context in log", () => {
            logger.info("Test message", { userId: "123" });
            expect(consoleSpy.info).toHaveBeenCalled();
            const logCall = consoleSpy.info.mock.calls[0][0];
            expect(logCall).toContain("Test message");
        });
    });

    describe("warn", () => {
        it("logs warn messages", () => {
            logger.warn("Warning message");
            expect(consoleSpy.warn).toHaveBeenCalled();
        });
    });

    describe("error", () => {
        it("logs error messages", () => {
            logger.error("Error message");
            expect(consoleSpy.error).toHaveBeenCalled();
        });

        it("includes error object details", () => {
            const testError = new Error("Test error");
            logger.error("Something failed", {}, testError);
            expect(consoleSpy.error).toHaveBeenCalled();
            const logCall = consoleSpy.error.mock.calls[0][0];
            expect(logCall).toContain("Something failed");
        });
    });

    describe("apiRequest", () => {
        it("logs API requests", () => {
            logger.apiRequest("POST", "/api/contact", 200, 45);
            expect(consoleSpy.log).toHaveBeenCalled();
            const logCall = consoleSpy.log.mock.calls[0][0];
            expect(logCall).toContain("POST");
            expect(logCall).toContain("/api/contact");
            expect(logCall).toContain("200");
        });

        it("logs with context", () => {
            logger.apiRequest("GET", "/api/test", 404, 12, { userId: "test" });
            expect(consoleSpy.log).toHaveBeenCalled();
        });
    });
});
