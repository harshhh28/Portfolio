"use client";

import { Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-white/60 text-sm">
          <div className="flex items-center gap-2">
            Made with <Heart size={16} className="text-red-500" /> by Harsh
            Gajjar
          </div>
          <div>© {currentYear} All rights reserved</div>
        </div>
      </div>
    </footer>
  );
}
