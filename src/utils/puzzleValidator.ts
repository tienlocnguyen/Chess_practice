import { Chess } from 'chess.js';
import { Puzzle } from '../types/chess';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  normalizedSolution?: string[];
  finalFen?: string;
}

/**
 * Validates a puzzle against chess.js rules.
 * Supports solution moves in either SAN format (e.g., "Re8#", "Qxf7") or UCI format (e.g., "e2e4", "f5e3").
 */
export function validatePuzzle(puzzle: Puzzle): ValidationResult {
  try {
    const game = new Chess(puzzle.fen);
    const normalizedSolution: string[] = [];

    for (let i = 0; i < puzzle.solution.length; i++) {
      const moveInput = puzzle.solution[i].trim();
      let move = null;

      // 1. Try playing as SAN (e.g., "Re8#", "e8=Q", "Qxf7")
      try {
        move = game.move(moveInput);
      } catch {
        move = null;
      }

      // 2. If SAN failed, try playing as UCI (e.g., "f5e3", "e7e8q")
      if (!move && moveInput.length >= 4) {
        const from = moveInput.slice(0, 2);
        const to = moveInput.slice(2, 4);
        const promotion = moveInput.length > 4 ? moveInput.slice(4, 5) : 'q';
        try {
          move = game.move({ from, to, promotion });
        } catch {
          move = null;
        }
      }

      // 3. If move is still invalid, attempt cleaning SAN characters (strip #, +, ?, !)
      if (!move) {
        const cleanSan = moveInput.replace(/[\+#?!]/g, '');
        try {
          move = game.move(cleanSan);
        } catch {
          move = null;
        }
      }

      if (!move) {
        return {
          isValid: false,
          error: `Step ${i + 1} (${moveInput}) is illegal from position FEN: ${game.fen()}`,
        };
      }

      // Store clean SAN move for consistent playback
      normalizedSolution.push(move.san);
    }

    return {
      isValid: true,
      normalizedSolution,
      finalFen: game.fen(),
    };
  } catch (err) {
    return {
      isValid: false,
      error: err instanceof Error ? err.message : 'Invalid FEN or chess state',
    };
  }
}

/**
 * Filter an array of puzzles to keep only 100% valid ones, normalizing solution move notation.
 */
export function qualifyPuzzleLibrary(puzzles: Puzzle[]): { qualified: Puzzle[]; rejectedCount: number } {
  const qualified: Puzzle[] = [];
  let rejectedCount = 0;

  for (const p of puzzles) {
    const res = validatePuzzle(p);
    if (res.isValid && res.normalizedSolution) {
      qualified.push({
        ...p,
        solution: res.normalizedSolution,
      });
    } else {
      rejectedCount++;
      // Log for developer/inspector debugging
      console.warn(`[Puzzle Library] Filtered invalid puzzle "${p.id}" (${p.title}): ${res.error}`);
    }
  }

  return { qualified, rejectedCount };
}
