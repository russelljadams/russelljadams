// Sudoku puzzle generator and solver for Amanda

export type SudokuBoard = number[][];

export interface SudokuPuzzle {
  puzzle: SudokuBoard;
  solution: SudokuBoard;
  difficulty: "easy" | "medium" | "hard";
}

function createEmptyBoard(): SudokuBoard {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

function cloneBoard(board: SudokuBoard): SudokuBoard {
  return board.map((row) => [...row]);
}

function isValidPlacement(
  board: SudokuBoard,
  row: number,
  col: number,
  num: number
): boolean {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (board[row][c] === num) return false;
  }
  // Check column
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === num) return false;
  }
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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

function generateCompleteBoard(): SudokuBoard {
  const board = createEmptyBoard();
  solveSudoku(board);
  return board;
}

const CLUE_COUNTS: Record<string, number> = {
  easy: 38,
  medium: 30,
  hard: 24,
};

export function generatePuzzle(
  difficulty: "easy" | "medium" | "hard" = "easy"
): SudokuPuzzle {
  const solution = generateCompleteBoard();
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

export function validateBoard(
  current: SudokuBoard,
  solution: SudokuBoard
): boolean[][] {
  // Returns a 9x9 boolean grid: true = correct or empty, false = wrong
  const result: boolean[][] = Array.from({ length: 9 }, () =>
    Array(9).fill(true)
  );
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
