import Nav from "@/components/Nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Russell J. Adams",
  description: "Projects by Russell J. Adams.",
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

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="px-6 md:px-10 pt-28 pb-20 max-w-3xl">
        <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-text-muted)] tracking-widest uppercase mb-3">
          Projects
        </div>
        <h1 className="font-[family-name:var(--font-chakra)] text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
          Projects
        </h1>
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
