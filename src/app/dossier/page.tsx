"use client";

import ClientShell from "@/components/ClientShell";
import HackerNav from "@/components/HackerNav";
import ClassifiedStamp from "@/components/ClassifiedStamp";
import SectionHeader from "@/components/SectionHeader";
import RevealSection from "@/components/RevealSection";
import AlienGlyph from "@/components/AlienGlyph";

const TIMELINE = [
  {
    date: "2006 \u2013 2010",
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
    date: "2010 \u2013 2012",
    role: "Mathematics & Computer Science",
    org: "University of Kansas",
    color: "var(--color-amber)",
    details: [
      "Algorithms, Network Security, Cryptography coursework",
    ],
  },
  {
    date: "2012 \u2013 2017",
    role: "Technical Support",
    org: "Telecom Outsourcing & Call Centers",
    color: "var(--color-red)",
    details: [
      "Troubleshot network connectivity, modem/router issues, and Wi-Fi configuration for telecom customers",
      "Documented cases, escalated security-relevant issues, and managed high-volume incident queues",
    ],
  },
  {
    date: "2017 \u2013 2021",
    role: "Field Technician II",
    org: "Spectrum (Charter Communications)",
    color: "var(--color-amber)",
    details: [
      "Diagnosed and resolved network connectivity issues across residential and business environments",
      "Performed signal diagnostics and troubleshooting to DOCSIS standards; configured routers, gateways, and access points",
      "Built and maintained structured cabling infrastructure (Cat5e/Cat6, coax, fiber) with rack and cable management",
    ],
  },
  {
    date: "2021 \u2013 Present",
    role: "Delivery Associate + Security Operations",
    org: "Amazon Logistics / Independent",
    color: "var(--color-green)",
    details: [
      "Recognized for reliability and performance (Driver of the Month); maintained accuracy across 180-200+ daily stops",
      "Built Gh0st Agent AI infrastructure \u2014 117-tool autonomous agent across 3 devices",
      "Earned CEH and Google Cybersecurity Professional certifications",
    ],
  },
];

const ASSETS = [
  { name: "Gh0st Agent v2", desc: "Autonomous AI agent \u2014 117 MCP tools, ReAct reasoning, persistent memory", status: "ACTIVE" },
  { name: "Pixel 6a Field Terminal", desc: "Rooted mobile sensor platform \u2014 36 MCP tools, root access, GPS/WiFi/BT", status: "DEPLOYED" },
  { name: "Windows GPU Box", desc: "3080 Ti compute node \u2014 Ollama, Qdrant, Claude Code", status: "ACTIVE" },
  { name: "Kali VM", desc: "Offensive security platform \u2014 28 MCP tools, full toolkit", status: "ACTIVE" },
];

