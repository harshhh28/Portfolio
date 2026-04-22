"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface BootLine {
  prefix: "OK" | "WARN" | "INFO" | "TEXT";
  text: string;
}

const BOOT_LINES: BootLine[] = [
  { prefix: "OK", text: "Mounting /dev/brain..." },
  { prefix: "OK", text: "Loading caffeine dependency (v\u221e)..." },
  { prefix: "OK", text: "Initializing sarcasm module..." },
  { prefix: "WARN", text: "Imposter syndrome detected. Suppressing." },
  { prefix: "OK", text: "Compiling excuses for why it works on my machine..." },
  { prefix: "OK", text: "Starting harsh.gajjar v2026.1.0-HG..." },
];

const WELCOME_LINE = "Welcome. You're in. (Don't touch anything.)";
const STORAGE_KEY = "hg_booted";

function prefixColor(prefix: BootLine["prefix"]): string {
  switch (prefix) {
    case "OK":
      return "#4ade80";
    case "WARN":
      return "#fbbf24";
    default:
      return "#e5e7eb";
  }
}

function prefixLabel(prefix: BootLine["prefix"]): string {
  switch (prefix) {
    case "OK":
      return "[ OK ]";
    case "WARN":
      return "[ WARN ]";
    default:
      return "";
  }
}

export default function BootSequence() {
  const [visible, setVisible] = useState(false);
  const [shownLines, setShownLines] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);
  const skipped = useRef(false);

  const dismiss = useCallback(() => {
    if (skipped.current) return;
    skipped.current = true;
    setFading(true);
    setTimeout(() => {
      setDone(true);
      localStorage.setItem(STORAGE_KEY, "true");
    }, 600);
  }, []);

  useEffect(() => {
    // Only show on first visit
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") return;
    } catch {
      return;
    }

    setVisible(true);

    // Respect prefers-reduced-motion
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      // Skip straight to done
      setShownLines(BOOT_LINES.length);
      setShowWelcome(true);
      setTimeout(dismiss, 800);
      return;
    }

    let lineIndex = 0;
    const LINE_DELAY = 120;

    function printNextLine() {
      if (skipped.current) return;
      lineIndex++;
      setShownLines(lineIndex);

      if (lineIndex < BOOT_LINES.length) {
        setTimeout(printNextLine, LINE_DELAY);
      } else {
        // All lines done — pause then show welcome
        setTimeout(() => {
          if (skipped.current) return;
          setShowWelcome(true);
          // Fade out after 800ms
          setTimeout(dismiss, 800);
        }, 400);
      }
    }

    // Start first line after a brief delay
    const start = setTimeout(printNextLine, 300);
    return () => clearTimeout(start);
  }, [dismiss]);

  if (!visible || done) return null;

  return (
    <div
      aria-live="polite"
      role="status"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "2rem 3rem",
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        transition: "opacity 0.6s ease",
        opacity: fading ? 0 : 1,
      }}
    >
      {/* Boot lines */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        {BOOT_LINES.slice(0, shownLines).map((line, i) => (
          <div key={i} style={{ display: "flex", gap: "0.75rem", fontSize: "0.875rem" }}>
            <span style={{ color: prefixColor(line.prefix), flexShrink: 0, minWidth: "4.5rem" }}>
              {prefixLabel(line.prefix)}
            </span>
            <span style={{ color: "#e5e7eb" }}>{line.text}</span>
          </div>
        ))}
      </div>

      {/* Welcome line */}
      {showWelcome && (
        <div
          style={{
            marginTop: "1.5rem",
            fontSize: "1rem",
            color: "#ffffff",
            letterSpacing: "0.05em",
          }}
        >
          {WELCOME_LINE}
          <span
            style={{
              display: "inline-block",
              width: "0.5em",
              height: "1.1em",
              backgroundColor: "#4ade80",
              marginLeft: "0.25em",
              verticalAlign: "middle",
              animation: "boot-blink 1s step-end infinite",
            }}
          />
        </div>
      )}

      {/* Skip button */}
      <button
        onClick={dismiss}
        style={{
          position: "absolute",
          bottom: "1.5rem",
          right: "1.5rem",
          background: "transparent",
          border: "none",
          color: "#4b5563",
          fontFamily: "inherit",
          fontSize: "0.75rem",
          cursor: "pointer",
          letterSpacing: "0.05em",
          padding: "0.25rem 0.5rem",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#9ca3af";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#4b5563";
        }}
      >
        [ skip ]
      </button>

      <style>{`
        @keyframes boot-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
