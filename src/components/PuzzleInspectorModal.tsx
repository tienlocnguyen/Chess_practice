import React, { useState } from 'react';
import { Chess } from 'chess.js';
import { Puzzle } from '../types/chess';
import { validatePuzzle } from '../utils/puzzleValidator';
import { ChessBoard } from './ChessBoard';
import { CheckCircle2, XCircle, ShieldCheck, ExternalLink, ChevronRight, ChevronLeft, AlertTriangle, Zap, Flame, Award } from 'lucide-react';

interface PuzzleInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  puzzles: Puzzle[];
  onSelectPuzzle: (puzzle: Puzzle) => void;
  lang: 'en' | 'vi';
}

type FilterDifficulty = 'All' | 'Easy' | 'Medium' | 'Hard';

export const PuzzleInspectorModal: React.FC<PuzzleInspectorModalProps> = ({
  isOpen,
  onClose,
  puzzles,
  onSelectPuzzle,
  lang,
}) => {
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>(puzzles[0] || null);
  const [inspectStep, setInspectStep] = useState(0);
  const [filterDifficulty, setFilterDifficulty] = useState<FilterDifficulty>('All');

  if (!isOpen) return null;

  const currentPuzzle = selectedPuzzle || puzzles[0];

  // Helper to get move count and difficulty
  const getMoveCount = (p: Puzzle) => Math.ceil((p.solution?.length || 1) / 2);

  const filteredPuzzles = puzzles.filter((p) => {
    const moves = getMoveCount(p);
    if (filterDifficulty === 'Easy') return moves <= 1;
    if (filterDifficulty === 'Medium') return moves === 2;
    if (filterDifficulty === 'Hard') return moves >= 3;
    return true;
  });

  // Validate selected puzzle
  const validation = currentPuzzle ? validatePuzzle(currentPuzzle) : { isValid: false, error: 'No puzzle selected' };

  // Generate board game state at current step
  const getBoardGame = () => {
    if (!currentPuzzle) return new Chess();
    const g = new Chess(currentPuzzle.fen);
    for (let i = 0; i < inspectStep && i < currentPuzzle.solution.length; i++) {
      try {
        g.move(currentPuzzle.solution[i]);
      } catch {
        break;
      }
    }
    return g;
  };

  const activeGame = getBoardGame();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-amber-300">
                {lang === 'vi' ? 'Trình Kiểm Định & Review Bài Tập Cờ Vua' : 'Puzzle Quality Inspector & Reviewer'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'vi' ? 'Tự động kiểm tra tính hợp lệ 100% của nước đi với Chess.js' : '100% validity checking via Chess.js & Lichess engine'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
          >
            ✕ {lang === 'vi' ? 'Đóng' : 'Close'}
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Puzzle List */}
          <div className="md:col-span-5 flex flex-col gap-4 border-r border-slate-800 pr-0 md:pr-4">
            
            {/* Filter Tabs */}
            <div className="bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-center gap-1">
              {[
                { id: 'All', label: lang === 'vi' ? 'Tất cả' : 'All', icon: Award },
                { id: 'Easy', label: lang === 'vi' ? 'Dễ (1 Nước)' : 'Easy (1 Move)', icon: Zap },
                { id: 'Medium', label: lang === 'vi' ? 'TB (2 Nước)' : 'Medium (2 Moves)', icon: ShieldCheck },
                { id: 'Hard', label: lang === 'vi' ? 'Khó (3 Nước)' : 'Hard (3 Moves)', icon: Flame },
              ].map((tab) => {
                const IconComp = tab.icon;
                const isActive = filterDifficulty === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilterDifficulty(tab.id as FilterDifficulty)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-extrabold transition flex items-center gap-1 border ${
                      isActive
                        ? 'bg-purple-600 text-white border-purple-400 shadow-sm'
                        : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <IconComp className="w-3 h-3" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Puzzle Library List */}
            <div className="flex-1 flex flex-col gap-2 min-h-[320px]">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
                <span>{lang === 'vi' ? 'Danh sách:' : 'Puzzles:'} ({filteredPuzzles.length})</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {filteredPuzzles.filter((p) => validatePuzzle(p).isValid).length} {lang === 'vi' ? 'Hợp Lệ' : 'Qualified'}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 max-h-[420px] pr-1">
                {filteredPuzzles.map((p, idx) => {
                  const val = validatePuzzle(p);
                  const isSelected = currentPuzzle?.id === p.id;
                  const movesCount = getMoveCount(p);

                  let badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
                  if (movesCount === 2) badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
                  if (movesCount >= 3) badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/30';

                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedPuzzle(p);
                        setInspectStep(0);
                      }}
                      className={`p-3 rounded-2xl border text-left cursor-pointer transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-purple-950/40 border-purple-500/60 shadow-md shadow-purple-500/10'
                          : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex-1 pr-2 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                            #{idx + 1}
                          </span>
                          <h4 className="text-xs font-black text-slate-200 truncate">
                            {lang === 'vi' ? (p.titleVi || p.title) : p.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md border ${badgeColor}`}>
                            {movesCount} {movesCount === 1 ? 'Move' : 'Moves'}
                          </span>
                          <p className="text-[10px] text-slate-400 truncate">
                            +{p.starsReward} ⭐
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {val.isValid ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Valid
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold border border-rose-500/30 flex items-center gap-1">
                            <XCircle className="w-3 h-3" /> Error
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Step-by-Step Inspector Board */}
          <div className="md:col-span-7 flex flex-col gap-4">
            
            {currentPuzzle ? (
              <div className="bg-slate-950/60 p-4 rounded-3xl border border-slate-800 flex flex-col gap-4">
                
                {/* Puzzle Header */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
                      {lang === 'vi' ? (currentPuzzle.titleVi || currentPuzzle.title) : currentPuzzle.title}
                      {currentPuzzle.lichessUrl && (
                        <a
                          href={currentPuzzle.lichessUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 transition"
                          title="Open on Lichess.org"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {lang === 'vi' ? (currentPuzzle.descriptionVi || currentPuzzle.description) : currentPuzzle.description}
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectPuzzle(currentPuzzle)}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white font-black text-xs hover:scale-105 transition shadow-lg shadow-purple-500/20 shrink-0"
                  >
                    {lang === 'vi' ? 'Chơi Bài Này ▶' : 'Play Puzzle ▶'}
                  </button>
                </div>

                {/* Validation Status Banner */}
                <div className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
                  validation.isValid
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                }`}>
                  {validation.isValid ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>{lang === 'vi' ? 'Trạng thái: 100% Hợp lệ theo luật Cờ Vua!' : 'Status: 100% Valid & Tested with Chess.js Engine!'}</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{validation.error}</span>
                    </>
                  )}
                </div>

                {/* Interactive Step Board Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  
                  {/* Board View */}
                  <div className="aspect-square w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden shadow-xl border border-slate-800">
                    <ChessBoard
                      game={activeGame}
                      theme="wood"
                      pieceStyle="staunton"
                      showLegalMoves={false}
                    />
                  </div>

                  {/* Move Inspector Controls */}
                  <div className="flex flex-col gap-3">
                    <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        {lang === 'vi' ? 'Chuỗi Nước Đi Lời Giải (SAN):' : 'Solution SAN Moves:'}
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {currentPuzzle.solution.map((m, i) => (
                          <span
                            key={i}
                            className={`px-2 py-1 rounded-lg text-xs font-mono font-bold border ${
                              inspectStep === i + 1
                                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                                : inspectStep > i
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            {i + 1}. {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Step Navigation Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setInspectStep(Math.max(0, inspectStep - 1))}
                        disabled={inspectStep === 0}
                        className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-slate-200 transition flex items-center justify-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" /> Prev
                      </button>
                      <button
                        onClick={() => setInspectStep(0)}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition"
                      >
                        Reset
                      </button>
                      <button
                        onClick={() => setInspectStep(Math.min(currentPuzzle.solution.length, inspectStep + 1))}
                        disabled={inspectStep === currentPuzzle.solution.length}
                        className="flex-1 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-black text-xs disabled:opacity-40 transition flex items-center justify-center gap-1 shadow-md shadow-purple-500/20"
                      >
                        Next <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* FEN Output */}
                    <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-[10px] font-mono text-slate-400 break-all">
                      <span className="font-bold text-slate-300">FEN: </span>{activeGame.fen()}
                    </div>

                  </div>

                </div>

              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 text-xs font-bold">
                Select a puzzle to inspect details
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
