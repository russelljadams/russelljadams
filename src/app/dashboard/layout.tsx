"use client";

import { AuthProvider, useAuth } from "@/components/AuthProvider";
import Link from "next/link";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-deep)] flex items-center justify-center">
        <p className="font-[family-name:var(--font-fira)] text-sm text-[var(--color-txt-dim)]">
          Authenticating...
        </p>
      </div>
    );
  }

  if (!user) return null; // middleware handles redirect

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-txt)]">
      {/* Top bar */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-[var(--color-border)] bg-[var(--color-bg-panel)]">
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="font-[family-name:var(--font-fira)] text-sm text-[var(--color-green)] font-semibold no-underline"
          >
            adams-tech<span className="text-[var(--color-txt-dim)]">://</span>
            dashboard
          </Link>
          <Link
            href="/"
            className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-sec)] no-underline hover:text-[var(--color-green)] transition-colors"
          >
            Home
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-sec)]">
            {user.username}{" "}
            <span className="text-[var(--color-txt-dim)]">
              ({user.role})
            </span>
          </span>
          <button
            onClick={logout}
            className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-red)] hover:opacity-80 transition-opacity"
          >
            logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="p-6">{children}</main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardShell>{children}</DashboardShell>
    </AuthProvider>
  );
}
