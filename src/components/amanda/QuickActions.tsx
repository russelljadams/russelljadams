"use client";

const actions = [
  {
    label: "Shopping List",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
      </svg>
    ),
    color: "#7BC5AE",
    bg: "#E8F5EF",
    href: "#chat",
  },
  {
    label: "Music",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </svg>
    ),
    color: "#B590D4",
    bg: "#F3EBF9",
    href: "#chat",
  },
  {
    label: "Games",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2"/>
        <line x1="6" y1="12" x2="6" y2="12"/>
        <line x1="10" y1="12" x2="10" y2="12"/>
        <circle cx="17" cy="10" r="1"/><circle cx="15" cy="13" r="1"/>
      </svg>
    ),
    color: "#F4A261",
    bg: "#FDF2E6",
    href: "/amanda/dashboard/games",
  },
  {
    label: "Surprise Me",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
      </svg>
    ),
    color: "#E8788A",
    bg: "#FDEEF0",
    href: "#chat",
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action) => (
        <a
          key={action.label}
          href={action.href}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl p-5 no-underline transition-transform active:scale-95"
          style={{
            background: action.bg,
            color: action.color,
          }}
        >
          {action.icon}
          <span className="text-xs font-medium" style={{ color: "#4A3728" }}>
            {action.label}
          </span>
        </a>
      ))}
    </div>
  );
}
