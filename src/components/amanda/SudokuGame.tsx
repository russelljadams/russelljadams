"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  generatePuzzle,
  generateDailyPuzzle,
  validateBoard,
  isBoardComplete,
  isRowComplete,
  isColComplete,
  isBoxComplete,
  cloneBoard,
  getTodayString,
  type SudokuBoard,
  type SudokuPuzzle,
  type Difficulty,
} from "@/lib/amanda/sudoku";
import {
  useSudokuProgression,
  ACHIEVEMENT_INFO,
} from "@/lib/amanda/sudoku-progression";

// ─── Palette ───
const C = {
  rose: "#E8788A",
  lavender: "#B590D4",
  sage: "#7BC5AE",
  amber: "#F4A261",
  cream: "#FFF8F5",
  text: "#4A3728",
  muted: "#C4AFA5",
  border: "#F5E6E0",
  white: "#FFFFFF",
};

const DIFF_COLORS: Record<Difficulty, string> = {
  easy: C.sage,
  medium: C.amber,
  hard: C.rose,
  expert: C.lavender,
};

const SAVE_KEY = "amanda-sudoku-save-v2";

// ─── Toast messages ───
const TOAST = {
  start: ["You've got this.", "New puzzle, same brilliant you.", "Take your time."],
  firstNumber: ["And she's off.", "Good start."],
  unitComplete: ["Nice one.", "You're in the zone.", "Clean."],
  stuck: ["Take a breath. It'll come to you.", "The hint button isn't cheating."],
  hint: ["Smart move.", "No shame in that."],
  error: ["Easy fix.", "Close! Try again."],
  russellSpecial: ["Russell thinks you're amazing, by the way."],
  nightStart: ["Late night puzzles hit different.", "The quiet hours are the best for this."],
  nightStuck: ["Even geniuses need sleep. But also, you've got this."],
};

const COMPLETION_MESSAGES = {
  standard: ["Nailed it.", "Beautiful work.", "Your brain is incredible."],
  fast: ["That was FAST.", "Okay, speedrunner."],
  noHint: ["No hints. All you. Amazing."],
  perfect: ["Zero mistakes. Zero hints. Flawless.", "Perfection. Absolute perfection."],
};

