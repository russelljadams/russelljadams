"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { getTodayString, type Difficulty } from "./sudoku";

// --- Types ---
export interface SudokuGameState {
  petals: { lifetime: number };
  garden: { stage: number };
  streak: { current: number; longest: number; lastCompletedDate: string | null };
  stats: {
    totalPuzzles: number;
    totalTimeSeconds: number;
    puzzlesByDifficulty: { easy: number; medium: number; hard: number; expert: number };
    puzzlesWithoutHints: number;
    bestTimes: { easy: number | null; medium: number | null; hard: number | null; expert: number | null };
    firstPuzzleDate: string | null;
  };
  achievements: { [id: string]: { unlocked: boolean; date: string | null } };
  difficultyUnlocks: { medium: boolean; hard: boolean; expert: boolean };
}

const STORAGE_KEY = "amandaSudoku";

const GARDEN_THRESHOLDS = [0, 3, 15, 40, 80, 150, 250, 400];
const GARDEN_NAMES = ["Empty", "Sprout", "First Bloom", "Small Garden", "Growing", "Lush", "Enchanted", "Full Bloom"];

const PETAL_AWARDS: Record<Difficulty, number> = { easy: 3, medium: 5, hard: 8, expert: 12 };

const ALL_ACHIEVEMENTS = [
  "first_bloom", "getting_started", "double_digits", "quarter_century",
  "half_hundred", "century", "streak_3", "streak_7", "streak_14", "streak_30",
  "no_hints_1", "speed_easy", "speed_medium", "speed_hard",
  "first_medium", "first_hard", "first_expert", "night_owl", "early_bird",
];

function defaultState(): SudokuGameState {
  const achievements: SudokuGameState["achievements"] = {};
  for (const id of ALL_ACHIEVEMENTS) {
    achievements[id] = { unlocked: false, date: null };
  }
  return {
    petals: { lifetime: 0 },
    garden: { stage: 0 },
    streak: { current: 0, longest: 0, lastCompletedDate: null },
    stats: {
      totalPuzzles: 0,
      totalTimeSeconds: 0,
      puzzlesByDifficulty: { easy: 0, medium: 0, hard: 0, expert: 0 },
      puzzlesWithoutHints: 0,
      bestTimes: { easy: null, medium: null, hard: null, expert: null },
      firstPuzzleDate: null,
    },
    achievements,
    difficultyUnlocks: { medium: false, hard: false, expert: false },
  };
}

function loadState(): SudokuGameState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as SudokuGameState;
    // Ensure all achievement keys exist
    for (const id of ALL_ACHIEVEMENTS) {
      if (!parsed.achievements[id]) {
        parsed.achievements[id] = { unlocked: false, date: null };
      }
    }
    return parsed;
  } catch {
    return defaultState();
  }
}

function saveState(state: SudokuGameState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* noop */ }
}

function computeGardenStage(petals: number): number {
  let stage = 0;
  for (let i = GARDEN_THRESHOLDS.length - 1; i >= 0; i--) {
    if (petals >= GARDEN_THRESHOLDS[i]) { stage = i; break; }
  }
  return stage;
}

function isYesterday(dateStr: string): boolean {
  const d = new Date(dateStr + "T12:00:00");
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return d.getFullYear() === yesterday.getFullYear() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getDate() === yesterday.getDate();
}

const CONTEXT_LINES = [
  "That's more than most people solve in a month!",
  "Your brain is literally getting sharper with every puzzle.",
  "Each one makes the next a little easier.",
  "You're building something beautiful here.",
  "Consistency is your superpower.",
  "Russell is genuinely impressed.",
];

