"use client";

import { format } from "date-fns";
import { enIN } from "date-fns/locale";
import { useEffect, useState } from "react";

export default function LiveTime() {
  const [currentTime, setCurrentTime] = useState<string>(
    format(new Date(), "EEEE, MMM d • h:mm a", { locale: enIN })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        format(new Date(), "EEEE, MMM d • h:mm:ss a", { locale: enIN })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <p className="text-base sm:text-lg text-white/60 font-medium group-hover:text-white/80 transition-colors">
      {currentTime}
    </p>
  );
}
