import Nav from "@/components/Nav";
import RevealSection from "@/components/RevealSection";
import CredlyBadge from "@/components/CredlyBadge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Russell J. Adams",
  description: "Security-focused technician. CEH certified. USAF intelligence veteran. 10+ years network and telecom.",
};

const COMPETENCIES = [
  "Network Troubleshooting & Diagnostics",
  "TCP/IP, DNS, DHCP, Firewalls, VPNs",
  "Linux, Python, SQL, Bash",
  "OPSEC, Documentation & Reporting",
  "Security Monitoring & Incident Response",
  "SIEM Concepts & Log Analysis",
  "Vulnerability Assessment",
  "Security Frameworks (NIST, CIA Triad)",
];

const EXPERIENCE = [
  {
    date: "2006 – 2010",
    role: "Operations Intelligence Analyst",
    company: "United States Air Force",
    color: "var(--color-cyan)",
    bullets: [
      "Analyzed technical and operational intelligence data to support mission-critical decisions under strict deadlines",
      "Applied operational security (OPSEC) protocols and maintained documentation discipline in high-tempo environments",
      "Processed and correlated multi-source data to identify patterns, threats, and actionable intelligence",
    ],
  },
  {
    date: "2012 – 2017",
    role: "Technical Support",
    company: "Telecom Outsourcing & Call Centers",
    color: "var(--color-red)",
    bullets: [
      "Troubleshot network connectivity, modem/router issues, and Wi-Fi configuration for telecom customers",
      "Documented cases, escalated security-relevant issues, and managed high-volume incident queues",
    ],
  },
  {
    date: "2017 – 2021",
    role: "Field Technician II",
    company: "Spectrum (Charter Communications)",
    color: "var(--color-amber)",
    bullets: [
      "Diagnosed and resolved network connectivity issues across residential and business environments",
      "Performed signal diagnostics and troubleshooting to DOCSIS standards; configured routers, gateways, and access points",
      "Built and maintained structured cabling infrastructure (Cat5e/Cat6, coax, fiber) with rack and cable management",
    ],
  },
  {
    date: "2021 – Present",
    role: "Delivery Associate",
    company: "Amazon Logistics",
    color: "var(--color-green)",
    bullets: [
      "Recognized for reliability and performance (Driver of the Month); maintained accuracy across 180–200+ daily stops",
    ],
  },
];

const EDUCATION = [
  { code: "CEH", name: "Certified Ethical Hacker", detail: "EC-Council (2025)", color: "var(--color-green)" },
  { code: "GCC", name: "Google Cybersecurity Professional Certificate", detail: "Google (2025)", color: "var(--color-green)" },
  { code: "KU", name: "Mathematics, Algorithms, Network Security, Cryptography", detail: "University of Kansas · 2010 – 2012", color: "var(--color-amber)" },
  { code: "USAF", name: "Intelligence Operations Specialist Course", detail: "United States Air Force · 2006 – 2010", color: "var(--color-cyan)" },
];

