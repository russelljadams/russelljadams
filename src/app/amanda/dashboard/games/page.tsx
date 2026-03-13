"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SudokuGame from "@/components/amanda/SudokuGame";

const GGsHeartGame = dynamic(() => import("@/components/amanda/GGsHeartGame"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center" style={{ minHeight: 200, color: "#C4AFA5" }}>
      <p className="text-sm">Loading game...</p>
    </div>
  ),
});

const PALETTE = {
  rose: "#E8788A",
  lavender: "#B590D4",
  sage: "#7BC5AE",
  text: "#4A3728",
  muted: "#C4AFA5",
  cream: "#FFF8F5",
  border: "#F5E6E0",
};

const GARDEN_NAMES = ["Empty", "Sprout", "First Bloom", "Small Garden", "Growing", "Lush", "Enchanted", "Full Bloom"];
const GARDEN_THRESHOLDS = [0, 3, 15, 40, 80, 150, 250, 400];

function getStoredPetals(): { petals: number; stage: number; stageName: string } {
  if (typeof window === "undefined") return { petals: 0, stage: 0, stageName: "Empty" };
  try {
    const raw = localStorage.getItem("amandaSudoku");
    if (!raw) return { petals: 0, stage: 0, stageName: "Empty" };
    const data = JSON.parse(raw);
    const petals = data?.petals?.lifetime || 0;
    let stage = 0;
    for (let i = GARDEN_THRESHOLDS.length - 1; i >= 0; i--) {
      if (petals >= GARDEN_THRESHOLDS[i]) { stage = i; break; }
    }
    return { petals, stage, stageName: GARDEN_NAMES[stage] || "Full Bloom" };
  } catch {
    return { petals: 0, stage: 0, stageName: "Empty" };
  }
}

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [sudokuInfo, setSudokuInfo] = useState({ petals: 0, stage: 0, stageName: "Empty" });

  useEffect(() => {
    setSudokuInfo(getStoredPetals());
  }, [activeGame]);

  if (activeGame === "Sudoku") {
    return (
      <div className="max-w-lg mx-auto">
        <SudokuGame onBack={() => setActiveGame(null)} />
      </div>
    );
  }

  if (activeGame === "GGsHeart") {
    return (
      <div className="max-w-lg mx-auto">
        <GGsHeartGame onBack={() => setActiveGame(null)} />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4" style={{ color: PALETTE.text }}>
        Games
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {/* Sudoku card */}
        <button
          onClick={() => setActiveGame("Sudoku")}
          className="rounded-2xl p-5 flex flex-col items-center text-center gap-2 transition-transform active:scale-95"
          style={{ background: `${PALETTE.lavender}12`, border: "none", cursor: "pointer" }}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${PALETTE.lavender}22` }}>
            <span className="text-2xl" style={{ color: PALETTE.lavender }}>#</span>
          </div>
          <p className="text-sm font-medium" style={{ color: PALETTE.text }}>Sudoku</p>
          <p className="text-xs" style={{ color: PALETTE.muted }}>Classic number puzzle</p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginTop: 2 }}>
            {sudokuInfo.petals > 0 && (
              <span className="text-[10px] font-semibold" style={{ color: PALETTE.sage }}>
                {sudokuInfo.petals} petals
              </span>
            )}
            <span className="text-[10px]" style={{ color: PALETTE.muted, fontStyle: "italic" }}>
              {sudokuInfo.stage > 0 ? sudokuInfo.stageName : ""}
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full mt-1" style={{ background: `${PALETTE.lavender}18`, color: PALETTE.lavender }}>
            Play
          </span>
        </button>

        {/* GG's Heart card */}
        <button
          onClick={() => setActiveGame("GGsHeart")}
          className="rounded-2xl p-5 flex flex-col items-center text-center gap-2 transition-transform active:scale-95"
          style={{ background: `${PALETTE.rose}12`, border: "none", cursor: "pointer" }}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${PALETTE.rose}22` }}>
            <span className="text-2xl" style={{ color: PALETTE.rose }}>{"\u2665"}</span>
          </div>
          <p className="text-sm font-medium" style={{ color: PALETTE.text }}>GG&apos;s Heart</p>
          <p className="text-xs" style={{ color: PALETTE.muted }}>A platformer adventure</p>
          <span className="text-[10px] px-2 py-0.5 rounded-full mt-1" style={{ background: `${PALETTE.rose}18`, color: PALETTE.rose }}>
            Play
          </span>
        </button>
      </div>
    </div>
  );
}
