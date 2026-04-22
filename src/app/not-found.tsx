"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const STACK_TRACE = [
  "curiosity()",
  "clicked_random_link()",
  "trusted_the_url()",
  "page_not_found()  \u2190 YOU ARE HERE",
  "blame_the_intern()",
  "stackoverflow()",
  "give_up()",
];

export default function NotFound() {
  const router = useRouter();

  // Any keypress returns home
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Ignore modifier-only keys
      if (["Shift", "Control", "Alt", "Meta", "Tab", "CapsLock"].includes(e.key)) return;
      router.push("/");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      }}
    >
      <div style={{ maxWidth: "640px", width: "100%" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              backgroundColor: "#e5e7eb",
              color: "#0a0a0a",
              display: "inline-block",
              padding: "0.15rem 0.5rem",
              fontSize: "0.875rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              letterSpacing: "0.05em",
            }}
          >
            KERNEL PANIC — NOT SYNCING
          </div>

          <p style={{ color: "#e5e7eb", fontSize: "0.875rem", lineHeight: "1.6", marginBottom: "0.5rem" }}>
            Oops! A fatal exception{" "}
            <span style={{ color: "#f87171" }}>0x404</span> has occurred at{" "}
            <span style={{ color: "#fbbf24" }}>0x0000:PAGE_NOT_FOUND</span>
          </p>
          <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: "1.6" }}>
            The current page will be terminated.
          </p>
        </div>

        {/* Stack trace */}
        <div
          style={{
            backgroundColor: "#111",
            border: "1px solid #1f2937",
            padding: "1.25rem 1.5rem",
            marginBottom: "2rem",
          }}
        >
          <p style={{ color: "#4ade80", fontSize: "0.75rem", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
            Stack trace:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            {STACK_TRACE.map((line, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem", fontSize: "0.8rem" }}>
                <span style={{ color: "#374151", flexShrink: 0 }}>→</span>
                <span
                  style={{
                    color: line.includes("YOU ARE HERE") ? "#fbbf24" : "#9ca3af",
                    fontWeight: line.includes("YOU ARE HERE") ? "bold" : "normal",
                  }}
                >
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer text */}
        <p style={{ color: "#4b5563", fontSize: "0.75rem", marginBottom: "1.5rem", lineHeight: "1.6" }}>
          Press any key to return home. (Or just click the button, we&apos;re not animals.)
        </p>

        {/* Return button */}
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "0.5rem 1.25rem",
            backgroundColor: "#e5e7eb",
            color: "#0a0a0a",
            fontSize: "0.8rem",
            fontFamily: "inherit",
            fontWeight: "bold",
            letterSpacing: "0.05em",
            textDecoration: "none",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#d1d5db";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#e5e7eb";
          }}
        >
          [ Return to /system ]
        </Link>

        {/* Blinking cursor */}
        <div style={{ marginTop: "2rem", color: "#374151", fontSize: "0.875rem" }}>
          <span style={{ animation: "not-found-blink 1s step-end infinite" }}>█</span>
        </div>
      </div>

      <style>{`
        @keyframes not-found-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
