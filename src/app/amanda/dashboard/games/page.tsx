"use client";

import { useState } from "react";
import SudokuGame from "@/components/amanda/SudokuGame";

const games = [
  {
    name: "Sudoku",
    description: "Classic number puzzle",
    color: "#B590D4",
    bg: "#F3EBF9",
    status: "Play",
    playable: true,
  },
  {
    name: "GG's Heart",
    description: "A platformer adventure",
    color: "#E8788A",
    bg: "#FDEEF0",
    status: "Coming Soon",
    playable: false,
  },
];

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  if (activeGame === "Sudoku") {
    return (
      <div className="max-w-lg mx-auto">
        <SudokuGame onBack={() => setActiveGame(null)} />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4" style={{ color: "#4A3728" }}>
        Games
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {games.map((game) => (
          <button
            key={game.name}
            onClick={() => {
              if (game.playable) setActiveGame(game.name);
            }}
            className="rounded-2xl p-5 flex flex-col items-center text-center gap-2 transition-transform active:scale-95"
            style={{
              background: game.bg,
              border: "none",
              cursor: game.playable ? "pointer" : "default",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: `${game.color}22` }}
            >
              <span className="text-2xl" style={{ color: game.color }}>
                {game.name === "Sudoku" ? "#" : "\u2665"}
              </span>
            </div>
            <p className="text-sm font-medium" style={{ color: "#4A3728" }}>
              {game.name}
            </p>
            <p className="text-xs" style={{ color: "#C4AFA5" }}>
              {game.description}
            </p>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full mt-1"
              style={{ background: `${game.color}18`, color: game.color }}
            >
              {game.status}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
