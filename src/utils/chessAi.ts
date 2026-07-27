import { Chess, Square, Move } from 'chess.js';
import { AiLevel, AiPersonality } from '../types/chess';

export const AI_PERSONALITIES: Record<AiLevel, AiPersonality> = {
  bunny: {
    id: 'bunny',
    name: 'Bunny Hop',
    title: 'Playful Beginner 🐰',
    avatar: '🐰',
    description: 'Makes silly moves and loves hopping around! Perfect for learning how pieces move.',
    difficultyText: 'Level 1: Super Easy',
    stars: 1,
    color: 'from-pink-400 to-rose-400',
  },
  fox: {
    id: 'fox',
    name: 'Clever Fox',
    title: 'Tactical Rookie 🦊',
    avatar: '🦊',
    description: 'Loves capturing undefended pieces and knows standard moves, but makes funny mistakes!',
    difficultyText: 'Level 2: Easy',
    stars: 2,
    color: 'from-amber-400 to-orange-400',
  },
  owl: {
    id: 'owl',
    name: 'Wise Owl',
    title: 'Strategy Apprentice 🦉',
    avatar: '🦉',
    description: 'Controls the center, guards its pieces, and thinks 2 moves ahead!',
    difficultyText: 'Level 3: Medium',
    stars: 3,
    color: 'from-emerald-400 to-teal-500',
  },
  dragon: {
    id: 'dragon',
    name: 'Dragon Master',
    title: 'Chess Wizard 🐲',
    avatar: '🐲',
    description: 'A formidable opponent! Calculates deep combinations and defends with sharp tactics.',
    difficultyText: 'Level 4: Master',
    stars: 5,
    color: 'from-purple-500 to-indigo-600',
  },
};

// Piece material values
const PIECE_VALUES: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

// Positional Piece-Square Tables for evaluation
const PAWN_TABLE = [
  0,  0,  0,  0,  0,  0,  0,  0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
   5,  5, 10, 25, 25, 10,  5,  5,
   0,  0,  0, 20, 20,  0,  0,  0,
   5, -5,-10,  0,  0,-10, -5,  5,
   5, 10, 10,-20,-20, 10, 10,  5,
   0,  0,  0,  0,  0,  0,  0,  0
];

const KNIGHT_TABLE = [
  -50,-40,-30,-30,-30,-30,-40,-50,
  -40,-20,  0,  0,  0,  0,-20,-40,
  -30,  0, 10, 15, 15, 10,  0,-30,
  -30,  5, 15, 20, 20, 15,  5,-30,
  -30,  0, 15, 20, 20, 15,  0,-30,
  -30,  5, 10, 15, 15, 10,  5,-30,
  -40,-20,  0,  5,  5,  0,-20,-40,
  -50,-40,-30,-30,-30,-30,-40,-50
];

const BISHOP_TABLE = [
  -20,-10,-10,-10,-10,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5, 10, 10,  5,  0,-10,
  -10,  5,  5, 10, 10,  5,  5,-10,
  -10,  0, 10, 10, 10, 10,  0,-10,
  -10, 10, 10, 10, 10, 10, 10,-10,
  -10,  5,  0,  0,  0,  0,  5,-10,
  -20,-10,-10,-10,-10,-10,-10,-20
];

function evaluateBoard(game: Chess): number {
  let totalEval = 0;
  const board = game.board();

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (!piece) continue;

      let value = PIECE_VALUES[piece.type] || 0;
      const index = r * 8 + c;

      if (piece.type === 'p') value += PAWN_TABLE[piece.color === 'w' ? index : 63 - index];
      else if (piece.type === 'n') value += KNIGHT_TABLE[piece.color === 'w' ? index : 63 - index];
      else if (piece.type === 'b') value += BISHOP_TABLE[piece.color === 'w' ? index : 63 - index];

      if (piece.color === 'w') {
        totalEval += value;
      } else {
        totalEval -= value;
      }
    }
  }

  return totalEval;
}

