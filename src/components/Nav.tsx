"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#terminal", label: "Terminal" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#tools", label: "Tools" },
  { href: "#contact", label: "Contact" },
  { href: "/services", label: "Services" },
  { href: "/resume", label: "Resume" },
];

export default function Nav() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex justify-between items-center bg-[rgba(8,12,20,0.85)] backdrop-blur-[20px] border-b border-[var(--color-border)] transition-transform duration-500 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="font-[family-name:var(--font-fira)] text-sm text-[var(--color-green)] font-semibold tracking-wide">
        radams<span className="text-[var(--color-txt-dim)]">@</span>portfolio
        <span className="text-[var(--color-txt-dim)]">:~$</span>
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex gap-7">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-sec)] no-underline tracking-wide uppercase hover:text-[var(--color-green)] transition-colors"
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex flex-col gap-[5px] p-1"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-5 h-[2px] bg-[var(--color-green)] transition-all duration-300 ${
            open ? "rotate-45 translate-y-[7px]" : ""
          }`}
        />
        <span
          className={`block w-5 h-[2px] bg-[var(--color-green)] transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-5 h-[2px] bg-[var(--color-green)] transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-[7px]" : ""
          }`}
        />
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-[rgba(8,12,20,0.95)] backdrop-blur-[20px] border-b border-[var(--color-border)] md:hidden">
          <div className="flex flex-col px-6 py-4 gap-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-[family-name:var(--font-fira)] text-sm text-[var(--color-txt-sec)] no-underline tracking-wide uppercase hover:text-[var(--color-green)] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
