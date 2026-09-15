import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const palette = {
  bg: "#FAFAF7",
  text: "#1B1B18",
  muted: "#5C5C56",
  border: "#E7E6DF",
  accent: "#3B5B7A",
};

export function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: palette.bg,
          color: palette.text,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: palette.muted }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              background: palette.accent,
              marginRight: 16,
            }}
          />
          {eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: title.length > 60 ? 60 : 76,
              fontWeight: 700,
              letterSpacing: -1.5,
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ fontSize: 32, color: palette.muted, marginTop: 24, lineHeight: 1.35 }}>
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `2px solid ${palette.border}`,
            paddingTop: 28,
            fontSize: 24,
            color: palette.muted,
          }}
        >
          <span>Harsh Gajjar</span>
          <span style={{ color: palette.accent }}>harshgajjar.dev</span>
        </div>
      </div>
    ),
    ogSize
  );
}
