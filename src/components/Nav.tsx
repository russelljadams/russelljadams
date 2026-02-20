"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#terminal", label: "Terminal" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [visible, setVisible] = useState(false);

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
      <div className="flex gap-4 md:gap-7">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="font-[family-name:var(--font-fira)] text-[10px] md:text-xs text-[var(--color-txt-sec)] no-underline tracking-wide uppercase hover:text-[var(--color-green)] transition-colors"
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
