import React from 'react';
import { Chess } from 'chess.js';
import { getMaterialDifference } from '../utils/chessAi';

interface CapturedPiecesProps {
  game: Chess;
}

const PIECE_ICONS: Record<string, string> = {
  p: '♟',
  n: '♞',
  b: '♝',
  r: '♜',
  q: '♛',
};

export const CapturedPieces: React.FC<CapturedPiecesProps> = ({ game }) => {
  const history = game.history({ verbose: true });

  const whiteCaptured: string[] = []; // pieces black lost
  const blackCaptured: string[] = []; // pieces white lost

  history.forEach((m) => {
    if (m.captured) {
      if (m.color === 'w') {
        blackCaptured.push(m.captured);
      } else {
        whiteCaptured.push(m.captured);
      }
    }
  });

  const { diff } = getMaterialDifference(game);

  return (
    <div className="flex items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-xs w-full">
      {/* Captured White Pieces (Taken by Black) */}
      <div className="flex items-center gap-1.5 flex-1 overflow-x-auto scrollbar-none">
        <span className="text-[10px] font-bold text-slate-400 shrink-0">Captured:</span>
        <div className="flex items-center gap-0.5 text-slate-200 text-base font-serif">
          {whiteCaptured.length === 0 ? (
            <span className="text-slate-600 text-xs italic">None</span>
          ) : (
            whiteCaptured.map((p, idx) => <span key={idx}>{PIECE_ICONS[p] || p}</span>)
          )}
        </div>
        {diff < 0 && (
          <span className="ml-1 px-1.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-black text-[10px] border border-rose-500/30">
            +{Math.abs(diff)}
          </span>
        )}
      </div>

      {/* Captured Black Pieces (Taken by White) */}
      <div className="flex items-center gap-1.5 flex-1 justify-end overflow-x-auto scrollbar-none">
        {diff > 0 && (
          <span className="mr-1 px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-black text-[10px] border border-emerald-500/30">
            +{diff}
          </span>
        )}
        <div className="flex items-center gap-0.5 text-slate-400 text-base font-serif">
          {blackCaptured.length === 0 ? (
            <span className="text-slate-600 text-xs italic">None</span>
          ) : (
            blackCaptured.map((p, idx) => <span key={idx}>{PIECE_ICONS[p] || p}</span>)
          )}
        </div>
        <span className="text-[10px] font-bold text-slate-400 shrink-0">Captured:</span>
      </div>
    </div>
  );
};
