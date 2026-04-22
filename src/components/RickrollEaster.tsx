"use client";

import { useEffect, useState, useCallback } from "react";

type Phase = "idle" | "loading" | "playing";

const RICKROLL_SRC = "/assets/videos/rickroll.mp4";

export function triggerRickroll() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("rickroll:trigger"));
  }
}

export default function RickrollEaster() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);

  const close = useCallback(() => {
    setPhase("idle");
    setProgress(0);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    function handleTrigger() {
      setPhase("loading");
      setProgress(0);
      document.body.style.overflow = "hidden";
    }

    window.addEventListener("rickroll:trigger", handleTrigger);
    return () => window.removeEventListener("rickroll:trigger", handleTrigger);
  }, []);

  // Fake loading bar
  useEffect(() => {
    if (phase !== "loading") return;

    const TOTAL_MS = 2200;
    const STEPS = 40;
    const interval = TOTAL_MS / STEPS;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setProgress(Math.min(100, Math.round((step / STEPS) * 100)));
      if (step >= STEPS) {
        clearInterval(timer);
        setPhase("playing");
      }
    }, interval);

    return () => clearInterval(timer);
  }, [phase]);

  // Escape to close
  useEffect(() => {
    if (phase === "idle") return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, close]);

  if (phase === "idle") return null;

  const barFilled = Math.round((progress / 100) * 12);
  const barEmpty = 12 - barFilled;
  const bar = `[${"█".repeat(barFilled)}${"░".repeat(barEmpty)}] ${progress}%`;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        overflow: "hidden",
      }}
    >
      {/* CRT scanlines overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
        }}
      />

      {phase === "loading" && (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "3rem",
          }}
        >
          <p style={{ color: "#4ade80", fontSize: "0.875rem", marginBottom: "1rem" }}>
            &gt; Loading classified content...
          </p>
          <p style={{ color: "#4ade80", fontSize: "0.875rem", letterSpacing: "0.05em" }}>
            {bar}
          </p>
        </div>
      )}

      {phase === "playing" && (
        <>
          {/* Rickrolled banner */}
          <div
            style={{
              position: "absolute",
              top: "1rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 3,
              fontFamily: "inherit",
              fontSize: "0.75rem",
              color: "#4ade80",
              letterSpacing: "0.15em",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              textShadow: "0 0 8px #4ade80",
            }}
          >
            {`>> YOU JUST GOT RICKROLLED <<`}
          </div>

          <video
            src={RICKROLL_SRC}
            autoPlay
            loop
            playsInline
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              backgroundColor: "#000",
            }}
          />
        </>
      )}

      {/* ESC label */}
      <button
        onClick={close}
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          zIndex: 3,
          background: "transparent",
          border: "1px solid #374151",
          color: "#6b7280",
          fontFamily: "inherit",
          fontSize: "0.7rem",
          padding: "0.25rem 0.5rem",
          cursor: "pointer",
          letterSpacing: "0.05em",
          transition: "color 0.2s, border-color 0.2s",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.color = "#9ca3af";
          el.style.borderColor = "#6b7280";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.color = "#6b7280";
          el.style.borderColor = "#374151";
        }}
      >
        [ESC to eject]
      </button>
    </div>
  );
}