export default function ResumePage() {
  return (
    <>
      <Nav />
      <main className="px-6 md:px-10 pt-28 pb-20 max-w-3xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-10">
          <div>
            <h1 className="font-[family-name:var(--font-chakra)] text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-2">
              Russell J. Adams
            </h1>
            <p className="font-[family-name:var(--font-outfit)] text-[15px] text-[var(--color-text-secondary)]">
              Cybersecurity &middot; Veteran &middot; Technical Operations
            </p>
            <div className="flex flex-wrap gap-4 mt-3 font-[family-name:var(--font-fira)] text-[12px] text-[var(--color-text-muted)]">
              <span>Grand Junction, CO</span>
              <span>(970) 260-2840</span>
              <span>radams.starpointlogistics@gmail.com</span>
            </div>
          </div>
          <a
            href="/Russell_J_Adams_Resume.pdf"
            download
            className="font-[family-name:var(--font-fira)] text-xs px-4 py-2 border border-[var(--color-green)] text-[var(--color-green)] no-underline hover:bg-[rgba(0,224,90,0.06)] transition-colors shrink-0 flex items-center gap-2"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </a>
        </div>

        {/* Summary */}
        <RevealSection className="mb-12">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 relative" style={{ borderLeftWidth: 3, borderLeftColor: "var(--color-green)" }}>
            <p className="font-[family-name:var(--font-outfit)] text-[15px] text-[var(--color-text-secondary)] leading-relaxed">
              Security-focused technician with 10+ years of network and telecom experience, backed by military intelligence analysis. Holds CEH and Google Cybersecurity Professional certifications. Background spans network diagnostics, infrastructure troubleshooting, and operational security. Seeking to apply analytical skills and technical foundation in a security analyst or SOC analyst role.
            </p>
          </div>
        </RevealSection>

        {/* Competencies */}
        <RevealSection className="mb-12">
          <h2 className="font-[family-name:var(--font-chakra)] text-xl font-bold text-[var(--color-text)] mb-4">
            Core Competencies
          </h2>
          <div className="flex flex-wrap gap-2">
            {COMPETENCIES.map((c) => (
              <span
                key={c}
                className="font-[family-name:var(--font-fira)] text-[12px] px-3 py-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
              >
                {c}
              </span>
            ))}
          </div>
        </RevealSection>

        {/* Experience */}
        <RevealSection className="mb-12">
          <h2 className="font-[family-name:var(--font-chakra)] text-xl font-bold text-[var(--color-text)] mb-6">
            Professional Experience
          </h2>
          <div className="space-y-5">
            {EXPERIENCE.map((job, i) => (
              <div
                key={i}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 relative"
                style={{ borderLeftWidth: 3, borderLeftColor: job.color }}
              >
                <div className="flex flex-col md:flex-row md:justify-between gap-1 mb-2">
                  <div>
                    <div className="font-[family-name:var(--font-chakra)] text-base font-semibold text-[var(--color-text)]">
                      {job.role}
                    </div>
                    <div className="font-[family-name:var(--font-outfit)] text-sm text-[var(--color-text-secondary)]">
                      {job.company}
                    </div>
                  </div>
                  <span className="font-[family-name:var(--font-fira)] text-[11px] shrink-0" style={{ color: job.color }}>
                    {job.date}
                  </span>
                </div>
                <ul className="space-y-1">
                  {job.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="font-[family-name:var(--font-outfit)] text-[13px] text-[var(--color-text-secondary)] pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-[var(--color-text-muted)]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Education */}
        <RevealSection className="mb-12">
          <h2 className="font-[family-name:var(--font-chakra)] text-xl font-bold text-[var(--color-text)] mb-6">
            Education & Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EDUCATION.map((ed) => (
              <div
                key={ed.code}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] p-5 flex gap-4 items-start"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center font-[family-name:var(--font-fira)] text-xs font-semibold shrink-0 border"
                  style={{ color: ed.color, borderColor: ed.color }}
                >
                  {ed.code}
                </div>
                <div>
                  <div className="font-[family-name:var(--font-chakra)] text-sm font-semibold text-[var(--color-text)] mb-0.5">
                    {ed.name}
                  </div>
                  <div className="font-[family-name:var(--font-outfit)] text-[12px] text-[var(--color-text-secondary)]">
                    {ed.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Badges */}
        <RevealSection>
          <h2 className="font-[family-name:var(--font-chakra)] text-xl font-bold text-[var(--color-text)] mb-6">
            Verified Credentials
          </h2>
          <div className="flex flex-wrap items-start gap-6">
            <iframe
              src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=1602223"
              style={{ border: "none" }}
              className="max-w-full"
            />
            <CredlyBadge badgeId="e4440991-5903-458d-b184-3b72584ad77b" />
          </div>
        </RevealSection>
      </main>
    </>
  );
}
