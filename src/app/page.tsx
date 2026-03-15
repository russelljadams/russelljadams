"use client";

import Nav from "@/components/Nav";
import RevealSection from "@/components/RevealSection";
import CredlyBadge from "@/components/CredlyBadge";
import ContactForm from "@/components/ContactForm";

const HERO_BADGES = [
  "CEH Certified",
  "Google Cybersecurity",
  "USAF Veteran",
  "10+ Yrs Network/Telecom",
];

/* ─── About ─── */
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

/* ─── Services ─── */
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

/* ─── Projects ─── */
interface Project {
  name: string;
  status: string;
  statusColor: string;
  description: string;
  tech: string[];
  link?: { label: string; href: string };
}

const PROJECTS: Project[] = [
  {
    name: "AlienRecon",
    status: "Active",
    statusColor: "var(--color-green)",
    description: "CLI tool that walks you through CTF rooms. Runs real tools against real targets while an instructor explains what you're doing and why. 40 TryHackMe walkthroughs so far.",
    tech: ["Python", "Typer", "Claude API", "Rich", "YAML"],
    link: { label: "alien37.com", href: "https://alien37.com" },
  },
  {
    name: "Gh0st Agent",
    status: "Active",
    statusColor: "var(--color-green)",
    description: "Personal agent that runs across my phone and cloud server. Handles recon tasks, voice commands, and coordinates work between devices.",
    tech: ["Python", "Claude API", "Tailscale"],
    link: { label: "GitHub", href: "https://github.com/russelljadams/gh0st-agent" },
  },
  {
    name: "CEH Cram Station",
    status: "Deployed",
    statusColor: "var(--color-cyan)",
    description: "Spaced repetition study app for the CEH v13 exam. 424 questions with category filtering, progress tracking, and streaks. No frameworks, just HTML/CSS/JS.",
    tech: ["HTML", "CSS", "JavaScript", "Spaced Repetition"],
    link: { label: "Live App", href: "/ceh-cram/" },
  },
  {
    name: "This Portfolio",
    status: "Active",
    statusColor: "var(--color-green)",
    description: "This site. Next.js on Vercel with JWT auth and a contact form dashboard.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Vercel KV"],
  },
];

/* ─── Resume ─── */
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

