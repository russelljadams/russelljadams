"use client";

import { useEffect, useRef, useState } from "react";
import ClientShell from "@/components/ClientShell";
import HackerNav from "@/components/HackerNav";
import SectionHeader from "@/components/SectionHeader";

interface Skill {
  name: string;
  level: number; // 0-100
  label: string;
}

interface Category {
  title: string;
  color: string;
  icon: string;
  skills: Skill[];
}

const CATEGORIES: Category[] = [
  {
    title: "Offensive Security",
    color: "var(--color-red)",
    icon: "\u2620",
    skills: [
      { name: "Nmap / Network Scanning", level: 85, label: "Advanced" },
      { name: "Burp Suite", level: 70, label: "Proficient" },
      { name: "Metasploit", level: 65, label: "Proficient" },
      { name: "Wireshark", level: 80, label: "Advanced" },
      { name: "Kali Linux", level: 85, label: "Advanced" },
      { name: "OSINT / Recon", level: 75, label: "Proficient" },
      { name: "Vulnerability Assessment", level: 80, label: "Advanced" },
      { name: "OPSEC", level: 90, label: "Expert" },
      { name: "Social Engineering", level: 60, label: "Developing" },
      { name: "Wireless Attacks", level: 65, label: "Proficient" },
    ],
  },
  {
    title: "Development",
    color: "var(--color-green)",
    icon: "\u27E8/\u27E9",
    skills: [
      { name: "Python", level: 80, label: "Advanced" },
      { name: "TypeScript", level: 75, label: "Proficient" },
      { name: "Next.js / React", level: 75, label: "Proficient" },
      { name: "Bash / Shell", level: 85, label: "Advanced" },
      { name: "SQL", level: 65, label: "Proficient" },
      { name: "HTML / CSS", level: 80, label: "Advanced" },
      { name: "Git", level: 80, label: "Advanced" },
      { name: "REST APIs", level: 80, label: "Advanced" },
      { name: "FastAPI", level: 70, label: "Proficient" },
    ],
  },
  {
    title: "Infrastructure",
    color: "var(--color-amber)",
    icon: "\u26A1",
    skills: [
      { name: "TCP/IP / Networking", level: 90, label: "Expert" },
      { name: "Linux Administration", level: 85, label: "Advanced" },
      { name: "Tailscale / VPN", level: 85, label: "Advanced" },
      { name: "Docker", level: 55, label: "Developing" },
      { name: "DOCSIS / RF", level: 80, label: "Advanced" },
      { name: "DNS / DHCP", level: 85, label: "Advanced" },
      { name: "Firewalls / iptables", level: 75, label: "Proficient" },
      { name: "Structured Cabling", level: 90, label: "Expert" },
      { name: "Signal Diagnostics", level: 85, label: "Advanced" },
      { name: "SSH / Remote Admin", level: 90, label: "Expert" },
    ],
  },
  {
    title: "AI / Symbiosis",
    color: "var(--color-cyan)",
    icon: "\u2726",
    skills: [
      { name: "MCP Protocol", level: 90, label: "Expert" },
      { name: "Ollama / Local LLM", level: 80, label: "Advanced" },
      { name: "ReAct Agents", level: 85, label: "Advanced" },
      { name: "Prompt Engineering", level: 85, label: "Advanced" },
      { name: "Qdrant / Vector DB", level: 70, label: "Proficient" },
      { name: "Claude Code", level: 90, label: "Expert" },
      { name: "AI Tool Building", level: 85, label: "Advanced" },
      { name: "Memory Systems", level: 75, label: "Proficient" },
      { name: "Multi-Agent Orchestration", level: 70, label: "Proficient" },
      { name: "Voice Interfaces", level: 65, label: "Proficient" },
    ],
  },
];

const TOTAL_TOOLS = CATEGORIES.reduce((acc, c) => acc + c.skills.length, 0);

function SkillBar({ skill, color, visible }: { skill: Skill; color: string; visible: boolean }) {
  return (
    <div className="mb-2.5">
      <div className="flex justify-between items-center mb-1">
        <span className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt)]">{skill.name}</span>
        <span className="font-[family-name:var(--font-fira)] text-[10px] text-[var(--color-txt-dim)]">{skill.label}</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-bar-fill"
          style={{
            width: visible ? `${skill.level}%` : "0%",
            backgroundColor: color,
            boxShadow: `0 0 6px ${color}`,
            transition: visible ? undefined : "none",
          }}
        />
      </div>
    </div>
  );
}

function CategoryPanel({ category }: { category: Category }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-5 hover:border-opacity-60 transition-colors"
      style={{ borderTopWidth: 3, borderTopColor: category.color }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg" style={{ color: category.color }}>{category.icon}</span>
        <h3 className="font-[family-name:var(--font-chakra)] text-base font-semibold" style={{ color: category.color }}>
          {category.title}
        </h3>
        <span className="font-[family-name:var(--font-fira)] text-[10px] text-[var(--color-txt-dim)] ml-auto">
          {category.skills.length} tools
        </span>
      </div>
      {category.skills.map((s) => (
        <SkillBar key={s.name} skill={s} color={category.color} visible={visible} />
      ))}
    </div>
  );
}

export default function ArsenalPage() {
  return (
    <ClientShell>
      <HackerNav />

      <main className="min-h-screen px-6 md:px-12 pt-[100px] pb-16 max-w-[1100px] mx-auto">
        <SectionHeader category="Arsenal" title="Loadout" categoryColor="var(--color-cyan)" />

        <div className="font-[family-name:var(--font-fira)] text-sm text-[var(--color-green)] mb-8 crt-text">
          TOTAL ARSENAL: {TOTAL_TOOLS} TOOLS LOADED
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CATEGORIES.map((c) => (
            <CategoryPanel key={c.title} category={c} />
          ))}
        </div>
      </main>
    </ClientShell>
  );
}
