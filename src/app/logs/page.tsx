import { Metadata } from "next";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "logs",
  description: "Session documentation.",
};

export default function LogsPage() {
  const summary = loadSummary();
  const latestDaily = summary?.latestDay
    ? loadDaily(summary.latestDay)
    : null;

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
          <Stat
            label="total_sessions"
            value={summary ? String(summary.totalSessions) : "—"}
          />
          <Stat
            label="total_hours"
            value={summary ? String(summary.totalHours) : "—"}
          />
          <Stat
            label="latest_day"
            value={summary?.latestDay ?? "—"}
          />
          <Stat
            label="total_resets"
            value={summary ? String(summary.totalResets) : "—"}
          />
        </div>
      </Section>

      <Section id="02" title="jan + feb (sfl)">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat
            label="jan_2026_sessions"
            value={summary ? String(summary.jan2026Sessions) : "—"}
          />
          <Stat
            label="jan_2026_hours"
            value={summary ? String(summary.jan2026Hours) : "—"}
          />
          <Stat
            label="feb_2026_sessions"
            value={summary ? String(summary.feb2026Sessions) : "—"}
          />
          <Stat
            label="feb_2026_hours"
            value={summary ? String(summary.feb2026Hours) : "—"}
          />
        </div>
      </Section>

      <Section id="03" title="recent">
        {latestDaily ? (
          <div className="border border-border p-6 text-sm">
            <div className="text-xs text-muted-foreground mb-4">
              // {latestDaily.date}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
              <Stat label="sessions" value={String(latestDaily.sessions)} />
              <Stat label="laps" value={String(latestDaily.laps)} />
              <Stat
                label="hours"
                value={String(latestDaily.durationHours ?? "—")}
              />
              <Stat label="resets" value={String(latestDaily.resets)} />
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              // reset hotspots (bins)
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {latestDaily.resetHotspotsBins?.length ? (
                latestDaily.resetHotspotsBins.slice(0, 6).map((bin) => (
                  <span
                    key={`${bin.startPct}-${bin.endPct}`}
                    className="border border-border px-2 py-1"
                  >
                    {bin.startPct}–{bin.endPct}: {bin.count}
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground">no resets yet</span>
              )}
            </div>
          </div>
        ) : (
          <div className="border border-border p-8 text-center">
            <p className="text-xs text-muted-foreground">
              no sessions logged yet
            </p>
          </div>
        )}
      </Section>

      <Section id="04" title="log format">
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

      <Section id="05" title="filters">
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

type SummaryData = {
  totalSessions: number;
  totalHours: number;
  totalResets: number;
  latestDay: string | null;
  jan2026Sessions: number;
  jan2026Hours: number;
  feb2026Sessions: number;
  feb2026Hours: number;
};

type DailyData = {
  date: string;
  sessions: number;
  laps: number;
  durationHours: number;
  resets: number;
  resetHotspotsBins: Array<{
    startPct: number;
    endPct: number;
    count: number;
  }>;
};

function loadSummary(): SummaryData | null {
  const summaryPath = path.join(process.cwd(), "public", "data", "summary.json");
  if (!fs.existsSync(summaryPath)) {
    return null;
  }
  const raw = fs.readFileSync(summaryPath, "utf-8");
  return JSON.parse(raw) as SummaryData;
}

function loadDaily(date: string): DailyData | null {
  const dailyPath = path.join(
    process.cwd(),
    "public",
    "data",
    "daily",
    `${date}.json`
  );
  if (!fs.existsSync(dailyPath)) {
    return null;
  }
  const raw = fs.readFileSync(dailyPath, "utf-8");
  return JSON.parse(raw) as DailyData;
}
