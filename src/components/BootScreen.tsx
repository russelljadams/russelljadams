"use client";

import { useState, useEffect, useCallback } from "react";

const BOOT_LINES = [
  "BIOS POST... OK",
  "Detecting hardware...",
  "  CPU: Veteran-class processor (military-grade)",
  "  RAM: 15+ virtual machines loaded",
  "  NET: Spectrum field-hardened NIC",
  "  SEC: OPSEC module [ACTIVE]",
  "",
  "Loading kernel... radams-portfolio v2.0",
  "Mounting /skills... OK",
  "Mounting /experience... OK",
  "Mounting /certifications... IN_PROGRESS",
  "Initializing firewall rules... OK",
  "",
  'radams@portfolio:~$ ./launch_portfolio.sh',
  "",
  "  Welcome. Explore the site. Some things are hidden.",
  "",
];

export default function BootScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  const skip = useCallback(() => {
    setDone(true);
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let content = "";
    let cancelled = false;

    function tick() {
      if (cancelled) return;
      if (lineIdx >= BOOT_LINES.length) {
        setTimeout(() => {
          if (!cancelled) skip();
        }, 500);
        return;
      }
      const line = BOOT_LINES[lineIdx];
      if (charIdx < line.length) {
        content += line[charIdx];
        charIdx++;
        setText(content);
        setTimeout(tick, 8 + Math.random() * 12);
      } else {
        content += "\n";
        setText(content);
        lineIdx++;
        charIdx = 0;
        setTimeout(tick, line === "" ? 80 : 50 + Math.random() * 60);
      }
    }

    const timer = setTimeout(tick, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [skip]);

  return (
    <div
      className={`boot-screen ${done ? "done" : ""}`}
      onClick={skip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && skip()}
    >
      <pre className="font-[family-name:var(--font-fira)] text-sm text-[var(--color-green)] max-w-[700px] p-10 whitespace-pre-wrap leading-relaxed drop-shadow-[0_0_8px_rgba(0,255,170,0.15)]">
        {text}
        <span className="inline-block w-2 h-4 bg-[var(--color-green)] align-middle ml-0.5 animate-[blink_0.7s_step-end_infinite]" />
      </pre>
    </div>
  );
}
