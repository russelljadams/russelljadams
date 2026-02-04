import { Metadata } from "next";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "progress",
  description: "Experiment metrics and tracking.",
};

export default function ProgressPage() {
  const summary = loadSummary();
  const daysActive = countDailySessions();
  const avgSession =
    summary && summary.totalSessions > 0
      ? (summary.totalHours / summary.totalSessions).toFixed(2)
      : "—";

  const trackHours = loadTrackHours({
    monza: "monza-full",
    silverstone: "silverstone-2019-gp",
    suzuka: "suzuka",
    spa: "spa-2024-bike",
  });

  const totalHours = summary ? summary.totalHours : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <header className="mb-16">
        <p className="text-muted-foreground text-xs mb-4">// tracking</p>
        <h1 className="text-2xl font-bold mb-4">progress</h1>
        <p className="text-muted-foreground">
          Real-time metrics. Hours logged. Variance trends. Milestone tracking.
        </p>
      </header>

      <Section id="01" title="status">
        <div className="border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--accent))]" />
            <span className="text-sm">active</span>
          </div>
          <p className="text-xs text-muted-foreground">
            experiment in progress. {summary ? "2026 data live." : "awaiting first logged sessions."}
          </p>
        </div>
      </Section>

      <Section id="02" title="metrics">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Metric
            label="hours_logged"
            value={summary ? String(summary.totalHours) : "—"}
            target="1,200"
          />
          <Metric
            label="sessions"
            value={summary ? String(summary.totalSessions) : "—"}
          />
          <Metric
            label="days_active"
            value={daysActive ? String(daysActive) : "—"}
          />
          <Metric
            label="avg_session"
            value={avgSession}
          />
        </div>
      </Section>

      <Section id="03" title="tracks">
        <div className="space-y-3">
          <TrackRow name="monza" hours={trackHours.monza} target={300} variance="—" />
          <TrackRow name="silverstone" hours={trackHours.silverstone} target={300} variance="—" />
          <TrackRow name="suzuka" hours={trackHours.suzuka} target={300} variance="—" />
          <TrackRow name="spa" hours={trackHours.spa} target={300} variance="—" />
        </div>
      </Section>

      <Section id="04" title="variance">
        <div className="border border-border p-4 h-48 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">
            variance chart will populate as data is collected
          </p>
        </div>
      </Section>

      <Section id="05" title="milestones">
        <div className="space-y-2">
          <Milestone done={totalHours >= 100} text="100 hours logged" />
          <Milestone done={false} text="baseline times established on all tracks" />
          <Milestone done={false} text="first variance report" />
          <Milestone done={totalHours >= 250} text="250 hours" />
          <Milestone done={totalHours >= 500} text="500 hours" />
          <Milestone done={false} text="first race validation" />
          <Milestone done={totalHours >= 1000} text="1,000 hours" />
          <Milestone done={totalHours >= 1200} text="experiment complete" />
        </div>
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

function Metric({
  label,
  value,
  target,
}: {
  label: string;
  value: string;
  target?: string;
}) {
  return (
    <div className="border border-border p-3">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="text-lg font-medium">{value}</div>
      {target ? (
        <div className="text-xs text-muted-foreground">target: {target}</div>
      ) : null}
    </div>
  );
}

function TrackRow({
  name,
  hours,
  target,
  variance,
}: {
  name: string;
  hours: number;
  target: number;
  variance: string;
}) {
  const pct = Math.round((hours / target) * 100);
  return (
    <div className="border border-border p-3">
      <div className="flex justify-between text-xs mb-2">
        <span>{name}</span>
        <span className="text-muted-foreground">
          {hours}/{target}h | var: {variance}
        </span>
      </div>
      <div className="h-1 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-foreground rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Milestone({ done, text }: { done: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        className={`w-3 h-3 rounded-full border ${
          done
            ? "bg-[hsl(var(--accent))] border-[hsl(var(--accent))]"
            : "border-muted-foreground"
        }`}
      />
      <span className={done ? "text-foreground" : "text-muted-foreground"}>
        {text}
      </span>
    </div>
  );
}

type SummaryData = {
  totalSessions: number;
  totalHours: number;
};

type TrackData = {
  durationHours: number;
};

function loadSummary(): SummaryData | null {
  const summaryPath = path.join(process.cwd(), "public", "data", "summary.json");
  if (!fs.existsSync(summaryPath)) {
    return null;
  }
  const raw = fs.readFileSync(summaryPath, "utf-8");
  return JSON.parse(raw) as SummaryData;
}

function countDailySessions(): number {
  const dailyDir = path.join(process.cwd(), "public", "data", "daily");
  if (!fs.existsSync(dailyDir)) {
    return 0;
  }
  return fs.readdirSync(dailyDir).filter((name) => name.endsWith(".json")).length;
}

function loadTrackHours(trackMap: Record<string, string>) {
  const result: Record<string, number> = {};
  for (const [label, file] of Object.entries(trackMap)) {
    const trackPath = path.join(process.cwd(), "public", "data", "tracks", `${file}.json`);
    if (!fs.existsSync(trackPath)) {
      result[label] = 0;
      continue;
    }
    const raw = fs.readFileSync(trackPath, "utf-8");
    const data = JSON.parse(raw) as TrackData;
    result[label] = Number(data.durationHours ?? 0);
  }
  return result;
}
