"use client";

const GLYPHS = [
  "\u2234", "\u2237", "\u25CA", "\u2726", "\u2727", "\u2728",
  "\u2560", "\u2563", "\u256C", "\u2593", "\u2591",
];

export default function AlienGlyph({ className = "" }: { className?: string }) {
  const glyphs = Array.from({ length: 5 }, (_, i) => GLYPHS[i % GLYPHS.length]);

  return (
    <div className={`flex items-center justify-center gap-4 py-4 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--color-alien)] opacity-20" />
      {glyphs.map((g, i) => (
        <span
          key={i}
          className="alien-glow text-sm"
          style={{ animationDelay: `${i * 0.4}s` }}
        >
          {g}
        </span>
      ))}
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--color-alien)] opacity-20" />
    </div>
  );
}