// ─── Helpers ───
function pick<T>(arr: T[], rand?: () => number): T {
  const r = rand ? rand() : Math.random();
  return arr[Math.floor(r * arr.length)];
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

// ─── Garden SVG ───
function GardenVisualization({ stage, petals, nextThreshold }: { stage: number; petals: number; nextThreshold: number | null }) {
  const flowers: { x: number; h: number; color: string; delay: number }[] = useMemo(() => {
    const palette = [C.rose, C.lavender, C.amber, C.sage, "#F9C6D0", "#D4B5E8"];
    const count = [0, 0, 1, 3, 5, 8, 11, 14][stage] || 0;
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push({
        x: 10 + (i * 80) / Math.max(count, 1) + ((i * 17) % 7),
        h: 25 + ((i * 13) % 31),
        color: palette[i % palette.length],
        delay: i * 0.3,
      });
    }
    return result;
  }, [stage]);

  const showFireflies = stage >= 5;
  const showButterfly = stage >= 3;
  const showStars = stage >= 7;

  return (
    <div style={{ width: "100%", height: 120, position: "relative", borderRadius: 16, background: `linear-gradient(180deg, ${C.cream} 0%, #E8F5E9 100%)`, overflow: "hidden", marginBottom: 8, border: `1px solid ${C.border}` }}>
      {/* Ground */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 20, background: "#C8B89A", borderRadius: "0 0 16px 16px" }} />
      <div style={{ position: "absolute", bottom: 18, left: 0, right: 0, height: 8, background: "#8BC34A", opacity: 0.3 }} />

      {stage === 0 && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 8, height: 8, background: C.rose, borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)", marginBottom: 4 }} />
          <span style={{ fontSize: 11, color: C.muted, fontStyle: "italic" }}>Your garden is waiting</span>
        </div>
      )}

      {stage >= 1 && stage < 2 && (
        <div style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)" }}>
          <div style={{ width: 2, height: 20, background: "#66BB6A", margin: "0 auto" }} />
          <div style={{ width: 8, height: 5, background: "#81C784", borderRadius: "50% 50% 0 0", marginTop: -2, marginLeft: -3 }} />
        </div>
      )}

      {/* Flowers as SVG */}
      <svg style={{ position: "absolute", bottom: 20, left: 0, width: "100%", height: 80 }} viewBox="0 0 100 80" preserveAspectRatio="none">
        {flowers.map((f, i) => {
          const cy = 80 - f.h;
          return (
            <g key={i}>
              <line x1={f.x} y1={80} x2={f.x} y2={cy + 5} stroke="#66BB6A" strokeWidth={0.5} />
              {[0, 72, 144, 216, 288].map((angle, j) => {
                const rad = (angle * Math.PI) / 180;
                const px = f.x + Math.cos(rad) * 2.5;
                const py = cy + Math.sin(rad) * 2.5;
                return <circle key={j} cx={px} cy={py} r={2} fill={f.color} opacity={0.85}>
                  <animate attributeName="cy" values={`${py};${py - 0.5};${py}`} dur={`${2 + f.delay}s`} repeatCount="indefinite" />
                </circle>;
              })}
              <circle cx={f.x} cy={cy} r={1.2} fill="#FFD54F" />
            </g>
          );
        })}
      </svg>

      {showButterfly && (
        <div style={{
          position: "absolute", top: 25, right: 30, fontSize: 10, opacity: 0.6,
          animation: "none",
        }}>
          <svg width="16" height="12" viewBox="0 0 16 12">
            <ellipse cx="5" cy="6" rx="4" ry="5" fill={C.lavender} opacity={0.5} />
            <ellipse cx="11" cy="6" rx="4" ry="5" fill={C.rose} opacity={0.5} />
            <line x1="8" y1="2" x2="8" y2="10" stroke={C.text} strokeWidth="0.5" />
          </svg>
        </div>
      )}

      {showFireflies && (
        <>
          {[
            { x: "20%", y: "30%", d: "2.5s" },
            { x: "70%", y: "25%", d: "3.2s" },
            { x: "45%", y: "40%", d: "2.8s" },
          ].map((ff, i) => (
            <div key={i} style={{
              position: "absolute", left: ff.x, top: ff.y, width: 4, height: 4,
              borderRadius: "50%", background: "#FFD54F",
              boxShadow: "0 0 4px #FFD54F",
              opacity: 0.7,
            }}>
              <style>{`@keyframes ff${i}{0%,100%{opacity:0.3}50%{opacity:0.9}}`}</style>
              <div style={{ width: 4, height: 4, borderRadius: "50%", animation: `ff${i} ${ff.d} ease-in-out infinite` }} />
            </div>
          ))}
        </>
      )}

      {showStars && (
        <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50)" }}>
          <svg width="40" height="20" viewBox="0 0 40 20">
            {[{x:5,y:5},{x:15,y:3},{x:25,y:8},{x:35,y:4},{x:20,y:12}].map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={1} fill={C.rose} opacity={0.6}>
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <line x1="5" y1="5" x2="15" y2="3" stroke={C.rose} strokeWidth="0.3" opacity="0.3" />
            <line x1="15" y1="3" x2="25" y2="8" stroke={C.rose} strokeWidth="0.3" opacity="0.3" />
            <line x1="25" y1="8" x2="20" y2="12" stroke={C.rose} strokeWidth="0.3" opacity="0.3" />
            <line x1="20" y1="12" x2="35" y2="4" stroke={C.rose} strokeWidth="0.3" opacity="0.3" />
          </svg>
        </div>
      )}

      {/* Progress indicator */}
      {nextThreshold !== null && (
        <div style={{ position: "absolute", top: 6, right: 8, fontSize: 10, color: C.muted }}>
          {petals}/{nextThreshold}
        </div>
      )}
    </div>
  );
}

// ─── Confetti ───
function CSSConfetti({ active }: { active: boolean }) {
  const particles = useMemo(() => {
    if (!active) return [];
    const colors = [C.rose, C.lavender, C.sage, C.amber, "#FFD54F"];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      x: (Math.random() - 0.5) * 300,
      y: -(Math.random() * 400 + 100),
      rotation: Math.random() * 720 - 360,
      delay: Math.random() * 0.5,
      size: 6 + Math.random() * 6,
    }));
  }, [active]);

  if (!active) return null;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, overflow: "hidden" }}>
      <style>{`
        @keyframes confettiFall {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--cx), var(--cy)) rotate(var(--cr)); opacity: 0; }
        }
      `}</style>
      {particles.map((p) => (
        <div key={p.id} style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          width: p.size,
          height: p.size,
          borderRadius: p.id % 3 === 0 ? "50%" : p.id % 3 === 1 ? "2px" : "50% 0",
          background: p.color,
          // @ts-expect-error CSS custom properties
          "--cx": `${p.x}px`,
          "--cy": `${p.y}px`,
          "--cr": `${p.rotation}deg`,
          animation: `confettiFall 1.8s ease-out ${p.delay}s forwards`,
        }} />
      ))}
    </div>
  );
}

