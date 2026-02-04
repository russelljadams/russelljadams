import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "experiment",
  description: "Full protocol specification for the deliberate practice experiment.",
};

export default function ExperimentPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <header className="mb-16">
        <p className="text-muted-foreground text-xs mb-4">// protocol specification</p>
        <h1 className="text-2xl font-bold mb-4">experiment</h1>
        <p className="text-muted-foreground">
          0 → elite sim-racing skill in 12 months. Controlled environment.
          Measured outcomes. Public accountability.
        </p>
      </header>

      <Section id="01" title="premise">
        <p className="mb-4">
          Most practice is noise. Hours logged without intention. Improvement
          treated as mysterious—some have talent, some do not.
        </p>
        <p className="mb-4">
          This experiment rejects that framing. Skill acquisition is
          engineering. Constrain the variables. Tighten the feedback loops.
          Apply sufficient volume of high-quality repetition. Measure the
          output.
        </p>
        <p>
          Working hypothesis: 1,200+ hours of properly structured deliberate
          practice compresses years of normal development into one year.
        </p>
      </Section>

      <Section id="02" title="experimental design">
        <Subsection id="02.1" title="one car: super formula lights">
          <p className="mb-2">Selection criteria:</p>
          <ul className="space-y-1 ml-4">
            <li>— Punishes sloppy inputs immediately</li>
            <li>— Low downforce exposes fundamental technique gaps</li>
            <li>— Cannot compensate with grip; must be correct</li>
            <li>— Clean learning signal, minimal masking</li>
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Higher-downforce cars shift challenge from construction to
            commitment. SFL keeps focus on building correct technique.
          </p>
        </Subsection>

        <Subsection id="02.2" title="four locked tracks">
          <p className="mb-2">Monza. Silverstone. Suzuka. Spa.</p>
          <ul className="space-y-1 ml-4">
            <li>— Monza: heavy braking, chicanes, high-speed discipline</li>
            <li>— Silverstone: flowing, high-speed corners, commitment</li>
            <li>— Suzuka: figure-8, technical variety, rhythm</li>
            <li>— Spa: elevation, weather, Eau Rouge test of nerve</li>
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            All Grade 1 circuits. Different challenges, transferable fundamentals.
            Locked for 12 months. No exceptions.
          </p>
        </Subsection>

        <Subsection id="02.3" title="warm tire protocol">
          <p>
            Core measurement begins when tire temps stabilize. Cold-tire laps
            logged separately. Reproducibility requires controlled conditions.
          </p>
        </Subsection>

        <Subsection id="02.4" title="volume requirement">
          <p className="mb-2">1,200+ hours in 12 months.</p>
          <p className="text-xs text-muted-foreground">
            Constraint: hours must be high-quality reps with defined objectives
            and feedback loops. Volume without intention is excluded.
          </p>
        </Subsection>

        <Subsection id="02.5" title="active reset">
          <p className="mb-2">The unfair advantage.</p>
          <p>
            Sim racing enables something impossible in real-world driving:
            instant reset to track. No recovery laps. No waiting. Isolate a
            corner, run it 50 times in the duration of 10 normal laps.
          </p>
          <ul className="space-y-1 ml-4 mt-2">
            <li>— Rep density multiplier vs physical practice</li>
            <li>— Feedback loop tightens to seconds, not laps</li>
            <li>— Perfect isolation of technique components</li>
            <li>— Mistake → reset → retry with zero overhead</li>
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            This is why sim racing may be the optimal deliberate practice
            environment for driving skill. The constraint elimination is
            profound.
          </p>
        </Subsection>
      </Section>

      <Section id="03" title="target outcomes">
        <Outcome id="A" title="elite pace on locked combo">
          <p>
            Sustained proximity to top benchmarks. Not single hero laps—
            consistent performance within 0.5% of reference across sessions.
          </p>
        </Outcome>

        <Outcome id="B" title="variance collapse">
          <p className="mb-2">The primary metric. Targets:</p>
          <ul className="space-y-1 ml-4">
            <li>— Lap time std dev decreasing week-over-week</li>
            <li>— Sector time stability</li>
            <li>— Braking point consistency</li>
            <li>— Minimum speed repeatability</li>
            <li>— Steering correction frequency reduction</li>
          </ul>
        </Outcome>

        <Outcome id="C" title="transferable fundamentals">
          <p className="mb-2">Skills that transfer to any car/track:</p>
          <ul className="space-y-1 ml-4">
            <li>— Brake pressure modulation</li>
            <li>— Trail brake release timing</li>
            <li>— Minimum speed discipline</li>
            <li>— Throttle application timing</li>
            <li>— Line construction under constraints</li>
          </ul>
        </Outcome>

        <Outcome id="D" title="step-up validation">
          <p>
            Post-experiment: move to higher-downforce car and unfamiliar track.
            Measure adaptation rate. Fundamentals should transfer—not trapped in
            one car&apos;s quirks.
          </p>
        </Outcome>
      </Section>

      <Section id="04" title="success criteria">
        <div className="space-y-2">
          <Criterion text="Lap times improve AND variance decreases" />
          <Criterion text="Near-pace within 5 laps after 24h+ break (retention)" />
          <Criterion text="Can articulate why a lap was fast in technical terms" />
          <Criterion text="Race performance within 0.3% of practice pace" />
          <Criterion text="Step-up car adaptation in <10 hours to baseline competence" />
        </div>
      </Section>

      <Section id="05" title="failure modes">
        <div className="space-y-2">
          <FailureMode
            mode="constraint drift"
            desc="Adding cars/tracks 'just this once'"
          />
          <FailureMode
            mode="ego chasing"
            desc="Optimizing for peak lap instead of consistency"
          />
          <FailureMode
            mode="garbage miles"
            desc="Hours without feedback loops or objectives"
          />
          <FailureMode
            mode="recovery debt"
            desc="Sleep deprivation kneecapping consolidation"
          />
          <FailureMode
            mode="plateau panic"
            desc="Abandoning protocol when progress slows"
          />
        </div>
      </Section>

      <Section id="06" title="protocol summary">
        <div className="border border-border p-4 text-sm">
          <p>
            12-month deliberate practice experiment. iRacing. Super Formula
            Lights. Four locked tracks. 1,200+ hours of high-quality
            repetition. Primary metric: variance collapse. Public documentation
            for accountability. Protocol survives if constraints hold and
            boredom doesn&apos;t win.
          </p>
        </div>
      </Section>

      <footer className="mt-16 pt-8 border-t border-border">
        <Link
          href="/methodology"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          → methodology: the deliberate practice framework
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
      <h2 className="text-xs text-muted-foreground mb-4">
        // {id} {title}
      </h2>
      <div className="text-sm text-muted-foreground">{children}</div>
    </section>
  );
}

function Subsection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h3 className="text-xs mb-3">
        [{id}] {title}
      </h3>
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
}

function Outcome({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-xs mb-2">
        outcome {id}: {title}
      </h3>
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
}

function Criterion({ text }: { text: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-[hsl(var(--accent))]">✓</span>
      <span>{text}</span>
    </div>
  );
}

function FailureMode({ mode, desc }: { mode: string; desc: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-destructive">✗</span>
      <span>
        <span className="text-foreground">{mode}</span> — {desc}
      </span>
    </div>
  );
}
