"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Login failed");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg-deep)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Terminal window */}
        <div className="bg-black border border-[var(--color-border)] rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {/* Title bar */}
          <div className="bg-[#161b22] px-4 py-2.5 flex items-center gap-2 border-b border-[var(--color-border)]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)] ml-3">
              auth@adams-tech ~ login
            </span>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="font-[family-name:var(--font-fira)] text-sm mb-6">
              <p className="text-[var(--color-txt-dim)]">
                Adams Tech Services — Authenticated Access
              </p>
              <p className="text-[var(--color-txt-dim)] mt-1">
                Authorized personnel only.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-green)] block mb-1">
                  username:
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[var(--color-bg-deep)] border border-[var(--color-border)] rounded px-3 py-2 font-[family-name:var(--font-fira)] text-sm text-[var(--color-txt)] outline-none focus:border-[var(--color-green)] transition-colors"
                  autoComplete="username"
                  autoFocus
                />
              </div>

              <div>
                <label className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-green)] block mb-1">
                  password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[var(--color-bg-deep)] border border-[var(--color-border)] rounded px-3 py-2 font-[family-name:var(--font-fira)] text-sm text-[var(--color-txt)] outline-none focus:border-[var(--color-green)] transition-colors"
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <p className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-red)]">
                  Error: {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--color-green)] text-[var(--color-bg-deep)] font-[family-name:var(--font-fira)] text-sm font-semibold py-2.5 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Authenticating..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
