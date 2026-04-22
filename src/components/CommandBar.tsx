"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { triggerRickroll } from "./RickrollEaster";

interface HistoryEntry {
  type: "input" | "output" | "error";
  text: string;
}

const COMMANDS: Record<string, () => string | string[]> = {
  help: () => [
    "Available commands:",
    "  help        → shows this message (how meta)",
    "  whoami      → reveals the human behind the keyboard",
    "  uptime      → checks system runtime (spoiler: it's long)",
    "  sudo play   → plays something. don't ask.",
    "  clear       → wipes the slate clean. a fresh start.",
    "  exit / q    → closes this terminal (boring choice)",
  ],
  whoami: () => "Harsh Gajjar. Engineer by day, slave by choice.",
  uptime: () => "Running since 2004. Last crash: never (knock on wood).",
  clear: () => "__CLEAR__",
};

function processCommand(raw: string): {
  output: string[];
  action?: "clear" | "exit" | "rickroll";
} {
  const cmd = raw.trim().toLowerCase();

  if (cmd === "exit" || cmd === "q") return { output: [], action: "exit" };
  if (cmd === "sudo play") return { output: ["> sudo play: loading classified content..."], action: "rickroll" };
  if (cmd === "clear") return { output: [], action: "clear" };

  if (cmd in COMMANDS) {
    const result = COMMANDS[cmd]();
    return { output: Array.isArray(result) ? result : [result] };
  }

  if (cmd === "") return { output: [] };

  return { output: [`command not found: ${raw.trim()}. Try 'help'.`] };
}

