"use client";

import { useState, useEffect } from "react";

export default function TypewriterText({
  text,
  speed = 30,
  delay = 0,
  onComplete,
  className = "",
}: {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      onComplete?.();
      return;
    }
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [started, displayed, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-2 h-4 bg-current align-middle ml-0.5 animate-[blink_0.7s_step-end_infinite]" />
      )}
    </span>
  );
}
