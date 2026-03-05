"use client";

import ClientShell from "@/components/ClientShell";
import HackerNav from "@/components/HackerNav";
import SectionHeader from "@/components/SectionHeader";
import ContactForm from "@/components/ContactForm";
import AlienGlyph from "@/components/AlienGlyph";

const CAPABILITIES = [
  { name: "tech-repair", desc: "Malware removal, hardware diagnostics, data recovery, performance issues", color: "var(--color-green)" },
  { name: "network-ops", desc: "WiFi dead zones, slow connections, device conflicts, ISP troubleshooting", color: "var(--color-amber)" },
  { name: "pen-testing", desc: "Network, web app, and wireless vulnerability assessments. CEH-certified.", color: "var(--color-red)" },
  { name: "security-audit", desc: "Full security posture review — hardening, access control, policy gaps", color: "var(--color-cyan)" },
];

export default function ContactPage() {
  return (
    <ClientShell>
      <HackerNav />

      <main className="min-h-screen px-6 md:px-12 pt-[100px] pb-16 max-w-[900px] mx-auto">
        {/* Encrypted channel header */}
        <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-green)] mb-6">
          <pre className="leading-tight text-[10px] sm:text-xs">{`\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502  SECURE CHANNEL :: SIGNAL THE MOTHERSHIP  \u2502
\u2502  ENCRYPTION: AES-256-GCM                  \u2502
\u2502  STATUS: `}<span className="text-[var(--color-green)] animate-[signalBlink_1.5s_ease-in-out_infinite]">{`\u2588`}</span>{` LISTENING                     \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518`}</pre>
        </div>

        <SectionHeader category="Contact" title="Signal the Mothership" categoryColor="var(--color-green)" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact form */}
          <ContactForm />

          {/* Direct channels */}
          <div className="space-y-4">
            <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)] mb-2">
              $ cat /etc/contact.conf
            </div>
            <a
              href="mailto:radams.starpointlogistics@gmail.com"
              className="flex items-center gap-3 px-4 py-3 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg no-underline text-[var(--color-txt-sec)] font-[family-name:var(--font-fira)] text-[12px] transition-all hover:border-[var(--color-green-dim)] hover:text-[var(--color-green)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              radams.starpointlogistics@gmail.com
            </a>
            <a
              href="tel:+19702602840"
              className="flex items-center gap-3 px-4 py-3 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg no-underline text-[var(--color-txt-sec)] font-[family-name:var(--font-fira)] text-[12px] transition-all hover:border-[var(--color-green-dim)] hover:text-[var(--color-green)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              (970) 260-2840
            </a>
            <a
              href="https://github.com/russelljadams"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg no-underline text-[var(--color-txt-sec)] font-[family-name:var(--font-fira)] text-[12px] transition-all hover:border-[var(--color-green-dim)] hover:text-[var(--color-green)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              github.com/russelljadams
            </a>
            <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)] mt-4">
              Grand Junction, CO &mdash; Open to relocation
            </div>
          </div>
        </div>

        <AlienGlyph className="mb-8" />

        {/* Services as terminal output */}
        <div className="bg-black border border-[var(--color-border)] rounded-lg overflow-hidden">
          <div className="bg-[#161b22] px-4 py-2.5 flex items-center gap-2 border-b border-[var(--color-border)]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)] ml-3">
              capabilities
            </span>
          </div>
          <div className="p-5 font-[family-name:var(--font-fira)] text-[13px] leading-[1.8]">
            <div className="t-prompt">$ gh0st-capabilities --list-all</div>
            <br />
            {CAPABILITIES.map((cap) => (
              <div key={cap.name} className="mb-3">
                <span style={{ color: cap.color }}>{cap.name}</span>
                <br />
                <span className="text-[var(--color-txt-sec)] pl-4">{cap.desc}</span>
              </div>
            ))}
            <br />
            <div className="t-dim">4 capabilities loaded. Contact for engagement details.</div>
          </div>
        </div>
      </main>
    </ClientShell>
  );
}
