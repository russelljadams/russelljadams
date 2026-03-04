"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-6 text-center">
        <p className="font-[family-name:var(--font-fira)] text-sm text-[var(--color-green)] mb-2">
          Message sent.
        </p>
        <p className="font-[family-name:var(--font-outfit)] text-sm text-[var(--color-txt-sec)]">
          I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)] hover:text-[var(--color-green)] transition-colors"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-6 space-y-4"
    >
      <p className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)] tracking-widest uppercase mb-2">
        {"// Get in touch"}
      </p>

      <div>
        <label className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-sec)] block mb-1">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-[var(--color-bg-deep)] border border-[var(--color-border)] rounded px-3 py-2 font-[family-name:var(--font-outfit)] text-sm text-[var(--color-txt)] outline-none focus:border-[var(--color-green)] transition-colors"
        />
      </div>

      <div>
        <label className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-sec)] block mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-[var(--color-bg-deep)] border border-[var(--color-border)] rounded px-3 py-2 font-[family-name:var(--font-outfit)] text-sm text-[var(--color-txt)] outline-none focus:border-[var(--color-green)] transition-colors"
        />
      </div>

      <div>
        <label className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-sec)] block mb-1">
          What do you need help with?
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          maxLength={2000}
          className="w-full bg-[var(--color-bg-deep)] border border-[var(--color-border)] rounded px-3 py-2 font-[family-name:var(--font-outfit)] text-sm text-[var(--color-txt)] outline-none focus:border-[var(--color-green)] transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-red)]">
          Something went wrong. Try again or email directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-[var(--color-green)] text-[var(--color-bg-deep)] font-[family-name:var(--font-fira)] text-sm font-semibold py-2.5 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
