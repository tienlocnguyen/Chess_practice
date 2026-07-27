import React, { useState } from 'react';
import { Chess, Square } from 'chess.js';
import { BoardTheme, UserProfile } from '../types/chess';
import { KID_PUZZLES } from '../utils/puzzles';
import { ChessBoard } from './ChessBoard';
import { playSound } from '../utils/sound';
import { getTranslation } from '../utils/i18n';
import confetti from 'canvas-confetti';
import { Puzzle as PuzzleIcon, Sparkles, CheckCircle, HelpCircle, RefreshCw, ArrowRight } from 'lucide-react';

interface PuzzleModeProps {
  theme: BoardTheme;
  userProfile: UserProfile;
  onSolvePuzzle: (rewardStars: number) => void;
}

export const PuzzleMode: React.FC<PuzzleModeProps> = ({ theme, userProfile, onSolvePuzzle }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const activePuzzle = KID_PUZZLES[currentIdx];

  const [game, setGame] = useState(() => new Chess(activePuzzle.fen));
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const lang = userProfile.language || 'vi';

  const handleMove = (from: Square, to: Square, promotion?: string) => {
    if (solved) return;

    try {
      const move = game.move({ from, to, promotion: promotion || 'q' });
      if (!move) return;

      const newGame = new Chess(game.fen());
      setGame(newGame);

      if (newGame.isCheckmate() || move.san === activePuzzle.solution[0]) {
        setSolved(true);
        setErrorMsg('');
        if (userProfile.soundEnabled) playSound.duoSuccess();
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
        onSolvePuzzle(activePuzzle.starsReward);
      } else {
        setErrorMsg(getTranslation(lang, 'puzzleWrong'));
        if (userProfile.soundEnabled) playSound.duoError();
      }
    } catch {
      setErrorMsg(getTranslation(lang, 'puzzleWrong'));
      if (userProfile.soundEnabled) playSound.duoError();
    }
  };

  const handleReset = () => {
    if (userProfile.soundEnabled) playSound.buttonClick();
    setGame(new Chess(activePuzzle.fen));
    setSolved(false);
    setShowHint(false);
    setErrorMsg('');
  };

  const handleNext = () => {
    if (userProfile.soundEnabled) playSound.buttonClick();
    const nextIdx = (currentIdx + 1) % KID_PUZZLES.length;
    setCurrentIdx(nextIdx);
    setGame(new Chess(KID_PUZZLES[nextIdx].fen));
    setSolved(false);
    setShowHint(false);
    setErrorMsg('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-white p-2 sm:p-4 animate-fade-in">
      {/* Header */}
      <div className="bg-slate-900/90 border border-purple-500/30 p-6 rounded-3xl text-center space-y-2 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 font-extrabold text-xs border border-purple-500/30 mb-1">
          <PuzzleIcon className="w-4 h-4 text-purple-400" />
          <span>{getTranslation(lang, 'puzzleTitle')} ({currentIdx + 1} / {KID_PUZZLES.length})</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-300 via-pink-300 to-amber-300 bg-clip-text text-transparent">
          {activePuzzle.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-medium">
          {getTranslation(lang, 'puzzleSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Chess Board */}
        <div className="md:col-span-7">
          <ChessBoard
            game={game}
            theme={theme}
            pieceStyle={userProfile.pieceStyle}
            onMove={handleMove}
            disabled={solved}
          />
        </div>

        {/* Side Panel Controls & Rewards */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Difficulty</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/30">
                {activePuzzle.difficulty} • +{activePuzzle.starsReward} Stars (+10 XP)
              </span>
            </div>

            {/* Solved Banner */}
            {solved && (
              <div className="bg-emerald-500/20 border-2 border-emerald-400 p-4 rounded-2xl text-center space-y-2 animate-bounce-slow">
                <div className="flex items-center justify-center gap-2 text-emerald-300 font-extrabold text-lg">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                  <span>{getTranslation(lang, 'puzzleSolvedTitle')}</span>
                </div>
                <p className="text-xs text-emerald-200 font-semibold">
                  {getTranslation(lang, 'puzzleSolvedDesc')}
                </p>
              </div>
            )}

            {/* Error Banner */}
            {errorMsg && !solved && (
              <div className="bg-rose-500/20 border border-rose-500/40 p-3 rounded-2xl text-xs text-rose-300 text-center font-bold">
                {errorMsg}
              </div>
            )}

            {/* Hint Box */}
            {showHint && (
              <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-2xl text-xs text-amber-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Duo Owl Hint:</span>
                </div>
                <p className="font-semibold">{activePuzzle.hint}</p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2 pt-2">
              {!showHint && !solved && (
                <button
                  onClick={() => {
                    if (userProfile.soundEnabled) playSound.buttonClick();
                    setShowHint(true);
                  }}
                  className="w-full py-2.5 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 hover:bg-amber-500 hover:text-slate-950 text-xs font-extrabold transition flex items-center justify-center gap-2 shadow-md"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{getTranslation(lang, 'showHint')}</span>
                </button>
              )}

              <button
                onClick={handleReset}
                className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-amber-400" />
                <span>{getTranslation(lang, 'resetPuzzle')}</span>
              </button>

              <button
                onClick={handleNext}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-extrabold text-xs shadow-lg shadow-purple-500/20 hover:scale-102 transition flex items-center justify-center gap-2"
              >
                <span>{getTranslation(lang, 'nextPuzzle')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
