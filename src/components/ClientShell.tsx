"use client";

import { useState, ReactNode } from "react";
import BootScreen from "./BootScreen";

export default function ClientShell({ children }: { children: ReactNode }) {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <BootScreen onComplete={() => setBooted(true)} />
      <div className={`scanlines ${booted ? "active" : ""}`} />
      <div
        className={`transition-opacity duration-700 ${
          booted ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}
