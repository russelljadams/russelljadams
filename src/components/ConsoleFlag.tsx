"use client";

import { useEffect } from "react";

// FLAG #1: Logged to browser console on page load
export default function ConsoleFlag() {
  useEffect(() => {
    console.log(
      "%c  ╔══════════════════════════════════════╗\n  ║   You found the first flag.          ║\n  ║   FLAG{always_check_the_console}     ║\n  ║                                      ║\n  ║   There are 4 more hidden on this    ║\n  ║   site. Good luck.                   ║\n  ╚══════════════════════════════════════╝",
      "color: #00ffaa; font-family: monospace; font-size: 12px;"
    );
  }, []);

  return null;
}
