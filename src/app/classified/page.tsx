// FLAG #3: Discoverable via robots.txt → /classified/
export default function ClassifiedPage() {
  // Base64 of: FLAG{follow_the_breadcrumbs}
  const encoded = "RkxBR3tmb2xsb3dfdGhlX2JyZWFkY3J1bWJzfQ==";

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] flex items-center justify-center p-8">
      <div className="max-w-lg w-full">
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-8">
          <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-amber)] tracking-[3px] uppercase mb-4">
            // Classified
          </div>
          <h1 className="font-[family-name:var(--font-chakra)] text-2xl font-bold text-[var(--color-txt)] mb-4">
            Access Granted
          </h1>
          <p className="text-[var(--color-txt-sec)] mb-6 text-sm leading-relaxed">
            You found the hidden directory. Good instincts &mdash; checking{" "}
            <code className="text-[var(--color-green)] font-[family-name:var(--font-fira)]">
              robots.txt
            </code>{" "}
            is one of the first steps in any recon operation.
          </p>
          <div className="bg-black/50 border border-[var(--color-border)] rounded p-4 font-[family-name:var(--font-fira)] text-sm">
            <span className="text-[var(--color-txt-dim)]">
              encoded_transmission:
            </span>
            <br />
            <span className="text-[var(--color-green)] break-all">
              {encoded}
            </span>
          </div>
          <p className="text-[var(--color-txt-dim)] text-xs mt-4 font-[family-name:var(--font-fira)]">
            Hint: This encoding is standard for data in transit.
          </p>
        </div>
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-[var(--color-txt-dim)] text-sm hover:text-[var(--color-green)] transition-colors font-[family-name:var(--font-fira)]"
          >
            &larr; Return to portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
