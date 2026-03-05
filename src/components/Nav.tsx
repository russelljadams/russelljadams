"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex justify-between items-center bg-[rgba(10,14,23,0.9)] backdrop-blur-[16px] border-b border-[var(--color-border)]">
      <Link href="/" className="no-underline">
        <span className="font-[family-name:var(--font-chakra)] text-base font-bold text-[var(--color-text)] tracking-wide">
          Russell<span className="text-[var(--color-green)]">.</span>Adams
        </span>
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex gap-6">
        {LINKS.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`font-[family-name:var(--font-fira)] text-xs tracking-wide no-underline transition-colors duration-200 ${
                active
                  ? "text-[var(--color-green)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </div>

      {/* Mobile */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex flex-col gap-[5px] p-1"
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-[1.5px] bg-[var(--color-text-secondary)] transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
        <span className={`block w-5 h-[1.5px] bg-[var(--color-text-secondary)] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-[1.5px] bg-[var(--color-text-secondary)] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-[rgba(10,14,23,0.97)] backdrop-blur-[16px] border-b border-[var(--color-border)] md:hidden">
          <div className="flex flex-col px-6 py-4 gap-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`font-[family-name:var(--font-fira)] text-sm no-underline transition-colors ${
                  pathname === l.href
                    ? "text-[var(--color-green)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
