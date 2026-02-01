"use client";

import { cn } from "@/lib/utils";
import { Terminal, Cpu, Archive, FileText, Book, Users } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  const sections = [
    { id: "overview", label: "Overview", icon: Terminal },
    { id: "modules", label: "Modules", icon: Cpu },
    { id: "logs", label: "System Logs", icon: FileText },
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
      
      <div className="mt-8 p-4 border-t border-border">
         <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-muted-foreground">
                <span>CPU Usage</span>
                <span>12%</span>
            </div>
            <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-green-500/50 w-[12%]" />
            </div>
            
            <div className="flex justify-between text-xs font-mono text-muted-foreground pt-2">
                <span>Memory</span>
                <span>46%</span>
            </div>
             <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-blue-500/50 w-[46%]" />
            </div>
         </div>
      </div>
    </div>
  );
};

export default Sidebar;
