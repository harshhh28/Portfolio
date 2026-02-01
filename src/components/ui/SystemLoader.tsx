"use client";

import { useEffect, useState } from "react";

export const SystemLoader = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh] space-y-4 font-mono">
      <div className="flex items-center gap-2 text-sm text-foreground">
        <span className="text-green-500">➜</span>
        <span>executing_task</span>
        <span className="animate-pulse">_</span>
      </div>
      <div className="text-xs text-muted-foreground">
        loading_modules{dots}
      </div>
      
      {/* Progress Bar */}
      <div className="w-48 h-1 bg-secondary rounded-full overflow-hidden mt-2">
         <div className="h-full bg-primary/80 animate-progress-indeterminate" />
      </div>
    </div>
  );
};
