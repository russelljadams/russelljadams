import QuoteCard from "@/components/amanda/QuoteCard";
import QuickActions from "@/components/amanda/QuickActions";
import ChatPanel from "@/components/amanda/ChatPanel";
import FindRussell from "@/components/amanda/FindRussell";

export default function AmandaDashboardPage() {
  return (
    <div className="space-y-5 max-w-lg mx-auto">
      <QuoteCard />
      <FindRussell />
      <QuickActions />
      <div id="chat">
        <ChatPanel />
      </div>
    </div>
  );
}
