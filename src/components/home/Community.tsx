"use client";

import { POSITIONS } from "@/data/community-leadership";
import { Radio, ExternalLink, Network } from "lucide-react";
import Link from "next/link";

const Community = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <Network size={16} className="text-primary" />
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground">
          Network Protocols / Broadcasts
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {POSITIONS.map((pos) => (
          <div
            key={pos.id}
            className="p-4 border border-border bg-card/30 hover:bg-card/50 hover:border-primary/50 transition-all group rounded-sm"
          >
            <div className="flex items-center justify-between mb-3">
               <div className="flex items-center gap-2">
                  <Radio size={14} className={pos.organizationUrl ? "text-green-500 animate-pulse" : "text-muted-foreground"} />
                  <span className="text-xs font-mono font-bold text-muted-foreground uppercase">
                     {pos.duration}
                  </span>
               </div>
            </div>

            <h4 className="text-sm font-bold text-foreground font-mono mb-1">
              {pos.title}
            </h4>
            
            {pos.organizationUrl ? (
                <Link href={pos.organizationUrl} target="_blank" className="text-xs text-primary hover:underline flex items-center gap-1 font-mono mb-3">
                   @{pos.organization}
                   <ExternalLink size={10} />
                </Link>
            ) : (
                <div className="text-xs text-muted-foreground font-mono mb-3">
                   @{pos.organization}
                </div>
            )}

            <p className="text-xs text-muted-foreground leading-relaxed font-mono border-t border-border/50 pt-3">
              {pos.description}
            </p>

            {pos.events && pos.events.length > 0 && (
               <div className="mt-4 pt-3 border-t border-border/50">
                  <span className="text-[10px] text-muted-foreground uppercase block mb-2 font-bold">Packets Transmitted:</span>
                  <div className="flex flex-col gap-1">
                     {pos.events.map(event => (
                        <Link key={event.name} href={event.url} target="_blank" className="flex items-center gap-2 text-xs font-mono text-foreground hover:text-primary transition-colors">
                           <span>→</span>
                           <span className="underline decoration-border group-hover:decoration-primary underline-offset-2">{event.name}</span>
                        </Link>
                     ))}
                  </div>
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
