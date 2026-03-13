"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const RussellMap = dynamic(() => import("./RussellMap"), { ssr: false });

interface LocationData {
  lat: number;
  lng: number;
  timestamp: number;
  accuracy?: number;
}

export default function FindRussell() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  async function findHim() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/amanda/location");
      if (!res.ok) {
        setError("Can't find him right now");
        return;
      }
      const data = await res.json();
      setLocation(data);
      setOpen(true);
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  }

  function getTimeAgo(timestamp: number): string {
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  if (open && location) {
    return (
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "white",
          border: "1px solid #F5E6E0",
          boxShadow: "0 2px 12px rgba(200, 140, 130, 0.1)",
        }}
      >
        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between"
          style={{ borderBottom: "1px solid #F5E6E0" }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "#FDEEF0" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#E8788A">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <span className="text-sm font-medium" style={{ color: "#4A3728" }}>
              Russell is here
            </span>
            <span className="text-xs" style={{ color: "#C4AFA5" }}>
              {getTimeAgo(location.timestamp)}
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-xs px-2 py-1 rounded-full"
            style={{ color: "#C4AFA5", background: "#FFF0EB" }}
          >
            Close
          </button>
        </div>
        {/* Map */}
        <div style={{ height: "280px" }}>
          <RussellMap lat={location.lat} lng={location.lng} />
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={findHim}
      disabled={loading}
      className="flex items-center justify-center gap-2 rounded-2xl p-5 no-underline transition-transform active:scale-95 w-full"
      style={{ background: "#FDEEF0", color: "#E8788A" }}
    >
      {loading ? (
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "#E8788A",
                animation: `amandaDotBounce 1.4s infinite ease-in-out ${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      ) : (
        <>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span className="text-xs font-medium" style={{ color: "#4A3728" }}>
            Where&apos;s Russell?
          </span>
        </>
      )}
      {error && (
        <span className="text-xs" style={{ color: "#E8788A" }}>{error}</span>
      )}
    </button>
  );
}
