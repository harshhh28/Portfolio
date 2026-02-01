"use client";

import { EDUCATION } from "@/data/education";
import { Cpu, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Education = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <Cpu size={16} className="text-primary" />
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground">
          Kernel / Firmware Versions
        </h3>
      </div>

      <div className="space-y-4">
        {EDUCATION.map((edu, index) => (
          <div
            key={edu.school}
            className="relative pl-6 border-l border-border hover:border-primary transition-colors group"
          >
             {/* Timeline dot */}
             <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-background border border-border group-hover:border-primary transition-all group-hover:bg-primary/20" />

            <div className="flex flex-col gap-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-foreground font-mono">
                    {edu.degree}
                  </h4>
                  <Link 
                    href={edu.schoolUrl} 
                    target="_blank" 
                    className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 font-mono mt-0.5"
                  >
                    <span>{edu.school}</span>
                    <ExternalLink size={10} />
                  </Link>
                </div>
                <span className="text-xs font-mono text-muted-foreground/70 whitespace-nowrap bg-secondary/30 px-2 py-0.5 rounded-sm">
                  v{EDUCATION.length - index}.0 ({edu.duration})
                </span>
              </div>
              
              <div className="text-xs text-muted-foreground mt-2 font-mono">
                 <span className="text-primary/70">Location:</span> {edu.location}
              </div>

              {edu.courses && edu.courses.length > 0 && (
                <div className="mt-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground/50 font-bold mb-2 font-mono">
                    Installed Modules:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.courses.map((course) => (
                      <span
                        key={course}
                        className="inline-flex items-center px-1.5 py-0.5 rounded-sm bg-secondary/20 text-secondary-foreground text-[10px] font-mono border border-border/50"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
