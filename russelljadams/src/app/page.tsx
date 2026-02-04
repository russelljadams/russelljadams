import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <section className="mb-16">
        <p className="text-muted-foreground text-xs mb-4">
          // year one
        </p>
        <h1 className="text-2xl font-bold mb-2">Russell J. Adams</h1>
        <p className="text-lg text-muted-foreground mb-4">
          An Elite Skill Acquisition Experiment
        </p>
        <p className="text-sm text-muted-foreground max-w-xl">
          A 1200-Hour Case Study in Deliberate Practice. One person. One car.
          Four tracks. 12 months. Public documentation of the process, the
          methodology, and the results.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-xs text-muted-foreground mb-4">// the question</h2>
        <div className="border border-border p-4 text-sm">
          <p className="text-muted-foreground">
            Can elite-level skill be <span className="text-foreground">engineered</span>?
            Not discovered. Not inherited. Engineered—through constrained, high-volume
            deliberate practice with tight feedback loops. This experiment is my attempt
            to answer that question publicly, with data, over 12 months and 1,200+ hours.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xs text-muted-foreground mb-4">// parameters</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Param label="duration" value="12 months" />
          <Param label="target_hours" value="1,200+" />
          <Param label="car" value="SFL" />
          <Param label="tracks" value="MON/SIL/SUZ/SPA" />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xs text-muted-foreground mb-4">// why this matters</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            Most people believe elite performance requires innate talent. The research
            disagrees. K. Anders Ericsson's work on deliberate practice suggests that
            expert performance is largely a product of how you practice, not what you
            were born with.
          </p>
          <p>
            But that claim is easy to make and hard to prove personally. This experiment
            is my proof-of-concept: a documented, public test of whether deliberate
            practice methodology—applied with discipline—produces measurable elite-level
            improvement in a domain I have no natural advantage in.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xs text-muted-foreground mb-4">// constraints</h2>
        <div className="space-y-2 text-sm">
          <Constraint
            id="01"
            text="One car. No switching. Super Formula Lights chosen for clean feedback—punishes slop, exposes fundamentals."
          />
          <Constraint
            id="02"
            text="Four tracks: Monza, Silverstone, Suzuka, Spa. Locked for 12 months. Depth over breadth."
          />
          <Constraint
            id="03"
            text="Warm tires only. Cold-tire laps excluded from measurement. Reproducibility is the baseline."
          />
          <Constraint
            id="04"
            text="High-quality hours only. Session without objective = not counted. Vibes laps are waste."
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xs text-muted-foreground mb-4">// the advantage</h2>
        <div className="border border-border p-4 text-sm">
          <p className="text-muted-foreground">
            <span className="text-foreground">active reset</span> — sim racing's
            unfair advantage for learning. Instant reset to track. No recovery laps.
            Isolate a single corner, run it 50 times in the time real-world driving
            allows 10 laps. Rep density that physical practice cannot match. The
            feedback loop tightens to seconds.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xs text-muted-foreground mb-4">// success criteria</h2>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>→ variance collapse (std dev of lap times decreasing over time)</p>
          <p>→ retention (near-pace after 24h+ away from sim)</p>
          <p>→ transfer (fundamentals hold on new track/car)</p>
          <p>→ pressure stability (race pace ≈ practice pace)</p>
          <p>→ articulation (can explain why a lap was fast)</p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xs text-muted-foreground mb-4">// status</h2>
        <div className="border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--accent))]" />
            <span className="text-sm">active</span>
          </div>
          <p className="text-xs text-muted-foreground">
            experiment in progress. documentation site deployed. awaiting first
            logged sessions.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xs text-muted-foreground mb-4">// explore</h2>
        <div className="space-y-1 text-sm">
          <NavLink href="/experiment" label="experiment" desc="full protocol specification" />
          <NavLink href="/methodology" label="methodology" desc="deliberate practice framework" />
          <NavLink href="/progress" label="progress" desc="metrics and tracking" />
          <NavLink href="/logs" label="logs" desc="session documentation" />
        </div>
      </section>
    </div>
  );
}

function Param({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-3">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}

function Constraint({ id, text }: { id: string; text: string }) {
  return (
    <div className="flex gap-3 text-muted-foreground">
      <span className="text-xs">[{id}]</span>
      <span>{text}</span>
    </div>
  );
}

function NavLink({ href, label, desc }: { href: string; label: string; desc: string }) {
  return (
    <Link href={href} className="flex gap-4 py-2 hover:text-foreground text-muted-foreground transition-colors">
      <span className="w-24">{label}</span>
      <span className="text-muted-foreground">— {desc}</span>
    </Link>
  );
}
