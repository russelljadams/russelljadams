"use client";

interface StatusCardProps {
  label: string;
  value: string;
  color?: string;
}

export default function StatusCard({
  label,
  value,
  color = "var(--color-green)",
}: StatusCardProps) {
  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-border)] transition-colors">
      <div className="flex items-center gap-2 mb-1">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-sec)]">
          {label}
        </span>
      </div>
      <p
        className="font-[family-name:var(--font-fira)] text-sm font-semibold"
        style={{ color }}
      >
        {value}
      </p>
    </div>
  );
}
