// Sudoku puzzle generator and solver for Amanda
// With seeded random for daily puzzles

export type SudokuBoard = number[][];
export type Difficulty = "easy" | "medium" | "hard" | "expert";

export interface SudokuPuzzle {
  puzzle: SudokuBoard;
  solution: SudokuBoard;
  difficulty: Difficulty;
}

// --- Seeded PRNG (mulberry32) ---
function mulberry32(seed: number): () => number {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// --- Board helpers ---
function createEmptyBoard(): SudokuBoard {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

export function cloneBoard(board: SudokuBoard): SudokuBoard {
  return board.map((row) => [...row]);
}

export function isValidPlacement(
  board: SudokuBoard,
  row: number,
  col: number,
  num: number
): boolean {
  for (let c = 0; c < 9; c++) {
    if (board[row][c] === num) return false;
  }
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === num) return false;
  }
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
}

function solveSudokuWith(board: SudokuBoard, rand: () => number): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        const nums = seededShuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], rand);
        for (const num of nums) {
          if (isValidPlacement(board, r, c, num)) {
            board[r][c] = num;
            if (solveSudokuWith(board, rand)) return true;
            board[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function solveSudoku(board: SudokuBoard): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const num of nums) {
          if (isValidPlacement(board, r, c, num)) {
            board[r][c] = num;
            if (solveSudoku(board)) return true;
            board[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

const CLUE_COUNTS: Record<Difficulty, number> = {
  easy: 38,
  medium: 30,
  hard: 25,
  expert: 23,
};

export function generatePuzzle(difficulty: Difficulty = "easy"): SudokuPuzzle {
  const solution = createEmptyBoard();
  solveSudoku(solution);
  const puzzle = cloneBoard(solution);
  const clues = CLUE_COUNTS[difficulty];
  const cellsToRemove = 81 - clues;

  const positions = shuffle(
    Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9] as [number, number])
  );

  let removed = 0;
  for (const [r, c] of positions) {
    if (removed >= cellsToRemove) break;
    puzzle[r][c] = 0;
    removed++;
  }

  return { puzzle, solution, difficulty };
}

export function generateDailyPuzzle(difficulty: Difficulty = "easy"): SudokuPuzzle {
  const now = new Date();
  const dateInt = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  const difficultyOffset = { easy: 0, medium: 1, hard: 2, expert: 3 }[difficulty];
  const seed = dateInt * 4 + difficultyOffset;
  const rand = mulberry32(seed);

  const solution = createEmptyBoard();
  solveSudokuWith(solution, rand);
  const puzzle = cloneBoard(solution);
  const clues = CLUE_COUNTS[difficulty];
  const cellsToRemove = 81 - clues;

  const positions = seededShuffle(
    Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9] as [number, number]),
    rand
  );

  let removed = 0;
  for (const [r, c] of positions) {
    if (removed >= cellsToRemove) break;
    puzzle[r][c] = 0;
    removed++;
  }

  return { puzzle, solution, difficulty };
}

export function validateBoard(
  current: SudokuBoard,
  solution: SudokuBoard
): boolean[][] {
  const result: boolean[][] = Array.from({ length: 9 }, () => Array(9).fill(true));
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (current[r][c] !== 0 && current[r][c] !== solution[r][c]) {
        result[r][c] = false;
      }
    }
  }
  return result;
}

export function isBoardComplete(
  current: SudokuBoard,
  solution: SudokuBoard
): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (current[r][c] !== solution[r][c]) return false;
    }
  }
  return true;
}

export function isRowComplete(board: SudokuBoard, solution: SudokuBoard, row: number): boolean {
  for (let c = 0; c < 9; c++) {
    if (board[row][c] !== solution[row][c]) return false;
  }
  return true;
}

export function isColComplete(board: SudokuBoard, solution: SudokuBoard, col: number): boolean {
  for (let r = 0; r < 9; r++) {
    if (board[r][col] !== solution[r][col]) return false;
  }
  return true;
}

export function isBoxComplete(board: SudokuBoard, solution: SudokuBoard, boxRow: number, boxCol: number): boolean {
  const br = boxRow * 3;
  const bc = boxCol * 3;
  for (let r = br; r < br + 3; r++) {
    for (let c = bc; c < bc + 3; c++) {
      if (board[r][c] !== solution[r][c]) return false;
    }
  }
  return true;
}

export function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
