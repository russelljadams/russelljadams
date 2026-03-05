"use client";

import { useState } from "react";
import ClientShell from "@/components/ClientShell";
import HackerNav from "@/components/HackerNav";
import SectionHeader from "@/components/SectionHeader";
import RevealSection from "@/components/RevealSection";

type MissionStatus = "ACTIVE" | "DEPLOYED" | "IN PROGRESS";

interface Mission {
  caseNumber: string;
  name: string;
  status: MissionStatus;
  classification: string;
  objective: string;
  summary: string;
  techAssets: string[];
  links?: { label: string; href: string }[];
}

const MISSIONS: Mission[] = [
  {
    caseNumber: "GH0ST-001",
    name: "Gh0st Agent v2",
    status: "DEPLOYED",
    classification: "OPERATIONAL",
    objective: "Build autonomous AI agent infrastructure spanning multiple devices",
    summary: "FastAPI + Ollama ReAct agent with 117 MCP tools across 5 servers on 3 devices. Persistent vector memory via Mem0 + Qdrant. Voice interface via Tasker shake gesture. Full nervous system for the augmented human.",
    techAssets: ["Python", "FastAPI", "Ollama", "Qdrant", "MCP Protocol", "Tailscale"],
    links: [
      { label: "GitHub", href: "https://github.com/russelljadams/gh0st-agent" },
    ],
  },
  {
    caseNumber: "AUG-002",
    name: "Augmented Human Infrastructure",
    status: "ACTIVE",
    classification: "TOP SECRET",
    objective: "Create tight AI-human integration that outperforms any individual or team",
    summary: "Multi-device mesh network connecting mobile field terminal, GPU compute node, and offensive security VM. MCP tool servers expose phone sensors, system control, security tools, and AI capabilities to any agent.",
    techAssets: ["Tailscale", "MCP", "SSH", "Termux", "LineageOS", "Magisk"],
  },
  {
    caseNumber: "CEH-003",
    name: "CEH Cram Station",
    status: "DEPLOYED",
    classification: "UNCLASSIFIED",
    objective: "Build spaced-repetition study tool for CEH v13 (312-50) exam",
    summary: "424-question interactive study app with spaced repetition, category filtering, progress tracking, and streak system. Pure HTML/CSS/JS — zero dependencies, runs anywhere.",
    techAssets: ["HTML", "CSS", "JavaScript", "Spaced Repetition"],
    links: [
      { label: "Live App", href: "/ceh-cram/" },
    ],
  },
  {
    caseNumber: "WEB-004",
    name: "Portfolio v2 — Hacker OS",
    status: "ACTIVE",
    classification: "UNCLASSIFIED",
    objective: "Full ground-up redesign with 1995 hacker movie aesthetic",
    summary: "Next.js portfolio rebuilt as a fake hacker OS. Boot sequence, Matrix rain, ASCII alien art, terminal with live AI, classified dossier, mission files, arsenal loadout. Easter eggs everywhere.",
    techAssets: ["Next.js", "React", "TypeScript", "Tailwind v4", "Canvas API"],
    links: [
      { label: "Live Site", href: "/" },
    ],
  },
  {
    caseNumber: "CTF-005",
    name: "CTF Pipeline",
    status: "IN PROGRESS",
    classification: "RESTRICTED",
    objective: "Build systematic CTF practice pipeline toward bug bounty readiness",
    summary: "Structured progression through TryHackMe and HackTheBox challenges. Completed: Blog, LazyAdmin, SQLi Lab. Building toward real-world bug bounty hunting.",
    techAssets: ["Kali Linux", "Nmap", "Burp Suite", "Metasploit", "OSINT"],
  },
];

const STATUS_COLORS: Record<MissionStatus, string> = {
  ACTIVE: "var(--color-green)",
  DEPLOYED: "var(--color-cyan)",
  "IN PROGRESS": "var(--color-amber)",
};

const FILTERS: (MissionStatus | "ALL")[] = ["ALL", "ACTIVE", "DEPLOYED", "IN PROGRESS"];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<MissionStatus | "ALL">("ALL");

  const filtered = filter === "ALL" ? MISSIONS : MISSIONS.filter((m) => m.status === filter);

  return (
    <ClientShell>
      <HackerNav />

      <main className="min-h-screen px-6 md:px-12 pt-[100px] pb-16 max-w-[900px] mx-auto">
        <SectionHeader category="Projects" title="Mission Files" categoryColor="var(--color-amber)" />

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-[family-name:var(--font-fira)] text-xs px-3 py-1.5 rounded border transition-all ${
                filter === f
                  ? "border-[var(--color-green-dim)] text-[var(--color-green)] bg-[rgba(0,255,170,0.08)]"
                  : "border-[var(--color-border)] text-[var(--color-txt-sec)] hover:border-[var(--color-green-dim)] hover:text-[var(--color-green)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Mission cards */}
        <div className="space-y-4">
          {filtered.map((mission) => (
            <RevealSection key={mission.caseNumber}>
              <div className="mission-card">
                {/* Header */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-[family-name:var(--font-fira)] text-[10px] text-[var(--color-txt-dim)] tracking-wider">
                    {mission.caseNumber}
                  </span>
                  <span
                    className="font-[family-name:var(--font-fira)] text-[10px] px-2 py-0.5 rounded border"
                    style={{
                      color: STATUS_COLORS[mission.status],
                      borderColor: STATUS_COLORS[mission.status],
                      backgroundColor: `color-mix(in srgb, ${STATUS_COLORS[mission.status]} 8%, transparent)`,
                    }}
                  >
                    {mission.status}
                  </span>
                  <span className="font-[family-name:var(--font-fira)] text-[10px] text-[var(--color-txt-dim)]">
                    [{mission.classification}]
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-[family-name:var(--font-chakra)] text-xl font-bold text-[var(--color-txt)] mb-2">
                  {mission.name}
                </h3>

                {/* Objective */}
                <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-amber)] mb-2">
                  OBJECTIVE: <span className="text-[var(--color-txt-sec)]">{mission.objective}</span>
                </div>

                {/* Summary */}
                <p className="text-sm text-[var(--color-txt-sec)] leading-relaxed mb-4">
                  {mission.summary}
                </p>

                {/* Tech assets */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {mission.techAssets.map((t) => (
                    <span
                      key={t}
                      className="font-[family-name:var(--font-fira)] text-[10px] px-2 py-0.5 rounded bg-[var(--color-bg-deep)] border border-[var(--color-border)] text-[var(--color-txt-dim)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                {mission.links && (
                  <div className="flex gap-3">
                    {mission.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-cyan)] hover:text-[var(--color-green)] transition-colors no-underline"
                      >
                        [{l.label}]
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </RevealSection>
          ))}
        </div>
      </main>
    </ClientShell>
  );
}
