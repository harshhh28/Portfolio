"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // "System" metaphors for links
  const links = [
    { href: "/", label: "/system" },
    { href: "/workbench", label: "/workbench" },
    { href: "/logs", label: "/logs" },
    { href: "/mail", label: "/mail" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-background border-b border-border shadow-none">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center h-12 px-4">
          {/* Brand / Root */}
          <Link href="/" className="text-sm font-mono font-bold text-foreground hover:text-primary transition-colors">
            ~/harsh.gajjar
          </Link>

          {/* Desktop "Dock" */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 text-xs font-mono transition-colors relative group",
                    isActive ? "text-foreground bg-secondary/50" : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  )}
                >
                  <span className={cn("opacity-50 group-hover:opacity-100 transition-opacity", isActive && "opacity-100")}>[</span>
                  <span className="mx-1">{link.label}</span>
                  <span className={cn("opacity-50 group-hover:opacity-100 transition-opacity", isActive && "opacity-100")}>]</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:bg-secondary/50 p-1 rounded-sm"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile "Terminal" Menu */}
        {isOpen && (
          <div className="md:hidden border-b border-border bg-background">
            <div className="flex flex-col p-2 space-y-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm font-mono transition-colors",
                      isActive ? "bg-secondary/50 text-foreground" : "text-muted-foreground hover:bg-secondary/20"
                    )}
                  >
                    <span className="text-accent-foreground">{">"}</span>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
