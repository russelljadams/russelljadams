import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Russell J. Adams | What I Do",
  description:
    "IT, networking, and cybersecurity — from hands-on repair to infrastructure builds. Veteran-owned, CEH-certified.",
};

const CAPABILITIES = [
  {
    title: "Diagnostics & Repair",
    description:
      "Malware removal, hardware troubleshooting, performance issues, data recovery. I figure out what's wrong and fix it.",
    color: "var(--color-green)",
  },
  {
    title: "Networks & WiFi",
    description:
      "Home and small business network setup, WiFi optimization, cabling (Cat6, coax, fiber). 4 years as a Spectrum field tech.",
    color: "var(--color-amber)",
  },
  {
    title: "Security",
    description:
      "Vulnerability assessments, network hardening, security camera systems, smart home lockdown. CEH-certified.",
    color: "var(--color-cyan)",
  },
  {
    title: "Infrastructure",
    description:
      "Server builds, rack installs, managed IT for small businesses. From a single workstation to a full office buildout.",
    color: "var(--color-red)",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-txt)]">
      <section className="px-6 md:px-10 pt-28 pb-12 max-w-3xl mx-auto">
        <p className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)] tracking-widest uppercase mb-6">
          {"// What I Do"}
        </p>
        <h1 className="font-[family-name:var(--font-chakra)] text-3xl md:text-5xl font-bold text-[var(--color-green)] mb-6">
          I fix things and build things.
        </h1>
        <p className="font-[family-name:var(--font-outfit)] text-lg text-[var(--color-txt-sec)] leading-relaxed mb-4">
          10 years of telecom and networking. 4 years running cable and
          troubleshooting in the field. Air Force intelligence background.
          CEH certified. I know how systems work — and how they break.
        </p>
        <p className="font-[family-name:var(--font-outfit)] text-lg text-[var(--color-txt-sec)] leading-relaxed">
          If you&apos;ve got a tech problem, I can probably solve it. If you need
          something built, I can probably build it. Reach out and we&apos;ll talk.
        </p>
      </section>

      <section className="px-6 md:px-10 pb-12 max-w-3xl mx-auto">
        <div className="grid gap-4 md:grid-cols-2">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-5 hover:border-[var(--color-border)] transition-colors"
              style={{ borderLeftWidth: 3, borderLeftColor: cap.color }}
            >
              <h2
                className="font-[family-name:var(--font-chakra)] text-base font-semibold mb-2"
                style={{ color: cap.color }}
              >
                {cap.title}
              </h2>
              <p className="font-[family-name:var(--font-outfit)] text-sm text-[var(--color-txt-sec)] leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
        <ContactForm />
      </section>
    </main>
  );
}
