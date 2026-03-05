"use client";

import RevealSection from "@/components/RevealSection";
import Nav from "@/components/Nav";
import Terminal from "@/components/Terminal";
import ClientShell from "@/components/ClientShell";
import ReconReport from "@/components/ReconReport";
import ContactForm from "@/components/ContactForm";

const BADGES = [
  { label: "CEH", active: true },
  { label: "Google Cybersecurity", active: true },
  { label: "USAF Veteran", active: true },
  { label: "10+ Yrs Network/Telecom", active: true },
];

const CAPABILITIES = [
  {
    title: "Tech Repair",
    description:
      "Malware removal, hardware diagnostics, data recovery, performance issues. I find what\u2019s broken and fix it.",
    color: "var(--color-green)",
  },
  {
    title: "Network Troubleshooting",
    description:
      "WiFi dead zones, slow connections, device conflicts, ISP issues. 4 years as a Spectrum field tech.",
    color: "var(--color-amber)",
  },
  {
    title: "Penetration Testing",
    description:
      "Find out where you\u2019re vulnerable before someone else does. Network, web app, and wireless assessments. CEH-certified.",
    color: "var(--color-red)",
  },
  {
    title: "Security Audits",
    description:
      "Full security posture review \u2014 network hardening, access control, policy gaps. Clear report with prioritized fixes.",
    color: "var(--color-cyan)",
  },
];

const TIMELINE = [
  {
    date: "2021 \u2014 Present",
    role: "Delivery Associate",
    company: "Amazon Logistics \u00b7 Grand Junction, CO",
    color: "green" as const,
    details: [
      "Recognized for reliability and performance (Driver of the Month); maintained accuracy across 180-200+ daily stops",
    ],
  },
  {
    date: "2017 \u2014 2021",
    role: "Field Technician II",
    company: "Spectrum (Charter Communications)",
    color: "amber" as const,
    details: [
      "Diagnosed and resolved network connectivity issues across residential and business environments",
      "Performed signal diagnostics and troubleshooting to DOCSIS standards; configured routers, gateways, and access points",
      "Built and maintained structured cabling infrastructure (Cat5e/Cat6, coax, fiber) with rack and cable management",
    ],
  },
  {
    date: "2012 \u2014 2017",
    role: "Technical Support",
    company: "Telecom Outsourcing & Call Centers",
    color: "red" as const,
    details: [
      "Troubleshot network connectivity, modem/router issues, and Wi-Fi configuration for telecom customers",
      "Documented cases, escalated security-relevant issues, and managed high-volume incident queues",
    ],
  },
  {
    date: "2006 \u2014 2010",
    role: "Operations Intelligence Analyst",
    company: "United States Air Force",
    color: "cyan" as const,
    details: [
      "Analyzed technical and operational intelligence data to support mission-critical decisions under strict deadlines",
      "Applied OPSEC protocols and maintained documentation discipline in high-tempo environments",
      "Processed and correlated multi-source data to identify patterns, threats, and actionable intelligence",
    ],
  },
];

const COLOR_MAP = {
  green: "var(--color-green)",
  amber: "var(--color-amber)",
  red: "var(--color-red)",
  cyan: "var(--color-cyan)",
};

