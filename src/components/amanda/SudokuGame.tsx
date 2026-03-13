"use client";

import { useState, useEffect, useCallback } from "react";
import {
  generatePuzzle,
  validateBoard,
  isBoardComplete,
  type SudokuBoard,
  type SudokuPuzzle,
} from "@/lib/amanda/sudoku";

const COLORS = {
  primary: "#E8788A",
  surface: "#FFFFFF",
  bg: "#FFF8F5",
  text: "#4A3728",
  textLight: "#C4AFA5",
  border: "#F5E6E0",
  accent: "#7BC5AE",
  lavender: "#B590D4",
  errorBg: "#FDE8E8",
  selectedBg: "#FDEEF0",
  sameNumBg: "#F5E6E0",
};

const STORAGE_KEY = "amanda-sudoku-save";

interface GameState {
  puzzle: SudokuPuzzle;
  current: SudokuBoard;
  selected: [number, number] | null;
  history: SudokuBoard[];
  won: boolean;
}

function loadGame(): GameState | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data) as GameState;
  } catch {
    return null;
  }
}

function saveGame(state: GameState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or unavailable
  }
}

function clearSave() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export default function SudokuGame({ onBack }: { onBack: () => void }) {
  const [game, setGame] = useState<GameState | null>(null);
  const [errors, setErrors] = useState<boolean[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(true))
  );

  const startNew = useCallback((difficulty: "easy" | "medium" | "hard") => {
    clearSave();
    const puzzle = generatePuzzle(difficulty);
    const current = puzzle.puzzle.map((r) => [...r]);
    const state: GameState = {
      puzzle,
      current,
      selected: null,
      history: [],
      won: false,
    };
    setGame(state);
    setErrors(Array.from({ length: 9 }, () => Array(9).fill(true)));
  }, []);

  // Initialize
  useEffect(() => {
    const saved = loadGame();
    if (saved && !saved.won) {
      setGame(saved);
      setErrors(validateBoard(saved.current, saved.puzzle.solution));
    } else {
      startNew("easy");
    }
  }, [startNew]);

  // Save on change
  useEffect(() => {
    if (game) saveGame(game);
  }, [game]);

  const handleCellTap = useCallback(
    (r: number, c: number) => {
      if (!game || game.won) return;
      setGame((prev) => (prev ? { ...prev, selected: [r, c] } : prev));
    },
    [game]
  );

  const placeNumber = useCallback(
    (num: number) => {
      if (!game || !game.selected || game.won) return;
      const [r, c] = game.selected;
      if (game.puzzle.puzzle[r][c] !== 0) return;

      const newCurrent = game.current.map((row) => [...row]);
      const historyEntry = game.current.map((row) => [...row]);
      newCurrent[r][c] = num;

      const newErrors = validateBoard(newCurrent, game.puzzle.solution);
      const won = isBoardComplete(newCurrent, game.puzzle.solution);

      setErrors(newErrors);
      setGame((prev) =>
        prev
          ? {
              ...prev,
              current: newCurrent,
              history: [...prev.history, historyEntry],
              won,
            }
          : prev
      );
    },
    [game]
  );

  const handleErase = useCallback(() => {
    if (!game || !game.selected || game.won) return;
    const [r, c] = game.selected;
    if (game.puzzle.puzzle[r][c] !== 0) return;
    if (game.current[r][c] === 0) return;

    const newCurrent = game.current.map((row) => [...row]);
    const historyEntry = game.current.map((row) => [...row]);
    newCurrent[r][c] = 0;

    setErrors(validateBoard(newCurrent, game.puzzle.solution));
    setGame((prev) =>
      prev
        ? {
            ...prev,
            current: newCurrent,
            history: [...prev.history, historyEntry],
          }
        : prev
    );
  }, [game]);

  const handleUndo = useCallback(() => {
    if (!game || game.history.length === 0 || game.won) return;
    const newHistory = [...game.history];
    const previous = newHistory.pop()!;
    setErrors(validateBoard(previous, game.puzzle.solution));
    setGame((prev) =>
      prev ? { ...prev, current: previous, history: newHistory } : prev
    );
  }, [game]);

  const handleHint = useCallback(() => {
    if (!game || game.won) return;
    const candidates: [number, number][] = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (game.current[r][c] !== game.puzzle.solution[r][c]) {
          candidates.push([r, c]);
        }
      }
    }
    if (candidates.length === 0) return;
    const [r, c] = candidates[Math.floor(Math.random() * candidates.length)];

    const newCurrent = game.current.map((row) => [...row]);
    const historyEntry = game.current.map((row) => [...row]);
    newCurrent[r][c] = game.puzzle.solution[r][c];

    const newErrors = validateBoard(newCurrent, game.puzzle.solution);
    const won = isBoardComplete(newCurrent, game.puzzle.solution);

    setErrors(newErrors);
    setGame((prev) =>
      prev
        ? {
            ...prev,
            current: newCurrent,
            selected: [r, c],
            history: [...prev.history, historyEntry],
            won,
          }
        : prev
    );
  }, [game]);

  if (!game) return null;

  const selectedVal =
    game.selected ? game.current[game.selected[0]][game.selected[1]] : null;

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: COLORS.primary,
            fontSize: 14,
            cursor: "pointer",
            padding: "4px 0",
            fontWeight: 600,
          }}
        >
          &larr; Back
        </button>
        <h2
          style={{
            flex: 1,
            textAlign: "center",
            color: COLORS.text,
            fontSize: 18,
            fontWeight: 700,
            margin: 0,
          }}
        >
          Sudoku
        </h2>
        <span style={{ width: 44 }} />
      </div>

      {/* Difficulty selector */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {(["easy", "medium", "hard"] as const).map((d) => (
          <button
            key={d}
            onClick={() => startNew(d)}
            style={{
              padding: "6px 16px",
              borderRadius: 999,
              border:
                game.puzzle.difficulty === d
                  ? `2px solid ${COLORS.primary}`
                  : `1px solid ${COLORS.border}`,
              background:
                game.puzzle.difficulty === d
                  ? COLORS.selectedBg
                  : COLORS.surface,
              color:
                game.puzzle.difficulty === d ? COLORS.primary : COLORS.textLight,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Win banner */}
      {game.won && (
        <div
          style={{
            textAlign: "center",
            padding: 16,
            borderRadius: 16,
            background: `${COLORS.accent}15`,
            border: `2px solid ${COLORS.accent}`,
          }}
        >
          <div style={{ fontSize: 28, marginBottom: 4 }}>&#127881;</div>
          <p
            style={{
              color: COLORS.accent,
              fontWeight: 700,
              fontSize: 16,
              margin: 0,
            }}
          >
            You did it, Amanda!
          </p>
          <p
            style={{
              color: COLORS.textLight,
              fontSize: 13,
              margin: "4px 0 0",
            }}
          >
            Puzzle complete &mdash; you&apos;re a star!
          </p>
        </div>
      )}

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 1fr)",
          gap: 0,
          border: `2px solid ${COLORS.text}`,
          borderRadius: 8,
          overflow: "hidden",
          aspectRatio: "1",
          maxWidth: "100%",
          background: COLORS.surface,
        }}
      >
        {Array.from({ length: 81 }, (_, i) => {
          const r = Math.floor(i / 9);
          const c = i % 9;
          const val = game.current[r][c];
          const isOriginal = game.puzzle.puzzle[r][c] !== 0;
          const isSelected =
            game.selected !== null &&
            game.selected[0] === r &&
            game.selected[1] === c;
          const isSameNum =
            selectedVal !== null &&
            selectedVal !== 0 &&
            val === selectedVal &&
            !isSelected;
          const isInSelectedRowCol =
            game.selected !== null &&
            !isSelected &&
            (game.selected[0] === r || game.selected[1] === c);
          const isError = val !== 0 && !errors[r][c];

          let bg = COLORS.surface;
          if (isSelected) bg = COLORS.selectedBg;
          else if (isSameNum) bg = COLORS.sameNumBg;
          else if (isError) bg = COLORS.errorBg;
          else if (isInSelectedRowCol) bg = `${COLORS.border}80`;

          const borderRight =
            c === 2 || c === 5
              ? `2px solid ${COLORS.text}`
              : `1px solid ${COLORS.border}`;
          const borderBottom =
            r === 2 || r === 5
              ? `2px solid ${COLORS.text}`
              : `1px solid ${COLORS.border}`;

          return (
            <button
              key={i}
              onClick={() => handleCellTap(r, c)}
              style={{
                background: bg,
                border: "none",
                borderRight: c < 8 ? borderRight : "none",
                borderBottom: r < 8 ? borderBottom : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(14px, 4vw, 20px)",
                fontWeight: isOriginal ? 700 : 500,
                color: isError
                  ? COLORS.primary
                  : isOriginal
                    ? COLORS.text
                    : COLORS.lavender,
                cursor: "pointer",
                padding: 0,
                minHeight: 36,
                aspectRatio: "1",
                lineHeight: 1,
                transition: "background 0.1s",
              }}
              aria-label={`Row ${r + 1}, Column ${c + 1}${val ? `, value ${val}` : ", empty"}`}
            >
              {val !== 0 ? val : ""}
            </button>
          );
        })}
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {[
          { label: "Undo", action: handleUndo, icon: "\u21A9" },
          { label: "Erase", action: handleErase, icon: "\u232B" },
          { label: "Hint", action: handleHint, icon: "\u2728" },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            disabled={game.won}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: "8px 16px",
              borderRadius: 12,
              border: `1px solid ${COLORS.border}`,
              background: COLORS.surface,
              color: game.won ? COLORS.textLight : COLORS.text,
              fontSize: 12,
              fontWeight: 600,
              cursor: game.won ? "default" : "pointer",
              opacity: game.won ? 0.5 : 1,
            }}
          >
            <span style={{ fontSize: 18 }}>{btn.icon}</span>
            {btn.label}
          </button>
        ))}
      </div>

      {/* Number pad */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 1fr)",
          gap: 6,
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => placeNumber(num)}
            disabled={game.won}
            style={{
              minHeight: 44,
              borderRadius: 10,
              border: `1px solid ${COLORS.border}`,
              background:
                selectedVal === num ? COLORS.primary : COLORS.surface,
              color: selectedVal === num ? "#FFF" : COLORS.text,
              fontSize: 18,
              fontWeight: 700,
              cursor: game.won ? "default" : "pointer",
              opacity: game.won ? 0.5 : 1,
              transition: "background 0.1s, color 0.1s",
            }}
          >
            {num}
          </button>
        ))}
      </div>

      {/* New Game */}
      <button
        onClick={() => startNew(game.puzzle.difficulty)}
        style={{
          padding: "12px 0",
          borderRadius: 999,
          border: "none",
          background: COLORS.primary,
          color: "#FFF",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer",
          width: "100%",
        }}
      >
        New Game
      </button>
    </div>
  );
}
