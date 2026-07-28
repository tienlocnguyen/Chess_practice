import React, { useState } from 'react';
import { Chess, Square } from 'chess.js';
import { BoardTheme, UserProfile } from '../types/chess';
import { KID_PUZZLES } from '../utils/puzzles';
import { ChessBoard } from './ChessBoard';
import { playSound } from '../utils/sound';
import { getTranslation } from '../utils/i18n';
import confetti from 'canvas-confetti';
import { Puzzle as PuzzleIcon, Sparkles, CheckCircle, HelpCircle, RefreshCw, ArrowRight, ArrowLeft, Grid, Filter, X, Star, AlertTriangle, Send } from 'lucide-react';

interface PuzzleModeProps {
  theme: BoardTheme;
  userProfile: UserProfile;
  onSolvePuzzle: (rewardStars: number) => void;
}

type FilterDifficulty = 'All' | 'Easy' | 'Medium' | 'Tricky' | 'Expert';

export const PuzzleMode: React.FC<PuzzleModeProps> = ({ theme, userProfile, onSolvePuzzle }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState<FilterDifficulty>('All');
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('wrong_position');
  const [reportNote, setReportNote] = useState('');
  const [reportToast, setReportToast] = useState('');

  const activePuzzle = KID_PUZZLES[currentIdx];

  const [game, setGame] = useState(() => new Chess(activePuzzle.fen));
  const [moveStep, setMoveStep] = useState(0);
  const [isOpponentMoving, setIsOpponentMoving] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const lang = userProfile.language || 'vi';

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userProfile.soundEnabled) playSound.buttonClick();

    // Log feedback or store locally
    const reports = JSON.parse(localStorage.getItem('reported_puzzles') || '[]');
    reports.push({
      level: currentIdx + 1,
      puzzleId: activePuzzle.id,
      reason: reportReason,
      note: reportNote,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('reported_puzzles', JSON.stringify(reports));

    const msg = lang === 'vi'
      ? `Cảm ơn bạn! Báo lỗi cho Level ${currentIdx + 1} đã được ghi nhận.`
      : `Thank you! Feedback for Level ${currentIdx + 1} has been received.`;
    
    setReportToast(msg);
    setIsReportModalOpen(false);
    setReportNote('');
    setTimeout(() => setReportToast(''), 4000);
  };

  const totalPlayerSteps = Math.ceil((activePuzzle.solution.length || 1) / 2);
  const currentPlayerStep = Math.min(Math.floor(moveStep / 2) + 1, totalPlayerSteps);

  const filteredPuzzles = KID_PUZZLES.filter(
    (p) => selectedDifficulty === 'All' || p.difficulty === selectedDifficulty
  );

  const selectPuzzleByIdx = (idx: number) => {
    if (userProfile.soundEnabled) playSound.buttonClick();
    setCurrentIdx(idx);
    const puzzle = KID_PUZZLES[idx];
    setGame(new Chess(puzzle.fen));
    setMoveStep(0);
    setIsOpponentMoving(false);
    setSolved(false);
    setShowHint(false);
    setErrorMsg('');
    setIsLevelModalOpen(false);
  };

  const handleMove = (from: Square, to: Square, promotion?: string) => {
    if (solved || isOpponentMoving) return;

    try {
      const move = game.move({ from, to, promotion: promotion || 'q' });
      if (!move) return;

      const expectedSan = activePuzzle.solution[moveStep];
      
      const cleanPlayedSan = move.san.replace(/[\+#?!]/g, '');
      const cleanExpectedSan = expectedSan ? expectedSan.replace(/[\+#?!]/g, '') : '';

      const isCorrect = 
        cleanPlayedSan === cleanExpectedSan || 
        move.san === expectedSan || 
        (activePuzzle.solution.length === 0 && game.isCheckmate());

      if (isCorrect) {
        setErrorMsg('');
        const nextStep = moveStep + 1;

        if (nextStep >= activePuzzle.solution.length || game.isCheckmate()) {
          setGame(new Chess(game.fen()));
          setSolved(true);
          if (userProfile.soundEnabled) playSound.duoSuccess();
          confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
          onSolvePuzzle(activePuzzle.starsReward);
        } else {
          const newGame = new Chess(game.fen());
          setGame(newGame);
          if (userProfile.soundEnabled) playSound.move();

          const opponentMoveSan = activePuzzle.solution[nextStep];
          setIsOpponentMoving(true);

          setTimeout(() => {
            try {
              newGame.move(opponentMoveSan);
              setGame(new Chess(newGame.fen()));
              setMoveStep(nextStep + 1);
              if (userProfile.soundEnabled) {
                if (newGame.isCheck()) playSound.check();
                else playSound.move();
              }
            } catch (err) {
              console.error('Error applying opponent puzzle move:', err);
            } finally {
              setIsOpponentMoving(false);
            }
          }, 450);
        }
      } else {
        game.undo();
        setGame(new Chess(game.fen()));
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
    setMoveStep(0);
    setIsOpponentMoving(false);
    setSolved(false);
    setShowHint(false);
    setErrorMsg('');
  };

  const handleNext = () => {
    const nextIdx = (currentIdx + 1) % KID_PUZZLES.length;
    selectPuzzleByIdx(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIdx - 1 + KID_PUZZLES.length) % KID_PUZZLES.length;
    selectPuzzleByIdx(prevIdx);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-white p-2 sm:p-4 animate-fade-in">
      {/* Header & Level Bar */}
      <div className="bg-slate-900/90 border border-purple-500/30 p-5 rounded-3xl text-center space-y-3 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={handlePrev}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1 border border-slate-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'vi' ? 'Trước' : 'Prev'}</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 font-extrabold text-xs border border-purple-500/30">
            <PuzzleIcon className="w-4 h-4 text-purple-400" />
            <span>Level {currentIdx + 1} / {KID_PUZZLES.length}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (userProfile.soundEnabled) playSound.buttonClick();
                setIsLevelModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-extrabold flex items-center gap-1.5 border border-purple-500/40 transition"
            >
              <Grid className="w-3.5 h-3.5 text-purple-400" />
              <span>{lang === 'vi' ? 'Chọn Level (105)' : 'Select Level (105)'}</span>
            </button>

            <button
              onClick={handleNext}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1 border border-slate-700 transition"
            >
              <span>{lang === 'vi' ? 'Sau' : 'Next'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-purple-300 via-pink-300 to-amber-300 bg-clip-text text-transparent">
            {activePuzzle.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-medium mt-1">
            {activePuzzle.description}
          </p>
        </div>

        {/* Difficulty Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          {(['All', 'Easy', 'Medium', 'Tricky', 'Expert'] as FilterDifficulty[]).map((diff) => (
            <button
              key={diff}
              onClick={() => {
                if (userProfile.soundEnabled) playSound.buttonClick();
                setSelectedDifficulty(diff);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                selectedDifficulty === diff
                  ? 'bg-purple-500 text-white border-purple-400 shadow-md shadow-purple-500/20'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700/60 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {diff === 'All'
                ? lang === 'vi'
                  ? 'Tất cả (105)'
                  : 'All (105)'
                : diff === 'Easy'
                ? '🟢 Easy (1-30)'
                : diff === 'Medium'
                ? '🟡 Medium (31-65)'
                : diff === 'Tricky'
                ? '🟠 Tricky (66-85)'
                : '🔴 Expert (86-105)'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Chess Board */}
        <div className="md:col-span-7">
          <ChessBoard
            game={game}
            theme={theme}
            pieceStyle={userProfile.pieceStyle}
            onMove={handleMove}
            disabled={solved || isOpponentMoving}
          />
        </div>

        {/* Side Panel Controls & Rewards */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 text-xs font-black border border-purple-500/30">
                🎯 {lang === 'vi' ? `Nước ${currentPlayerStep} / ${totalPlayerSteps}` : `Step ${currentPlayerStep} of ${totalPlayerSteps}`}
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/30">
                {activePuzzle.difficulty} • +{activePuzzle.starsReward} ⭐
              </span>
            </div>

            {/* Opponent Thinking Badge */}
            {isOpponentMoving && (
              <div className="bg-purple-500/10 border border-purple-500/30 p-2.5 rounded-2xl text-xs text-purple-300 text-center font-bold animate-pulse">
                {lang === 'vi' ? '⚡ Đối thủ đang phản công...' : '⚡ Opponent responding...'}
              </div>
            )}

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

            {/* Report Toast Banner */}
            {reportToast && (
              <div className="bg-emerald-500/20 border border-emerald-500/40 p-3 rounded-2xl text-xs text-emerald-300 text-center font-bold animate-fade-in">
                {reportToast}
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

              <button
                onClick={() => {
                  if (userProfile.soundEnabled) playSound.buttonClick();
                  setIsReportModalOpen(true);
                }}
                className="w-full py-2 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold transition flex items-center justify-center gap-2 mt-1"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>{lang === 'vi' ? 'Báo lỗi Puzzle này' : 'Report Puzzle Error'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Level Selector Modal */}
      {isLevelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-slate-900 border border-purple-500/30 rounded-3xl p-6 max-w-2xl w-full max-h-[85vh] flex flex-col space-y-4 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <PuzzleIcon className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-black bg-gradient-to-r from-purple-300 to-amber-300 bg-clip-text text-transparent">
                  {lang === 'vi' ? 'Thư Viện 105 Puzzles Cờ Vua' : '105 Chess Puzzles Gallery'}
                </h3>
              </div>
              <button
                onClick={() => setIsLevelModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Difficulty Filter in Modal */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 py-1 border-b border-slate-800/80">
              {(['All', 'Easy', 'Medium', 'Tricky', 'Expert'] as FilterDifficulty[]).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                    selectedDifficulty === diff
                      ? 'bg-purple-500 text-white border-purple-400'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700/60 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            {/* Grid of Levels */}
            <div className="overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 p-1">
              {filteredPuzzles.map((p) => {
                const globalIdx = KID_PUZZLES.findIndex((item) => item.id === p.id);
                const isCurrent = globalIdx === currentIdx;

                let difficultyBadgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
                if (p.difficulty === 'Medium') difficultyBadgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
                if (p.difficulty === 'Tricky') difficultyBadgeColor = 'bg-orange-500/20 text-orange-300 border-orange-500/30';
                if (p.difficulty === 'Expert') difficultyBadgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/30';

                return (
                  <button
                    key={p.id}
                    onClick={() => selectPuzzleByIdx(globalIdx)}
                    className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between space-y-2 ${
                      isCurrent
                        ? 'bg-purple-600/30 border-purple-400 ring-2 ring-purple-400/50'
                        : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/70 hover:border-purple-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-200">
                        Lvl {globalIdx + 1}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-lg border ${difficultyBadgeColor}`}>
                        {p.difficulty}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-slate-300 line-clamp-1">
                      {p.title.replace(/^Level \d+:\s*/, '')}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold pt-1 border-t border-slate-700/40">
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        +{p.starsReward}
                      </span>
                      <span className="text-slate-400">
                        {p.solution.length > 0 ? `${Math.ceil(p.solution.length / 2)} moves` : '1 move'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {/* Report Error Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-slate-900 border border-rose-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <h3 className="text-base font-black text-rose-300">
                  {lang === 'vi' ? `Báo lỗi Level ${currentIdx + 1}` : `Report Error - Level ${currentIdx + 1}`}
                </h3>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-300 mb-2">
                  {lang === 'vi' ? 'Loại sự cố:' : 'Issue Type:'}
                </label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 font-semibold focus:outline-none focus:border-rose-400"
                >
                  <option value="wrong_position">{lang === 'vi' ? 'Thế cờ bị lỗi / Trùng quân' : 'Board position error / Duplicate piece'}</option>
                  <option value="wrong_solution">{lang === 'vi' ? 'Lời giải chưa chính xác' : 'Incorrect solution'}</option>
                  <option value="confusing_hint">{lang === 'vi' ? 'Gợi ý không rõ ràng' : 'Confusing or wrong hint'}</option>
                  <option value="other">{lang === 'vi' ? 'Lỗi khác' : 'Other issue'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-300 mb-2">
                  {lang === 'vi' ? 'Mô tả chi tiết (không bắt buộc):' : 'Additional Details (optional):'}
                </label>
                <textarea
                  value={reportNote}
                  onChange={(e) => setReportNote(e.target.value)}
                  placeholder={lang === 'vi' ? 'Nhập chi tiết ví dụ: Mã đã đứng trên f7 rồi...' : 'Describe what went wrong...'}
                  rows={3}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-rose-400 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
                >
                  {lang === 'vi' ? 'Hủy' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-extrabold text-xs shadow-lg shadow-rose-500/20 hover:scale-102 transition flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{lang === 'vi' ? 'Gửi Báo Lỗi' : 'Send Report'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

