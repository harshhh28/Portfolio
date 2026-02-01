"use client";

import { SKILLS } from "@/data/skills";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const Modules = () => {
  // Flatten skills for "All Modules" view or group them
  const groups = [
    { name: "Languages", items: SKILLS.languages },
    { name: "Frameworks", items: SKILLS.frameworks },
    { name: "Databases", items: SKILLS.cloudDatabases }, // Merging cloud & db for simplicity or keeping separate
    { name: "Tools", items: SKILLS.developerTools },
    { name: "AI/ML", items: SKILLS.mlAndDataScience },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 fade-in duration-500">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-mono font-bold">Installed Modules</h2>
        <p className="text-sm text-muted-foreground font-mono mt-1">
          Listing all active packages and dependencies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {groups.map((group) => (
          <div key={group.name} className="space-y-3">
            <h3 className="text-sm font-mono font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500/50 rounded-full" />
              {group.name}
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {group.items.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between p-2 border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-colors rounded-sm group"
                >
                  <span className="text-sm font-mono text-foreground">{skill.name}</span>
                  {skill.url && (
                    <Link
                      href={skill.url}
                      target="_blank"
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary transition-opacity"
                    >
                      <ExternalLink size={12} />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modules;
