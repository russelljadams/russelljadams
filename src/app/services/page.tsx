import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adams Tech Services | Veteran-Owned IT & Cybersecurity",
  description:
    "Local tech repair, IT services, and cybersecurity assessments. Veteran-owned, CEH-certified. Serving the local community.",
};

const TIERS = [
  {
    name: "Tier 1 — Break/Fix",
    color: "var(--color-green)",
    services: [
      { name: "Virus & Malware Removal", price: "$75 – $150" },
      { name: "PC Tune-Up & Optimization", price: "$50 – $100" },
      { name: "Data Backup & Recovery", price: "$75 – $200" },
      { name: "Hardware Diagnostics", price: "$50 – $100" },
    ],
  },
  {
    name: "Tier 2 — Home Tech",
    color: "var(--color-amber)",
    services: [
      { name: "WiFi Network Setup & Optimization", price: "$100 – $200" },
      { name: "Smart Home Configuration", price: "$75 – $150" },
      { name: "Security Camera Install", price: "$150 – $300" },
    ],
  },
  {
    name: "Tier 3 — Professional",
    color: "var(--color-cyan)",
    services: [
      { name: "Managed IT Support", price: "$100 – $300/mo" },
      { name: "Cybersecurity Assessment", price: "$200 – $500" },
      { name: "Network Infrastructure Build", price: "$150 – $400" },
    ],
  },
];

const BADGES = [
  { label: "Veteran-Owned", icon: "🎖️" },
  { label: "CEH Certified", icon: "🛡️" },
  { label: "10+ Years Experience", icon: "⚡" },
  { label: "Background-Checked", icon: "✓" },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-txt)]">
      {/* Hero */}
      <section className="px-6 md:px-10 pt-28 pb-16 text-center">
        <p className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)] tracking-widest uppercase mb-4">
          {"// Local IT & Cybersecurity Services"}
        </p>
        <h1 className="font-[family-name:var(--font-chakra)] text-4xl md:text-6xl font-bold text-[var(--color-green)] mb-4">
          Adams Tech Services
        </h1>
        <p className="font-[family-name:var(--font-outfit)] text-lg md:text-xl text-[var(--color-txt-sec)] max-w-2xl mx-auto">
          Veteran-owned. CEH-certified. 10+ years of network, telecom, and
          security experience — now serving the local community.
        </p>
      </section>

      {/* Service Tiers */}
      <section className="px-6 md:px-10 pb-16 max-w-5xl mx-auto">
        <div className="grid gap-8">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg overflow-hidden"
              style={{ borderLeftWidth: 4, borderLeftColor: tier.color }}
            >
              <div className="px-6 py-4 border-b border-[var(--color-border)]">
                <h2
                  className="font-[family-name:var(--font-chakra)] text-xl font-semibold"
                  style={{ color: tier.color }}
                >
                  {tier.name}
                </h2>
              </div>
              <div className="divide-y divide-[var(--color-border)]">
                {tier.services.map((svc) => (
                  <div
                    key={svc.name}
                    className="px-6 py-4 flex justify-between items-center hover:bg-[var(--color-bg-card-hover)] transition-colors"
                  >
                    <span className="font-[family-name:var(--font-outfit)] text-[var(--color-txt)]">
                      {svc.name}
                    </span>
                    <span className="font-[family-name:var(--font-fira)] text-sm text-[var(--color-green)] whitespace-nowrap ml-4">
                      {svc.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="px-6 md:px-10 pb-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BADGES.map((b) => (
            <div
              key={b.label}
              className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-4 text-center hover:border-[var(--color-green)] transition-colors"
            >
              <div className="text-2xl mb-2">{b.icon}</div>
              <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-sec)]">
                {b.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto text-center">
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-8">
          <h2 className="font-[family-name:var(--font-chakra)] text-2xl font-semibold text-[var(--color-green)] mb-4">
            Ready to get started?
          </h2>
          <p className="font-[family-name:var(--font-outfit)] text-[var(--color-txt-sec)] mb-6">
            Free estimates on all services. Same-day availability for
            emergencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:russell@russelljadams.com"
              className="font-[family-name:var(--font-fira)] text-sm px-6 py-3 bg-[var(--color-green)] text-[var(--color-bg-deep)] rounded font-semibold hover:opacity-90 transition-opacity"
            >
              russell@russelljadams.com
            </a>
            <a
              href="tel:+19134267582"
              className="font-[family-name:var(--font-fira)] text-sm px-6 py-3 border border-[var(--color-green)] text-[var(--color-green)] rounded hover:bg-[var(--color-green)] hover:text-[var(--color-bg-deep)] transition-colors"
            >
              (913) 426-7582
            </a>
          </div>
          <p className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)] mt-6">
            Booking link coming soon
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8 text-center">
        <p className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)]">
          &copy; {new Date().getFullYear()} Adams Tech Services
        </p>
      </footer>
    </main>
  );
}
