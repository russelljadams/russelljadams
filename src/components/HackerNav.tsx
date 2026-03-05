"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/dossier", label: "dossier" },
  { href: "/projects", label: "projects" },
  { href: "/arsenal", label: "arsenal" },
  { href: "/contact", label: "contact" },
  { href: "/resume", label: "resume" },
];

export default function HackerNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 flex justify-between items-center bg-[rgba(8,12,20,0.92)] backdrop-blur-[20px] border-b border-[var(--color-border)]">
      {/* Logo */}
      <Link
        href="/"
        className="font-[family-name:var(--font-fira)] text-sm no-underline"
      >
        <span className="text-[var(--color-green)] font-semibold">
          [a1i3n37x<span className="text-[var(--color-txt-dim)]">@</span>gh0st<span className="text-[var(--color-txt-dim)]">:~$</span>]
        </span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex gap-1">
        {LINKS.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`font-[family-name:var(--font-fira)] text-xs px-3 py-1.5 rounded no-underline transition-all duration-200 ${
                active
                  ? "text-[var(--color-green)] bg-[rgba(0,255,170,0.08)] crt-text"
                  : "text-[var(--color-txt-sec)] hover:text-[var(--color-green)] hover:bg-[rgba(0,255,170,0.04)]"
              }`}
            >
              {active ? "> " : ""}[{l.label}]
            </Link>
          );
        })}
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex flex-col gap-[5px] p-1"
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-[2px] bg-[var(--color-green)] transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
        <span className={`block w-5 h-[2px] bg-[var(--color-green)] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-[2px] bg-[var(--color-green)] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-[rgba(8,12,20,0.97)] backdrop-blur-[20px] border-b border-[var(--color-border)] md:hidden">
          <div className="px-4 py-2 font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)]">
            $ ls /nav/
          </div>
          <div className="flex flex-col px-4 pb-4 gap-1">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`font-[family-name:var(--font-fira)] text-sm py-2 px-3 rounded no-underline transition-all ${
                    active
                      ? "text-[var(--color-green)] bg-[rgba(0,255,170,0.08)]"
                      : "text-[var(--color-txt-sec)] hover:text-[var(--color-green)]"
                  }`}
                >
                  {active ? "> " : "  "}{l.label}/
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
