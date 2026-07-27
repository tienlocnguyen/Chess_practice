import React from 'react';
import { Chess } from 'chess.js';
import { Language, getTranslation } from '../utils/i18n';

interface EvaluationBarProps {
  game: Chess;
  language: Language;
}

export const EvaluationBar: React.FC<EvaluationBarProps> = ({ game, language }) => {
  // Calculate material balance
  let whiteScore = 0;
  let blackScore = 0;

  const pieceValues: Record<string, number> = {
    p: 1,
    n: 3,
    b: 3,
    r: 5,
    q: 9,
    k: 0,
  };

  const board = game.board();
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece) {
        if (piece.color === 'w') whiteScore += pieceValues[piece.type] || 0;
        else blackScore += pieceValues[piece.type] || 0;
      }
    }
  }

  // Factor in check and checkmate
  let evalNum = whiteScore - blackScore;
  if (game.isCheckmate()) {
    evalNum = game.turn() === 'b' ? 20 : -20;
  } else if (game.isCheck()) {
    evalNum += game.turn() === 'w' ? -0.8 : 0.8;
  }

  // Convert evalNum to white percentage (range 0% to 100%, 50% = equal)
  // Max advantage mapped around +15 to -15
  const clampedEval = Math.max(-15, Math.min(15, evalNum));
  const whitePercent = 50 + (clampedEval / 15) * 45; // 5% to 95%

  const evalText =
    evalNum === 0
      ? getTranslation(language, 'evalEqual')
      : evalNum > 0
      ? `${getTranslation(language, 'evalWhiteLead')} +${evalNum.toFixed(1)}`
      : `${getTranslation(language, 'evalBlackLead')} +${Math.abs(evalNum).toFixed(1)}`;

  return (
    <div className="flex flex-col items-center gap-1.5 w-full">
      <div className="flex items-center justify-between w-full text-[11px] font-black tracking-wider px-1">
        <span className="text-slate-100 flex items-center gap-1">
          ⚪ White {evalNum > 0 ? `+${evalNum.toFixed(1)}` : ''}
        </span>
        <span className="text-emerald-400 font-extrabold text-[10px]">
          {evalNum === 0 ? '0.0' : evalNum > 0 ? `+${evalNum.toFixed(1)}` : `-${Math.abs(evalNum).toFixed(1)}`}
        </span>
        <span className="text-slate-400 flex items-center gap-1">
          ⚫ Black {evalNum < 0 ? `+${Math.abs(evalNum).toFixed(1)}` : ''}
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-3.5 bg-slate-950 rounded-full border border-slate-800 p-0.5 relative overflow-hidden flex shadow-inner">
        {/* White Bar */}
        <div
          className="h-full bg-gradient-to-r from-slate-100 via-amber-100 to-amber-200 rounded-l-full transition-all duration-500 ease-out"
          style={{ width: `${whitePercent}%` }}
        />
        {/* Black Bar */}
        <div
          className="h-full bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 rounded-r-full transition-all duration-500 ease-out flex-1"
        />
      </div>
      <div className="text-[10px] text-slate-400 font-semibold">{evalText}</div>
    </div>
  );
};