// Detects if we're on a "desktop" viewport (≥ 640px wide).
// Returns null during SSR/hydration to avoid layout flash.
function useIsDesktop(): boolean | null {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

const MONO =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";

const QUICK_CMDS = ["help", "whoami", "uptime", "sudo play", "clear", "exit"];

export default function CommandBar() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  const close = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, []);

  const openBar = useCallback(() => {
    setOpen(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  // "/" key shortcut (desktop keyboards / physical keyboards on mobile)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const isEditable =
        tag === "input" ||
        tag === "textarea" ||
        (e.target as HTMLElement)?.isContentEditable;

      if (e.key === "/" && !isEditable && !open) {
        e.preventDefault();
        openBar();
        return;
      }
      if (e.key === "Escape" && open) close();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, openBar, close]);

  // Auto-scroll history
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const raw = input;
    setInput("");
    if (!raw.trim()) return;

    const inputEntry: HistoryEntry = {
      type: "input",
      text: `~/harsh.gajjar $ ${raw}`,
    };
    const { output, action } = processCommand(raw);

    if (action === "clear") { setHistory([]); return; }
    if (action === "exit") { close(); return; }

    const outputEntries: HistoryEntry[] = output.map((line) => ({
      type: line.startsWith("command not found") ? "error" : "output",
      text: line,
    }));

    setHistory((prev) => [...prev, inputEntry, ...outputEntries]);

    if (action === "rickroll") {
      setTimeout(() => { close(); triggerRickroll(); }, 600);
    }
  }

  // ── Closed state hint ──────────────────────────────────────────────────────
  if (!open) {
    return (
      <button
        onClick={openBar}
        aria-label="Open terminal"
        style={{
          position: "fixed",
          bottom: "1rem",
          left: "1rem",
          zIndex: 40,
          fontFamily: MONO,
          fontSize: "0.65rem",
          color: "#374151",
          letterSpacing: "0.05em",
          userSelect: "none",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          // Generous tap target without shifting the visual text
          padding: "0.5rem 0.6rem",
          margin: "-0.5rem -0.6rem",
          lineHeight: 1,
          WebkitTapHighlightColor: "transparent",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#6b7280"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#374151"; }}
      >
        [ press / to open terminal ]
      </button>
    );
  }

  // ── Shared panel styles, branching on isDesktop ───────────────────────────
  // isDesktop is null on first render — default to mobile layout to avoid flash
  const desktop = isDesktop === true;

  const backdropStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 9000,
    display: "flex",
    alignItems: desktop ? "center" : "flex-end",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    backdropFilter: "blur(4px)",
  };

  const panelStyle: React.CSSProperties = {
    width: desktop ? "min(680px, 90vw)" : "100vw",
    maxHeight: desktop ? "60vh" : "80vh",
    backgroundColor: "#111",
    border: "1px solid #1f2937",
    borderBottom: desktop ? "1px solid #1f2937" : "none",
    borderRadius: desktop ? "6px" : "12px 12px 0 0",
    display: "flex",
    flexDirection: "column",
    fontFamily: MONO,
    boxShadow: desktop
      ? "0 25px 60px rgba(0,0,0,0.8)"
      : "0 -8px 40px rgba(0,0,0,0.6)",
    overflow: "hidden",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Terminal command bar"
      style={backdropStyle}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div style={panelStyle} onClick={(e) => e.stopPropagation()}>

        {/* ── Title bar ────────────────────────────────────────────────────── */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: desktop ? "0.5rem 0.75rem" : "0.65rem 0.75rem",
            borderBottom: "1px solid #1f2937",
            backgroundColor: "#0d0d0d",
            flexShrink: 0,
          }}
        >
          {/* Drag handle — mobile only */}
          {!desktop && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "0.45rem",
                left: "50%",
                transform: "translateX(-50%)",
                width: "2rem",
                height: "3px",
                borderRadius: "2px",
                backgroundColor: "#374151",
              }}
            />
          )}

          <span style={{ color: "#4b5563", fontSize: "0.7rem", letterSpacing: "0.05em" }}>
            harsh.gajjar — terminal
          </span>

          {/* Desktop: keyboard shortcut hint */}
          {desktop && (
            <span style={{ color: "#374151", fontSize: "0.65rem", letterSpacing: "0.05em" }}>
              esc to close
            </span>
          )}

          <button
            onClick={close}
            aria-label="Close terminal"
            style={{
              background: "transparent",
              border: "none",
              color: "#4b5563",
              cursor: "pointer",
              fontSize: desktop ? "0.75rem" : "0.9rem",
              fontFamily: "inherit",
              padding: desktop ? "0 0.25rem" : "0.25rem 0.4rem",
              lineHeight: 1,
              WebkitTapHighlightColor: "transparent",
            }}
          >
            ✕
          </button>
        </div>

        {/* ── History ───────────────────────────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0.75rem 1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.2rem",
            minHeight: desktop ? "140px" : "100px",
          }}
        >
          {history.length === 0 && (
            <span style={{ color: "#374151", fontSize: "0.75rem" }}>
              {desktop
                ? "Type a command and press Enter. Try 'help'."
                : "Tap a command below or type one. Try 'help'."}
            </span>
          )}
          {history.map((entry, i) => (
            <div
              key={i}
              style={{
                fontSize: "0.8rem",
                lineHeight: "1.6",
                color:
                  entry.type === "input"
                    ? "#e5e7eb"
                    : entry.type === "error"
                    ? "#f87171"
                    : "#6b7280",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {entry.text}
            </div>
          ))}
          <div ref={historyEndRef} />
        </div>

        {/* ── Quick-command chips ───────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            gap: "0.4rem",
            padding: "0.4rem 0.75rem",
            overflowX: "auto",
            borderTop: "1px solid #1f2937",
            backgroundColor: "#0d0d0d",
            flexShrink: 0,
            scrollbarWidth: "none",
          }}
        >
          {QUICK_CMDS.map((cmd) => (
            <button
              key={cmd}
              onPointerDown={(e) => {
                e.preventDefault();
                setInput(cmd);
                setTimeout(() => inputRef.current?.focus(), 0);
              }}
              style={{
                flexShrink: 0,
                background: "#1a1a1a",
                border: "1px solid #1f2937",
                borderRadius: "3px",
                color: "#6b7280",
                fontFamily: MONO,
                fontSize: "0.65rem",
                padding: desktop ? "0.2rem 0.5rem" : "0.3rem 0.6rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
                WebkitTapHighlightColor: "transparent",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = "#9ca3af";
                el.style.borderColor = "#374151";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = "#6b7280";
                el.style.borderColor = "#1f2937";
              }}
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* ── Input row ────────────────────────────────────────────────────── */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: desktop ? "0.5rem 1rem" : "0.6rem 1rem",
            borderTop: "1px solid #1f2937",
            backgroundColor: "#0d0d0d",
            flexShrink: 0,
          }}
        >
          <span style={{ color: "#4ade80", fontSize: "0.8rem", flexShrink: 0 }}>
            ~/harsh.gajjar $
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#e5e7eb",
              fontFamily: MONO,
              // 16px prevents iOS auto-zoom; desktop uses 0.8rem to match history text
              fontSize: desktop ? "0.8rem" : "16px",
              caretColor: "#4ade80",
            }}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="send"
            aria-label="Terminal input"
          />
          {/* ↵ submit — always visible, more useful on mobile */}
          <button
            type="submit"
            aria-label="Run command"
            style={{
              background: "transparent",
              border: "none",
              color: "#4ade80",
              fontFamily: MONO,
              fontSize: "0.9rem",
              cursor: "pointer",
              padding: "0.25rem 0.3rem",
              flexShrink: 0,
              opacity: input.trim() ? 1 : 0.3,
              transition: "opacity 0.15s",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            ↵
          </button>
        </form>
      </div>
    </div>
  );
}
