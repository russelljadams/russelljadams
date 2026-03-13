"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  id: string;
  role: "user" | "agent";
  text: string;
  timestamp: number;
}

const COLORS = {
  primary: "#E8788A",
  bg: "#FFF8F5",
  surface: "#FFFFFF",
  text: "#4A3728",
  border: "#F5E6E0",
  muted: "#C4AFA5",
  bubbleAgent: "#FFF0EE",
  bubbleUser: "#E8788A",
};

const SUGGESTED_ACTIONS = [
  "Add to list",
  "Play music",
  "Tell me something nice",
  "Surprise me",
  "Where's Russell?",
];

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: "#FDEEF0" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill={COLORS.primary}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      <div
        className="rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5"
        style={{ background: COLORS.bubbleAgent }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="inline-block w-2 h-2 rounded-full"
            style={{
              background: COLORS.muted,
              animation: `amandaBounce 1.2s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}


// Render message text, detecting [MAP:lat,lng] markers
function renderMessageText(text: string) {
  const mapRegex = /\[MAP:([-\d.]+),([-\d.]+)\]/g;
  const parts: (string | { lat: number; lng: number })[] = [];
  let lastIndex = 0;
  let match;

  while ((match = mapRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push({ lat: parseFloat(match[1]), lng: parseFloat(match[2]) });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  if (parts.length === 1 && typeof parts[0] === "string") {
    return <>{text}</>;
  }

  return (
    <>
      {parts.map((part, i) => {
        if (typeof part === "string") return <span key={i}>{part}</span>;
        const mapsUrl = `https://www.google.com/maps?q=${part.lat},${part.lng}`;
        return (
          <a
            key={i}
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 rounded-xl overflow-hidden no-underline"
            style={{ border: `1px solid ${COLORS.border}` }}
          >
            <img
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${part.lat},${part.lng}&zoom=14&size=300x160&markers=color:red%7C${part.lat},${part.lng}&style=feature:all%7Csaturation:-30&key=`}
              alt="Map"
              className="w-full h-28 object-cover"
              style={{ background: "#F5E6E0" }}
              onError={(e) => {
                // If no API key / static map fails, show a styled fallback
                const el = e.currentTarget;
                el.style.display = "none";
                el.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <div className="hidden w-full h-28 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FDEEF0, #F0E6FF)" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill={COLORS.primary}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div className="px-3 py-2 flex items-center gap-2" style={{ background: COLORS.surface }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={COLORS.primary}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span className="text-xs font-medium" style={{ color: COLORS.primary }}>
                Tap to open map
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill={COLORS.muted} className="ml-auto">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </div>
          </a>
        );
      })}
    </>
  );
}

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "agent",
      text: "Hi Amanda! I'm your Home Helper. Russell built me just for you. I can chat, answer questions, or just keep you company. What's on your mind?",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        text: trimmed,
        timestamp: Date.now(),
      };

      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setInput("");
      setIsTyping(true);

      // Build history for context
      const history = updatedMessages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.text,
        }));

      try {
        const res = await fetch("/api/amanda/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history }),
        });
        const data = await res.json();

        const agentMsg: Message = {
          id: `a-${Date.now()}`,
          role: "agent",
          text: data.reply ?? "Hmm, something went wrong. Try again?",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, agentMsg]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `e-${Date.now()}`,
            role: "agent",
            text: "Oops, I couldn't reach the server. Try again in a moment!",
            timestamp: Date.now(),
          },
        ]);
      } finally {
        setIsTyping(false);
        inputRef.current?.focus();
      }
    },
    [isTyping, messages],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <style>{`
        @keyframes amandaBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>

      <div
        className="rounded-2xl flex flex-col overflow-hidden"
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          boxShadow: "0 2px 12px rgba(200, 140, 130, 0.06)",
          maxHeight: "480px",
          minHeight: "320px",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
          style={{ borderBottom: `1px solid ${COLORS.border}` }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "#FDEEF0" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={COLORS.primary}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: COLORS.text }}>
              Home Helper
            </p>
            <p className="text-xs" style={{ color: COLORS.muted }}>
              {isTyping ? "Typing..." : "Online"}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
          style={{ background: COLORS.bg }}
        >
          {messages.map((msg) =>
            msg.role === "agent" ? (
              <div key={msg.id} className="flex items-end gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#FDEEF0" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={COLORS.primary}>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <div
                  className="rounded-2xl rounded-bl-md px-4 py-2.5 text-sm max-w-[80%]"
                  style={{ background: COLORS.bubbleAgent, color: COLORS.text }}
                >
                  {renderMessageText(msg.text)}
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex justify-end">
                <div
                  className="rounded-2xl rounded-br-md px-4 py-2.5 text-sm max-w-[80%]"
                  style={{ background: COLORS.bubbleUser, color: "#FFFFFF" }}
                >
                  {msg.text}
                </div>
              </div>
            ),
          )}
          {isTyping && <TypingIndicator />}
        </div>

        {/* Suggested actions */}
        <div
          className="flex gap-2 px-4 pt-2 pb-1 flex-wrap flex-shrink-0"
          style={{ borderTop: `1px solid ${COLORS.border}`, background: COLORS.surface }}
        >
          {SUGGESTED_ACTIONS.map((action) => (
            <button
              key={action}
              type="button"
              onClick={() => sendMessage(action)}
              disabled={isTyping}
              className="text-xs px-3 py-1.5 rounded-full transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{ background: "#FDEEF0", color: COLORS.primary }}
            >
              {action}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-3 py-2.5 flex-shrink-0"
          style={{ background: COLORS.surface }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={isTyping}
            className="flex-1 text-sm px-4 py-2.5 rounded-full outline-none disabled:opacity-60"
            style={{
              background: COLORS.bg,
              color: COLORS.text,
              border: `1px solid ${COLORS.border}`,
            }}
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80 disabled:opacity-40 flex-shrink-0"
            style={{ background: COLORS.primary }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="#FFFFFF"/>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
