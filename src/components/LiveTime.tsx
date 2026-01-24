"use client";

import { format } from "date-fns";
import { enIN } from "date-fns/locale";
import { useEffect, useState } from "react";

export default function LiveTime() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    // Set initial time
    setCurrentTime(format(new Date(), "EEEE, MMM d • h:mm a", { locale: enIN }));

    const timer = setInterval(() => {
      setCurrentTime(
        format(new Date(), "EEEE, MMM d • h:mm:ss a", { locale: enIN })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!currentTime) return null;

  return (
    <span className="text-sm font-medium text-muted-foreground min-w-[140px]">
      {currentTime}
    </span>
  );
}
