"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AmandaLoginPage() {
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

      const data = await res.json();
      if (data.role === "viewer") {
        router.push("/amanda/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #FFF8F5 0%, #FFF0EB 50%, #F3EBF9 100%)" }}>
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(200,140,130,0.15)] p-8">
          {/* Heart icon */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FDEEF0] mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#E8788A" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-semibold" style={{ color: "#4A3728", fontFamily: "var(--font-outfit)" }}>
              Welcome back
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                style={{
                  borderColor: "#F5E6E0",
                  color: "#4A3728",
                  background: "#FFF8F5",
                  fontFamily: "var(--font-outfit)",
                }}
                onFocus={(e) => e.target.style.borderColor = "#E8788A"}
                onBlur={(e) => e.target.style.borderColor = "#F5E6E0"}
                autoComplete="username"
                autoFocus
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                style={{
                  borderColor: "#F5E6E0",
                  color: "#4A3728",
                  background: "#FFF8F5",
                  fontFamily: "var(--font-outfit)",
                }}
                onFocus={(e) => e.target.style.borderColor = "#E8788A"}
                onBlur={(e) => e.target.style.borderColor = "#F5E6E0"}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-xs text-center" style={{ color: "#E8788A" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: "#E8788A", fontFamily: "var(--font-outfit)" }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
