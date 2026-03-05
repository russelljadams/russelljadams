import ContactForm from "@/components/ContactForm";
import Nav from "@/components/Nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Russell J. Adams | What I Do",
  description:
    "Tech repair, security testing, and offensive security services. Veteran-owned, CEH-certified.",
};

const CAPABILITIES = [
  {
    title: "Tech Repair",
    description:
      "Malware removal, hardware diagnostics, data recovery, performance issues. I find what's broken and fix it — computers, networks, whatever.",
    color: "var(--color-green)",
  },
  {
    title: "Network Troubleshooting",
    description:
      "WiFi dead zones, slow connections, device conflicts, ISP issues. 4 years as a Spectrum field tech — I've seen it all.",
    color: "var(--color-amber)",
  },
  {
    title: "Penetration Testing",
    description:
      "Find out where you're vulnerable before someone else does. Network, web app, and wireless assessments. CEH-certified.",
    color: "var(--color-red)",
  },
  {
    title: "Security Audits",
    description:
      "Full security posture review — network hardening, access control, policy gaps. Clear report with prioritized fixes, not a sales pitch for more services.",
    color: "var(--color-cyan)",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-txt)]">
      <Nav />
      <section className="px-6 md:px-10 pt-28 pb-12 max-w-3xl mx-auto">
        <p className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)] tracking-widest uppercase mb-6">
          {"// What I Do"}
        </p>
        <h1 className="font-[family-name:var(--font-chakra)] text-3xl md:text-5xl font-bold text-[var(--color-green)] mb-6">
          I fix things and break into things.
        </h1>
        <p className="font-[family-name:var(--font-outfit)] text-lg text-[var(--color-txt-sec)] leading-relaxed mb-4">
          Tech repair and offensive security. Air Force intelligence
          background, CEH certified, 10+ years in networks and telecom.
          I know how systems work — and how they fail.
        </p>
        <p className="font-[family-name:var(--font-outfit)] text-lg text-[var(--color-txt-sec)] leading-relaxed">
          Broken laptop? I&apos;ll fix it. Want to know if your network is
          actually secure? I&apos;ll find out.
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
