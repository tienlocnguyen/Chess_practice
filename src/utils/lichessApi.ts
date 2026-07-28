import { Chess } from 'chess.js';
import { Puzzle } from '../types/chess';
import { validatePuzzle } from './puzzleValidator';

export interface LichessRawPuzzleResponse {
  game: {
    id: string;
    perf?: { name: string };
    players?: Array<{ name: string; color: string; rating?: number }>;
    pgn?: string;
  };
  puzzle: {
    id: string;
    rating: number;
    plays: number;
    solution: string[];
    themes: string[];
    fen: string;
    lastMove?: string;
  };
}

/**
 * Calculates player move count from solution array length.
 * In Lichess API: solution = [playerMove1, opponentMove1, playerMove2, opponentMove2, playerMove3]
 */
export function getPlayerMovesCount(solutionLength: number): number {
  return Math.ceil(solutionLength / 2);
}

/**
 * Maps player move count to difficulty category.
 * 1 move  => Easy
 * 2 moves => Medium
 * 3+ moves => Hard
 */
export function movesToDifficulty(solutionLength: number): 'Easy' | 'Medium' | 'Hard' {
  const moves = getPlayerMovesCount(solutionLength);
  if (moves <= 1) return 'Easy';
  if (moves === 2) return 'Medium';
  return 'Hard';
}

/**
 * Calculates star reward based on move count and rating.
 */
export function movesToStars(solutionLength: number, rating: number = 1500): number {
  const moves = getPlayerMovesCount(solutionLength);
  if (moves <= 1) return 3;
  if (moves === 2) return 6;
  return rating > 1800 ? 12 : 10;
}

/**
 * Converts Lichess API raw puzzle response into our application's Puzzle object.
 */
export function convertLichessToPuzzle(data: LichessRawPuzzleResponse): Puzzle | null {
  try {
    const rawP = data.puzzle;
    const initialFen = rawP.fen;
    const game = new Chess(initialFen);

    // Convert UCI solution moves to SAN moves using chess.js
    const sanSolution: string[] = [];
    for (const uciMove of rawP.solution) {
      const from = uciMove.slice(0, 2);
      const to = uciMove.slice(2, 4);
      const promotion = uciMove.length > 4 ? uciMove.slice(4, 5) : 'q';

      const moveResult = game.move({ from, to, promotion });
      if (!moveResult) {
        console.warn(`[Lichess API] Move ${uciMove} illegal on FEN ${game.fen()}`);
        return null;
      }
      sanSolution.push(moveResult.san);
    }

    const turnColor = new Chess(initialFen).turn() === 'w' ? 'White' : 'Black';
    const playerMoves = getPlayerMovesCount(sanSolution.length);
    const diff = movesToDifficulty(sanSolution.length);

    const title = `Lichess #${rawP.id} (${playerMoves} ${playerMoves === 1 ? 'Move' : 'Moves'} to Win - ${turnColor})`;
    const description = `Find the ${playerMoves}-move winning line for ${turnColor}! Rating: ${rawP.rating}. Themes: ${rawP.themes.slice(0, 3).join(', ')}.`;
    const hint = `Look for tactical threats for ${turnColor}. First move involves ${sanSolution[0] ? sanSolution[0].slice(0, 1).toUpperCase() : 'a piece'}.`;

    const puzzle: Puzzle = {
      id: `lichess_${rawP.id}`,
      title,
      description,
      fen: initialFen,
      solution: sanSolution,
      hint,
      starsReward: movesToStars(sanSolution.length, rawP.rating),
      difficulty: diff,
      lichessId: rawP.id,
      lichessRating: rawP.rating,
      lichessUrl: `https://lichess.org/training/${rawP.id}`,
      themes: rawP.themes,
      isVerified: true,
    };

    // Double check with validator
    const val = validatePuzzle(puzzle);
    if (!val.isValid) {
      console.warn(`[Lichess API] Converted puzzle failed validation: ${val.error}`);
      return null;
    }

    return puzzle;
  } catch (err) {
    console.error('[Lichess API] Conversion error:', err);
    return null;
  }
}

/**
 * Fetches the official Lichess Daily Puzzle.
 */
export async function fetchLichessDailyPuzzle(): Promise<Puzzle | null> {
  try {
    const res = await fetch('https://lichess.org/api/puzzle/daily');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: LichessRawPuzzleResponse = await res.json();
    return convertLichessToPuzzle(data);
  } catch (err) {
    console.error('[Lichess API] Failed to fetch daily puzzle:', err);
    return null;
  }
}

/**
 * Fetches a specific Lichess Puzzle by ID.
 */
export async function fetchLichessPuzzleById(puzzleId: string): Promise<Puzzle | null> {
  try {
    const cleanId = puzzleId.trim().replace(/^lichess_/i, '');
    const res = await fetch(`https://lichess.org/api/puzzle/${cleanId}`);
    if (!res.ok) throw new Error(`Puzzle #${cleanId} not found on Lichess`);
    const data: LichessRawPuzzleResponse = await res.json();
    return convertLichessToPuzzle(data);
  } catch (err) {
    console.error(`[Lichess API] Failed to fetch puzzle #${puzzleId}:`, err);
    return null;
  }
}