export default function Home() {
  return (
    <>
      <ClientShell>
        <Nav />

        {/* ═══ HERO ═══ */}
        <section
          id="hero"
          className="min-h-screen flex flex-col justify-center px-8 md:px-[60px] pt-[120px] pb-20 relative overflow-hidden"
        >
          <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] glow-green pointer-events-none" />

          {/* // Security . Repair . Red Team */}
          <div className="font-[family-name:var(--font-fira)] text-[13px] text-[var(--color-green)] tracking-[3px] uppercase mb-5 opacity-0 animate-[fadeInUp_0.7s_ease_0.1s_forwards]">
            // Security &bull; Repair &bull; Red Team
          </div>

          <h1 className="font-[family-name:var(--font-chakra)] text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-4 opacity-0 animate-[fadeInUp_0.7s_ease_0.2s_forwards]">
            <span className="text-[var(--color-txt)]">I fix things</span>
            <br />
            <span className="text-[var(--color-txt)]">and </span>
            <span className="text-[var(--color-green)]">break into things.</span>
          </h1>

          <p className="font-[family-name:var(--font-chakra)] text-lg md:text-xl text-[var(--color-txt-sec)] mb-6 max-w-[600px] opacity-0 animate-[fadeInUp_0.7s_ease_0.35s_forwards]">
            USAF intel vet &middot; CEH certified &middot; 10+ years networks &amp; telecom &middot; Grand Junction, CO
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mb-8 opacity-0 animate-[fadeInUp_0.7s_ease_0.5s_forwards]">
            <a
              href="#contact"
              className="px-6 py-3 bg-[var(--color-green)] text-[var(--color-bg-deep)] font-[family-name:var(--font-fira)] text-sm font-semibold rounded hover:opacity-90 transition-opacity no-underline"
            >
              Get In Touch
            </a>
            <a
              href="#services"
              className="px-6 py-3 border border-[var(--color-green-dim)] text-[var(--color-green)] font-[family-name:var(--font-fira)] text-sm rounded hover:bg-[rgba(0,255,170,0.08)] transition-colors no-underline"
            >
              What I Do
            </a>
            <a
              href="/resume"
              className="px-6 py-3 border border-[var(--color-border)] text-[var(--color-txt-sec)] font-[family-name:var(--font-fira)] text-sm rounded hover:border-[var(--color-green-dim)] hover:text-[var(--color-green)] transition-colors no-underline"
            >
              Resume
            </a>
          </div>

          {/* Credential badges */}
          <div className="flex flex-wrap gap-3 opacity-0 animate-[fadeInUp_0.7s_ease_0.65s_forwards]">
            {BADGES.map((b) => (
              <span
                key={b.label}
                className={`font-[family-name:var(--font-fira)] text-[11px] px-3.5 py-1.5 border rounded ${
                  b.active
                    ? "border-[var(--color-green-dim)] text-[var(--color-green)] bg-[rgba(0,255,170,0.05)]"
                    : "border-[var(--color-border)] text-[var(--color-txt-sec)] bg-[var(--color-bg-card)]"
                }`}
              >
                {b.label}
              </span>
            ))}
          </div>

          <div className="absolute bottom-10 left-8 md:left-[60px] font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-txt-dim)] tracking-[2px] opacity-0 animate-[fadeInUp_0.6s_ease_0.8s_forwards]">
            SCROLL
            <div className="w-px h-10 bg-gradient-to-b from-[var(--color-green-dim)] to-transparent mt-2 ml-1.5 animate-[scrollPulse_2s_ease-in-out_infinite]" />
          </div>
        </section>

        {/* ═══ SERVICES ═══ */}
        <RevealSection id="services" className="px-8 md:px-[60px] py-[80px]">
          <div className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-amber)] tracking-[3px] uppercase mb-3">
            // What I Do
          </div>
          <h2 className="font-[family-name:var(--font-chakra)] text-3xl md:text-4xl font-bold text-[var(--color-txt)] mb-4">
            Services
          </h2>
          <p className="text-[var(--color-txt-sec)] mb-8 max-w-[600px]">
            Tech repair and offensive security. I know how systems work — and how they fail.{" "}
            <a href="#contact" className="text-[var(--color-green)] hover:underline">Get in touch</a> to discuss your needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[800px]">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-6 transition-all duration-300 hover:-translate-y-1"
                style={{ borderLeftWidth: 3, borderLeftColor: cap.color }}
              >
                <h3
                  className="font-[family-name:var(--font-chakra)] text-base font-semibold mb-2"
                  style={{ color: cap.color }}
                >
                  {cap.title}
                </h3>
                <p className="font-[family-name:var(--font-outfit)] text-sm text-[var(--color-txt-sec)] leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* ═══ RECON REPORT ═══ */}
        <RevealSection id="credentials" className="px-8 md:px-[60px] py-[80px]">
          <div className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-amber)] tracking-[3px] uppercase mb-3">
            // Credentials
          </div>
          <h2 className="font-[family-name:var(--font-chakra)] text-3xl md:text-4xl font-bold text-[var(--color-txt)] mb-8">
            Recon Report
          </h2>

          <div className="max-w-[800px]">
            <ReconReport />
          </div>
        </RevealSection>

        {/* ═══ EXPERIENCE ═══ */}
        <RevealSection id="experience" className="px-8 md:px-[60px] py-[80px]">
          <div className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-amber)] tracking-[3px] uppercase mb-3">
            // Career
          </div>
          <h2 className="font-[family-name:var(--font-chakra)] text-3xl md:text-4xl font-bold text-[var(--color-txt)] mb-10">
            Experience
          </h2>

          <div className="max-w-[800px] relative pl-10">
            <div className="timeline-line" />
            {TIMELINE.map((t, i) => (
              <div key={i} className="pb-12 relative">
                <div
                  className="absolute -left-[45px] top-1.5 w-3 h-3 rounded-full border-2 bg-[var(--color-bg-deep)]"
                  style={{ borderColor: COLOR_MAP[t.color] }}
                />
                <div
                  className="font-[family-name:var(--font-fira)] text-xs tracking-wide mb-1"
                  style={{ color: COLOR_MAP[t.color] }}
                >
                  {t.date}
                </div>
                <div className="font-[family-name:var(--font-chakra)] text-xl font-semibold text-[var(--color-txt)] mb-0.5">
                  {t.role}
                </div>
                <div className="text-[15px] text-[var(--color-txt-sec)] mb-3">
                  {t.company}
                </div>
                <ul className="list-none space-y-1">
                  {t.details.map((d, j) => (
                    <li
                      key={j}
                      className="text-sm text-[var(--color-txt-sec)] pl-5 relative before:content-['>'] before:absolute before:left-0 before:text-[var(--color-txt-dim)] before:font-[family-name:var(--font-fira)] before:text-xs"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* ═══ TERMINAL ═══ */}
        <RevealSection id="terminal" className="px-8 md:px-[60px] py-[60px]">
          <div className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-amber)] tracking-[3px] uppercase mb-3">
            // Interactive
          </div>
          <h2 className="font-[family-name:var(--font-chakra)] text-3xl md:text-4xl font-bold text-[var(--color-txt)] mb-2">
            Terminal
          </h2>
          <p className="text-[var(--color-txt-sec)] mb-8 max-w-[600px]">
            Poke around. Type{" "}
            <code className="text-[var(--color-green)] font-[family-name:var(--font-fira)]">
              help
            </code>{" "}
            to see available commands.
          </p>
          <div className="max-w-[700px]" style={{ height: "320px" }}>
            <Terminal />
          </div>
        </RevealSection>

        {/* ═══ CONTACT ═══ */}
        <RevealSection id="contact" className="px-8 md:px-[60px] py-[80px]">
          <div className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-amber)] tracking-[3px] uppercase mb-3">
            // Connect
          </div>
          <h2 className="font-[family-name:var(--font-chakra)] text-3xl md:text-4xl font-bold text-[var(--color-txt)] mb-2">
            Get In Touch
          </h2>
          <p className="text-[var(--color-txt-sec)] mb-8">
            Grand Junction, CO &mdash; Open to relocation for the right opportunity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px]">
            <ContactForm />

            <div className="space-y-5">
              <a
                href="mailto:radams.starpointlogistics@gmail.com"
                className="flex items-center gap-3 px-5 py-4 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg no-underline text-[var(--color-txt-sec)] font-[family-name:var(--font-fira)] text-[13px] transition-all duration-300 hover:border-[var(--color-green-dim)] hover:text-[var(--color-green)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                radams.starpointlogistics@gmail.com
              </a>
              <a
                href="tel:+19702602840"
                className="flex items-center gap-3 px-5 py-4 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg no-underline text-[var(--color-txt-sec)] font-[family-name:var(--font-fira)] text-[13px] transition-all duration-300 hover:border-[var(--color-green-dim)] hover:text-[var(--color-green)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                (970) 260-2840
              </a>
              <a
                href="https://tryhackme.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-4 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg no-underline text-[var(--color-txt-sec)] font-[family-name:var(--font-fira)] text-[13px] transition-all duration-300 hover:border-[var(--color-green-dim)] hover:text-[var(--color-green)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                TryHackMe
              </a>
              <a
                href="/services"
                className="flex items-center gap-3 px-5 py-4 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg no-underline text-[var(--color-txt-sec)] font-[family-name:var(--font-fira)] text-[13px] transition-all duration-300 hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
                Full Services Page
              </a>
            </div>
          </div>
        </RevealSection>

        {/* ═══ FOOTER ═══ */}
        <footer className="px-8 md:px-[60px] py-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-2">
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
              Built from scratch.
            </span>
          </div>
        </footer>
      </ClientShell>
    </>
  );
}
