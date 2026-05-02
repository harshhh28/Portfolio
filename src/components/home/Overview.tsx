"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

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

const LOG_MESSAGES = [
  "[warn] cpu threshold exceeded",
  "[alert] thermal limits approaching",
  "[critical] system stability compromised",
  "[info] auto-scaling process initiated",
  "[debug] cache invalidation in progress",
  "[warn] high memory pressure detected",
];

const Overview = () => {
  const [cpuLoad, setCpuLoad] = useState(42);
  const [temp, setTemp] = useState(45);
  const [fanSpeed, setFanSpeed] = useState(2100);
  const [logs, setLogs] = useState<string[]>([]);
  const [isCritical, setIsCritical] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) return;

    // Simulation Cycle: Spike every 10 seconds
    const cycle = setInterval(() => {
      setIsCritical(true);
      // Spike to critical
      const spikeInterval = setInterval(() => {
        setCpuLoad(Math.floor(Math.random() * 4) + 97); // 97-100%
      }, 400);

      setTimeout(() => {
        clearInterval(spikeInterval);
        setIsCritical(false);
        setCpuLoad(Math.floor(Math.random() * 20) + 30); // Back to normal 30-50%
      }, 3000);
    }, 12000);

    // Dynamic Fluctuation for metrics
    const fluctuate = setInterval(() => {
      setCpuLoad((prev) => {
        if (isCritical) return prev; // handled by spikeInterval
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.min(Math.max(prev + delta, 5), 90);
      });
    }, 600);

    // Metric scaling based on CPU
    const metricSync = setInterval(() => {
      setTemp((prev) => {
        const targetTemp = 40 + (cpuLoad / 100) * 55; // 40-95C
        return Math.floor(prev + (targetTemp - prev) * 0.3);
      });
      setFanSpeed((prev) => {
        const targetFan = 1800 + (cpuLoad / 100) * 4700; // 1800-6500rpm
        return Math.floor(prev + (targetFan - prev) * 0.3);
      });
    }, 400);

    return () => {
      clearInterval(cycle);
      clearInterval(fluctuate);
      clearInterval(metricSync);
    };
  }, [isCritical, cpuLoad]);

  // Log generation
  useEffect(() => {
    if (reducedMotion.current) return;
    
    const interval = isCritical ? 800 : 4000;
    const logTimer = setInterval(() => {
      let nextLog = "";
      if (isCritical) {
        nextLog = LOG_MESSAGES[Math.floor(Math.random() * 3)]; // Pick from first 3 critical ones
      } else {
        nextLog = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      }
      
      setLogs((prev) => [nextLog, ...prev].slice(0, 5));
    }, interval);

    return () => clearInterval(logTimer);
  }, [isCritical]);

  const getStatusColor = (load: number) => {
    if (load >= 95) return "text-red-500";
    if (load >= 80) return "text-orange-500";
    if (load >= 50) return "text-yellow-500";
    return "text-green-500";
  };

  const getPulseClass = (load: number) => {
    if (load >= 95) return "animate-pulse-glow-strong";
    if (load >= 80) return "animate-pulse-glow-medium";
    return "";
  };

  return (
    <div className={cn(
      "space-y-8 animate-in slide-in-from-bottom-2 fade-in duration-500",
      cpuLoad > 95 && "animate-flicker"
    )}>
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
            Hello! I&apos;m{" "}
            <span className="font-bold text-primary">Harsh Gajjar</span> - a
            Software Engineer who builds scalable backend systems and GenAI
            products. I enjoy turning complex ideas into reliable, high-performance
            systems that scale without surprises :)
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-mono font-bold text-muted-foreground uppercase tracking-wider">
            Current Status
          </h3>
          <div className={cn(
            "bg-secondary/30 border border-border p-3 rounded-sm font-mono text-sm relative overflow-hidden transition-all duration-500",
            cpuLoad > 95 && "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)] bg-red-500/5",
            cpuLoad > 95 && "animate-jitter"
          )}>
            <div className="space-y-0.5">
              <p>Process: <span className="text-green-400">RUNNING</span></p>
              <p>Task: <span className="text-blue-400">SDE (AI) Intern @ HiDevs</span></p>
              <p>Location: <span className="text-yellow-400">Remote</span></p>

              <div className="space-y-0.5">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">CPU Load:</span>
                  <span className={cn(
                    "font-bold transition-all duration-300 inline-block",
                    getStatusColor(cpuLoad),
                    getPulseClass(cpuLoad)
                  )}>
                    {cpuLoad >= 95 ? "CRITICAL" : cpuLoad >= 80 ? "DANGER" : cpuLoad >= 50 ? "WARNING" : "NORMAL"} — {cpuLoad}%
                  </span>
                </div>
                <div className="h-0.5 w-full bg-border/50 overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all duration-300",
                      cpuLoad >= 95 ? "bg-red-500" : cpuLoad >= 80 ? "bg-orange-500" : cpuLoad >= 50 ? "bg-yellow-500" : "bg-green-500",
                      cpuLoad > 95 && "animate-pulse"
                    )}
                    style={{ width: `${cpuLoad}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-muted-foreground min-w-0">
                <span className="shrink-0">Temp: <span className={cn(temp > 85 ? "text-red-400 font-bold" : "text-foreground")}>{temp}°C</span></span>
                <span className="shrink-0">Fan: <span className={cn(fanSpeed > 5000 ? "text-red-400 font-bold" : "text-foreground")}>{fanSpeed} RPM</span></span>
                {logs.length > 0 && (
                  <span className={cn(
                    "truncate min-w-0 opacity-70",
                    logs[0].includes("critical") ? "text-red-400" :
                    logs[0].includes("warn") ? "text-yellow-400" :
                    logs[0].includes("alert") ? "text-orange-400" : "text-muted-foreground"
                  )}>
                    <span className="opacity-50 mr-0.5">›</span>{logs[0]}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>


        <div className="space-y-2">
          <h3 className="text-sm font-mono font-bold text-muted-foreground uppercase tracking-wider">
            Changelog
          </h3>
          <div
            className="font-mono text-xs space-y-1 text-muted-foreground border-l-2 border-border pl-3 overflow-y-auto max-h-28"
            style={{ scrollbarWidth: "thin" }}>
            {CHANGELOG.slice(0, 5).map(({ version, text }) => (
              <p key={version}>
                <span className="text-foreground font-bold">{version}</span> -{" "}
                {text}
              </p>
            ))}
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          <Link
            href="/workbench"
            className="px-4 py-2 bg-primary text-primary-foreground font-mono text-sm hover:opacity-90 transition-opacity">
            Run /workbench
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 border border-border hover:bg-secondary/50 font-mono text-sm transition-colors">
            Ping /contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Overview;
