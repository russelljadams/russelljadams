"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "home" },
  { href: "/experiment", label: "experiment" },
  { href: "/methodology", label: "methodology" },
  { href: "/progress", label: "progress" },
  { href: "/logs", label: "logs" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-sm font-bold tracking-tight">
          Russell J. Adams
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-xs transition-colors",
                pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href))
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
