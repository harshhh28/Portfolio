"use client";

import { EXPERIENCE } from "@/data/experience";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const ExperiencePanel = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 fade-in duration-500">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-mono font-bold">Syslog</h2>
        <p className="text-sm text-muted-foreground font-mono mt-1">
          /var/log/experience.log
        </p>
      </div>

      <div className="font-mono text-sm space-y-6">
        {EXPERIENCE.map((exp, index) => (
          <div key={exp.id} className="relative pl-6 border-l border-border hover:border-primary/50 transition-colors group">
            {/* Timestamp / Metaline */}
            <div className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
              <span className="text-blue-400">[{exp.duration}]</span>
              <span className="text-yellow-500/80">INFO</span>
              <span>@ {exp.location}</span>
            </div>

            {/* Content */}
            <div className="mb-2">
              <div className="flex items-baseline gap-2">
                 <h3 className="font-bold text-foreground text-base">
                {exp.title}
              </h3>
              <span className="text-muted-foreground">at</span>
              <Link href={exp.organizationUrl || "#"} target="_blank" className="hover:text-primary hover:underline underline-offset-4 flex items-center gap-1">
                {exp.organization}
              </Link>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {exp.description}
            </p>
            
            {/* Status Indicator */}
            <div className="absolute -left-[3px] top-1 w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
          </div>
        ))}

        <div className="pl-6 border-l border-border pt-4 text-xs text-muted-foreground">
             <span className="animate-pulse">_</span> End of log
        </div>
      </div>
    </div>
  );
};

export default ExperiencePanel;
