import Link from "next/link";
import Nav from "@/components/Nav";

const BADGES = [
  "CEH Certified",
  "Google Cybersecurity",
  "USAF Veteran",
  "10+ Yrs Network/Telecom",
];

const SERVICES = [
  {
    title: "Penetration Testing",
    desc: "Find out where you're vulnerable before someone else does. Network, web app, and wireless assessments.",
    color: "var(--color-red)",
  },
  {
    title: "Security Audits",
    desc: "Full security posture review — hardening, access control, policy gaps. Clear report with prioritized fixes.",
    color: "var(--color-cyan)",
  },
  {
    title: "Network Troubleshooting",
    desc: "WiFi dead zones, slow connections, device conflicts. 4 years as a Spectrum field tech.",
    color: "var(--color-amber)",
  },
  {
    title: "Tech Repair",
    desc: "Malware removal, hardware diagnostics, data recovery. I find what's broken and fix it.",
    color: "var(--color-green)",
  },
];

export default function Home() {
  return (
    <>
      <Nav />

      {/* ═══ HERO ═══ */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 pb-16 max-w-4xl">
        <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-green)] tracking-widest uppercase mb-6 opacity-0 animate-[fadeUp_0.5s_ease_0.1s_forwards]">
          Cybersecurity &bull; Offensive Operations &bull; Technical Services
        </div>

        <h1 className="font-[family-name:var(--font-chakra)] text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-5 opacity-0 animate-[fadeUp_0.5s_ease_0.2s_forwards]">
          <span className="text-[var(--color-text)]">I fix things.</span>
          <br />
          <span className="text-[var(--color-text)]">I </span>
          <span className="text-[var(--color-green)]">break into things.</span>
        </h1>

        <p className="font-[family-name:var(--font-outfit)] text-lg text-[var(--color-text-secondary)] mb-8 max-w-xl leading-relaxed opacity-0 animate-[fadeUp_0.5s_ease_0.3s_forwards]">
          Security-focused technician with a military intelligence background, CEH certification, and 10+ years in networks and telecom. Grand Junction, CO.
        </p>

        <div className="flex flex-wrap gap-3 mb-10 opacity-0 animate-[fadeUp_0.5s_ease_0.4s_forwards]">
          <Link
            href="/contact"
            className="font-[family-name:var(--font-fira)] text-sm px-6 py-3 bg-[var(--color-green)] text-[var(--color-bg)] font-semibold no-underline hover:opacity-90 transition-opacity"
          >
            Get in touch
          </Link>
          <Link
            href="/services"
            className="font-[family-name:var(--font-fira)] text-sm px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] no-underline hover:border-[var(--color-green)] hover:text-[var(--color-green)] transition-colors"
          >
            What I do
          </Link>
          <Link
            href="/resume"
            className="font-[family-name:var(--font-fira)] text-sm px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] no-underline hover:border-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            Resume
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 opacity-0 animate-[fadeUp_0.5s_ease_0.5s_forwards]">
          {BADGES.map((b) => (
            <span
              key={b}
              className="font-[family-name:var(--font-fira)] text-[11px] px-3 py-1.5 border border-[var(--color-border)] text-[var(--color-text-secondary)] bg-[var(--color-surface)]"
            >
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* ═══ SERVICES PREVIEW ═══ */}
      <section className="px-6 md:px-10 py-20 border-t border-[var(--color-border)]">
        <div className="max-w-4xl">
          <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-text-muted)] tracking-widest uppercase mb-3">
            What I Do
          </div>
          <h2 className="font-[family-name:var(--font-chakra)] text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-8">
            Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 transition-all duration-200 hover:border-[var(--color-border-hover)]"
                style={{ borderLeftWidth: 3, borderLeftColor: s.color }}
              >
                <h3
                  className="font-[family-name:var(--font-chakra)] text-base font-semibold mb-2"
                  style={{ color: s.color }}
                >
                  {s.title}
                </h3>
                <p className="font-[family-name:var(--font-outfit)] text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/services"
              className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-text-muted)] no-underline hover:text-[var(--color-green)] transition-colors"
            >
              View all services &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ QUICK STATS ═══ */}
      <section className="px-6 md:px-10 py-20 border-t border-[var(--color-border)]">
        <div className="max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "16+", label: "Years Experience" },
            { value: "CEH", label: "Certified Ethical Hacker" },
            { value: "USAF", label: "Intelligence Veteran" },
            { value: "4", label: "Yrs Field Tech" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-[family-name:var(--font-chakra)] text-3xl md:text-4xl font-bold text-[var(--color-green)] mb-1">
                {s.value}
              </div>
              <div className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-text-muted)] uppercase tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
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
          <Link
            href="/contact"
            className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-text-muted)] no-underline hover:text-[var(--color-green)] transition-colors"
          >
            Contact
          </Link>
        </div>
      </footer>
    </>
  );
}
