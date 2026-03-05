import Nav from "@/components/Nav";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Russell J. Adams",
  description: "Penetration testing, security audits, network troubleshooting, and tech repair. Veteran-owned, CEH-certified.",
};

const SERVICES = [
  {
    title: "Penetration Testing",
    desc: "Find out where you're vulnerable before someone else does. Network, web application, and wireless assessments. I think like an attacker so you don't have to.",
    color: "var(--color-red)",
    details: ["Network penetration testing", "Web application security assessment", "Wireless security testing", "Social engineering evaluation", "Detailed findings report with remediation steps"],
  },
  {
    title: "Security Audits",
    desc: "Full security posture review — network hardening, access control, policy gaps. You get a clear report with prioritized fixes, not a sales pitch for more services.",
    color: "var(--color-cyan)",
    details: ["Network architecture review", "Firewall & access control audit", "Policy & compliance gap analysis", "Risk assessment & prioritization", "Actionable remediation roadmap"],
  },
  {
    title: "Network Troubleshooting",
    desc: "WiFi dead zones, slow connections, device conflicts, ISP issues. 4 years as a Spectrum field tech — I've seen it all and fixed it all.",
    color: "var(--color-amber)",
    details: ["WiFi coverage optimization", "Network performance diagnostics", "Router/switch configuration", "Structured cabling (Cat6, coax, fiber)", "Signal diagnostics to DOCSIS standards"],
  },
  {
    title: "Tech Repair",
    desc: "Malware removal, hardware diagnostics, data recovery, performance issues. Computers, networks, whatever. I find what's broken and fix it.",
    color: "var(--color-green)",
    details: ["Malware removal & system cleanup", "Hardware diagnostics & repair", "Data recovery", "Performance optimization", "Device setup & configuration"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main className="px-6 md:px-10 pt-28 pb-20 max-w-3xl">
        <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-text-muted)] tracking-widest uppercase mb-3">
          Services
        </div>
        <h1 className="font-[family-name:var(--font-chakra)] text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
          What I Do
        </h1>
        <p className="font-[family-name:var(--font-outfit)] text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-12 max-w-xl">
          Tech repair and offensive security. I know how systems work — and how they fail.{" "}
          <Link href="/contact" className="text-[var(--color-green)] hover:underline no-underline">
            Get in touch
          </Link>{" "}
          to discuss your needs.
        </p>

        <div className="space-y-6">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 md:p-8 transition-all duration-200 hover:border-[var(--color-border-hover)]"
              style={{ borderLeftWidth: 3, borderLeftColor: s.color }}
            >
              <h2
                className="font-[family-name:var(--font-chakra)] text-lg font-semibold mb-2"
                style={{ color: s.color }}
              >
                {s.title}
              </h2>
              <p className="font-[family-name:var(--font-outfit)] text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                {s.desc}
              </p>
              <ul className="space-y-1">
                {s.details.map((d) => (
                  <li
                    key={d}
                    className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-text-muted)] pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-[var(--color-text-muted)]"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="font-[family-name:var(--font-fira)] text-sm px-8 py-3 bg-[var(--color-green)] text-[var(--color-bg)] font-semibold no-underline hover:opacity-90 transition-opacity inline-block"
          >
            Start a conversation
          </Link>
        </div>
      </main>
    </>
  );
}
