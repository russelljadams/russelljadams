import { Metadata } from "next";

export const metadata: Metadata = {
  title: "logs",
  description: "Session documentation.",
};

export default function LogsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <header className="mb-16">
        <p className="text-muted-foreground text-xs mb-4">// documentation</p>
        <h1 className="text-2xl font-bold mb-4">session logs</h1>
        <p className="text-muted-foreground">
          Every practice session documented. Objectives. Metrics. Notes. The raw
          data of the experiment.
        </p>
      </header>

      <Section id="01" title="summary">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="total_sessions" value="—" />
          <Stat label="total_hours" value="—" />
          <Stat label="this_week" value="—" />
          <Stat label="streak" value="—" />
        </div>
      </Section>

      <Section id="02" title="recent">
        <div className="border border-border p-8 text-center">
          <p className="text-xs text-muted-foreground">
            no sessions logged yet
          </p>
        </div>
      </Section>

      <Section id="03" title="log format">
        <div className="border border-border p-4 text-sm">
          <div className="text-xs text-muted-foreground mb-4">
            // session template
          </div>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <span className="text-foreground">meta</span>
              <p className="text-xs mt-1">
                date, duration, track, laps, focus area
              </p>
            </div>
            <div>
              <span className="text-foreground">objective</span>
              <p className="text-xs mt-1">
                specific skill or technique targeted this session
              </p>
            </div>
            <div>
              <span className="text-foreground">metrics</span>
              <p className="text-xs mt-1">
                best lap, average, std dev, worst, range, vs baseline
              </p>
            </div>
            <div>
              <span className="text-foreground">notes</span>
              <p className="text-xs mt-1">
                what worked, what did not, key insight
              </p>
            </div>
            <div>
              <span className="text-foreground">next</span>
              <p className="text-xs mt-1">
                plan for next session based on findings
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="04" title="filters">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="border border-border px-2 py-1">by track</span>
          <span className="border border-border px-2 py-1">by date</span>
          <span className="border border-border px-2 py-1">by focus</span>
          <span className="border border-border px-2 py-1">high variance</span>
          <span className="border border-border px-2 py-1">breakthroughs</span>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          filters will activate when sessions are logged
        </p>
      </Section>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <h2 className="text-xs text-muted-foreground mb-4">
        // {id} {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-3 text-center">
      <div className="text-lg font-medium">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