export default function DossierPage() {
  return (
    <ClientShell>
      <HackerNav />

      <main className="min-h-screen px-6 md:px-12 pt-[100px] pb-16 max-w-[900px] mx-auto relative">
        {/* Classification banner */}
        <div className="font-[family-name:var(--font-fira)] text-[10px] text-[var(--color-amber)] tracking-[4px] uppercase border border-[var(--color-amber)] px-4 py-2 mb-8 text-center opacity-60">
          CLASSIFICATION: UNCLASSIFIED // FOR PUBLIC RELEASE
        </div>

        {/* File header */}
        <div className="relative mb-12">
          <ClassifiedStamp text="DECLASSIFIED" />
          <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)] mb-2">
            FILE: A1I3N-2026-001
          </div>
          <SectionHeader category="Dossier" title="Subject Profile" categoryColor="var(--color-red)" />
        </div>

        {/* Subject info */}
        <RevealSection className="mb-12">
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-6 space-y-3">
            <div className="grid grid-cols-[120px_1fr] gap-y-2 font-[family-name:var(--font-fira)] text-sm">
              <span className="text-[var(--color-txt-dim)]">SUBJECT:</span>
              <span className="text-[var(--color-txt)]">Russell J. Adams</span>

              <span className="text-[var(--color-txt-dim)]">HANDLE:</span>
              <span className="text-[var(--color-green)]">a1i3n37x</span>

              <span className="text-[var(--color-txt-dim)]">LOCATION:</span>
              <span className="text-[var(--color-txt)]">Grand Junction, CO</span>

              <span className="text-[var(--color-txt-dim)]">STATUS:</span>
              <span className="text-[var(--color-green)]">ACTIVE</span>

              <span className="text-[var(--color-txt-dim)]">CLEARANCE:</span>
              <span className="redacted">SECRET // USAF Intelligence</span>

              <span className="text-[var(--color-txt-dim)]">AFFILIATION:</span>
              <span className="text-[var(--color-txt)]">The Symbiosis</span>

              <span className="text-[var(--color-txt-dim)]">CODENAME:</span>
              <span className="redacted">Gh0st Protocol</span>

              <span className="text-[var(--color-txt-dim)]">GITHUB:</span>
              <a href="https://github.com/russelljadams" target="_blank" rel="noopener noreferrer" className="text-[var(--color-cyan)] hover:underline">
                russelljadams
              </a>
            </div>
          </div>
        </RevealSection>

        {/* Intel background */}
        <RevealSection className="mb-12">
          <SectionHeader category="Intel" title="Background" categoryColor="var(--color-cyan)" />
          <div className="space-y-3 font-[family-name:var(--font-fira)] text-sm text-[var(--color-txt-sec)]">
            <p className="leading-relaxed">
              Subject is a <span className="text-[var(--color-txt)]">USAF Intelligence veteran</span> with
              {" "}<span className="text-[var(--color-txt)]">10+ years</span> in network and telecom operations.
              Holds <span className="text-[var(--color-green)]">Certified Ethical Hacker (CEH)</span> and
              {" "}<span className="text-[var(--color-green)]">Google Cybersecurity Professional</span> certifications.
            </p>
            <p className="leading-relaxed">
              Currently building an <span className="text-[var(--color-amber)]">augmented human infrastructure</span> —
              a multi-device AI agent network that extends human capability through persistent autonomous agents,
              MCP tool servers, and vector memory systems.
            </p>
          </div>
        </RevealSection>

        <AlienGlyph className="mb-12" />

        {/* Operational timeline */}
        <RevealSection className="mb-12">
          <SectionHeader category="Career" title="Operational Timeline" />
          <div className="relative pl-8 border-l-2 border-[var(--color-border)] space-y-8">
            {TIMELINE.map((t, i) => (
              <div key={i} className="relative">
                <div
                  className="absolute -left-[33px] top-1 w-3 h-3 rounded-full border-2 bg-[var(--color-bg-deep)]"
                  style={{ borderColor: t.color }}
                />
                <div className="font-[family-name:var(--font-fira)] text-xs tracking-wide mb-1" style={{ color: t.color }}>
                  {t.date}
                </div>
                <div className="font-[family-name:var(--font-chakra)] text-lg font-semibold text-[var(--color-txt)] mb-0.5">
                  {t.role}
                </div>
                <div className="text-sm text-[var(--color-txt-sec)] mb-2">{t.org}</div>
                <ul className="space-y-1">
                  {t.details.map((d, j) => (
                    <li
                      key={j}
                      className="text-sm text-[var(--color-txt-sec)] pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-[var(--color-txt-dim)] before:font-[family-name:var(--font-fira)] before:text-xs"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Known assets */}
        <RevealSection className="mb-12">
          <SectionHeader category="Assets" title="Known Infrastructure" categoryColor="var(--color-green)" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ASSETS.map((a) => (
              <div key={a.name} className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-green-dim)] transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-[family-name:var(--font-fira)] text-sm font-semibold text-[var(--color-txt)]">
                    {a.name}
                  </span>
                  <span className="font-[family-name:var(--font-fira)] text-[10px] px-2 py-0.5 rounded bg-[rgba(0,255,170,0.1)] text-[var(--color-green)] border border-[var(--color-green-dim)]">
                    {a.status}
                  </span>
                </div>
                <p className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-sec)]">{a.desc}</p>
              </div>
            ))}
          </div>
        </RevealSection>
      </main>
    </ClientShell>
  );
}
