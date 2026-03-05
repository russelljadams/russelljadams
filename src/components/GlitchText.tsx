"use client";

export default function GlitchText({
  text,
  auto = false,
  className = "",
}: {
  text: string;
  auto?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`glitch-text ${auto ? "glitch-text-auto" : ""} ${className}`}
      data-text={text}
    >
      {text}
    </span>
  );
}
