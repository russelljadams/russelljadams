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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__toggleMatrix = () => {
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
