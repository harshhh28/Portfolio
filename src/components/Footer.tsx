"use client";

import { Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 mt-auto border-t border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            Made with <Heart size={16} className="text-red-500 fill-current" /> by Harsh
            Gajjar
          </div>
          <div className="mt-1">© {currentYear} All rights reserved</div>
        </div>
      </div>
    </footer>
  );
}
