import Nav from "@/components/Nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Russell J. Adams",
  description: "USAF intelligence veteran, CEH-certified security professional with 10+ years in network and telecom.",
};

const TIMELINE = [
  {
    date: "2006 – 2010",
    role: "Operations Intelligence Analyst",
    org: "United States Air Force",
    color: "var(--color-cyan)",
    details: [
      "Analyzed technical and operational intelligence data to support mission-critical decisions under strict deadlines",
      "Applied OPSEC protocols and maintained documentation discipline in high-tempo environments",
      "Processed and correlated multi-source data to identify patterns, threats, and actionable intelligence",
    ],
  },
  {
    date: "2010 – 2012",
    role: "Mathematics & Computer Science",
    org: "University of Kansas",
    color: "var(--color-amber)",
    details: [
      "Coursework in algorithms, network security, and cryptography",
    ],
  },
  {
    date: "2012 – 2017",
    role: "Technical Support",
    org: "Telecom Outsourcing & Call Centers",
    color: "var(--color-red)",
    details: [
      "Troubleshot network connectivity, modem/router issues, and Wi-Fi configuration",
      "Documented cases, escalated security-relevant issues, managed high-volume incident queues",
    ],
  },
  {
    date: "2017 – 2021",
    role: "Field Technician II",
    org: "Spectrum (Charter Communications)",
    color: "var(--color-amber)",
    details: [
      "Diagnosed and resolved network connectivity issues across residential and business environments",
      "Signal diagnostics and troubleshooting to DOCSIS standards; configured routers, gateways, and APs",
      "Built and maintained structured cabling infrastructure (Cat5e/Cat6, coax, fiber)",
    ],
  },
  {
    date: "2021 – Present",
    role: "Delivery Associate",
    org: "Amazon Logistics",
    color: "var(--color-green)",
    details: [
      "Recognized for reliability and performance (Driver of the Month); 180–200+ daily stops",
    ],
  },
  {
    date: "2025",
    role: "CEH & Google Cybersecurity Certifications",
    org: "EC-Council / Google",
    color: "var(--color-green)",
    details: [
      "Certified Ethical Hacker (CEH v13) — EC-Council",
      "Google Cybersecurity Professional Certificate",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="px-6 md:px-10 pt-28 pb-20 max-w-3xl">
        <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-text-muted)] tracking-widest uppercase mb-3">
          About
        </div>
        <h1 className="font-[family-name:var(--font-chakra)] text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-6">
          Background
        </h1>

        <div className="font-[family-name:var(--font-outfit)] text-[15px] text-[var(--color-text-secondary)] leading-relaxed space-y-4 mb-16">
          <p>
            I&apos;m a security-focused technician with roots in military intelligence. I spent four years as an Operations Intelligence Analyst in the Air Force, then moved into telecom — first on the phones, then in the field running cable and diagnosing networks for Spectrum.
          </p>
          <p>
            That background gave me a deep understanding of how networks work at every layer. Now I apply that to offensive security — finding vulnerabilities, testing defenses, and helping people understand their actual risk.
          </p>
          <p>
            I hold the <span className="text-[var(--color-green)]">Certified Ethical Hacker (CEH)</span> and <span className="text-[var(--color-green)]">Google Cybersecurity Professional</span> certifications. I&apos;m based in Grand Junction, CO, and I&apos;m looking for opportunities in security analysis, SOC operations, or penetration testing.
          </p>
        </div>

        {/* Timeline */}
        <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-text-muted)] tracking-widest uppercase mb-3">
          Career
        </div>
        <h2 className="font-[family-name:var(--font-chakra)] text-2xl font-bold text-[var(--color-text)] mb-8">
          Timeline
        </h2>

        <div className="relative pl-8 border-l border-[var(--color-border)] space-y-8">
          {TIMELINE.map((t, i) => (
            <div key={i} className="relative">
              <div
                className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full border-2 bg-[var(--color-bg)]"
                style={{ borderColor: t.color }}
              />
              <div className="font-[family-name:var(--font-fira)] text-xs mb-1" style={{ color: t.color }}>
                {t.date}
              </div>
              <div className="font-[family-name:var(--font-chakra)] text-lg font-semibold text-[var(--color-text)] mb-0.5">
                {t.role}
              </div>
              <div className="font-[family-name:var(--font-outfit)] text-sm text-[var(--color-text-secondary)] mb-2">
                {t.org}
              </div>
              <ul className="space-y-1">
                {t.details.map((d, j) => (
                  <li
                    key={j}
                    className="font-[family-name:var(--font-outfit)] text-sm text-[var(--color-text-secondary)] pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-[var(--color-text-muted)]"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
