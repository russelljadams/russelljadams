import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "methodology",
  description: "The deliberate practice framework and supporting science.",
};

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <header className="mb-16">
        <p className="text-muted-foreground text-xs mb-4">// framework</p>
        <h1 className="text-2xl font-bold mb-4">methodology</h1>
        <p className="text-muted-foreground">
          The science behind the protocol. Deliberate practice. Motor learning.
          Variance collapse. Not guesswork—established research applied with
          discipline.
        </p>
      </header>

      <Section id="01" title="core principles">
        <Principle id="1" title="skill is neuroplasticity">
          <p>
            The brain rewires in response to repeated, challenging practice.
            Myelin sheaths thicken around frequently-fired pathways. This is
            biology, not motivation. &quot;Talent&quot; is often just a head
            start in this process.
          </p>
        </Principle>

        <Principle id="2" title="feedback loops are everything">
          <p>
            Learning requires knowing whether an action was correct, ideally
            immediately. Without feedback, you reinforce whatever you happen to
            be doing. Telemetry is the feedback mechanism. Real-time delta,
            trace comparison, input overlay.
          </p>
        </Principle>

        <Principle id="3" title="desirable difficulty">
          <p>
            Practice that feels easy builds nothing. The brain only adapts when
            challenged at the edge of current ability. Too easy = maintenance.
            Too hard = frustration. Target zone: succeed ~70% of the time with
            effort.
          </p>
        </Principle>

        <Principle id="4" title="isolation before integration">
          <p>
            Complex skills are built from components. Improving &quot;everything
            at once&quot; means improving nothing reliably. Isolate weak
            component → drill to stability → reintegrate.
          </p>
        </Principle>

        <Principle id="5" title="sleep is consolidation">
          <p>
            Motor learning consolidation happens during slow-wave sleep.
            Practice without adequate sleep is writing to a corrupted drive.
            Sleep deprivation causes regression, not just slower progress.
          </p>
        </Principle>

        <Principle id="6" title="active reset changes everything">
          <p>
            Sim racing enables instant reset to track. No recovery laps. No
            waiting. This is the unfair advantage—rep density that physical
            practice cannot match. Isolate a corner, run it 50 times while
            real-world driving allows 10 laps. Feedback loop measured in
            seconds, not minutes.
          </p>
        </Principle>
      </Section>

      <Section id="02" title="the practice loop">
        <div className="space-y-4">
          <Step n={1} title="assess" desc="Identify specific limiter. Not 'I'm slow'—where and why." />
          <Step n={2} title="design" desc="Create drill that isolates the problem. Corner-specific, telemetry-targeted." />
          <Step n={3} title="execute" desc="Run session with full focus on objective. Not racing clock—drilling technique." />
          <Step n={4} title="evaluate" desc="Did it work? Check telemetry. Be honest about what changed." />
          <Step n={5} title="integrate" desc="Test in full race-pace context. Does it hold under pressure?" />
          <Step n={6} title="log" desc="Document what worked. This becomes knowledge base for future sessions." />
        </div>
      </Section>

      <Section id="03" title="deep dives">
        <div className="space-y-2">
          <DocLink
            href="/methodology/deliberate-practice"
            title="deliberate practice"
            desc="The Ericsson framework. Why most practice fails. What actually works."
          />
          <DocLink
            href="/methodology/variance-collapse"
            title="variance collapse"
            desc="Why consistency matters more than peak. How to measure it."
          />
          <DocLink
            href="/methodology/the-constraints"
            title="the constraints"
            desc="Why one car and four tracks accelerates learning."
          />
        </div>
      </Section>

      <footer className="mt-16 pt-8 border-t border-border">
        <Link
          href="/experiment"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← experiment: full protocol specification
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

function Principle({
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

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="flex gap-4 text-muted-foreground">
      <span className="text-xs w-4">{n}.</span>
      <div>
        <span className="text-foreground">{title}</span> — {desc}
      </div>
    </div>
  );
}

function DocLink({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="block py-3 border-b border-border hover:text-foreground text-muted-foreground transition-colors"
    >
      <span className="text-foreground">{title}</span>
      <span className="text-xs ml-4">{desc}</span>
    </Link>
  );
}
