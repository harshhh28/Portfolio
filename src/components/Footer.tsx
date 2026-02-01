"use client";

import { Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 mt-auto border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-muted-foreground text-xs">
          <div className="flex items-center gap-1.5">
            Made with <Heart size={12} className="text-red-500 fill-current" /> by Harsh
            Gajjar
          </div>
          <div className="mt-1 opacity-70">© {currentYear} All rights reserved</div>
        </div>
      </div>
    </footer>
  );
}
