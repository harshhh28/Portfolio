"use client";

import { useState, useRef, useEffect } from "react";
import { triggerRickroll } from "@/components/RickrollEaster";

interface HistoryEntry {
  type: "input" | "output" | "error";
  text: string;
}

const COMMANDS: Record<string, () => string | string[]> = {
  help: () => [
    "available commands:",
    "  whoami      → the human behind the keyboard",
    "  uptime      → system runtime info",
    "  sudo play   → don't ask",
    "  clear       → wipe history",
    "  exit / q    → close terminal",
  ],
  whoami: () => "Harsh Gajjar. Engineer by day, slave by choice.",
  uptime: () => "Running since 2004. Last crash: never.",
  clear: () => "__CLEAR__",
};

function processCommand(raw: string): {
  output: string[];
  action?: "clear" | "exit" | "rickroll";
} {
  const cmd = raw.trim().toLowerCase();
  if (cmd === "exit" || cmd === "q") return { output: [], action: "exit" };
  if (cmd === "sudo play") return { output: ["> loading classified content..."], action: "rickroll" };
  if (cmd === "clear") return { output: [], action: "clear" };
  if (cmd in COMMANDS) {
    const result = COMMANDS[cmd]();
    return { output: Array.isArray(result) ? result : [result] };
  }
  if (cmd === "") return { output: [] };
  return { output: [`command not found: ${raw.trim()}. Try 'help'.`] };
}

const MONO = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";

export default function SidebarTerminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const raw = input;
    setInput("");
    if (!raw.trim()) return;

    const inputEntry: HistoryEntry = { type: "input", text: `$ ${raw}` };
    const { output, action } = processCommand(raw);

    if (action === "clear") { setHistory([]); return; }
    if (action === "exit") { setOpen(false); setHistory([]); return; }

    const outputEntries: HistoryEntry[] = output.map((line) => ({
      type: line.startsWith("command not found") ? "error" : "output",
      text: line,
    }));

    setHistory((prev) => [...prev, inputEntry, ...outputEntries]);

    if (action === "rickroll") {
      setTimeout(() => { setOpen(false); triggerRickroll(); }, 600);
    }
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 border-t border-border">
      {/* Toggle header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-[11px] font-mono text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-colors group"
      >
        <span className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full transition-colors ${open ? "bg-green-500" : "bg-border"}`} />
          TERMINAL
        </span>
        <span className="opacity-40 group-hover:opacity-70 transition-opacity">
          {open ? "▾" : "▸"}
        </span>
      </button>

      {/* Terminal panel */}
      {open && (
        <div
          style={{ fontFamily: MONO }}
          className="border-t border-border bg-[#0a0a0a] flex flex-col"
        >
          {/* History */}
          <div
            className="flex flex-col gap-0.5 px-3 py-2 overflow-y-auto text-[11px] leading-relaxed"
            style={{ maxHeight: "130px", scrollbarWidth: "thin" }}
          >
            {history.length === 0 && (
              <span style={{ color: "#374151" }}>Type a command. Try &apos;help&apos;.</span>
            )}
            {history.map((entry, i) => (
              <div
                key={i}
                style={{
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

          {/* Input row */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-1.5 px-3 py-1.5 border-t border-[#1f2937]"
          >
            <span style={{ color: "#4ade80", fontSize: "0.7rem", flexShrink: 0 }}>$</span>
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
                fontSize: "0.7rem",
                caretColor: "#4ade80",
                minWidth: 0,
              }}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              enterKeyHint="send"
              aria-label="Sidebar terminal input"
              placeholder="help"
            />
            <button
              type="submit"
              aria-label="Run command"
              style={{
                background: "transparent",
                border: "none",
                color: "#4ade80",
                fontFamily: MONO,
                fontSize: "0.8rem",
                cursor: "pointer",
                padding: "0 0.15rem",
                flexShrink: 0,
                opacity: input.trim() ? 1 : 0.25,
                transition: "opacity 0.15s",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              ↵
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
