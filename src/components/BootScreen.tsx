"use client";

import { useState, useEffect, useCallback } from "react";

const PHASE1_LINES = [
  "BIOS POST... OK",
  "Detecting hardware...",
  "  CPU: x86_64 @ 3.6GHz",
  "  RAM: 32GB DDR4",
  "  GPU: RTX 3080 Ti",
  "  NET: eth0 UP [Tailscale mesh active]",
  "  DISK: /dev/sda1 mounted",
  "",
  "Loading kernel... 6.1.0-gh0st",
  "Mounting /home... OK",
  "Starting services... OK",
  "Firewall rules loaded... OK",
  "Loading MCP nervous system... 117 tools registered",
  "",
];

const ALIEN_SYMBOLS = "\u2580\u2584\u2588\u2593\u2591\u2592\u25B2\u25BC\u25C6\u2726\u2727\u2560\u2563\u256C";

const PHASE2_LINES = [
  "",
  "\u2593\u2593\u2593 SIGNAL INTERCEPTED \u2593\u2593\u2593",
  "",
  "SOURCE: UNKNOWN",
  "FREQUENCY: 1420.405 MHz",
  "PATTERN: NON-RANDOM",
  "",
  "DECRYPTING...",
];

const PHASE3_LINES = [
  "",
  "Signal decoded. Identity confirmed.",
  "",
  "a1i3n37x@gh0st:~$ ./portfolio --interactive",
  "",
];

export default function BootScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState(1);
  const [done, setDone] = useState(false);
  const [decryptProgress, setDecryptProgress] = useState(0);

  const skip = useCallback(() => {
    setDone(true);
    onComplete();
  }, [onComplete]);

  // Phase 1: Hardware POST
  useEffect(() => {
    if (phase !== 1) return;
    let lineIdx = 0;
    let charIdx = 0;
    let content = "";
    let cancelled = false;

    function tick() {
      if (cancelled) return;
      if (lineIdx >= PHASE1_LINES.length) {
        setTimeout(() => { if (!cancelled) setPhase(2); }, 300);
        return;
      }
      const line = PHASE1_LINES[lineIdx];
      if (charIdx < line.length) {
        content += line[charIdx];
        charIdx++;
        setText(content);
        setTimeout(tick, 6 + Math.random() * 10);
      } else {
        content += "\n";
        setText(content);
        lineIdx++;
        charIdx = 0;
        setTimeout(tick, line === "" ? 60 : 40 + Math.random() * 40);
      }
    }

    const timer = setTimeout(tick, 400);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [phase]);

  // Phase 2: Alien intercept
  useEffect(() => {
    if (phase !== 2) return;
    let cancelled = false;
    let content = text;
    let lineIdx = 0;
    let charIdx = 0;

    // Flash alien symbols briefly
    const flashDuration = 600;
    const flashInterval = setInterval(() => {
      const symbols = Array.from({ length: 40 }, () =>
        ALIEN_SYMBOLS[Math.floor(Math.random() * ALIEN_SYMBOLS.length)]
      ).join("");
      setText(content + "\n" + symbols);
    }, 50);

    setTimeout(() => {
      clearInterval(flashInterval);
      setText(content);

      function tick() {
        if (cancelled) return;
        if (lineIdx >= PHASE2_LINES.length) {
          // Start decryption progress bar
          let prog = 0;
          const progInterval = setInterval(() => {
            if (cancelled) { clearInterval(progInterval); return; }
            prog += Math.random() * 8 + 2;
            if (prog >= 100) {
              prog = 100;
              clearInterval(progInterval);
              setDecryptProgress(100);
              setTimeout(() => { if (!cancelled) setPhase(3); }, 400);
            }
            setDecryptProgress(Math.min(prog, 100));
          }, 60);
          return;
        }
        const line = PHASE2_LINES[lineIdx];
        if (charIdx < line.length) {
          content += line[charIdx];
          charIdx++;
          setText(content);
          setTimeout(tick, 10 + Math.random() * 15);
        } else {
          content += "\n";
          setText(content);
          lineIdx++;
          charIdx = 0;
          setTimeout(tick, line === "" ? 80 : 60);
        }
      }
      tick();
    }, flashDuration);

    return () => { cancelled = true; clearInterval(flashInterval); };
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // Phase 3: Resume
  useEffect(() => {
    if (phase !== 3) return;
    let cancelled = false;
    let content = text;
    let lineIdx = 0;
    let charIdx = 0;

    function tick() {
      if (cancelled) return;
      if (lineIdx >= PHASE3_LINES.length) {
        setTimeout(() => { if (!cancelled) skip(); }, 500);
        return;
      }
      const line = PHASE3_LINES[lineIdx];
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
        setTimeout(tick, line === "" ? 80 : 50);
      }
    }

    tick();
    return () => { cancelled = true; };
  }, [phase, skip]); // eslint-disable-line react-hooks/exhaustive-deps

  const progressBar = phase === 2 && decryptProgress > 0 ? (
    <div className="mt-2 font-[family-name:var(--font-fira)] text-xs">
      <span className="text-[var(--color-amber)]">[</span>
      <span className="text-[var(--color-green)]">
        {"█".repeat(Math.floor(decryptProgress / 4))}
        {"░".repeat(25 - Math.floor(decryptProgress / 4))}
      </span>
      <span className="text-[var(--color-amber)]">] {Math.floor(decryptProgress)}%</span>
    </div>
  ) : null;

  return (
    <div
      className={`boot-screen ${done ? "done" : ""}`}
      onClick={skip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && skip()}
    >
      <div className="max-w-[700px] p-8 md:p-10">
        <pre
          className={`font-[family-name:var(--font-fira)] text-sm whitespace-pre-wrap leading-relaxed ${
            phase === 2
              ? "text-[var(--color-amber)] drop-shadow-[0_0_8px_rgba(255,184,0,0.2)]"
              : "text-[var(--color-green)] drop-shadow-[0_0_8px_rgba(0,255,170,0.15)]"
          }`}
        >
          {text}
          <span className="inline-block w-2 h-4 bg-current align-middle ml-0.5 animate-[blink_0.7s_step-end_infinite]" />
        </pre>
        {progressBar}
        <p className="font-[family-name:var(--font-fira)] text-[10px] text-[var(--color-txt-dim)] mt-6">
          click anywhere to skip
        </p>
      </div>
    </div>
  );
}