// ─── Toast ───
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div style={{
      position: "absolute",
      top: -44,
      left: "50%",
      transform: "translateX(-50%)",
      background: C.cream,
      border: `1px solid ${C.rose}`,
      borderRadius: 999,
      padding: "6px 16px",
      fontSize: 14,
      fontStyle: "italic",
      color: C.muted,
      whiteSpace: "nowrap",
      zIndex: 100,
      opacity: visible ? 1 : 0,
      transition: "opacity 0.3s ease",
      pointerEvents: "none",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    }}>
      {message}
    </div>
  );
}

// ─── Stats Panel ───
function StatsPanel({ state, getContextLine, onClose }: {
  state: ReturnType<typeof useSudokuProgression>["state"];
  getContextLine: () => string;
  onClose: () => void;
}) {
  const unlockedCount = Object.values(state.achievements).filter(a => a.unlocked).length;
  const totalCount = Object.keys(state.achievements).length;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: C.white, borderRadius: 20, padding: 24, maxWidth: 380, width: "100%", maxHeight: "80vh", overflowY: "auto", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: 0 }}>Your Journal</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, color: C.muted, cursor: "pointer" }}>&times;</button>
        </div>

        <p style={{ fontSize: 13, color: C.muted, fontStyle: "italic", marginBottom: 16 }}>{getContextLine()}</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          {[
            { label: "Puzzles Solved", value: state.stats.totalPuzzles },
            { label: "Current Streak", value: `${state.streak.current} day${state.streak.current !== 1 ? "s" : ""}` },
            { label: "Longest Streak", value: `${state.streak.longest} day${state.streak.longest !== 1 ? "s" : ""}` },
            { label: "Petals Earned", value: state.petals.lifetime },
          ].map((item) => (
            <div key={item.label} style={{ background: C.cream, borderRadius: 12, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>{item.value}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Best times */}
        <h4 style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 8 }}>Best Times</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
          {(["easy", "medium", "hard", "expert"] as const).map((d) => (
            <div key={d} style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", background: C.cream, borderRadius: 8, fontSize: 13 }}>
              <span style={{ color: DIFF_COLORS[d], fontWeight: 600, textTransform: "capitalize" }}>{d}</span>
              <span style={{ color: C.text }}>{state.stats.bestTimes[d] !== null ? formatTime(state.stats.bestTimes[d]!) : "--"}</span>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <h4 style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 8 }}>Achievements ({unlockedCount}/{totalCount})</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {Object.entries(ACHIEVEMENT_INFO).map(([id, info]) => {
            const a = state.achievements[id];
            const unlocked = a?.unlocked;
            return (
              <div key={id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: unlocked ? `${C.sage}15` : C.cream, borderRadius: 8, opacity: unlocked ? 1 : 0.5 }}>
                <span style={{ fontSize: 14 }}>{unlocked ? "\u2714" : "\u25CB"}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{info.name}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{info.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Completion Card ───
function CompletionCard({
  timeSeconds,
  hintsUsed,
  mistakes,
  petalsEarned,
  difficulty,
  newAchievements,
  onPlayAgain,
  onBack,
}: {
  timeSeconds: number;
  hintsUsed: number;
  mistakes: number;
  petalsEarned: number;
  difficulty: Difficulty;
  newAchievements: string[];
  onPlayAgain: () => void;
  onBack: () => void;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  let msgPool = COMPLETION_MESSAGES.standard;
  if (mistakes === 0 && hintsUsed === 0) msgPool = COMPLETION_MESSAGES.perfect;
  else if (hintsUsed === 0) msgPool = COMPLETION_MESSAGES.noHint;
  else if (difficulty === "easy" && timeSeconds < 180) msgPool = COMPLETION_MESSAGES.fast;
  else if (difficulty === "medium" && timeSeconds < 420) msgPool = COMPLETION_MESSAGES.fast;

  const message = pick(msgPool);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      opacity: visible ? 1 : 0, transition: "opacity 0.4s ease",
      pointerEvents: visible ? "auto" : "none",
    }}>
      <div style={{
        background: C.white, borderRadius: 24, padding: 28, maxWidth: 340, width: "100%",
        textAlign: "center", boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "transform 0.4s ease",
      }}>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 4px" }}>Puzzle Complete</h3>
        <p style={{ fontSize: 14, fontStyle: "italic", color: C.muted, margin: "0 0 16px" }}>{message}</p>

        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 16 }}>
          {[
            { label: "Time", value: formatTime(timeSeconds) },
            { label: "Hints", value: String(hintsUsed) },
            { label: "Mistakes", value: String(mistakes) },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>{s.value}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: `${C.sage}18`, borderRadius: 12, padding: "10px 16px", marginBottom: 16 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.sage }}>+{petalsEarned} petals earned</span>
        </div>

        {newAchievements.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            {newAchievements.map((id) => {
              const info = ACHIEVEMENT_INFO[id];
              if (!info) return null;
              return (
                <div key={id} style={{ background: `${C.lavender}15`, borderRadius: 12, padding: "10px 14px", marginBottom: 6, border: `1px solid ${C.lavender}40` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.lavender }}>Achievement Unlocked!</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{info.name}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{info.description}</div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onBack} style={{
            flex: 1, padding: "12px 0", borderRadius: 999,
            border: `1px solid ${C.border}`, background: C.white,
            color: C.text, fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>Back</button>
          <button onClick={onPlayAgain} style={{
            flex: 1, padding: "12px 0", borderRadius: 999,
            border: "none", background: C.rose,
            color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>Play Again</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// ─── MAIN COMPONENT ───
// ═══════════════════════════════════════════

interface SavedGameState {
  puzzle: SudokuPuzzle;
  current: SudokuBoard;
  selected: [number, number] | null;
  history: SudokuBoard[];
  won: boolean;
  hintsUsed: number;
  mistakes: number;
  hintCells: string[];
  elapsedSeconds: number;
  difficulty: Difficulty;
}

export default function SudokuGame({ onBack }: { onBack: () => void }) {
  const progression = useSudokuProgression();

  const [puzzle, setPuzzle] = useState<SudokuPuzzle | null>(null);
  const [current, setCurrent] = useState<SudokuBoard>([]);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [history, setHistory] = useState<SudokuBoard[]>([]);
  const [won, setWon] = useState(false);
  const [errors, setErrors] = useState<boolean[][]>(Array.from({ length: 9 }, () => Array(9).fill(true)));
  const [hintsUsed, setHintsUsed] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [hintCells, setHintCells] = useState<Set<string>>(new Set());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  // Animation states
  const [cellAnimations, setCellAnimations] = useState<Record<string, string>>({});
  const [completedUnits, setCompletedUnits] = useState<Set<string>>(new Set());
  const [showConfetti, setShowConfetti] = useState(false);
  const [doubleConfetti, setDoubleConfetti] = useState(false);
  const [celebrationPhase, setCelebrationPhase] = useState(0);
  const [petalsEarned, setPetalsEarned] = useState(0);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const lastToastTime = useRef(0);
  const russellLastShown = useRef(0);
  const movesCount = useRef(0);
  const stuckTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasShownStart = useRef(false);

  // Floating hearts
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const heartIdRef = useRef(0);

  // Stats panel
  const [showStats, setShowStats] = useState(false);

  // Timer
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isNight = useMemo(() => {
    const h = new Date().getHours();
    return h >= 23 || h < 4;
  }, []);

  // ─── Save/Load ───
  const saveCurrentGame = useCallback((p: SudokuPuzzle, c: SudokuBoard, sel: [number, number] | null, hist: SudokuBoard[], w: boolean, hints: number, mist: number, hCells: Set<string>, elapsed: number, diff: Difficulty) => {
    try {
      const data: SavedGameState = {
        puzzle: p, current: c, selected: sel, history: hist, won: w,
        hintsUsed: hints, mistakes: mist, hintCells: Array.from(hCells),
        elapsedSeconds: elapsed, difficulty: diff,
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch { /* noop */ }
  }, []);

  const loadSavedGame = useCallback((): SavedGameState | null => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch { return null; }
  }, []);

  // ─── Show toast ───
  const showToast = useCallback((msg: string, force = false) => {
    const now = Date.now();
    if (!force && now - lastToastTime.current < 30000) return;
    lastToastTime.current = now;
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  }, []);

  // ─── Start new game ───
  const startNewGame = useCallback((diff: Difficulty) => {
    const p = generatePuzzle(diff);
    const c = cloneBoard(p.puzzle);
    setPuzzle(p);
    setCurrent(c);
    setSelected(null);
    setHistory([]);
    setWon(false);
    setErrors(Array.from({ length: 9 }, () => Array(9).fill(true)));
    setHintsUsed(0);
    setMistakes(0);
    setHintCells(new Set());
    setElapsedSeconds(0);
    setDifficulty(diff);
    setCellAnimations({});
    setCompletedUnits(new Set());
    setCelebrationPhase(0);
    setShowConfetti(false);
    setDoubleConfetti(false);
    setShowCompletion(false);
    movesCount.current = 0;
    hasShownStart.current = false;

    localStorage.removeItem(SAVE_KEY);

    setTimeout(() => {
      const msgs = isNight ? TOAST.nightStart : TOAST.start;
      showToast(pick(msgs), true);
      hasShownStart.current = true;
    }, 500);
  }, [isNight, showToast]);

  // ─── Initialize ───
  useEffect(() => {
    const saved = loadSavedGame();
    if (saved && !saved.won) {
      setPuzzle(saved.puzzle);
      setCurrent(saved.current);
      setSelected(saved.selected);
      setHistory(saved.history);
      setWon(false);
      setHintsUsed(saved.hintsUsed);
      setMistakes(saved.mistakes);
      setHintCells(new Set(saved.hintCells));
      setElapsedSeconds(saved.elapsedSeconds);
      setDifficulty(saved.difficulty);
      setErrors(validateBoard(saved.current, saved.puzzle.solution));
    } else {
      startNewGame("easy");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Timer ───
  useEffect(() => {
    if (won || !puzzle) return;
    timerRef.current = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [won, puzzle]);

  // ─── Stuck detection ───
  useEffect(() => {
    if (won || !puzzle) return;
    if (stuckTimer.current) clearTimeout(stuckTimer.current);
    stuckTimer.current = setTimeout(() => {
      if (!won && movesCount.current > 3) {
        const msgs = isNight ? [TOAST.nightStuck[0], ...TOAST.stuck] : TOAST.stuck;
        showToast(pick(msgs));
      }
    }, 90000);
    return () => { if (stuckTimer.current) clearTimeout(stuckTimer.current); };
  }, [current, won, puzzle, isNight, showToast]);

  // ─── Auto-save ───
  useEffect(() => {
    if (puzzle && !won) {
      saveCurrentGame(puzzle, current, selected, history, won, hintsUsed, mistakes, hintCells, elapsedSeconds, difficulty);
    }
  }, [current, selected, puzzle, won, hintsUsed, mistakes, hintCells, elapsedSeconds, difficulty, history, saveCurrentGame]);

  // ─── Cell animation helper ───
  const animateCell = useCallback((key: string, type: string, durationMs: number) => {
    setCellAnimations((prev) => ({ ...prev, [key]: type }));
    setTimeout(() => {
      setCellAnimations((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }, durationMs);
  }, []);

  // ─── Check unit completion ───
  const checkUnitCompletion = useCallback((board: SudokuBoard, solution: SudokuBoard, row: number, col: number) => {
    const newUnits = new Set(completedUnits);
    let anyNew = false;

    const rowKey = `r${row}`;
    if (!completedUnits.has(rowKey) && isRowComplete(board, solution, row)) {
      newUnits.add(rowKey);
      anyNew = true;
      for (let c = 0; c < 9; c++) {
        setTimeout(() => animateCell(`${row}-${c}`, "wave", 500), c * 40);
      }
    }

    const colKey = `c${col}`;
    if (!completedUnits.has(colKey) && isColComplete(board, solution, col)) {
      newUnits.add(colKey);
      anyNew = true;
      for (let r = 0; r < 9; r++) {
        setTimeout(() => animateCell(`${r}-${col}`, "wave", 500), r * 40);
      }
    }

    const boxR = Math.floor(row / 3);
    const boxC = Math.floor(col / 3);
    const boxKey = `b${boxR}${boxC}`;
    if (!completedUnits.has(boxKey) && isBoxComplete(board, solution, boxR, boxC)) {
      newUnits.add(boxKey);
      anyNew = true;
      let delay = 0;
      for (let r = boxR * 3; r < boxR * 3 + 3; r++) {
        for (let c = boxC * 3; c < boxC * 3 + 3; c++) {
          setTimeout(() => animateCell(`${r}-${c}`, "wave", 500), delay);
          delay += 40;
        }
      }
    }

    if (anyNew) {
      setCompletedUnits(newUnits);
      showToast(pick(TOAST.unitComplete));
    }
  }, [completedUnits, animateCell, showToast]);

  // ─── Handle win ───
  const handleWin = useCallback(() => {
    setWon(true);
    localStorage.removeItem(SAVE_KEY);

    // Phase 1: pulse all cells
    setCelebrationPhase(1);
    setTimeout(() => setCelebrationPhase(2), 400);
    setTimeout(() => setCelebrationPhase(3), 1800);

    // Award petals
    const earned = progression.completeGame(difficulty, elapsedSeconds, hintsUsed);
    setPetalsEarned(earned);
    const achievs = progression.getNewAchievements();
    setNewAchievements(achievs);

    // Confetti
    const isPerfect = mistakes === 0 && hintsUsed === 0;
    setShowConfetti(true);
    if (isPerfect) setDoubleConfetti(true);

    // Show completion card
    setTimeout(() => setShowCompletion(true), 1800);

    // Russell special message (1 in 5 chance, guarded)
    const puzzlesSince = progression.state.stats.totalPuzzles - russellLastShown.current;
    if (puzzlesSince >= 3 && Math.random() < 0.2) {
      russellLastShown.current = progression.state.stats.totalPuzzles;
      setTimeout(() => showToast(TOAST.russellSpecial[0], true), 3500);
    }
  }, [progression, difficulty, elapsedSeconds, hintsUsed, mistakes, showToast]);

  // ─── Place number ───
  const placeNumber = useCallback((num: number) => {
    if (!puzzle || !selected || won) return;
    const [r, c] = selected;
    if (puzzle.puzzle[r][c] !== 0) return;

    const newCurrent = current.map((row) => [...row]);
    const historyEntry = current.map((row) => [...row]);
    newCurrent[r][c] = num;

    movesCount.current += 1;
    if (stuckTimer.current) clearTimeout(stuckTimer.current);

    // First number toast
    if (movesCount.current === 1) {
      showToast(pick(TOAST.firstNumber), true);
    }

    const isCorrect = num === puzzle.solution[r][c];
    const key = `${r}-${c}`;

    if (isCorrect) {
      animateCell(key, "correct", 500);

      // Number 3 easter egg
      if (num === 3 && Math.random() < 0.1) {
        const hid = heartIdRef.current++;
        const cellEl = document.getElementById(`cell-${key}`);
        if (cellEl) {
          const rect = cellEl.getBoundingClientRect();
          setFloatingHearts((prev) => [...prev, { id: hid, x: rect.left + rect.width / 2, y: rect.top }]);
          setTimeout(() => setFloatingHearts((prev) => prev.filter((h) => h.id !== hid)), 800);
        }
      }
    } else {
      animateCell(key, "error", 400);
      setMistakes((m) => m + 1);
      showToast(pick(TOAST.error));
    }

    const newErrors = validateBoard(newCurrent, puzzle.solution);
    setErrors(newErrors);
    setCurrent(newCurrent);
    setHistory((h) => [...h, historyEntry]);

    if (isCorrect) {
      checkUnitCompletion(newCurrent, puzzle.solution, r, c);
    }

    if (isBoardComplete(newCurrent, puzzle.solution)) {
      handleWin();
    }
  }, [puzzle, selected, won, current, animateCell, showToast, checkUnitCompletion, handleWin]);

  // ─── Erase ───
  const handleErase = useCallback(() => {
    if (!puzzle || !selected || won) return;
    const [r, c] = selected;
    if (puzzle.puzzle[r][c] !== 0 || current[r][c] === 0) return;
    if (hintCells.has(`${r}-${c}`)) return;

    const newCurrent = current.map((row) => [...row]);
    const historyEntry = current.map((row) => [...row]);
    newCurrent[r][c] = 0;
    setErrors(validateBoard(newCurrent, puzzle.solution));
    setCurrent(newCurrent);
    setHistory((h) => [...h, historyEntry]);
  }, [puzzle, selected, won, current, hintCells]);

  // ─── Undo ───
  const handleUndo = useCallback(() => {
    if (!puzzle || history.length === 0 || won) return;
    const newHistory = [...history];
    const previous = newHistory.pop()!;
    setErrors(validateBoard(previous, puzzle.solution));
    setCurrent(previous);
    setHistory(newHistory);
  }, [puzzle, history, won]);

  // ─── Hint ───
  const handleHint = useCallback(() => {
    if (!puzzle || won) return;
    const candidates: [number, number][] = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (current[r][c] !== puzzle.solution[r][c]) {
          candidates.push([r, c]);
        }
      }
    }
    if (candidates.length === 0) return;
    const [r, c] = candidates[Math.floor(Math.random() * candidates.length)];

    const newCurrent = current.map((row) => [...row]);
    const historyEntry = current.map((row) => [...row]);
    newCurrent[r][c] = puzzle.solution[r][c];

    const key = `${r}-${c}`;
    const newHintCells = new Set(hintCells);
    newHintCells.add(key);
    setHintCells(newHintCells);
    setHintsUsed((h) => h + 1);
    animateCell(key, "hint", 600);

    const newErrors = validateBoard(newCurrent, puzzle.solution);
    setErrors(newErrors);
    setCurrent(newCurrent);
    setSelected([r, c]);
    setHistory((h) => [...h, historyEntry]);

    showToast(pick(TOAST.hint));

    checkUnitCompletion(newCurrent, puzzle.solution, r, c);

    if (isBoardComplete(newCurrent, puzzle.solution)) {
      handleWin();
    }
  }, [puzzle, won, current, hintCells, animateCell, showToast, checkUnitCompletion, handleWin]);

  // ─── Difficulty selector ───
  const isDifficultyUnlocked = useCallback((diff: Difficulty): boolean => {
    if (diff === "easy") return true;
    return progression.state.difficultyUnlocks[diff] || false;
  }, [progression.state.difficultyUnlocks]);

  const gardenInfo = progression.getGardenStage();

  if (!puzzle) return null;

  const selectedVal = selected ? current[selected[0]][selected[1]] : null;

  // Cell animation styles
  function getCellAnimStyle(key: string): React.CSSProperties {
    const anim = cellAnimations[key];
    if (!anim) {
      if (celebrationPhase === 1) return { transform: "scale(1.04)", transition: "transform 0.3s ease" };
      if (celebrationPhase === 2) return { background: `${C.rose}15`, transition: "background 0.4s ease" };
      return {};
    }
    if (anim === "correct") return { transform: "scale(1.12)", boxShadow: `0 0 8px ${C.sage}60`, transition: "transform 0.25s ease, box-shadow 0.25s ease" };
    if (anim === "error") return { animation: "shakeCell 0.4s ease", background: `${C.rose}20` };
    if (anim === "wave") return { background: `${C.lavender}25`, transition: "background 0.3s ease" };
    if (anim === "hint") return { background: `${C.lavender}20`, boxShadow: `0 0 6px ${C.lavender}40`, transition: "all 0.3s ease" };
    return {};
  }

  // Selected cell pulse
  function getSelectedStyle(isSelected: boolean): React.CSSProperties {
    if (!isSelected) return {};
    return { boxShadow: `0 0 0 2px ${C.lavender}60`, background: `${C.lavender}12` };
  }

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10, position: "relative" }}>
      <style>{`
        @keyframes shakeCell {
          0% { transform: translateX(0); }
          20% { transform: translateX(-4px); }
          40% { transform: translateX(4px); }
          60% { transform: translateX(-3px); }
          80% { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }
        @keyframes floatHeart {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-40px) scale(1.3); }
        }
        @keyframes pulseSelected {
          0%, 100% { box-shadow: 0 0 0 2px ${C.lavender}40; }
          50% { box-shadow: 0 0 0 3px ${C.lavender}70; }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: C.rose, fontSize: 14, cursor: "pointer", fontWeight: 600, padding: "4px 0" }}>&larr; Back</button>
        <h2 style={{ flex: 1, textAlign: "center", color: C.text, fontSize: 18, fontWeight: 700, margin: 0 }}>Sudoku</h2>
        <button onClick={() => setShowStats(true)} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 10px", fontSize: 12, color: C.muted, cursor: "pointer", fontWeight: 600 }}>Journal</button>
      </div>

      {/* Garden */}
      <GardenVisualization stage={gardenInfo.stage} petals={gardenInfo.petals} nextThreshold={gardenInfo.nextThreshold} />

      {/* Difficulty + Streak row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {(["easy", "medium", "hard", "expert"] as const).map((d) => {
            const unlocked = isDifficultyUnlocked(d);
            const isActive = difficulty === d && !won;
            return (
              <button key={d} onClick={() => { if (unlocked) startNewGame(d); }}
                style={{
                  padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: unlocked ? "pointer" : "default",
                  border: isActive ? `2px solid ${DIFF_COLORS[d]}` : `1px solid ${C.border}`,
                  background: isActive ? `${DIFF_COLORS[d]}15` : C.white,
                  color: isActive ? DIFF_COLORS[d] : unlocked ? C.muted : `${C.muted}60`,
                  textTransform: "capitalize", position: "relative",
                  opacity: unlocked ? 1 : 0.6,
                }}>
                {d}
                {!unlocked && <span style={{ fontSize: 8, marginLeft: 3 }}>{"\uD83D\uDD12"}</span>}
              </button>
            );
          })}
        </div>

        {/* Streak */}
        {progression.state.streak.current > 0 && (
          <div style={{ fontSize: 12, color: C.amber, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
            <span style={{ fontSize: 14 }}>{"\uD83D\uDD25"}</span>
            {progression.state.streak.current}
          </div>
        )}
      </div>

      {/* Daily bloom badge */}
      {!progression.getDailyCompleted() && (
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: 11, color: C.sage, fontWeight: 600, background: `${C.sage}15`, padding: "3px 10px", borderRadius: 999 }}>
            Daily Bloom available
          </span>
        </div>
      )}

      {/* Timer */}
      <div style={{ textAlign: "center", fontSize: 16, fontWeight: 600, color: C.muted, fontVariantNumeric: "tabular-nums" }}>
        {formatTime(elapsedSeconds)}
      </div>

      {/* Toast */}
      <div style={{ position: "relative", height: 0 }}>
        <Toast message={toastMessage} visible={toastVisible} />
      </div>

      {/* Grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 0,
        border: `2px solid ${C.text}`, borderRadius: 8, overflow: "hidden",
        aspectRatio: "1", maxWidth: "100%", background: C.white,
      }}>
        {Array.from({ length: 81 }, (_, i) => {
          const r = Math.floor(i / 9);
          const c = i % 9;
          const val = current[r][c];
          const isOriginal = puzzle.puzzle[r][c] !== 0;
          const isHint = hintCells.has(`${r}-${c}`);
          const isSelected = selected !== null && selected[0] === r && selected[1] === c;
          const isSameNum = selectedVal !== null && selectedVal !== 0 && val === selectedVal && !isSelected;
          const isInSelectedRowCol = selected !== null && !isSelected && (selected[0] === r || selected[1] === c);
          const isError = val !== 0 && !errors[r][c];
          const key = `${r}-${c}`;

          let bg = C.white;
          if (isSelected) bg = `${C.lavender}12`;
          else if (isSameNum) bg = C.border;
          else if (isError) bg = `${C.rose}12`;
          else if (isInSelectedRowCol) bg = `${C.border}80`;

          const borderRight = c === 2 || c === 5 ? `2px solid ${C.text}` : `1px solid ${C.border}`;
          const borderBottom = r === 2 || r === 5 ? `2px solid ${C.text}` : `1px solid ${C.border}`;

          const animStyle = getCellAnimStyle(key);
          const selStyle = getSelectedStyle(isSelected);

          return (
            <button key={i} id={`cell-${key}`}
              onClick={() => { if (!won) setSelected([r, c]); }}
              style={{
                background: bg, border: "none",
                borderRight: c < 8 ? borderRight : "none",
                borderBottom: r < 8 ? borderBottom : "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "clamp(14px, 4vw, 20px)",
                fontWeight: isOriginal ? 700 : 500,
                color: isError ? C.rose : isHint ? C.lavender : isOriginal ? C.text : C.sage,
                cursor: won ? "default" : "pointer",
                padding: 0, minHeight: 0, aspectRatio: "1", lineHeight: 1,
                transition: "background 0.15s, transform 0.15s",
                WebkitTapHighlightColor: "transparent",
                ...animStyle,
                ...selStyle,
              }}
              aria-label={`Row ${r + 1}, Column ${c + 1}${val ? `, value ${val}` : ", empty"}`}
            >
              {val !== 0 ? val : ""}
            </button>
          );
        })}
      </div>

      {/* Number pad */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 5 }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button key={num} onClick={() => placeNumber(num)} disabled={won}
            style={{
              minHeight: 44, borderRadius: 10, border: `1px solid ${C.border}`,
              background: selectedVal === num ? C.rose : C.white,
              color: selectedVal === num ? "#FFF" : C.text,
              fontSize: 18, fontWeight: 700,
              cursor: won ? "default" : "pointer",
              opacity: won ? 0.5 : 1,
              transition: "background 0.1s, color 0.1s, transform 0.1s",
              WebkitTapHighlightColor: "transparent",
            }}>
            {num}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {[
          { label: "Undo", action: handleUndo, icon: "\u21A9" },
          { label: "Erase", action: handleErase, icon: "\u232B" },
          { label: "Hint", action: handleHint, icon: "\u2728" },
        ].map((btn) => (
          <button key={btn.label} onClick={btn.action} disabled={won}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              padding: "8px 18px", borderRadius: 12, border: `1px solid ${C.border}`,
              background: C.white, color: won ? C.muted : C.text,
              fontSize: 12, fontWeight: 600, cursor: won ? "default" : "pointer",
              opacity: won ? 0.5 : 1,
            }}>
            <span style={{ fontSize: 18 }}>{btn.icon}</span>
            {btn.label}
          </button>
        ))}
      </div>

      {/* New Game */}
      <button onClick={() => startNewGame(difficulty)}
        style={{
          padding: "12px 0", borderRadius: 999, border: "none",
          background: C.rose, color: "#FFF", fontSize: 15, fontWeight: 700,
          cursor: "pointer", width: "100%",
        }}>
        New Game
      </button>

      {/* Floating hearts */}
      {floatingHearts.map((h) => (
        <div key={h.id} style={{
          position: "fixed", left: h.x - 6, top: h.y,
          fontSize: 12, color: C.rose, pointerEvents: "none", zIndex: 999,
          animation: "floatHeart 0.8s ease-out forwards",
        }}>
          {"\u2665"}
        </div>
      ))}

      {/* Confetti */}
      <CSSConfetti active={showConfetti} />
      {doubleConfetti && <CSSConfetti active={true} />}

      {/* Completion card */}
      {showCompletion && (
        <CompletionCard
          timeSeconds={elapsedSeconds}
          hintsUsed={hintsUsed}
          mistakes={mistakes}
          petalsEarned={petalsEarned}
          difficulty={difficulty}
          newAchievements={newAchievements}
          onPlayAgain={() => startNewGame(difficulty)}
          onBack={onBack}
        />
      )}

      {/* Stats panel */}
      {showStats && (
        <StatsPanel state={progression.state} getContextLine={progression.getContextLine} onClose={() => setShowStats(false)} />
      )}
    </div>
  );
}
