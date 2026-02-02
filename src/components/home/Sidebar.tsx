"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Terminal, Cpu, Archive, FileText, Book, Users } from "lucide-react";
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
    // { id: "kernel", label: "Kernel Info", icon: Archive }, // Philosophy/Bio
  ];

  return (
    <div className="w-full md:w-64 border-r border-border bg-card/50 flex-shrink-0">
      <div className="p-4 border-b border-border">
        <h2 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
          System Explorer
        </h2>
      </div>
      <div className="flex flex-col p-2 space-y-1">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-mono rounded-sm transition-colors text-left",
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
      </div>
      
      <div className="mt-8 p-4 border-t border-border bg-muted/20">
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
    </div>
  );
};

export default Sidebar;
