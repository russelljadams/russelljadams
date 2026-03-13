import QuoteCard from "@/components/amanda/QuoteCard";
import QuickActions from "@/components/amanda/QuickActions";

export default function AmandaDashboardPage() {
  return (
    <div className="space-y-5 max-w-lg mx-auto">
      <QuoteCard />
      <QuickActions />

      {/* Chat preview / placeholder */}
      <div
        id="chat"
        className="rounded-2xl p-5"
        style={{
          background: "white",
          border: "1px solid #F5E6E0",
          boxShadow: "0 2px 12px rgba(200, 140, 130, 0.06)",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "#FDEEF0" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#E8788A" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: "#4A3728" }}>Home Helper</p>
            <p className="text-xs" style={{ color: "#C4AFA5" }}>Ask me anything</p>
          </div>
        </div>
        <div className="rounded-xl p-3 text-sm" style={{ background: "#FFF8F5", color: "#8B7365" }}>
          Hi Amanda! I can help with your shopping list, play music, or just chat. What would you like?
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {["Add to list", "Play music", "Tell me something nice"].map((action) => (
            <button
              key={action}
              className="text-xs px-3 py-1.5 rounded-full transition-opacity hover:opacity-80"
              style={{ background: "#FDEEF0", color: "#E8788A" }}
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
