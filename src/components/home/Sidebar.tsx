"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Terminal, Cpu, FileText, Book, Users } from "lucide-react";
import { SOCIALS } from "@/data/socials";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  const sections = [
    { id: "overview", label: "Overview", icon: Terminal },
    { id: "modules", label: "Modules", icon: Cpu },
    { id: "experience", label: "Syslog", icon: FileText },
    { id: "education", label: "Firmware", icon: Book },
    { id: "community", label: "Network", icon: Users },
  ];

  const activities = [
    "watching reels at 2x while claude does my job",
    'pretending this is "deep work"',
    "checking snacks inventory before deadlines",
  ];

  return (
    <div className="w-full md:w-64 border-r border-border bg-card/50 flex-shrink-0 flex flex-col self-stretch">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
          System Explorer
        </h2>
      </div>

      {/* Nav — horizontal scrollable on mobile, vertical on desktop */}
      <div
        className="flex md:flex-col overflow-x-auto md:overflow-x-visible p-2 gap-1 md:space-y-1 flex-shrink-0"
        style={{ scrollbarWidth: "none" }}
      >
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-mono rounded-sm transition-colors text-left whitespace-nowrap md:whitespace-normal flex-shrink-0 md:flex-shrink",
                isActive
                  ? "bg-secondary text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <Icon size={14} className={isActive ? "text-primary" : "text-muted-foreground"} />
              {section.label}
            </button>
          );
        })}
        {/* Terminal button — mobile only, at the end of the nav row */}
        <button
          onClick={() => window.dispatchEvent(new Event("open-terminal"))}
          className="md:hidden flex items-center gap-2 px-3 py-2 text-sm font-mono rounded-sm transition-colors text-left whitespace-nowrap flex-shrink-0 text-muted-foreground/50 hover:text-muted-foreground hover:bg-secondary/50 ml-auto"
        >
          open terminal
        </button>
      </div>

      {/* Active Connections — desktop only */}
      <div className="hidden md:block px-4 pt-4 mt-2 border-t border-border">
        <div className="text-xs font-mono text-muted-foreground mb-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>ACTIVE_CONNECTIONS</span>
        </div>
        <div className="space-y-3">
          {SOCIALS.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <social.icon size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                  {social.name}
                </span>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground/50 group-hover:text-primary/70 transition-colors">
                {social.handle}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* What I'm Up To — desktop only */}
      <div className="hidden md:block px-4 pt-4 mt-4 border-t border-border">
        <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">
          What I&apos;m Up To
        </div>
        <div className="space-y-1.5">
          {activities.map((activity, i) => (
            <p key={i} className="text-[11px] font-mono text-muted-foreground/70 leading-snug">
              <span className="text-muted-foreground/40 mr-1">—</span>
              {activity}
            </p>
          ))}
        </div>
      </div>

      {/* Terminal hint — desktop only, pinned at the bottom */}
      <div className="hidden md:block mt-auto border-t border-border">
        <button
          onClick={() => window.dispatchEvent(new Event("open-terminal"))}
          className="w-full px-4 py-3 text-left font-mono text-[11px] text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors tracking-wide"
        >
          [ press / to open terminal ]
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