export default function Home() {
  return (
    <>
      <Nav />

      {/* ═══ HERO ═══ */}
      <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 pb-16 max-w-4xl">
        <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-green)] tracking-widest uppercase mb-6 opacity-0 animate-[fadeUp_0.5s_ease_0.1s_forwards]">
          Cybersecurity &bull; Networking &bull; Technical Services
        </div>

        <h1 className="font-[family-name:var(--font-chakra)] text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-5 opacity-0 animate-[fadeUp_0.5s_ease_0.2s_forwards]">
          <span className="text-[var(--color-text)]">I fix things.</span>
          <br />
          <span className="text-[var(--color-text)]">I </span>
          <span className="text-[var(--color-green)]">break into things.</span>
        </h1>

        <p className="font-[family-name:var(--font-outfit)] text-lg text-[var(--color-text-secondary)] mb-8 max-w-xl leading-relaxed opacity-0 animate-[fadeUp_0.5s_ease_0.3s_forwards]">
          CEH-certified security tech. USAF intelligence background, 10+ years in networks and telecom. Grand Junction, CO.
        </p>

        <div className="flex flex-wrap gap-3 mb-10 opacity-0 animate-[fadeUp_0.5s_ease_0.4s_forwards]">
          <a
            href="#contact"
            className="font-[family-name:var(--font-fira)] text-sm px-6 py-3 bg-[var(--color-green)] text-[var(--color-bg)] font-semibold no-underline hover:opacity-90 transition-opacity"
          >
            Get in touch
          </a>
          <a
            href="#services"
            className="font-[family-name:var(--font-fira)] text-sm px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] no-underline hover:border-[var(--color-green)] hover:text-[var(--color-green)] transition-colors"
          >
            What I do
          </a>
          <a
            href="#resume"
            className="font-[family-name:var(--font-fira)] text-sm px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] no-underline hover:border-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            Resume
          </a>
        </div>

        <div className="flex flex-wrap gap-2 opacity-0 animate-[fadeUp_0.5s_ease_0.5s_forwards]">
          {HERO_BADGES.map((b) => (
            <span
              key={b}
              className="font-[family-name:var(--font-fira)] text-[11px] px-3 py-1.5 border border-[var(--color-border)] text-[var(--color-text-secondary)] bg-[var(--color-surface)]"
            >
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="px-6 md:px-10 py-20 border-t border-[var(--color-border)]">
        <div className="max-w-3xl">
          <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-text-muted)] tracking-widest uppercase mb-3">
            About
          </div>
          <h2 className="font-[family-name:var(--font-chakra)] text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-6">
            Background
          </h2>

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
          <h3 className="font-[family-name:var(--font-chakra)] text-2xl font-bold text-[var(--color-text)] mb-8">
            Timeline
          </h3>

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
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="px-6 md:px-10 py-20 border-t border-[var(--color-border)]">
        <div className="max-w-3xl">
          <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-text-muted)] tracking-widest uppercase mb-3">
            Services
          </div>
          <h2 className="font-[family-name:var(--font-chakra)] text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-4">
            What I Do
          </h2>
          <p className="font-[family-name:var(--font-outfit)] text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-12 max-w-xl">
            Tech repair and offensive security. I know how systems work — and how they fail.{" "}
            <a href="#contact" className="text-[var(--color-green)] hover:underline no-underline">
              Get in touch
            </a>{" "}
            to discuss your needs.
          </p>

          <div className="space-y-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 md:p-8 transition-all duration-200 hover:border-[var(--color-border-hover)]"
                style={{ borderLeftWidth: 3, borderLeftColor: s.color }}
              >
                <h3
                  className="font-[family-name:var(--font-chakra)] text-lg font-semibold mb-2"
                  style={{ color: s.color }}
                >
                  {s.title}
                </h3>
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
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section id="projects" className="px-6 md:px-10 py-20 border-t border-[var(--color-border)]">
        <div className="max-w-3xl">
          <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-text-muted)] tracking-widest uppercase mb-3">
            Projects
          </div>
          <h2 className="font-[family-name:var(--font-chakra)] text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-4">
            Projects
          </h2>
          <p className="font-[family-name:var(--font-outfit)] text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-12">
            Things I work on.
          </p>

          <div className="space-y-5">
            {PROJECTS.map((p) => (
              <div
                key={p.name}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 md:p-8 transition-all duration-200 hover:border-[var(--color-border-hover)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-[family-name:var(--font-chakra)] text-lg font-semibold text-[var(--color-text)]">
                    {p.name}
                  </h3>
                  <span
                    className="font-[family-name:var(--font-fira)] text-[10px] px-2 py-0.5 border uppercase tracking-wider"
                    style={{ color: p.statusColor, borderColor: p.statusColor }}
                  >
                    {p.status}
                  </span>
                </div>

                <p className="font-[family-name:var(--font-outfit)] text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="font-[family-name:var(--font-fira)] text-[10px] px-2 py-1 bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {p.link && (
                  <a
                    href={p.link.href}
                    target={p.link.href.startsWith("http") ? "_blank" : undefined}
                    rel={p.link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-green)] no-underline hover:underline"
                  >
                    {p.link.label} &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RESUME ═══ */}
      <section id="resume" className="px-6 md:px-10 py-20 border-t border-[var(--color-border)]">
        <div className="max-w-3xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-10">
            <div>
              <h2 className="font-[family-name:var(--font-chakra)] text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-2">
                Resume
              </h2>
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
            <h3 className="font-[family-name:var(--font-chakra)] text-xl font-bold text-[var(--color-text)] mb-4">
              Core Competencies
            </h3>
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
            <h3 className="font-[family-name:var(--font-chakra)] text-xl font-bold text-[var(--color-text)] mb-6">
              Professional Experience
            </h3>
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
            <h3 className="font-[family-name:var(--font-chakra)] text-xl font-bold text-[var(--color-text)] mb-6">
              Education & Certifications
            </h3>
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
            <h3 className="font-[family-name:var(--font-chakra)] text-xl font-bold text-[var(--color-text)] mb-6">
              Verified Credentials
            </h3>
            <div className="flex flex-wrap items-start gap-6">
              <iframe
                src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=1602223"
                style={{ border: "none" }}
                className="max-w-full"
              />
              <CredlyBadge badgeId="e4440991-5903-458d-b184-3b72584ad77b" />
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="px-6 md:px-10 py-20 border-t border-[var(--color-border)]">
        <div className="max-w-3xl">
          <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-text-muted)] tracking-widest uppercase mb-3">
            Contact
          </div>
          <h2 className="font-[family-name:var(--font-chakra)] text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-4">
            Get in Touch
          </h2>
          <p className="font-[family-name:var(--font-outfit)] text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-10">
            Need a security assessment? Tech repair? Just want to talk shop? Drop me a line.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContactForm />

            <div className="space-y-4">
              <a
                href="mailto:radams.starpointlogistics@gmail.com"
                className="flex items-center gap-3 px-5 py-4 bg-[var(--color-surface)] border border-[var(--color-border)] no-underline text-[var(--color-text-secondary)] font-[family-name:var(--font-fira)] text-[13px] transition-all hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                radams.starpointlogistics@gmail.com
              </a>
              <a
                href="tel:+19702602840"
                className="flex items-center gap-3 px-5 py-4 bg-[var(--color-surface)] border border-[var(--color-border)] no-underline text-[var(--color-text-secondary)] font-[family-name:var(--font-fira)] text-[13px] transition-all hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                (970) 260-2840
              </a>
              <a
                href="https://github.com/russelljadams"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-4 bg-[var(--color-surface)] border border-[var(--color-border)] no-underline text-[var(--color-text-secondary)] font-[family-name:var(--font-fira)] text-[13px] transition-all hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                github.com/russelljadams
              </a>
              <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-text-muted)] mt-4 px-1">
                Grand Junction, CO &mdash; Open to relocation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="px-6 md:px-10 py-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-text-muted)]">
          &copy; 2026 Russell J. Adams
        </p>
        <div className="flex gap-5">
          <a
            href="https://alien37.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-text-muted)] no-underline hover:text-[var(--color-green)] transition-colors"
          >
            AlienRecon
          </a>
          <a
            href="https://github.com/russelljadams"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-text-muted)] no-underline hover:text-[var(--color-green)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="/ceh-cram/"
            className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-text-muted)] no-underline hover:text-[var(--color-cyan)] transition-colors"
          >
            CEH Cram
          </a>
          <a
            href="#contact"
            className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-text-muted)] no-underline hover:text-[var(--color-green)] transition-colors"
          >
            Contact
          </a>
        </div>
      </footer>
    </>
  );
}