function minimax(
  game: Chess,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean
): number {
  if (depth === 0 || game.isGameOver()) {
    return evaluateBoard(game);
  }

  const moves = game.moves({ verbose: true });

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      game.move(move);
      const evalScore = minimax(game, depth - 1, alpha, beta, false);
      game.undo();
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      game.move(move);
      const evalScore = minimax(game, depth - 1, alpha, beta, true);
      game.undo();
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

export function getAiMove(game: Chess, level: AiLevel): Move | null {
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;

  const isWhite = game.turn() === 'w';

  // Level 1: Bunny Hop 🐰 (85% random, 15% capture)
  if (level === 'bunny') {
    if (Math.random() < 0.85) {
      return moves[Math.floor(Math.random() * moves.length)];
    }
    const captures = moves.filter(m => m.captured);
    if (captures.length > 0) {
      return captures[Math.floor(Math.random() * captures.length)];
    }
    return moves[Math.floor(Math.random() * moves.length)];
  }

  // Level 2: Clever Fox 🦊 (Captures high value pieces, depth 1 search)
  if (level === 'fox') {
    // 30% chance of random fun move for kid balance
    if (Math.random() < 0.3) {
      return moves[Math.floor(Math.random() * moves.length)];
    }
    let bestMove: Move = moves[0];
    let bestValue = isWhite ? -Infinity : Infinity;

    for (const move of moves) {
      game.move(move);
      const val = evaluateBoard(game);
      game.undo();

      if (isWhite ? val > bestValue : val < bestValue) {
        bestValue = val;
        bestMove = move;
      }
    }
    return bestMove;
  }

  // Level 3: Wise Owl 🦉 (Minimax depth 2)
  if (level === 'owl') {
    let bestMove: Move = moves[0];
    let bestValue = isWhite ? -Infinity : Infinity;

    for (const move of moves) {
      game.move(move);
      const val = minimax(game, 2, -Infinity, Infinity, !isWhite);
      game.undo();

      if (isWhite ? val > bestValue : val < bestValue) {
        bestValue = val;
        bestMove = move;
      }
    }
    return bestMove;
  }

  // Level 4: Dragon Master 🐲 (Minimax depth 3 with Alpha-Beta)
  let bestMove: Move = moves[0];
  let bestValue = isWhite ? -Infinity : Infinity;

  for (const move of moves) {
    game.move(move);
    const val = minimax(game, 3, -Infinity, Infinity, !isWhite);
    game.undo();

    if (isWhite ? val > bestValue : val < bestValue) {
      bestValue = val;
      bestMove = move;
    }
  }

  return bestMove;
}

export function getBestMoveHint(game: Chess): Move | null {
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;

  const isWhite = game.turn() === 'w';
  let bestMove: Move = moves[0];
  let bestValue = isWhite ? -Infinity : Infinity;

  for (const move of moves) {
    game.move(move);
    const val = minimax(game, 3, -Infinity, Infinity, !isWhite);
    game.undo();

    if (isWhite ? val > bestValue : val < bestValue) {
      bestValue = val;
      bestMove = move;
    }
  }

  return bestMove;
}

// Generate kid-friendly speech bubble coach messages
export function getCoachTip(game: Chess, lastMove?: Move): string {
  if (game.isCheckmate()) {
    return '🎉 CHECKMATE! What an unbelievable victory! You played like a Grandmaster!';
  }
  if (game.isCheck()) {
    return '⚡ Warning! The King is in CHECK! Protect your King immediately!';
  }
  if (game.isStalemate()) {
    return '🤝 Stalemate! It is a draw because the King has no legal moves left!';
  }
  if (game.isDraw()) {
    return '🤝 Game ended in a draw! Great defensive play from both sides!';
  }

  if (lastMove?.captured) {
    const pieceNames: Record<string, string> = {
      q: 'Queen 👑',
      r: 'Rook 🏰',
      b: 'Bishop 🧙',
      n: 'Knight 🐴',
      p: 'Pawn ♟️'
    };
    const name = pieceNames[lastMove.captured] || 'piece';
    return `💥 Great capture! A ${name} was taken off the board!`;
  }

  const turn = game.turn() === 'w' ? 'White' : 'Black';
  const moves = game.moves({ verbose: true });

  const checks = moves.filter(m => m.san.includes('+'));
  if (checks.length > 0) {
    return `💡 Tip for ${turn}: You can deliver a Check! Look for a move that threatens the enemy King!`;
  }

  const captures = moves.filter(m => m.captured);
  if (captures.length > 0) {
    return `💡 Tip for ${turn}: You have an opportunity to capture an undefended piece!`;
  }

  if (game.history().length < 6) {
    return `🚀 Opening Tip: Control the center of the board (e4/d4/e5/d5) and develop your Knights and Bishops!`;
  }

  return `⭐ Keep your pieces guarded and watch for open paths for your Rooks and Queen!`;
}

export function getMaterialDifference(game: Chess): { whiteScore: number; blackScore: number; diff: number } {
  const board = game.board();
  let whiteScore = 0;
  let blackScore = 0;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (!piece) continue;
      const val = PIECE_VALUES[piece.type] || 0;
      if (piece.color === 'w') whiteScore += val;
      else blackScore += val;
    }
  }

  // standard material points (P=1, N=3, B=3, R=5, Q=9)
  const wPoints = Math.floor((whiteScore - 20000) / 100);
  const bPoints = Math.floor((blackScore - 20000) / 100);

  return {
    whiteScore: wPoints,
    blackScore: bPoints,
    diff: wPoints - bPoints
  };
}
