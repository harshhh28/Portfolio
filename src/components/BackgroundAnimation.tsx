"use client";

import { useState, useEffect } from "react";

const BackgroundAnimation = () => {
  const [elements, setElements] = useState<
    Array<{
      left: number;
      top: number;
      delay: number;
      width: number;
      height: number;
    }>
  >([]);

  useEffect(() => {
    const newElements = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(50,50,50,0.2),rgba(0,0,0,0.9))]" />
      <div className="absolute inset-0">
        {elements.map((element, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDelay: `${element.delay}s`,
              width: `${element.width}px`,
              height: `${element.height}px`,
              background:
                "linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              borderRadius: "20%",
              filter: "blur(5px)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundAnimation;
