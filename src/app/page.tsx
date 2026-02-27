"use client";

import RevealSection from "@/components/RevealSection";
import Nav from "@/components/Nav";
import Terminal from "@/components/Terminal";
import CredlyBadge from "@/components/CredlyBadge";
import ClientShell from "@/components/ClientShell";

const BADGES = [
  { label: "CEH", active: true },
  { label: "Google Cybersecurity", active: true },
  { label: "USAF Veteran", active: true },
  { label: "10+ Yrs Network/Telecom", active: true },
];

const TIMELINE = [
  {
    date: "2006 — 2010",
    role: "Operations Intelligence Analyst",
    company: "United States Air Force",
    color: "cyan" as const,
    details: [
      "Analyzed technical and operational intelligence data to support mission-critical decisions under strict deadlines",
      "Applied OPSEC protocols and maintained documentation discipline in high-tempo environments",
      "Processed and correlated multi-source data to identify patterns, threats, and actionable intelligence",
    ],
  },
  {
    date: "2017 — 2021",
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
    date: "2012 — 2017",
    role: "Technical Support",
    company: "Telecom Outsourcing & Call Centers",
    color: "red" as const,
    details: [
      "Troubleshot network connectivity, modem/router issues, and Wi-Fi configuration for telecom customers",
      "Documented cases, escalated security-relevant issues, and managed high-volume incident queues",
    ],
  },
  {
    date: "2021 — Present",
    role: "Delivery Associate",
    company: "Amazon Logistics · Grand Junction, CO",
    color: "green" as const,
    details: [
      "Recognized for reliability and performance (Driver of the Month); maintained accuracy across 180-200+ daily stops",
    ],
  },
];

const SKILL_GROUPS = [
  {
    icon: "\u{1F5A5}",
    title: "Networking",
    tags: ["TCP/IP", "DNS/DHCP", "Firewalls", "VPN", "Routing", "DOCSIS", "Wi-Fi Config"],
  },
  {
    icon: "\u{1F512}",
    title: "Security",
    tags: [
      "OPSEC",
      "Vulnerability Assessment",
      "Threat Analysis",
      "Incident Response",
      "Security Frameworks",
      "Cryptography",
    ],
  },
  {
    icon: "\u{1F4BB}",
    title: "Tools & Platforms",
    tags: [
      "Linux / Kali",
      "Wireshark",
      "Nmap",
      "Burp Suite",
      "Python",
      "SQL",
      "Bash",
    ],
  },
  {
    icon: "\u{1F527}",
    title: "Hands-On",
    tags: [
      "TryHackMe",
      "HackTheBox",
      "Network Diagnostics",
      "Structured Cabling",
      "Rack Building",
      "Signal Testing",
    ],
  },
];

