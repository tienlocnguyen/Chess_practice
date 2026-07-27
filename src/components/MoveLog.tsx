import React, { useState } from 'react';
import { Chess } from 'chess.js';
import { RotateCcw, Copy, Check, Hash, Code } from 'lucide-react';

interface MoveLogProps {
  game: Chess;
  onUndoMove: () => void;
  canUndo: boolean;
}

export const MoveLog: React.FC<MoveLogProps> = ({ game, onUndoMove, canUndo }) => {
  const [copiedPgn, setCopiedPgn] = useState(false);
  const [copiedFen, setCopiedFen] = useState(false);

  const history = game.history({ verbose: true });

  // Format moves into pairs (1. e4 e5)
  const movePairs: { num: number; white?: string; black?: string }[] = [];
  for (let i = 0; i < history.length; i += 2) {
    movePairs.push({
      num: Math.floor(i / 2) + 1,
      white: history[i]?.san,
      black: history[i + 1]?.san,
    });
  }

  const handleCopyPgn = () => {
    navigator.clipboard.writeText(game.pgn());
    setCopiedPgn(true);
    setTimeout(() => setCopiedPgn(false), 2000);
  };

  const handleCopyFen = () => {
    navigator.clipboard.writeText(game.fen());
    setCopiedFen(true);
    setTimeout(() => setCopiedFen(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-white flex flex-col h-full shadow-xl">
      {/* Move Log Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
          <Hash className="w-4 h-4 text-amber-400" />
          <span>Move History ({history.length})</span>
        </div>

        <button
          onClick={onUndoMove}
          disabled={!canUndo}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-40 text-xs font-bold flex items-center gap-1.5 transition"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>Take Back</span>
        </button>
      </div>

      {/* Move History Table */}
      <div className="flex-1 overflow-y-auto max-h-56 pr-1 space-y-1 scrollbar-thin">
        {movePairs.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500 italic">
            No moves played yet. Make your first pawn move!
          </div>
        ) : (
          movePairs.map((pair) => (
            <div
              key={pair.num}
              className="grid grid-cols-7 text-xs font-mono py-1 px-2 rounded-lg hover:bg-slate-800/60 transition"
            >
              <span className="col-span-1 text-slate-500 font-bold">{pair.num}.</span>
              <span className="col-span-3 text-slate-200 font-semibold">{pair.white || ''}</span>
              <span className="col-span-3 text-slate-400">{pair.black || ''}</span>
            </div>
          ))
        )}
      </div>

      {/* Footer Copy PGN/FEN Actions */}
      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2">
        <button
          onClick={handleCopyPgn}
          className="flex-1 py-1.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 flex items-center justify-center gap-1 border border-slate-700/60 transition"
        >
          {copiedPgn ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5 text-amber-400" />}
          <span>{copiedPgn ? 'PGN Copied' : 'Copy PGN'}</span>
        </button>

        <button
          onClick={handleCopyFen}
          className="flex-1 py-1.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 flex items-center justify-center gap-1 border border-slate-700/60 transition"
        >
          {copiedFen ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
          <span>{copiedFen ? 'FEN Copied' : 'Copy FEN'}</span>
        </button>
      </div>
    </div>
  );
};
