"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const ASCII_ART = `
 ██╗   ██╗ ██████╗ ██╗   ██╗    ███████╗ ██████╗ ██╗   ██╗███╗   ██╗██████╗     ██╗████████╗
 ╚██╗ ██╔╝██╔═══██╗██║   ██║    ██╔════╝██╔═══██╗██║   ██║████╗  ██║██╔══██╗    ██║╚══██╔══╝
  ╚████╔╝ ██║   ██║██║   ██║    █████╗  ██║   ██║██║   ██║██╔██╗ ██║██║  ██║    ██║   ██║
   ╚██╔╝  ██║   ██║██║   ██║    ██╔══╝  ██║   ██║██║   ██║██║╚██╗██║██║  ██║    ██║   ██║
    ██║   ╚██████╔╝╚██████╔╝    ██║     ╚██████╔╝╚██████╔╝██║ ╚████║██████╔╝    ██║   ██║
    ╚═╝    ╚═════╝  ╚═════╝     ╚═╝      ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝     ╚═╝   ╚═╝
`;

export default function KonamiEasterEgg() {
  const [progress, setProgress] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const router = useRouter();

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (triggered) return;
      const expected = KONAMI[progress];
      if (e.key === expected || e.key.toLowerCase() === expected) {
        const next = progress + 1;
        if (next === KONAMI.length) {
          setTriggered(true);
          setProgress(0);
        } else {
          setProgress(next);
        }
      } else {
        setProgress(0);
      }
    },
    [progress, triggered]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  if (!triggered) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center cursor-pointer"
      onClick={() => {
        setTriggered(false);
        router.push("/ghost");
      }}
    >
      <pre className="text-[var(--color-green)] text-[8px] sm:text-[10px] md:text-xs leading-tight mb-8 text-center overflow-hidden">
        {ASCII_ART}
      </pre>
      <p className="font-[family-name:var(--font-fira)] text-[var(--color-phosphor)] text-sm crt-text animate-[blink_1s_step-end_infinite]">
        {"> "}CLICK TO ENTER THE GHOST PROTOCOL...
      </p>
      <p className="font-[family-name:var(--font-fira)] text-[var(--color-txt-dim)] text-xs mt-4">
        or press ESC to return
      </p>
    </div>
  );
}
