"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "agent" | "error";
  text: string;
}

export default function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || thinking) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setThinking(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "error", text: data.error || "Agent error" },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "agent", text: data.response || JSON.stringify(data) },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "error", text: "Failed to reach agent" },
      ]);
    } finally {
      setThinking(false);
    }
  }

  return (
    <div className="bg-black border border-[var(--color-border)] rounded-lg overflow-hidden flex flex-col h-[400px]">
      {/* Title bar */}
      <div className="bg-[#161b22] px-4 py-2.5 flex items-center gap-2 border-b border-[var(--color-border)] shrink-0">
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)] ml-2">
          gh0st@agent:~$
        </span>
      </div>

      {/* Messages */}
      <div
        ref={bodyRef}
        className="flex-1 overflow-y-auto p-4 font-[family-name:var(--font-fira)] text-[13px] leading-[1.7] space-y-2"
      >
        {messages.length === 0 && (
          <p className="text-[var(--color-txt-dim)]">
            Gh0st Agent v2 — type a message to begin.
          </p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {msg.role === "user" && (
              <>
                <span className="text-[var(--color-green)]">you</span>
                <span className="text-[var(--color-txt-dim)]">:</span>{" "}
                <span className="text-[var(--color-txt)]">{msg.text}</span>
              </>
            )}
            {msg.role === "agent" && (
              <>
                <span className="text-[var(--color-cyan)]">gh0st</span>
                <span className="text-[var(--color-txt-dim)]">:</span>{" "}
                <span className="text-[var(--color-txt)]">{msg.text}</span>
              </>
            )}
            {msg.role === "error" && (
              <span className="text-[var(--color-red)]">[error] {msg.text}</span>
            )}
          </div>
        ))}
        {thinking && (
          <div className="text-[var(--color-amber)]">thinking...</div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-[var(--color-border)] px-4 py-3 flex items-center gap-2 shrink-0"
      >
        <span className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-green)]">
          $
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Gh0st..."
          disabled={thinking}
          className="flex-1 bg-transparent border-none outline-none font-[family-name:var(--font-fira)] text-[13px] text-[var(--color-txt)] placeholder:text-[var(--color-txt-dim)] caret-[var(--color-green)]"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
