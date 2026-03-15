"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#hero");
  const pathname = usePathname();

  // On sub-pages, use route-based links instead of anchors
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as HTMLElement[];

    function onScroll() {
      const scrollY = window.scrollY + 120;
      let current = "#hero";
      for (const section of sections) {
        if (section.offsetTop <= scrollY) {
          current = "#" + section.id;
        }
      }
      setActiveHash(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!isHome) return; // let normal navigation happen on sub-pages
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  }

  function getHref(link: { href: string }) {
    if (isHome) return link.href;
    // On sub-pages, link back to home page with anchor
    if (link.href === "#hero") return "/";
    return "/" + link.href;
  }

  function isActive(href: string) {
    if (isHome) return activeHash === href;
    // On sub-pages, highlight based on pathname
    const route = href.replace("#", "/");
    return pathname === route;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex justify-between items-center bg-[rgba(10,14,23,0.9)] backdrop-blur-[16px] border-b border-[var(--color-border)]">
      <a
        href={isHome ? "#hero" : "/"}
        onClick={(e) => isHome && handleClick(e, "#hero")}
        className="no-underline"
      >
        <span className="font-[family-name:var(--font-chakra)] text-base font-bold text-[var(--color-text)] tracking-wide">
          Russell<span className="text-[var(--color-green)]">.</span>Adams
        </span>
      </a>

      {/* Desktop */}
      <div className="hidden md:flex gap-6">
        {LINKS.map((l) => {
          const active = isActive(l.href);
          return (
            <a
              key={l.href}
              href={getHref(l)}
              onClick={(e) => handleClick(e, l.href)}
              className={`font-[family-name:var(--font-fira)] text-xs tracking-wide no-underline transition-colors duration-200 ${
                active
                  ? "text-[var(--color-green)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              }`}
            >
              {l.label}
            </a>
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
              <a
                key={l.href}
                href={getHref(l)}
                onClick={(e) => handleClick(e, l.href)}
                className={`font-[family-name:var(--font-fira)] text-sm no-underline transition-colors ${
                  isActive(l.href)
                    ? "text-[var(--color-green)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                }`}
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