export function useSudokuProgression() {
  const [state, setState] = useState<SudokuGameState>(defaultState);
  const newAchievementsRef = useRef<string[]>([]);
  const dailyCompletedRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const loaded = loadState();
    setState(loaded);
    // Load daily completion tracking
    try {
      const dc = localStorage.getItem("amandaSudoku_daily");
      if (dc) dailyCompletedRef.current = JSON.parse(dc);
    } catch { /* noop */ }
  }, []);

  const persistState = useCallback((newState: SudokuGameState) => {
    setState(newState);
    saveState(newState);
  }, []);

  const completeGame = useCallback((difficulty: Difficulty, timeSeconds: number, hintsUsed: number) => {
    const s = { ...loadState() };
    const today = getTodayString();
    const hour = new Date().getHours();
    newAchievementsRef.current = [];

    // --- Petals ---
    let petals = PETAL_AWARDS[difficulty];
    if (hintsUsed === 0) petals += 2;
    // Daily bonus: first completion today
    const dailyKey = `${today}_${difficulty}`;
    const dc = { ...dailyCompletedRef.current };
    const isFirstToday = !dc[today + "_any"];
    if (isFirstToday) petals += 3;
    dc[today + "_any"] = true;
    dc[dailyKey] = true;
    dailyCompletedRef.current = dc;
    try { localStorage.setItem("amandaSudoku_daily", JSON.stringify(dc)); } catch { /* noop */ }

    // --- Streak ---
    if (s.streak.lastCompletedDate === today) {
      // Already completed today, streak stays
    } else if (s.streak.lastCompletedDate && isYesterday(s.streak.lastCompletedDate)) {
      s.streak.current += 1;
    } else if (s.streak.lastCompletedDate !== today) {
      s.streak.current = 1;
    }
    s.streak.lastCompletedDate = today;
    if (s.streak.current > s.streak.longest) {
      s.streak.longest = s.streak.current;
    }

    // Streak petal bonus
    const streakBonus = Math.min(s.streak.current, 7);
    petals += streakBonus;

    s.petals.lifetime += petals;
    s.garden.stage = computeGardenStage(s.petals.lifetime);

    // --- Stats ---
    s.stats.totalPuzzles += 1;
    s.stats.totalTimeSeconds += timeSeconds;
    s.stats.puzzlesByDifficulty[difficulty] += 1;
    if (hintsUsed === 0) s.stats.puzzlesWithoutHints += 1;
    if (!s.stats.firstPuzzleDate) s.stats.firstPuzzleDate = today;

    const best = s.stats.bestTimes[difficulty];
    if (best === null || timeSeconds < best) {
      s.stats.bestTimes[difficulty] = timeSeconds;
    }

    // --- Difficulty unlocks ---
    if (s.stats.puzzlesByDifficulty.easy >= 3) s.difficultyUnlocks.medium = true;
    if (s.stats.puzzlesByDifficulty.medium >= 3) s.difficultyUnlocks.hard = true;
    if (s.stats.puzzlesByDifficulty.hard >= 3) s.difficultyUnlocks.expert = true;

    // --- Achievements ---
    const unlock = (id: string) => {
      if (s.achievements[id] && !s.achievements[id].unlocked) {
        s.achievements[id] = { unlocked: true, date: today };
        newAchievementsRef.current.push(id);
      }
    };

    const total = s.stats.totalPuzzles;
    if (total >= 1) unlock("first_bloom");
    if (total >= 3) unlock("getting_started");
    if (total >= 10) unlock("double_digits");
    if (total >= 25) unlock("quarter_century");
    if (total >= 50) unlock("half_hundred");
    if (total >= 100) unlock("century");

    if (s.streak.current >= 3) unlock("streak_3");
    if (s.streak.current >= 7) unlock("streak_7");
    if (s.streak.current >= 14) unlock("streak_14");
    if (s.streak.current >= 30) unlock("streak_30");

    if (hintsUsed === 0) unlock("no_hints_1");

    if (difficulty === "easy" && timeSeconds < 300) unlock("speed_easy");
    if (difficulty === "medium" && timeSeconds < 600) unlock("speed_medium");
    if (difficulty === "hard" && timeSeconds < 900) unlock("speed_hard");

    if (difficulty === "medium") unlock("first_medium");
    if (difficulty === "hard") unlock("first_hard");
    if (difficulty === "expert") unlock("first_expert");

    if (hour >= 0 && hour < 4) unlock("night_owl");
    if (hour >= 5 && hour < 7) unlock("early_bird");

    persistState(s);
    return petals;
  }, [persistState]);

  const getDailyCompleted = useCallback((): boolean => {
    const today = getTodayString();
    return !!dailyCompletedRef.current[today + "_any"];
  }, []);

  const getNewAchievements = useCallback((): string[] => {
    return newAchievementsRef.current;
  }, []);

  const getGardenStage = useCallback((): { stage: number; name: string; petals: number; nextThreshold: number | null } => {
    const stage = state.garden.stage;
    const nextIdx = stage + 1;
    return {
      stage,
      name: GARDEN_NAMES[stage] || "Full Bloom",
      petals: state.petals.lifetime,
      nextThreshold: nextIdx < GARDEN_THRESHOLDS.length ? GARDEN_THRESHOLDS[nextIdx] : null,
    };
  }, [state]);

  const getContextLine = useCallback((): string => {
    const total = state.stats.totalPuzzles;
    if (total === 0) return "Your first puzzle awaits.";
    if (total < 5) return "You're just getting started. Keep going!";
    const idx = Math.min(Math.floor(total / 10), CONTEXT_LINES.length - 1);
    return CONTEXT_LINES[idx];
  }, [state]);

  return {
    state,
    completeGame,
    getDailyCompleted,
    getNewAchievements,
    getGardenStage,
    getContextLine,
  };
}

export const ACHIEVEMENT_INFO: Record<string, { name: string; description: string }> = {
  first_bloom: { name: "First Bloom", description: "Complete your first puzzle" },
  getting_started: { name: "Getting Started", description: "Complete 3 puzzles" },
  double_digits: { name: "Double Digits", description: "Complete 10 puzzles" },
  quarter_century: { name: "Quarter Century", description: "Complete 25 puzzles" },
  half_hundred: { name: "Half Hundred", description: "Complete 50 puzzles" },
  century: { name: "Century", description: "Complete 100 puzzles" },
  streak_3: { name: "Three in a Row", description: "3-day streak" },
  streak_7: { name: "Week Warrior", description: "7-day streak" },
  streak_14: { name: "Fortnight Focus", description: "14-day streak" },
  streak_30: { name: "Monthly Master", description: "30-day streak" },
  no_hints_1: { name: "All You", description: "Complete a puzzle without hints" },
  speed_easy: { name: "Quick Thinker", description: "Easy under 5 minutes" },
  speed_medium: { name: "Sharp Mind", description: "Medium under 10 minutes" },
  speed_hard: { name: "Brilliant", description: "Hard under 15 minutes" },
  first_medium: { name: "Level Up", description: "Complete a Medium puzzle" },
  first_hard: { name: "Brave", description: "Complete a Hard puzzle" },
  first_expert: { name: "Fearless", description: "Complete an Expert puzzle" },
  night_owl: { name: "Night Owl", description: "Complete a puzzle after midnight" },
  early_bird: { name: "Early Bird", description: "Complete a puzzle before 7am" },
};
