"use client";

import { useEffect, useState } from "react";
import RevealSection from "@/components/RevealSection";

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
      "Analyzed technical and operational intelligence data to support mission-critical decisions under strict deadlines.",
      "Applied operational security (OPSEC) protocols and maintained documentation discipline in high-tempo environments.",
      "Processed and correlated multi-source data to identify patterns, threats, and actionable intelligence.",
    ],
  },
  {
    date: "2017 – 2021",
    role: "Field Technician II",
    company: "Spectrum (Charter Communications)",
    color: "var(--color-amber)",
    bullets: [
      "Diagnosed and resolved network connectivity issues across residential and business environments.",
      "Performed signal diagnostics and troubleshooting to DOCSIS standards; configured routers, gateways, and access points.",
      "Built and maintained structured cabling infrastructure (Cat5e/Cat6, coax, fiber) with rack and cable management.",
    ],
  },
  {
    date: "2012 – 2017",
    role: "Technical Support",
    company: "Telecom Outsourcing & Call Centers",
    color: "var(--color-red)",
    bullets: [
      "Troubleshot network connectivity, modem/router issues, and Wi-Fi configuration for telecom customers.",
      "Documented cases, escalated security-relevant issues, and managed high-volume incident queues.",
    ],
  },
  {
    date: "2021 – Present",
    role: "Delivery Associate",
    company: "Amazon Logistics",
    color: "var(--color-green)",
    bullets: [
      "Recognized for reliability and performance (Driver of the Month); maintained accuracy across 180–200+ daily stops.",
    ],
  },
];

const EDUCATION = [
  {
    code: "GCC",
    name: "Google Cybersecurity Professional Certificate",
    detail: "Google (2025)",
    color: "var(--color-green)",
  },
  {
    code: "CEH",
    name: "Certified Ethical Hacker",
    detail: "EC-Council (2025)",
    color: "var(--color-green)",
  },
  {
    code: "KU",
    name: "Mathematics, Algorithms, Network Security, Cryptography",
    detail: "University of Kansas · 2010 – 2012",
    color: "var(--color-amber)",
  },
  {
    code: "USAF",
    name: "Intelligence Operations Specialist Course",
    detail: "United States Air Force · 2006 – 2010",
    color: "var(--color-cyan)",
  },
];

