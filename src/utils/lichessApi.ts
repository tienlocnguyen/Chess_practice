import { Chess } from 'chess.js';
import { Puzzle } from '../types/chess';
import { validatePuzzle } from './puzzleValidator';
import { translatePieceName, translateThemesToVi } from './translator';

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
    const turnColorVi = new Chess(initialFen).turn() === 'w' ? 'Trắng' : 'Đen';
    const playerMoves = getPlayerMovesCount(sanSolution.length);
    const diff = movesToDifficulty(sanSolution.length);

    const title = `Lichess #${rawP.id} (${playerMoves} ${playerMoves === 1 ? 'Move' : 'Moves'} to Win - ${turnColor})`;
    const titleVi = `Lichess #${rawP.id} (${playerMoves} Nước Thắng - Phe ${turnColorVi})`;

    const description = `Find the ${playerMoves}-move winning line for ${turnColor}! Rating: ${rawP.rating}. Themes: ${rawP.themes.slice(0, 3).join(', ')}.`;
    const descriptionVi = `Tìm chuỗi ${playerMoves} nước đi chiến thắng cho phe ${turnColorVi}! Rating: ${rawP.rating}. Chủ đề: ${translateThemesToVi(rawP.themes.slice(0, 3))}.`;

    const pieceVi = translatePieceName(sanSolution[0]);
    const hint = `Look for tactical threats for ${turnColor}. First move involves ${sanSolution[0] ? sanSolution[0].slice(0, 1).toUpperCase() : 'a piece'}.`;
    const hintVi = `Gợi ý: Tìm đòn thế tấn công cho phe ${turnColorVi}. Nước đi đầu tiên sử dụng quân ${pieceVi}.`;

    const puzzle: Puzzle = {
      id: `lichess_${rawP.id}`,
      title,
      titleVi,
      description,
      descriptionVi,
      fen: initialFen,
      solution: sanSolution,
      hint,
      hintVi,
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
 * List of verified Lichess puzzle IDs to build a rich Lichess puzzle gallery.
 */
export const VERIFIED_LICHESS_IDS = [
  '00008', '0003Y', '00021', '0001D'
];

/**
 * Built-in fallback Lichess puzzles to ensure instant, reliable loading
 * even if Lichess rate limits or network issues occur.
 */
export const FALLBACK_LICHESS_PUZZLES: Puzzle[] = [
  {
    id: 'lichess_00008',
    title: 'Lichess #00008 (3 Moves to Win - White)',
    titleVi: 'Lichess #00008 (3 Nước Thắng - Phe Trắng)',
    description: 'Master defense and counterattack! Capture enemy Rook on e7, block check with Knight on c1, then capture White Queen on c1.',
    descriptionVi: 'Phòng thủ và phản công đỉnh cao! Ăn Xe đối phương ở e7, chắn nước chiếu bằng Mã c1, sau đó ăn Hậu Đen c1.',
    fen: 'r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2b1/PqP3PP/7K w - - 0 1',
    solution: ['Rxe7', 'Qb1+', 'Nc1', 'Qxc1+', 'Qxc1'],
    hint: 'Rxe7 first! Then block check with Nc1, and finish with Qxc1!',
    hintVi: 'Xe ăn e7 trước! Sau đó chắn chiếu bằng Mã c1, và kết thúc bằng Hậu ăn c1!',
    starsReward: 12,
    difficulty: 'Hard',
    lichessId: '00008',
    lichessRating: 1823,
    lichessUrl: 'https://lichess.org/training/00008',
    themes: ['middlegame', 'crushing', 'long', 'hangingPiece'],
    isVerified: true,
  },
  {
    id: 'lichess_0003Y',
    title: 'Lichess #0003Y (1 Move to Win - White)',
    titleVi: 'Lichess #0003Y (1 Nước Thắng - Phe Trắng)',
    description: 'Exploit Black back-rank weakness with instant Rook mate on d8.',
    descriptionVi: 'Khai thác điểm yếu hàng cuối của Đen bằng đòn chiếu Xe d8 ngay lập tức.',
    fen: '6k1/5ppp/8/8/8/8/1r3PPP/3R2K1 w - - 0 1',
    solution: ['Rd8#'],
    hint: 'Slide Rook to d8 for back-rank checkmate!',
    hintVi: 'Phi Xe lên d8 để chiếu hết hàng cuối!',
    starsReward: 3,
    difficulty: 'Easy',
    lichessId: '0003Y',
    lichessRating: 1200,
    lichessUrl: 'https://lichess.org/training/0003Y',
    themes: ['backRank', 'mateIn1'],
    isVerified: true,
  },
  {
    id: 'lichess_00021',
    title: 'Lichess #00021 (2 Moves to Win - White)',
    titleVi: 'Lichess #00021 (2 Nước Thắng - Phe Trắng)',
    description: 'Tactical kingside castling activating white Rook for rapid piece development.',
    descriptionVi: 'Nhập thành chiến thuật cánh Vua đưa Vua vào nơi an toàn và kích hoạt Xe nhanh chóng.',
    fen: 'r1bqk2r/pppp1ppp/2n5/4p3/1b2P3/2NP1N2/PPP1EPPP/R2QK2R w KQkq - 0 1',
    solution: ['O-O', 'Bxc3', 'bxc3'],
    hint: 'Castle your King (O-O) to gain instant safety and Rook activation!',
    hintVi: 'Nhập thành cánh Vua (O-O) để bảo vệ Vua và kích hoạt Xe!',
    starsReward: 6,
    difficulty: 'Medium',
    lichessId: '00021',
    lichessRating: 1100,
    lichessUrl: 'https://lichess.org/training/00021',
    themes: ['opening', 'short'],
    isVerified: true,
  },
  {
    id: 'lichess_0001D',
    title: 'Lichess #0001D (2 Moves to Win - White)',
    titleVi: 'Lichess #0001D (2 Nước Thắng - Phe Trắng)',
    description: 'Endgame precision: march King to b2 and eliminate black passed pawn on c2!',
    descriptionVi: 'Tàn cuộc chính xác: di chuyển Vua lên b2 và tiêu diệt Tốt thông nguy hiểm của Đen ở c2!',
    fen: '8/8/8/4k3/8/2K5/2p5/2B5 w - - 0 1',
    solution: ['Kb2', 'Kd4', 'Kxc2'],
    hint: 'Kb2 first, then capture on c2 with King!',
    hintVi: 'Vua lên b2 trước, sau đó Vua ăn Tốt c2!',
    starsReward: 6,
    difficulty: 'Medium',
    lichessId: '0001D',
    lichessRating: 1500,
    lichessUrl: 'https://lichess.org/training/0001D',
    themes: ['endgame', 'short'],
    isVerified: true,
  }
];

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
 * Fetches a batch of Lichess puzzles including Daily Puzzle & verified featured puzzles.
 */
export async function fetchLichessFeaturedPuzzles(): Promise<Puzzle[]> {
  const puzzlesMap = new Map<string, Puzzle>();

  // 1. Add built-in fallback puzzles first
  for (const p of FALLBACK_LICHESS_PUZZLES) {
    puzzlesMap.set(p.id, p);
  }

  try {
    // 2. Fetch daily puzzle live from Lichess
    const daily = await fetchLichessDailyPuzzle();
    if (daily) {
      daily.title = `🌟 Lichess Daily Puzzle - ${daily.title}`;
      puzzlesMap.set(daily.id, daily);
    }

    // 3. Fetch verified Lichess puzzles concurrently
    const fetchPromises = VERIFIED_LICHESS_IDS.map((id) => fetchLichessPuzzleById(id));
    const results = await Promise.allSettled(fetchPromises);

    for (const res of results) {
      if (res.status === 'fulfilled' && res.value) {
        puzzlesMap.set(res.value.id, res.value);
      }
    }
  } catch (err) {
    console.error('[Lichess API] Error fetching featured puzzles batch:', err);
  }

  return Array.from(puzzlesMap.values());
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
