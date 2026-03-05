import Nav from "@/components/Nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Russell J. Adams",
  description: "Security tools, AI agent infrastructure, and technical projects.",
};

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
    name: "Gh0st Agent",
    status: "Active",
    statusColor: "var(--color-green)",
    description: "Autonomous AI agent with 117 tools across 5 servers on 3 devices. Built with FastAPI, Ollama, and vector memory. Handles voice commands, security recon, and multi-step reasoning through a custom MCP protocol implementation.",
    tech: ["Python", "FastAPI", "Ollama", "Qdrant", "MCP Protocol", "Tailscale"],
    link: { label: "GitHub", href: "https://github.com/russelljadams/gh0st-agent" },
  },
  {
    name: "CEH Cram Station",
    status: "Deployed",
    statusColor: "var(--color-cyan)",
    description: "424-question spaced repetition study app for the CEH v13 (312-50) exam. Built from scratch with zero dependencies — pure HTML, CSS, and JavaScript. Category filtering, progress tracking, and streak system.",
    tech: ["HTML", "CSS", "JavaScript", "Spaced Repetition"],
    link: { label: "Live App", href: "/ceh-cram/" },
  },
  {
    name: "This Portfolio",
    status: "Active",
    statusColor: "var(--color-green)",
    description: "Custom-built portfolio site. Next.js with custom JWT auth, Vercel KV for contact form submissions, and a dashboard for managing inquiries. No templates, no page builders.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Vercel KV"],
  },
  {
    name: "CTF Practice Pipeline",
    status: "In Progress",
    statusColor: "var(--color-amber)",
    description: "Structured progression through TryHackMe and HackTheBox challenges. Building toward real-world bug bounty hunting. Completed rooms: Blog, LazyAdmin, SQLi Lab.",
    tech: ["Kali Linux", "Nmap", "Burp Suite", "Metasploit", "OSINT"],
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="px-6 md:px-10 pt-28 pb-20 max-w-3xl">
        <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-text-muted)] tracking-widest uppercase mb-3">
          Projects
        </div>
        <h1 className="font-[family-name:var(--font-chakra)] text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
          What I&apos;ve Built
        </h1>
        <p className="font-[family-name:var(--font-outfit)] text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-12">
          Security tools, automation, and infrastructure. Everything built from scratch.
        </p>

        <div className="space-y-5">
          {PROJECTS.map((p) => (
            <div
              key={p.name}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 md:p-8 transition-all duration-200 hover:border-[var(--color-border-hover)]"
            >
              <div className="flex items-center gap-3 mb-3">
                <h2 className="font-[family-name:var(--font-chakra)] text-lg font-semibold text-[var(--color-text)]">
                  {p.name}
                </h2>
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
      </main>
    </>
  );
}
