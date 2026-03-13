"use client";

import { useState, useCallback } from "react";
import { getDailyQuote, getRandomQuote, type Quote } from "@/lib/amanda/quotes";

export default function QuoteCard() {
  const [quote, setQuote] = useState<Quote>(getDailyQuote);
  const [animating, setAnimating] = useState(false);

  const refresh = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      setQuote(prev => getRandomQuote(prev));
      setAnimating(false);
    }, 300);
  }, []);

  const isPoem = quote.type === "poem";

  return (
    <div
      className="rounded-2xl p-6 relative overflow-hidden transition-opacity duration-300"
      style={{
        background: "linear-gradient(135deg, #F3EBF9 0%, #FDEEF0 50%, #FDF2E6 100%)",
        boxShadow: "0 2px 12px rgba(200, 140, 130, 0.1)",
        opacity: animating ? 0 : 1,
        animation: "amandaFadeIn 0.4s ease forwards",
      }}
    >
      <div className="text-center">
        <p
          className={isPoem ? "whitespace-pre-line text-left" : ""}
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: isPoem ? "1rem" : "1.125rem",
            fontStyle: "italic",
            lineHeight: 1.7,
            color: "#4A3728",
          }}
        >
          &ldquo;{quote.text}&rdquo;
        </p>
        <p className="mt-3 text-sm" style={{ color: "#8B7365" }}>
          &mdash; {quote.author}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end items-center gap-3 mt-4">
        <button
          onClick={refresh}
          className="text-xs px-3 py-1.5 rounded-full transition-opacity hover:opacity-70"
          style={{ color: "#B590D4", background: "rgba(181, 144, 212, 0.12)" }}
          aria-label="Show another quote"
        >
          Another
        </button>
      </div>
    </div>
  );
}
