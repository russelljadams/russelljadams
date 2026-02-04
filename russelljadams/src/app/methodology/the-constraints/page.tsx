import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "the constraints",
  description: "Why one car and four tracks accelerates learning.",
};

export default function ConstraintsPage() {
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
        <h1 className="text-2xl font-bold mb-4">the constraints</h1>
        <p className="text-muted-foreground">
          One car. Four tracks. 12 months. These are not limitations. They are
          the mechanism. Constraints eliminate noise and force depth.
        </p>
      </header>

      <Section id="01" title="the paradox">
        <p className="text-muted-foreground text-sm mb-4">
          More options feel like freedom. But options dilute focus. Fewer
          options force depth instead of width.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-destructive/30 p-4">
            <p className="text-xs mb-2 text-destructive">variety trap</p>
            <ul className="text-muted-foreground text-sm space-y-1">
              <li>— new track every week</li>
              <li>— multiple cars per month</li>
              <li>— constant novelty</li>
              <li>— feels like progress (it is not)</li>
            </ul>
          </div>
          <div className="border border-[hsl(var(--accent))]/30 p-4">
            <p className="text-xs mb-2 text-[hsl(var(--accent))]">constrained depth</p>
            <ul className="text-muted-foreground text-sm space-y-1">
              <li>— same car for 12 months</li>
              <li>— four locked tracks</li>
              <li>— deliberate boredom</li>
              <li>— feels like plateau (it is not)</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="02" title="why one car">
        <div className="space-y-4 text-sm text-muted-foreground">
          <Rationale
            title="eliminates switching overhead"
            desc="Every car has different brake feel, throttle response, weight transfer. Switching = constantly re-calibrating instead of refining."
          />
          <Rationale
            title="exposes fundamentals"
            desc="SFL has insufficient downforce to mask bad technique. Sloppy brake release? Felt immediately. Cannot compensate—must be correct."
          />
          <Rationale
            title="creates transferable skills"
            desc="Fundamentals learned in SFL transfer up. Reverse not always true. Build on solid foundation."
          />
          <Rationale
            title="removes equipment excuses"
            desc="No 'maybe different car suits me better.' Car is fixed. Improvement must come from driver."
          />
        </div>
      </Section>

      <Section id="03" title="why four tracks">
        <div className="border border-border p-4 mb-6">
          <p className="text-xs mb-2">learning curve phases</p>
          <ol className="text-muted-foreground text-sm space-y-1">
            <li>1. orientation (1-2h): learning layout, basic braking</li>
            <li>2. rapid improvement (5-10h): optimizing the obvious</li>
            <li>3. plateau (10-50h): gains slow dramatically</li>
            <li>4. mastery (100+h): tiny gains, but real skill lives here</li>
          </ol>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Most people switch tracks at plateau, chasing dopamine of early gains.
          Never reach phase 4.
        </p>
        <div className="space-y-4 text-sm text-muted-foreground">
          <Rationale
            title="enables pattern recognition"
            desc="Mastery requires recognizing subtle patterns—tire wear effects, grip level changes. Cannot learn in 10 hours."
          />
          <Rationale
            title="forces variance collapse"
            desc="Cannot hide inconsistency in novelty. Same corner, over and over, reveals variance starkly."
          />
          <Rationale
            title="creates benchmark depth"
            desc="Know exactly what good lap feels like. Diagnose problems immediately—thousands of reference laps in memory."
          />
        </div>
      </Section>

      <Section id="04" title="the four tracks">
        <div className="space-y-4 text-sm text-muted-foreground">
          <div>
            <span className="text-foreground">monza</span> — temple of speed.
            Heavy braking zones. Chicane precision. High-speed discipline.
            Punishes early throttle with understeer.
          </div>
          <div>
            <span className="text-foreground">silverstone</span> — flowing,
            high-speed. Maggots-Becketts-Chapel tests commitment. Copse tests
            nerve. Rewards smooth inputs.
          </div>
          <div>
            <span className="text-foreground">suzuka</span> — figure-8.
            Technical variety. The Esses demand rhythm. 130R demands trust.
            Spoon demands patience.
          </div>
          <div>
            <span className="text-foreground">spa</span> — elevation changes.
            Eau Rouge/Raidillon tests everything. Weather adds chaos.
            Pouhon rewards bravery.
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          All Grade 1 F1 circuits. Each tests different aspects. Together they
          build complete fundamentals.
        </p>
      </Section>

      <Section id="05" title="constraint drift">
        <div className="border border-destructive/30 p-4 mb-4">
          <p className="text-xs mb-2 text-destructive">how constraints erode</p>
          <ul className="text-muted-foreground text-sm space-y-1">
            <li>&quot;just this one new track—special event&quot;</li>
            <li>&quot;different car for variety, just one session&quot;</li>
            <li>&quot;bored, maybe need to mix it up&quot;</li>
          </ul>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Each exception seems harmless. Accumulated, they destroy the
          experiment. Power of constraints comes from non-negotiability.
        </p>
        <div className="border border-border p-4">
          <p className="text-xs mb-2">holding the line</p>
          <ul className="text-muted-foreground text-sm space-y-1">
            <li>— boredom is expected. not a signal to change.</li>
            <li>— plateaus are expected. push through with better practice quality.</li>
            <li>— special events can wait. 12 months is not forever.</li>
          </ul>
        </div>
      </Section>

      <Section id="06" title="post-experiment: step-up validation">
        <p className="text-sm text-muted-foreground">
          Constraints are not permanent. After 12-month foundation: move to
          faster car, unfamiliar track. Measure adaptation rate. Hypothesis: a
          driver with 1,200h of deep, constrained practice adapts faster than
          one with 1,200h of shallow variety.
        </p>
      </Section>

      <footer className="mt-16 pt-8 border-t border-border flex justify-between">
        <Link
          href="/methodology/variance-collapse"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← variance collapse
        </Link>
        <Link
          href="/experiment"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          experiment →
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

function Rationale({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <span className="text-foreground">{title}</span> — {desc}
    </div>
  );
}
