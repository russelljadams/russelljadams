const STORAGE_KEY = "ggsHeart";

export interface LevelSave {
  completed: boolean;
  bestRank: string | null;       // "S" | "A" | "B" | "C" | null
  heartsCollected: number;
  spiritFragments: number;       // 0-3
  ghostEchoFound: boolean;
}

export interface SaveData {
  levels: Record<string, LevelSave>;
  bankedHearts: number;
  currentWorld: number;          // 1-5
}

function emptyLevelSave(): LevelSave {
  return {
    completed: false,
    bestRank: null,
    heartsCollected: 0,
    spiritFragments: 0,
    ghostEchoFound: false,
  };
}

function defaultSaveData(): SaveData {
  return {
    levels: {},
    bankedHearts: 0,
    currentWorld: 1,
  };
}

const RANK_ORDER: Record<string, number> = { S: 4, A: 3, B: 2, C: 1 };

function isBetterRank(incoming: string, current: string | null): boolean {
  if (!current) return true;
  return (RANK_ORDER[incoming] ?? 0) > (RANK_ORDER[current] ?? 0);
}

export default class SaveManager {
  /** Load save data from localStorage (returns defaults if none exists). */
  static load(): SaveData {
    if (typeof window === "undefined") return defaultSaveData();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultSaveData();
      const parsed = JSON.parse(raw) as Partial<SaveData>;
      return {
        levels: parsed.levels ?? {},
        bankedHearts: parsed.bankedHearts ?? 0,
        currentWorld: parsed.currentWorld ?? 1,
      };
    } catch {
      return defaultSaveData();
    }
  }

  /** Persist save data to localStorage. */
  static save(data: SaveData): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage full or unavailable — silently fail.
    }
  }

  /**
   * Record a level completion.
   * Updates best rank, banks hearts, and records fragment count.
   * Only overwrites values when the new result is better.
   */
  static completeLevel(
    levelKey: string,
    rank: string,
    hearts: number,
    fragments: number,
  ): void {
    const data = SaveManager.load();
    const prev = data.levels[levelKey] ?? emptyLevelSave();

    prev.completed = true;

    if (isBetterRank(rank, prev.bestRank)) {
      prev.bestRank = rank;
    }

    // Bank the delta if the player collected more hearts this run
    if (hearts > prev.heartsCollected) {
      data.bankedHearts += hearts - prev.heartsCollected;
      prev.heartsCollected = hearts;
    }

    if (fragments > prev.spiritFragments) {
      prev.spiritFragments = Math.min(fragments, 3);
    }

    data.levels[levelKey] = prev;
    SaveManager.save(data);
  }

  /**
   * Mark a ghost echo as found for a level (max 1 per level).
   */
  static findGhostEcho(levelKey: string): void {
    const data = SaveManager.load();
    const prev = data.levels[levelKey] ?? emptyLevelSave();
    prev.ghostEchoFound = true;
    data.levels[levelKey] = prev;
    SaveManager.save(data);
  }

  /**
   * Check whether a level is unlocked.
   *
   * World 1 rules:
   *  - "Level1_1" is always unlocked.
   *  - Standard levels 1_2 through 1_6 unlock sequentially.
   *  - Boss "Level1_B" unlocks when all 6 standard levels are completed.
   *  - World 2+ levels require the previous world boss beaten.
   */
  static isLevelUnlocked(levelKey: string): boolean {
    // Level1_1 is always available
    if (levelKey === "Level1_1") return true;

    const data = SaveManager.load();

    // World 1 standard levels: Level1_2 .. Level1_6
    const stdMatch = levelKey.match(/^Level(\d+)_(\d+)$/);
    if (stdMatch) {
      const world = parseInt(stdMatch[1], 10);
      const num = parseInt(stdMatch[2], 10);

      // World > 1 requires previous world boss beaten
      if (world > 1) {
        const prevBoss = `Level${world - 1}_B`;
        const bossData = data.levels[prevBoss];
        if (!bossData?.completed) return false;
      }

      // First level of any world after 1 requires previous boss
      if (num === 1 && world > 1) {
        return true; // already checked boss above
      }

      // Subsequent levels require previous level completed
      const prevKey = `Level${world}_${num - 1}`;
      return !!data.levels[prevKey]?.completed;
    }

    // Boss level: Level1_B
    const bossMatch = levelKey.match(/^Level(\d+)_B$/);
    if (bossMatch) {
      const world = parseInt(bossMatch[1], 10);
      // All 6 standard levels must be completed
      for (let i = 1; i <= 6; i++) {
        const key = `Level${world}_${i}`;
        if (!data.levels[key]?.completed) return false;
      }
      return true;
    }

    return false;
  }

  /** Sum of all banked hearts across all levels. */
  static getTotalHearts(): number {
    const data = SaveManager.load();
    return data.bankedHearts;
  }

  /** Sum of all spirit fragments found across every level. */
  static getTotalFragments(): number {
    const data = SaveManager.load();
    let total = 0;
    for (const key of Object.keys(data.levels)) {
      total += data.levels[key].spiritFragments;
    }
    return total;
  }

  /** Wipe all save data. */
  static reset(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // noop
    }
  }
}
