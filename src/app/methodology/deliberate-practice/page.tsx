import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "deliberate practice",
  description: "The Ericsson framework. Why most practice fails.",
};

export default function DeliberatePracticePage() {
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
        <h1 className="text-2xl font-bold mb-4">deliberate practice</h1>
        <p className="text-muted-foreground">
          Term coined by K. Anders Ericsson. Not &quot;practicing a lot&quot;—a
          specific type of practice that produces expert performance. Most
          practice does not qualify.
        </p>
      </header>

      <Section id="01" title="the 10,000 hour myth">
        <p className="mb-4">
          Gladwell popularized it. Ericsson was frustrated by the
          misrepresentation. The rule is wrong.
        </p>
        <div className="border border-border p-4 mb-4">
          <p className="text-xs text-muted-foreground italic">
            &quot;It is not about the number of hours. It is about what you do
            during those hours.&quot; — Ericsson
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-destructive/30 p-4">
            <p className="text-xs mb-2 text-destructive">the myth</p>
            <ul className="text-muted-foreground space-y-1 text-sm">
              <li>— 10,000 hours at anything = expertise</li>
              <li>— Time is the variable</li>
              <li>— Just keep doing the activity</li>
            </ul>
          </div>
          <div className="border border-[hsl(var(--accent))]/30 p-4">
            <p className="text-xs mb-2 text-[hsl(var(--accent))]">the reality</p>
            <ul className="text-muted-foreground space-y-1 text-sm">
              <li>— Quality determines outcome</li>
              <li>— Most practice is maintenance</li>
              <li>— Plateau forever without right approach</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="02" title="four requirements">
        <Requirement id="1" title="designed for improvement">
          <p>
            Not repetition of things you can do. Specifically targets weaknesses
            and pushes beyond current ability. Every session has an objective
            that addresses a gap.
          </p>
        </Requirement>

        <Requirement id="2" title="immediate feedback">
          <p>
            Without feedback, you reinforce whatever you happen to be doing. In
            sim racing: telemetry is the mechanism. Real-time delta, trace
            overlay, input comparison.
          </p>
        </Requirement>

        <Requirement id="3" title="repetition with refinement">
          <p>
            High volume, but each rep informs the next. Not mindless
            repetition—deliberate adjustment based on previous result.
          </p>
        </Requirement>

        <Requirement id="4" title="mental engagement">
          <p>
            Cognitively exhausting. If comfortable, not deliberate practice. The
            brain must be at the edge of ability, fully engaged.
          </p>
        </Requirement>
      </Section>

      <Section id="03" title="why most practice fails">
        <FailureMode
          mode="comfort zone trap"
          desc="Once adequate, continuing feels productive but builds nothing"
          fix="Always practice at edge of ability, not center"
        />
        <FailureMode
          mode="no feedback loop"
          desc="'Feel' without measurement. No objective evidence of change"
          fix="Measure everything measurable"
        />
        <FailureMode
          mode="wrong target"
          desc="Practicing the wrong thing hard. 'More laps' is often wrong"
          fix="Diagnose first, then prescribe"
        />
        <FailureMode
          mode="volume without intensity"
          desc="Long sessions where focus degrades. Reinforcing bad habits"
          fix="Shorter, higher-intensity. Stop when focus drops"
        />
        <FailureMode
          mode="novelty addiction"
          desc="Constant switching resets learning curve"
          fix="Constrain environment. Depth over width"
        />
      </Section>

      <Section id="04" title="neuroscience">
        <p className="mb-4">Why deliberate practice works at the biological level:</p>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <span className="text-foreground">myelination</span> — myelin sheath
            thickens around frequently-fired pathways. Signal transmission
            becomes faster, more reliable. This is &quot;muscle memory.&quot;
          </div>
          <div>
            <span className="text-foreground">pathway strengthening</span> —
            neurons that fire together wire together (Hebbian learning).
            Connections become stronger with repetition.
          </div>
          <div>
            <span className="text-foreground">cognitive load reduction</span> —
            automated skills require less conscious attention. Frees working
            memory for higher-level decisions.
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Critical: this adaptation only happens when challenged. Repeating
          things you can do triggers no significant adaptation.
        </p>
      </Section>

      <Section id="05" title="application to sim racing">
        <div className="space-y-4 text-muted-foreground">
          <div>
            <span className="text-foreground">active reset</span> — the game
            changer. Instant reset to track. No recovery laps. Run a corner 50
            times while real-world driving allows 10 laps. Rep density that
            physical practice cannot match. Feedback loop in seconds.
          </div>
          <div>
            <span className="text-foreground">session structure</span> — clear
            objective, warm-up, 30-60min focus period, stop when sharpness
            drops, post-session review.
          </div>
          <div>
            <span className="text-foreground">corner work</span> — one corner
            per session. Reset, attempt, telemetry check. Reset, adjust, attempt.
            Tight loop. One variable at a time.
          </div>
          <div>
            <span className="text-foreground">integration test</span> — skill
            stable in isolation → test in full laps → test under pressure. If
            breaks down, back to isolation.
          </div>
        </div>
      </Section>

      <footer className="mt-16 pt-8 border-t border-border flex justify-between">
        <Link
          href="/methodology"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← methodology
        </Link>
        <Link
          href="/methodology/variance-collapse"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          variance collapse →
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
      <div className="text-sm">{children}</div>
    </section>
  );
}

function Requirement({
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
        [{id}] {title}
      </h3>
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
}

function FailureMode({
  mode,
  desc,
  fix,
}: {
  mode: string;
  desc: string;
  fix: string;
}) {
  return (
    <div className="mb-4 text-muted-foreground">
      <span className="text-foreground">{mode}</span> — {desc}
      <div className="text-xs mt-1">fix: {fix}</div>
    </div>
  );
}