const CERTS = [
  {
    code: "CEH",
    name: "Certified Ethical Hacker",
    issuer: "EC-Council",
    status: "Coursework Completed",
    complete: true,
  },
  {
    code: "GCC",
    name: "Google Cybersecurity Professional Certificate",
    issuer: "Google / Coursera",
    status: "Verified",
    complete: true,
    badgeId: "e4440991-5903-458d-b184-3b72584ad77b",
  },
  {
    code: "KU",
    name: "Mathematics, Algorithms & Security",
    issuer: "University of Kansas · 2010 – 2012",
    status: "Coursework Completed",
    complete: true,
  },
  {
    code: "USAF",
    name: "Operations Intelligence Analyst",
    issuer: "United States Air Force · 2006 – 2010",
    status: "Completed",
    complete: true,
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

          <div className="font-[family-name:var(--font-fira)] text-[13px] text-[var(--color-green)] tracking-[3px] uppercase mb-5 opacity-0 animate-[fadeInUp_0.7s_ease_2.2s_forwards]">
            // Security &bull; Networks &bull; Intelligence
          </div>

          <h1 className="font-[family-name:var(--font-chakra)] text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-4 opacity-0 animate-[fadeInUp_0.7s_ease_2.4s_forwards]">
            <span className="text-[var(--color-txt)]">Russell J.</span>
            <br />
            <span className="text-[var(--color-green)]">Adams</span>
          </h1>

          <p className="font-[family-name:var(--font-body)] text-lg md:text-2xl font-light text-[var(--color-txt-sec)] max-w-[650px] mb-10 opacity-0 animate-[fadeInUp_0.7s_ease_2.6s_forwards]">
            Grand Junction, CO
          </p>

          <div className="flex flex-wrap gap-3 opacity-0 animate-[fadeInUp_0.7s_ease_2.8s_forwards]">
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

          <div className="mt-8 opacity-0 animate-[fadeInUp_0.7s_ease_3s_forwards]">
            <iframe
              src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=1602223"
              style={{ border: "none" }}
              className="max-w-full"
            />
          </div>

          <div className="absolute bottom-10 left-8 md:left-[60px] font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-txt-dim)] tracking-[2px] opacity-0 animate-[fadeInUp_0.6s_ease_3s_forwards]">
            SCROLL
            <div className="w-px h-10 bg-gradient-to-b from-[var(--color-green-dim)] to-transparent mt-2 ml-1.5 animate-[scrollPulse_2s_ease-in-out_infinite]" />
          </div>
        </section>

        {/* ═══ TERMINAL ═══ */}
        <RevealSection id="terminal" className="px-8 md:px-[60px] py-[60px]">
          <div className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-amber)] tracking-[3px] uppercase mb-3">
            // Interactive
          </div>
          <h2 className="font-[family-name:var(--font-chakra)] text-3xl md:text-4xl font-bold text-[var(--color-txt)] mb-2">
            Terminal
          </h2>
          <p className="text-[var(--color-txt-sec)] mb-8 max-w-[600px]">
            Type{" "}
            <code className="text-[var(--color-green)] font-[family-name:var(--font-fira)]">
              help
            </code>{" "}
            to see available commands.
          </p>
          <Terminal />
        </RevealSection>

        {/* About section removed — the work speaks for itself */}

        {/* ═══ EXPERIENCE ═══ */}
        <RevealSection id="experience" className="px-8 md:px-[60px] py-[100px]">
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

        {/* ═══ SKILLS ═══ */}
        <RevealSection id="skills" className="px-8 md:px-[60px] py-[100px]">
          <div className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-amber)] tracking-[3px] uppercase mb-3">
            // Capabilities
          </div>
          <h2 className="font-[family-name:var(--font-chakra)] text-3xl md:text-4xl font-bold text-[var(--color-txt)] mb-10">
            Skills
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {SKILL_GROUPS.map((g) => (
              <div
                key={g.title}
                className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-7 transition-all duration-300 hover:border-[var(--color-green-dim)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,255,170,0.05)]"
              >
                <div className="text-2xl mb-3">{g.icon}</div>
                <div className="font-[family-name:var(--font-chakra)] text-base font-semibold text-[var(--color-txt)] mb-3.5">
                  {g.title}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.tags.map((t) => (
                    <span
                      key={t}
                      className="font-[family-name:var(--font-fira)] text-[11px] px-2.5 py-1 rounded bg-[rgba(0,255,170,0.06)] text-[var(--color-green-dim)] border border-[rgba(0,255,170,0.1)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* ═══ CERTIFICATIONS ═══ */}
        <RevealSection className="px-8 md:px-[60px] py-[100px]">
          <div className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-amber)] tracking-[3px] uppercase mb-3">
            // Credentials
          </div>
          <h2 className="font-[family-name:var(--font-chakra)] text-3xl md:text-4xl font-bold text-[var(--color-txt)] mb-10">
            Education & Certifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CERTS.map((c) => (
              <div
                key={c.code}
                className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-7 flex gap-5 items-start transition-all duration-300 hover:border-[var(--color-amber)] hover:bg-[var(--color-bg-card-hover)]"
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center font-[family-name:var(--font-fira)] text-sm font-semibold shrink-0 ${
                    c.complete
                      ? "bg-[rgba(0,255,170,0.1)] border border-[rgba(0,255,170,0.3)] text-[var(--color-green)]"
                      : "bg-[rgba(255,184,0,0.1)] border border-[rgba(255,184,0,0.3)] text-[var(--color-amber)]"
                  }`}
                >
                  {c.code}
                </div>
                <div className="flex-1">
                  <div className="font-[family-name:var(--font-chakra)] text-base font-semibold text-[var(--color-txt)] mb-0.5">
                    {c.name}
                  </div>
                  <div className="text-[13px] text-[var(--color-txt-sec)] mb-1.5">
                    {c.issuer}
                  </div>
                  <span
                    className={`font-[family-name:var(--font-fira)] text-[11px] px-2 py-0.5 rounded inline-block ${
                      c.complete
                        ? "bg-[rgba(0,255,170,0.08)] text-[var(--color-green)]"
                        : "bg-[rgba(255,184,0,0.1)] text-[var(--color-amber)]"
                    }`}
                  >
                    {c.status}
                  </span>
                  {"badgeId" in c && c.badgeId && (
                    <div className="mt-4">
                      <CredlyBadge badgeId={c.badgeId as string} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </RevealSection>

        {/* ═══ TOOLS ═══ */}
        <RevealSection id="tools" className="px-8 md:px-[60px] py-[100px]">
          <div className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-amber)] tracking-[3px] uppercase mb-3">
            // Resources
          </div>
          <h2 className="font-[family-name:var(--font-chakra)] text-3xl md:text-4xl font-bold text-[var(--color-txt)] mb-10">
            Tools
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <a
              href="/ceh-cram/"
              className="group bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-7 no-underline transition-all duration-300 hover:border-[var(--color-cyan)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,229,255,0.08)]"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.3)] text-[var(--color-cyan)] font-[family-name:var(--font-fira)] text-sm font-semibold shrink-0">
                  CEH
                </div>
                <div className="flex-1">
                  <div className="font-[family-name:var(--font-chakra)] text-base font-semibold text-[var(--color-txt)] mb-1 group-hover:text-[var(--color-cyan)] transition-colors">
                    CEH Cram Station
                  </div>
                  <div className="text-[13px] text-[var(--color-txt-sec)] mb-2">
                    424 questions with spaced repetition for the CEH v13 (312-50) exam.
                  </div>
                  <span className="font-[family-name:var(--font-fira)] text-[11px] px-2 py-0.5 rounded bg-[rgba(0,229,255,0.08)] text-[var(--color-cyan)]">
                    Free &middot; Open to all
                  </span>
                </div>
              </div>
            </a>
          </div>
        </RevealSection>

        {/* ═══ CONTACT ═══ */}
        <RevealSection id="contact" className="px-8 md:px-[60px] py-[100px] text-center">
          <div className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-amber)] tracking-[3px] uppercase mb-3">
            // Connect
          </div>
          <h2 className="font-[family-name:var(--font-chakra)] text-3xl md:text-4xl font-bold text-[var(--color-txt)] mb-2">
            Get In Touch
          </h2>
          <p className="text-[var(--color-txt-sec)] mb-8">
            Grand Junction, CO &mdash; Open to relocation for the right
            opportunity.
          </p>
          <div className="flex justify-center gap-5 flex-wrap">
            <a
              href="mailto:radams.starpointlogistics@gmail.com"
              className="flex items-center gap-2.5 px-6 py-3.5 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg no-underline text-[var(--color-txt-sec)] font-[family-name:var(--font-fira)] text-[13px] transition-all duration-300 hover:border-[var(--color-green-dim)] hover:text-[var(--color-green)] hover:-translate-y-0.5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              Email
            </a>
            <a
              href="https://tryhackme.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3.5 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg no-underline text-[var(--color-txt-sec)] font-[family-name:var(--font-fira)] text-[13px] transition-all duration-300 hover:border-[var(--color-green-dim)] hover:text-[var(--color-green)] hover:-translate-y-0.5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              TryHackMe
            </a>
          </div>
        </RevealSection>

        {/* ═══ FOOTER ═══ */}
        <footer className="px-8 md:px-[60px] py-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-txt-dim)]">
            &copy; 2026 Russell J. Adams
          </p>
          <p className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-txt-dim)]">
            Built from scratch.
          </p>
        </footer>
      </ClientShell>
    </>
  );
}
