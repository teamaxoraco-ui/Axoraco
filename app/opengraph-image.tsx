import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Axoraco - AI Voice Bots & Web Development";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#020617",
                    backgroundImage:
                        "radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
                }}
            >
                {/* Gradient orbs */}
                <div
                    style={{
                        position: "absolute",
                        top: "10%",
                        left: "10%",
                        width: "400px",
                        height: "400px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.2))",
                        filter: "blur(80px)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "10%",
                        right: "10%",
                        width: "300px",
                        height: "300px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(99, 102, 241, 0.2))",
                        filter: "blur(60px)",
                    }}
                />

                {/* Logo/Brand */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <h1
                        style={{
                            fontSize: 80,
                            fontWeight: 900,
                            background: "linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)",
                            backgroundClip: "text",
                            color: "transparent",
                            letterSpacing: "-0.05em",
                            marginBottom: 20,
                        }}
                    >
                        AXORACO
                    </h1>

                    <p
                        style={{
                            fontSize: 32,
                            color: "#94a3b8",
                            textAlign: "center",
                            maxWidth: "800px",
                            lineHeight: 1.4,
                        }}
                    >
                        AI Voice Bots & Web Development
                    </p>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            marginTop: 40,
                        }}
                    >
                        <div
                            style={{
                                padding: "12px 24px",
                                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                                borderRadius: 999,
                                color: "white",
                                fontSize: 20,
                                fontWeight: 600,
                            }}
                        >
                            Automating Reality
                        </div>
                        <div
                            style={{
                                padding: "12px 24px",
                                background: "rgba(255,255,255,0.1)",
                                borderRadius: 999,
                                color: "#e2e8f0",
                                fontSize: 20,
                                fontWeight: 500,
                                border: "1px solid rgba(255,255,255,0.2)",
                            }}
                        >
                            Elevating Business
                        </div>
                    </div>
                </div>

                {/* Bottom tagline */}
                <p
                    style={{
                        position: "absolute",
                        bottom: 40,
                        fontSize: 18,
                        color: "#64748b",
                    }}
                >
                    axoraco.com
                </p>
            </div>
        ),
        {
            ...size,
        }
    );
}
