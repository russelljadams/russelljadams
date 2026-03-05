"use client";

import ClientShell from "@/components/ClientShell";
import AgentChat from "@/components/AgentChat";

export default function GhostPage() {
  return (
    <ClientShell>
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-[700px]">
          <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-phosphor)] mb-4 text-center crt-text">
            {`\u2593\u2593\u2593`} GHOST PROTOCOL ACTIVE {`\u2593\u2593\u2593`}
          </div>
          <pre className="font-[family-name:var(--font-fira)] text-[9px] sm:text-[11px] text-[var(--color-alien)] text-center leading-tight mb-6 alien-glow select-none">
{`     .     .       .  .   . .   .   . .    +  .
   .     .  :     .    .. :. .___---------___.
        .  .   .    .  :.:. _".^ .^ ^.  '.. :"-_. .
     .  :       .  .  .:../:            . .^  :.:\\.
         .   . :: +. :.:/: .   .    .        . . .:\\
  .  :    .     . _ gy:/:      .  .       . :.\\..
  .. . .   . - + . :.:./:  .    .     . -|-._ .:/:.
  .      .     . .:...googleyeyes.    /    | .\\:/:.
    .       /.  :.:.::..:..:. .:.  .- .   .| .\\.:.
   .   .  .: .:.:.:...:.  .: :  .  .:.  .  | .\\.:
      . .  :.:...:. .: .:  .:  .  .  . ....:.|  .:.
     . . :. .| .:.:- .:  .  .    ..:.  .:.\\:|  .:.
  .  . .  .:  .  .  .   .   . :. .: .  . .\\| . :.
`}
          </pre>

          <p className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)] text-center mb-6">
            You found the hidden channel. Talk to Gh0st Agent directly.
          </p>

          <AgentChat />

          <div className="text-center mt-6">
            <a
              href="/"
              className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)] hover:text-[var(--color-green)] transition-colors no-underline"
            >
              [exit ghost protocol]
            </a>
          </div>
        </div>
      </main>
    </ClientShell>
  );
}
