"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
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
  whoami: () => "Harsh Gajjar. Engineer by day, comedian by choice.",
  uptime: () =>
    "Running since 1999. Last crash: never (knock on wood).",
  clear: () => "__CLEAR__",
};

function processCommand(raw: string): { output: string[]; action?: "clear" | "exit" | "rickroll" } {
  const cmd = raw.trim().toLowerCase();

  if (cmd === "exit" || cmd === "q") {
    return { output: [], action: "exit" };
  }

  if (cmd === "sudo play") {
    return { output: ["> sudo play: loading classified content..."], action: "rickroll" };
  }

  if (cmd === "clear") {
    return { output: [], action: "clear" };
  }

  if (cmd in COMMANDS) {
    const result = COMMANDS[cmd]();
    const lines = Array.isArray(result) ? result : [result];
    return { output: lines };
  }

  if (cmd === "") {
    return { output: [] };
  }

  return {
    output: [`command not found: ${raw.trim()}. Try 'help'.`],
  };
}

export default function CommandBar() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const close = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, []);

  const openBar = useCallback(() => {
    setOpen(true);
    document.body.style.overflow = "hidden";
    // Focus input on next tick
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  // Listen for `/` keypress globally
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const isEditable =
        tag === "input" || tag === "textarea" || (e.target as HTMLElement)?.isContentEditable;

      if (e.key === "/" && !isEditable && !open) {
        e.preventDefault();
        openBar();
        return;
      }

      if (e.key === "Escape" && open) {
        close();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, openBar, close]);

  // Scroll history to bottom
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const raw = input;
    setInput("");

    if (!raw.trim()) return;

    const inputEntry: HistoryEntry = { type: "input", text: `~/harsh.gajjar $ ${raw}` };

    const { output, action } = processCommand(raw);

    if (action === "clear") {
      setHistory([]);
      return;
    }

    if (action === "exit") {
      close();
      return;
    }

    const outputEntries: HistoryEntry[] = output.map((line) => ({
      type: line.startsWith("command not found") ? "error" : "output",
      text: line,
    }));

    setHistory((prev) => [...prev, inputEntry, ...outputEntries]);

    if (action === "rickroll") {
      setTimeout(() => {
        close();
        triggerRickroll();
      }, 600);
    }
  }

  if (!open) {
    return (
      <div
        aria-hidden
        style={{
          position: "fixed",
          bottom: "1rem",
          left: "1rem",
          zIndex: 40,
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          fontSize: "0.65rem",
          color: "#374151",
          letterSpacing: "0.05em",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        [ press / to open terminal ]
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Terminal command bar"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        style={{
          width: "min(680px, 95vw)",
          maxHeight: "60vh",
          backgroundColor: "#111",
          border: "1px solid #1f2937",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.5rem 0.75rem",
            borderBottom: "1px solid #1f2937",
            backgroundColor: "#0d0d0d",
          }}
        >
          <span style={{ color: "#4b5563", fontSize: "0.7rem", letterSpacing: "0.05em" }}>
            harsh.gajjar — terminal
          </span>
          <button
            onClick={close}
            style={{
              background: "transparent",
              border: "none",
              color: "#4b5563",
              cursor: "pointer",
              fontSize: "0.75rem",
              fontFamily: "inherit",
              padding: "0 0.25rem",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* History */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0.75rem 1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.2rem",
            minHeight: "120px",
          }}
        >
          {history.length === 0 && (
            <span style={{ color: "#374151", fontSize: "0.75rem" }}>
              Type a command. Try &apos;help&apos; if you&apos;re lost.
            </span>
          )}
          {history.map((entry, i) => (
            <div
              key={i}
              style={{
                fontSize: "0.8rem",
                lineHeight: "1.5",
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

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            borderTop: "1px solid #1f2937",
            backgroundColor: "#0d0d0d",
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
              fontFamily: "inherit",
              fontSize: "0.8rem",
              caretColor: "#4ade80",
            }}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder=""
            aria-label="Terminal input"
          />
        </form>
      </div>
    </div>
  );
}
