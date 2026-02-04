import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "variance collapse",
  description: "Why consistency matters more than peak performance.",
};

export default function VarianceCollapsePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <header className="mb-16">
        <Link
          href="/methodology"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          ← methodology
        </Link>
        <p className="text-muted-foreground text-xs mb-4 mt-8">// deep dive</p>
        <h1 className="text-2xl font-bold mb-4">variance collapse</h1>
        <p className="text-muted-foreground">
          Your worst laps matter more than your best. Anyone can get lucky once.
          Elite drivers are scary because they are not random.
        </p>
      </header>

      <Section id="01" title="the core metric">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="border border-border p-4">
            <p className="text-xs mb-2">amateur pattern</p>
            <div className="text-muted-foreground text-sm space-y-1">
              <p>best: 1:42.5</p>
              <p>typical: 1:44.2</p>
              <p>worst: 1:47.0</p>
              <p className="text-foreground mt-2">range: 4.5s</p>
            </div>
          </div>
          <div className="border border-[hsl(var(--accent))]/30 p-4">
            <p className="text-xs mb-2 text-[hsl(var(--accent))]">expert pattern</p>
            <div className="text-muted-foreground text-sm space-y-1">
              <p>best: 1:42.0</p>
              <p>typical: 1:42.4</p>
              <p>worst: 1:43.0</p>
              <p className="text-[hsl(var(--accent))] mt-2">range: 1.0s</p>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          The expert is only 0.5s faster on best lap. But 4.0s better on worst
          lap. That difference is dominance.
        </p>
      </Section>

      <Section id="02" title="why variance matters">
        <div className="space-y-4 text-muted-foreground text-sm">
          <Reason
            title="racing is consistency"
            desc="Worst laps determine position more than best. One bad corner = multiple positions lost."
          />
          <Reason
            title="variance reveals true skill"
            desc="Best lap often includes luck. Worst lap reveals gaps that luck cannot cover."
          />
          <Reason
            title="low variance = automated skill"
            desc="High variance = still consciously managing. Low variance = skill internalized."
          />
          <Reason
            title="measurable progress"
            desc="Lap times can plateau while variance shrinks. That is real improvement."
          />
        </div>
      </Section>

      <Section id="03" title="measurement">
        <div className="space-y-4 text-sm">
          <div className="text-muted-foreground">
            <span className="text-foreground">range</span> — best minus worst.
            Simple, intuitive.
          </div>
          <div className="text-muted-foreground">
            <span className="text-foreground">standard deviation</span> — more
            robust than range. Measures typical deviation from mean. Lower =
            more consistent.
          </div>
          <div className="text-muted-foreground">
            <span className="text-foreground">IQR</span> — interquartile range.
            Middle 50% of laps. Ignores outliers.
          </div>
        </div>
        <div className="mt-6 border border-border p-4">
          <p className="text-xs mb-2">what to track</p>
          <ul className="text-muted-foreground text-sm space-y-1">
            <li>— lap time variance across session</li>
            <li>— sector variance (which sector swings most?)</li>
            <li>— corner-specific: min speed variance, brake point variance</li>
            <li>— session-to-session: can you reproduce last week?</li>
          </ul>
        </div>
      </Section>

      <Section id="04" title="the collapse process">
        <div className="space-y-4 text-sm text-muted-foreground">
          <Step n={1} title="identify high-variance zones">
            Look at sector times. Which swings most? Within that sector, which
            corner? Telemetry overlay: where does bad lap deviate?
          </Step>
          <Step n={2} title="diagnose cause">
            Usually: inconsistent braking, sloppy turn-in, unstable mid-corner,
            reactive exit corrections.
          </Step>
          <Step n={3} title="create anchor points">
            Physical or visual references that make inputs repeatable. Exact
            brake marker. Turn-in point. Apex reference. Exit target.
          </Step>
          <Step n={4} title="drill to stability">
            Repeated runs hitting anchors exactly. Not fast—correct. Speed comes
            from repeatability.
          </Step>
          <Step n={5} title="test under load">
            Stable in isolation → full laps → stints → traffic. If variance
            increases under load, skill not yet automatic. Back to drilling.
          </Step>
        </div>
      </Section>

      <Section id="05" title="common patterns">
        <div className="space-y-4 text-sm">
          <Pattern
            name="early-session variance"
            desc="First 5-10 laps scattered, then stabilize"
            interpretation="Normal. But if >15 laps to stabilize, preparation has gaps."
          />
          <Pattern
            name="late-session variance"
            desc="Consistent early, falls apart after 20+ laps"
            interpretation="Mental or physical fatigue. Shorten sessions or build endurance."
          />
          <Pattern
            name="sector-specific variance"
            desc="One sector swings, others stable"
            interpretation="That sector contains biggest skill gap. Prioritize."
          />
          <Pattern
            name="session-to-session variance"
            desc="Consistent within session, different between sessions"
            interpretation="Technique depends on 'feeling it.' Not fully internalized. More reps."
          />
          <Pattern
            name="traffic variance"
            desc="Consistent in clean air, falls apart in traffic"
            interpretation="Skills not automated enough for divided attention. More drilling."
          />
        </div>
      </Section>

      <Section id="06" title="variance vs speed">
        <p className="text-muted-foreground text-sm mb-4">
          Apparent paradox: focus on faster or more consistent? Answer:
          consistency first.
        </p>
        <div className="border border-border p-4 text-sm">
          <p className="text-xs mb-2">correct order</p>
          <ol className="text-muted-foreground space-y-1">
            <li>1. build reliable baseline (low variance, not necessarily fast)</li>
            <li>2. push baseline in one area</li>
            <li>3. stabilize new baseline (variance collapses again)</li>
            <li>4. push next area</li>
          </ol>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Pushing speed before variance controlled = building on unstable
          foundation. Gains will not stick.
        </p>
      </Section>

      <footer className="mt-16 pt-8 border-t border-border flex justify-between">
        <Link
          href="/methodology/deliberate-practice"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← deliberate practice
        </Link>
        <Link
          href="/methodology/the-constraints"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          the constraints →
        </Link>
      </footer>
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
      <h2 className="text-xs text-muted-foreground mb-6">
        // {id} {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

function Reason({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <span className="text-foreground">{title}</span> — {desc}
    </div>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="text-foreground">
        [{n}] {title}
      </span>
      <p className="mt-1">{children}</p>
    </div>
  );
}

function Pattern({
  name,
  desc,
  interpretation,
}: {
  name: string;
  desc: string;
  interpretation: string;
}) {
  return (
    <div className="text-muted-foreground">
      <span className="text-foreground">{name}</span> — {desc}
      <p className="text-xs mt-1">→ {interpretation}</p>
    </div>
  );
}
