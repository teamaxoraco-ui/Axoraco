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

                <h1
                    style={{
                        fontSize: 80,
                        fontWeight: 900,
                        background: "linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)",
                        backgroundClip: "text",
                        color: "transparent",
                        letterSpacing: "-0.05em",
                    }}
                >
                    AXORACO
                </h1>

                <p
                    style={{
                        fontSize: 32,
                        color: "#94a3b8",
                    }}
                >
                    AI Voice Bots & Web Development
                </p>
            </div>
        ),
        { ...size }
    );
}
