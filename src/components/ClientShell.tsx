"use client";

import { ReactNode, useState, useEffect } from "react";
import MatrixRain from "./MatrixRain";
import KonamiEasterEgg from "./KonamiEasterEgg";

export default function ClientShell({ children }: { children: ReactNode }) {
  const [matrixOn, setMatrixOn] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("matrixRain");
    if (stored === "off") setMatrixOn(false);
  }, []);

  useEffect(() => {
    // Expose toggle for terminal command
    (window as Record<string, unknown>).__toggleMatrix = () => {
      setMatrixOn((prev) => {
        const next = !prev;
        localStorage.setItem("matrixRain", next ? "on" : "off");
        return next;
      });
    };
  }, []);

  return (
    <>
      {matrixOn && <MatrixRain opacity={0.12} />}
      <div className="scanlines active" />
      <KonamiEasterEgg />
      <div className="relative z-10">{children}</div>
    </>
  );
}
