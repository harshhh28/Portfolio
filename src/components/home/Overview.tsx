"use client";

import Link from "next/link";

const Overview = () => {
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
             Hello! I'm <span className="font-bold text-primary">Harsh Gajjar</span>, a Software Engineer and Full Stack Developer.
             I design and build rigorous, fast, and scalable systems. My work focuses on backend architecture, system design, and creating tools that empower users.
           </p>
        </div>

        <div className="space-y-2">
           <h3 className="text-sm font-mono font-bold text-muted-foreground uppercase tracking-wider">
             Current Status
           </h3>
           <div className="bg-secondary/30 border border-border p-4 rounded-sm font-mono text-sm">
              <p>Process: <span className="text-green-400">RUNNING</span></p>
              <p>Task: <span className="text-blue-400">Building HiDevs Platform</span></p>
              <p>Location: <span className="text-yellow-400">Remote</span></p>
           </div>
        </div>
        
        <div className="space-y-2">
            <h3 className="text-sm font-mono font-bold text-muted-foreground uppercase tracking-wider">
             Philosophy
           </h3>
           <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground">
             "Function over form, but form follows function. Code should be clean, documentation should be clear, and systems should be resilient."
           </blockquote>
        </div>
        
        <div className="pt-4 flex gap-4">
            <Link href="/workbench" className="px-4 py-2 bg-primary text-primary-foreground font-mono text-sm hover:opacity-90 transition-opacity">
                Run /workbench
            </Link>
            <Link href="/mail" className="px-4 py-2 border border-border hover:bg-secondary/50 font-mono text-sm transition-colors">
                Ping /mail
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Overview;