export default function ResumePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)]">
      {/* Minimal nav bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex justify-between items-center bg-[rgba(8,12,20,0.85)] backdrop-blur-[20px] border-b border-[var(--color-border)]">
        <a
          href="/"
          className="font-[family-name:var(--font-fira)] text-sm text-[var(--color-green)] font-semibold tracking-wide no-underline"
        >
          radams<span className="text-[var(--color-txt-dim)]">@</span>portfolio
          <span className="text-[var(--color-txt-dim)]">:~$</span>
        </a>
        <div className="flex gap-4 md:gap-7 items-center">
          <a
            href="/"
            className="font-[family-name:var(--font-fira)] text-[10px] md:text-xs text-[var(--color-txt-sec)] no-underline tracking-wide uppercase hover:text-[var(--color-green)] transition-colors"
          >
            Home
          </a>
          <a
            href="/Russell_J_Adams_Resume.pdf"
            download
            className="font-[family-name:var(--font-fira)] text-[10px] md:text-xs px-3 py-1.5 rounded border border-[var(--color-green-dim)] text-[var(--color-green)] bg-[rgba(0,255,170,0.05)] no-underline tracking-wide uppercase hover:bg-[rgba(0,255,170,0.12)] transition-colors flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            PDF
          </a>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-[120px] pb-16 px-8 md:px-[60px] relative overflow-hidden">
        <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] glow-green pointer-events-none" />

        <div
          className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <div className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-green)] tracking-[3px] uppercase mb-4">
            // Resume
          </div>

          <h1 className="font-[family-name:var(--font-chakra)] text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-3">
            <span className="text-[var(--color-txt)]">Russell J.</span>{" "}
            <span className="text-[var(--color-green)]">Adams</span>
          </h1>

          <p className="font-[family-name:var(--font-chakra)] text-lg md:text-xl text-[var(--color-txt-sec)] mb-5">
            Technician &middot; Veteran &middot; Technical Problem Solver
          </p>

          <div className="flex flex-wrap gap-4 font-[family-name:var(--font-fira)] text-[12px] text-[var(--color-txt-sec)]">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-green-dim)]">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Grand Junction, CO
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-green-dim)]">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              (970) 260-2840
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-green-dim)]">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              radams.starpointlogistics@gmail.com
            </span>
          </div>
        </div>
      </header>

      {/* Summary */}
      <RevealSection className="px-8 md:px-[60px] pb-16">
        <div className="max-w-[900px] bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-7 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-green)]" />
          <div className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-amber)] tracking-[3px] uppercase mb-3">
            // Summary
          </div>
          <p className="text-[15px] leading-relaxed text-[var(--color-txt-sec)]">
            Security-focused technician with 10+ years of network and telecom experience, backed by military
            intelligence analysis. Holds CEH and Google Cybersecurity Professional certifications. Background
            spans network diagnostics, infrastructure troubleshooting, and operational security. Seeking to
            apply analytical skills and technical foundation in a security analyst or SOC analyst role.
          </p>
        </div>
      </RevealSection>

      {/* Core Competencies */}
      <RevealSection className="px-8 md:px-[60px] pb-20">
        <div className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-amber)] tracking-[3px] uppercase mb-3">
          // Capabilities
        </div>
        <h2 className="font-[family-name:var(--font-chakra)] text-2xl md:text-3xl font-bold text-[var(--color-txt)] mb-6">
          Core Competencies
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {COMPETENCIES.map((c) => (
            <span
              key={c}
              className="font-[family-name:var(--font-fira)] text-[12px] px-4 py-2 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-txt-sec)] hover:border-[var(--color-green-dim)] hover:text-[var(--color-green)] hover:bg-[rgba(0,255,170,0.04)] transition-all duration-300 cursor-default"
            >
              {c}
            </span>
          ))}
        </div>
      </RevealSection>

      {/* Experience */}
      <RevealSection className="px-8 md:px-[60px] pb-20">
        <div className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-amber)] tracking-[3px] uppercase mb-3">
          // Career
        </div>
        <h2 className="font-[family-name:var(--font-chakra)] text-2xl md:text-3xl font-bold text-[var(--color-txt)] mb-8">
          Professional Experience
        </h2>

        <div className="max-w-[900px] space-y-5">
          {EXPERIENCE.map((job, i) => (
            <div
              key={i}
              className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-7 relative overflow-hidden transition-all duration-300 hover:border-[var(--color-border)] hover:bg-[var(--color-bg-card-hover)]"
            >
              <div
                className="absolute top-0 left-0 w-1 h-full"
                style={{ backgroundColor: job.color }}
              />
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-3">
                <div>
                  <div className="font-[family-name:var(--font-chakra)] text-lg font-semibold text-[var(--color-txt)]">
                    {job.role}
                  </div>
                  <div className="text-[14px] text-[var(--color-txt-sec)]">
                    {job.company}
                  </div>
                </div>
                <span
                  className="font-[family-name:var(--font-fira)] text-[11px] tracking-wide shrink-0"
                  style={{ color: job.color }}
                >
                  {job.date}
                </span>
              </div>
              <ul className="space-y-1.5">
                {job.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="text-[13px] text-[var(--color-txt-sec)] pl-5 relative before:content-['>'] before:absolute before:left-0 before:font-[family-name:var(--font-fira)] before:text-[11px] before:text-[var(--color-txt-dim)]"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* Education & Certifications */}
      <RevealSection className="px-8 md:px-[60px] pb-20">
        <div className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-amber)] tracking-[3px] uppercase mb-3">
          // Credentials
        </div>
        <h2 className="font-[family-name:var(--font-chakra)] text-2xl md:text-3xl font-bold text-[var(--color-txt)] mb-8">
          Education & Certifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px]">
          {EDUCATION.map((ed) => (
            <div
              key={ed.code}
              className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-6 flex gap-4 items-start transition-all duration-300 hover:border-[var(--color-green-dim)] hover:bg-[var(--color-bg-card-hover)]"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center font-[family-name:var(--font-fira)] text-xs font-semibold shrink-0 border"
                style={{
                  color: ed.color,
                  borderColor: ed.color,
                  backgroundColor: `color-mix(in srgb, ${ed.color} 8%, transparent)`,
                }}
              >
                {ed.code}
              </div>
              <div>
                <div className="font-[family-name:var(--font-chakra)] text-[15px] font-semibold text-[var(--color-txt)] mb-0.5">
                  {ed.name}
                </div>
                <div className="text-[13px] text-[var(--color-txt-sec)]">
                  {ed.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* Footer */}
      <footer className="px-8 md:px-[60px] py-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-txt-dim)]">
          &copy; 2026 Russell J. Adams
        </p>
        <a
          href="/"
          className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-txt-dim)] no-underline hover:text-[var(--color-green)] transition-colors"
        >
          russelljadams.com
        </a>
      </footer>
    </div>
  );
}
