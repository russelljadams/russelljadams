import Nav from "@/components/Nav";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Russell J. Adams",
  description: "Get in touch for security assessments, tech repair, or consulting.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="px-6 md:px-10 pt-28 pb-20 max-w-3xl">
        <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-text-muted)] tracking-widest uppercase mb-3">
          Contact
        </div>
        <h1 className="font-[family-name:var(--font-chakra)] text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
          Get in Touch
        </h1>
        <p className="font-[family-name:var(--font-outfit)] text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-10">
          Need a security assessment? Tech repair? Just want to talk shop? Drop me a line.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ContactForm />

          <div className="space-y-4">
            <a
              href="mailto:radams.starpointlogistics@gmail.com"
              className="flex items-center gap-3 px-5 py-4 bg-[var(--color-surface)] border border-[var(--color-border)] no-underline text-[var(--color-text-secondary)] font-[family-name:var(--font-fira)] text-[13px] transition-all hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              radams.starpointlogistics@gmail.com
            </a>
            <a
              href="tel:+19702602840"
              className="flex items-center gap-3 px-5 py-4 bg-[var(--color-surface)] border border-[var(--color-border)] no-underline text-[var(--color-text-secondary)] font-[family-name:var(--font-fira)] text-[13px] transition-all hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              (970) 260-2840
            </a>
            <a
              href="https://github.com/russelljadams"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-4 bg-[var(--color-surface)] border border-[var(--color-border)] no-underline text-[var(--color-text-secondary)] font-[family-name:var(--font-fira)] text-[13px] transition-all hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              github.com/russelljadams
            </a>
            <div className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-text-muted)] mt-4 px-1">
              Grand Junction, CO &mdash; Open to relocation
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
