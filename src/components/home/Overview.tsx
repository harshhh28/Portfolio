"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const CHANGELOG = [
  { version: "v1.3", text: "Learned to love observability (still lying)" },
  { version: "v1.2", text: "Stopped overengineering. Mostly." },
  { version: "v1.1", text: "Broke prod, fixed prod, blamed DNS" },
  { version: "v1.0", text: "Shipped first feature. It worked once." },
  { version: "v0.9", text: 'Discovered that "it works on my machine" is a valid deploy strategy' },
  { version: "v0.5", text: "Read the docs. Understood 40% of them." },
  { version: "v0.2", text: "Hello World worked. Cried tears of joy." },
  { version: "v0.0.1-alpha", text: "Born. Latency: 9 months. First bug report: immediate." },
];

type CpuState = "normal" | "critical";

const Overview = () => {
  const [cpuState, setCpuState] = useState<CpuState>("normal");
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) return;

    // Spike every 8 seconds: critical for 1.5s, then back to normal
    const cycle = setInterval(() => {
      setCpuState("critical");
      setTimeout(() => setCpuState("normal"), 1500);
    }, 8000);

    return () => clearInterval(cycle);
  }, []);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 fade-in duration-500">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-mono font-bold">System Overview</h2>
        <p className="text-sm text-muted-foreground font-mono mt-1">
          Kernel version: 2026.1.0-HG
        </p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="space-y-2">
           <h3 className="text-sm font-mono font-bold text-muted-foreground uppercase tracking-wider">
             User Identity
           </h3>
           <p className="text-foreground leading-relaxed">
             Hello! I&apos;m <span className="font-bold text-primary">Harsh Gajjar</span>, a Software Engineer.
             I design and build fast, scalable systems. Most of my time goes into backend architecture, system design, infrastructure, and making sure things don&apos;t break in production.
           </p>
        </div>

        <div className="space-y-2">
           <h3 className="text-sm font-mono font-bold text-muted-foreground uppercase tracking-wider">
             Current Status
           </h3>
           <div className="bg-secondary/30 border border-border p-4 rounded-sm font-mono text-sm">
              <p>Process: <span className="text-green-400">RUNNING</span></p>
              <p>Task: <span className="text-blue-400">SDE Intern @ HiDevs</span></p>
              <p>Location: <span className="text-yellow-400">Remote</span></p>
              <p>
                CPU Load:{" "}
                {cpuState === "critical" ? (
                  <span className="text-red-400 font-bold">CRITICAL — 100%</span>
                ) : (
                  <span className="text-green-400">94%</span>
                )}
              </p>
              <p>Mood: <span className="text-cyan-400">CAFFEINATED</span></p>
           </div>
        </div>
        
        <div className="space-y-2">
            <h3 className="text-sm font-mono font-bold text-muted-foreground uppercase tracking-wider">
             Changelog
           </h3>
           <div
             className="font-mono text-sm space-y-1 text-muted-foreground border-l-2 border-border pl-4 overflow-y-auto max-h-48"
             style={{ scrollbarWidth: "thin" }}
           >
              {CHANGELOG.map(({ version, text }) => (
                <p key={version}>
                  <span className="text-foreground font-bold">{version}</span> - {text}
                </p>
              ))}
           </div>
        </div>
        
        <div className="pt-4 flex gap-4">
            <Link href="/workbench" className="px-4 py-2 bg-primary text-primary-foreground font-mono text-sm hover:opacity-90 transition-opacity">
                Run /workbench
            </Link>
            <Link href="/contact" className="px-4 py-2 border border-border hover:bg-secondary/50 font-mono text-sm transition-colors">
                Ping /contact
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Overview;
