"use client";

import { AuthProvider, useAuth } from "@/components/AuthProvider";
import { usePathname } from "next/navigation";
import Link from "next/link";

function AmandaTabBar() {
  const pathname = usePathname();
  const isHome = pathname === "/amanda/dashboard";
  const isGames = pathname.startsWith("/amanda/dashboard/games");

  return (
    <nav className="fixed bottom-0 inset-x-0 h-16 flex items-center justify-around z-50 lg:hidden"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid #F5E6E0",
      }}>
      <TabItem href="/amanda/dashboard" active={isHome} label="Home">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
      </TabItem>
      <TabItem href="/amanda/dashboard/games" active={isGames} label="Games">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2"/>
          <line x1="6" y1="12" x2="6" y2="12"/>
          <line x1="10" y1="12" x2="10" y2="12"/>
          <circle cx="17" cy="10" r="1"/>
          <circle cx="15" cy="13" r="1"/>
        </svg>
      </TabItem>
      <TabItem href="/amanda/dashboard#chat" active={false} label="Chat">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
      </TabItem>
    </nav>
  );
}

function TabItem({ href, active, label, children }: {
  href: string;
  active: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-0.5 no-underline transition-colors"
      style={{ color: active ? "#E8788A" : "#C4AFA5" }}
      aria-label={label}
    >
      {children}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}

function AmandaDashboardShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "#FFF8F5" }}>
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full"
              style={{
                background: "#E8788A",
                animation: `amandaDotBounce 1.4s infinite ease-in-out ${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!user) return null;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen pb-20 lg:pb-0" style={{ background: "#FFF8F5" }}>
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex justify-between items-center">
        <div>
          <p className="text-sm" style={{ color: "#C4AFA5", fontFamily: "var(--font-outfit)" }}>
            {greeting}
          </p>
          <h1 className="text-xl font-semibold -mt-0.5" style={{ color: "#4A3728", fontFamily: "var(--font-outfit)" }}>
            Amanda
          </h1>
        </div>
        <button
          onClick={logout}
          className="text-xs px-3 py-1.5 rounded-full transition-opacity hover:opacity-80"
          style={{ color: "#C4AFA5", background: "#FFF0EB" }}
        >
          Sign out
        </button>
      </header>

      {/* Content */}
      <main className="px-5">
        {children}
      </main>

      <AmandaTabBar />

      <style>{`
        @keyframes amandaDotBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        @keyframes amandaFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function AmandaDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AmandaDashboardShell>{children}</AmandaDashboardShell>
    </AuthProvider>
  );
}
