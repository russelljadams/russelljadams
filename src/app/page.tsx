"use client";

import { useState } from "react";
import Link from "next/link";
import ClientShell from "@/components/ClientShell";
import HackerNav from "@/components/HackerNav";
import BootScreen from "@/components/BootScreen";
import Terminal from "@/components/Terminal";
import GlitchText from "@/components/GlitchText";
import AlienGlyph from "@/components/AlienGlyph";

const ASCII_ALIEN = `
    .-"      "-.
   /    _    _   \\
  |   (o)  (o)   |
  |    \\  __/    |
   \\   '.__.'   /
    '-._    _.-'
     /  '--'  \\
    |  ||  ||  |
     \\_||__||_/
      \\______/
`;

const FILE_ENTRIES = [
  { perms: "drwxr-x", name: "dossier/", desc: "CLASSIFIED", href: "/dossier", color: "var(--color-red)" },
  { perms: "drwxr-x", name: "projects/", desc: "5 missions", href: "/projects", color: "var(--color-amber)" },
  { perms: "drwxr-x", name: "arsenal/", desc: "41 tools", href: "/arsenal", color: "var(--color-cyan)" },
  { perms: "-rwxr-x", name: "contact.sh", desc: "1.2K", href: "/contact", color: "var(--color-green)" },
  { perms: "-rw-r--", name: "resume.pdf", desc: "4.8K", href: "/resume", color: "var(--color-txt-sec)" },
  { perms: "-rw-r--", name: "ceh-cram/", desc: "424 questions", href: "/ceh-cram/", color: "var(--color-amber)" },
];

const BADGES = [
  { label: "CEH", active: true },
  { label: "Google Cybersecurity", active: true },
  { label: "USAF Veteran", active: true },
  { label: "Augmented Human", active: true },
];

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      <ClientShell>
        <HackerNav />

        {/* ═══ HERO ═══ */}
        <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 md:px-12 pt-[100px] pb-16 gap-8 lg:gap-16 relative overflow-hidden">
          <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] glow-green pointer-events-none" />

          {/* Left: ASCII alien + identity */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left opacity-0 animate-[fadeInUp_0.8s_ease_0.2s_forwards]">
            <pre className="font-[family-name:var(--font-fira)] text-[10px] sm:text-xs text-[var(--color-alien)] leading-tight alien-glow mb-6 select-none">
              {ASCII_ALIEN}
            </pre>
            <h1 className="font-[family-name:var(--font-chakra)] text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-3">
              <GlitchText text="a1i3n37x" auto className="text-[var(--color-green)]" />
            </h1>
            <p className="font-[family-name:var(--font-fira)] text-sm text-[var(--color-txt-sec)] mb-4">
              Security Operator &middot; Augmented Human &middot; Grand Junction, CO
            </p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {BADGES.map((b) => (
                <span
                  key={b.label}
                  className={`font-[family-name:var(--font-fira)] text-[10px] px-3 py-1 border rounded ${
                    b.active
                      ? "border-[var(--color-green-dim)] text-[var(--color-green)] bg-[rgba(0,255,170,0.05)]"
                      : "border-[var(--color-border)] text-[var(--color-txt-sec)]"
                  }`}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Terminal */}
          <div className="w-full max-w-[600px] opacity-0 animate-[fadeInUp_0.8s_ease_0.5s_forwards]" style={{ height: "380px" }}>
            <Terminal />
          </div>
        </section>

        {/* ═══ ALIEN DIVIDER ═══ */}
        <AlienGlyph className="px-8 md:px-12" />

        {/* ═══ FILE EXPLORER NAV ═══ */}
        <section className="px-6 md:px-12 py-12">
          <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)] mb-4">
            a1i3n37x@gh0st:~$ ls -la
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[900px]">
            {FILE_ENTRIES.map((f) => (
              <Link key={f.href} href={f.href} className="file-entry group">
                <span className="text-[var(--color-txt-dim)] text-[11px] shrink-0">{f.perms}</span>
                <span className="font-semibold" style={{ color: f.color }}>
                  {f.name}
                </span>
                <span className="text-[var(--color-txt-dim)] text-[11px] ml-auto">{f.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="px-6 md:px-12 py-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-txt-dim)]">
            &copy; 2026 Russell J. Adams
          </p>
          <div className="flex gap-4">
            <a
              href="/ceh-cram/"
              className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-txt-dim)] hover:text-[var(--color-cyan)] transition-colors no-underline"
            >
              CEH Cram Station
            </a>
            <span className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-txt-dim)]">
              Built by the symbiosis.
            </span>
          </div>
        </footer>
      </ClientShell>
    </>
  );
}
