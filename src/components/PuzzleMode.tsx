import React, { useState, useEffect } from 'react';
import { Chess, Square } from 'chess.js';
import { BoardTheme, Puzzle, UserProfile } from '../types/chess';
import { KID_PUZZLES } from '../utils/puzzles';
import { fetchLichessFeaturedPuzzles, fetchLichessDailyPuzzle } from '../utils/lichessApi';
import { validatePuzzle } from '../utils/puzzleValidator';
import { translatePuzzleToVietnamese } from '../utils/translator';
import { ChessBoard } from './ChessBoard';
import { PuzzleInspectorModal } from './PuzzleInspectorModal';
import { playSound } from '../utils/sound';
import { getTranslation } from '../utils/i18n';
import confetti from 'canvas-confetti';
import {
  Puzzle as PuzzleIcon,
  Sparkles,
  CheckCircle,
  HelpCircle,
  RefreshCw,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Grid,
  X,
  Star,
  AlertTriangle,
  Send,
  ShieldCheck,
  Globe,
  ExternalLink,
  Zap,
  Flame,
  Award,
} from 'lucide-react';

interface PuzzleModeProps {
  theme: BoardTheme;
  userProfile: UserProfile;
  onSolvePuzzle: (rewardStars: number) => void;
}

type FilterDifficulty = 'All' | 'Easy' | 'Medium' | 'Hard';
type PuzzleSource = 'curated' | 'daily';

export const PuzzleMode: React.FC<PuzzleModeProps> = ({ theme, userProfile, onSolvePuzzle }) => {
  const [activeSource, setActiveSource] = useState<PuzzleSource>('curated');
  const [activeLibrary, setActiveLibrary] = useState<Puzzle[]>(KID_PUZZLES);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState<FilterDifficulty>('All');
  
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('wrong_position');
  const [reportNote, setReportNote] = useState('');
  const [reportToast, setReportToast] = useState('');

  const [isFetchingLichess, setIsFetchingLichess] = useState(false);
  const [lichessError, setLichessError] = useState('');

  const activePuzzle = activeLibrary[currentIdx] || KID_PUZZLES[0];

  const [game, setGame] = useState(() => new Chess(activePuzzle.fen));
  const [moveStep, setMoveStep] = useState(0);
  const [isOpponentMoving, setIsOpponentMoving] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const lang = userProfile.language || 'vi';

  const loadLichessPuzzles = () => {
    setIsFetchingLichess(true);
    setLichessError('');
    fetchLichessFeaturedPuzzles()
      .then((puzzles) => {
        if (puzzles && puzzles.length > 0) {
          setActiveLibrary(puzzles);
          setCurrentIdx(0);
          setGame(new Chess(puzzles[0].fen));
          setMoveStep(0);
          setSolved(false);
          setShowHint(false);
          setErrorMsg('');
        } else {
          setLichessError(
            lang === 'vi'
              ? 'Không thể tải Lichess Puzzles. Đã chuyển về thư viện chuẩn.'
              : 'Failed to fetch Lichess Puzzles.'
          );
          setActiveSource('curated');
          setActiveLibrary(KID_PUZZLES);
        }
      })
      .catch(() => {
        setLichessError('Failed to fetch Lichess Puzzles.');
        setActiveSource('curated');
        setActiveLibrary(KID_PUZZLES);
      })
      .finally(() => setIsFetchingLichess(false));
  };

  // Load Lichess Puzzles gallery when user selects 'daily' / Lichess mode
  useEffect(() => {
    if (activeSource === 'daily') {
      loadLichessPuzzles();
    } else if (activeSource === 'curated') {
      setActiveLibrary(KID_PUZZLES);
      setCurrentIdx(0);
      const puzzle = KID_PUZZLES[0];
      setGame(new Chess(puzzle.fen));
      setMoveStep(0);
      setSolved(false);
      setShowHint(false);
      setErrorMsg('');
    }
  }, [activeSource, lang]);

  // Auto translate active puzzle via free translation API if Vietnamese text is missing
  useEffect(() => {
    if (lang === 'vi' && activePuzzle && (!activePuzzle.descriptionVi || !activePuzzle.hintVi)) {
      let isMounted = true;
      translatePuzzleToVietnamese(activePuzzle).then((translated) => {
        if (!isMounted) return;
        setActiveLibrary((prev) =>
          prev.map((p) => (p.id === translated.id ? translated : p))
        );
      });
      return () => {
        isMounted = false;
      };
    }
  }, [activePuzzle?.id, lang]);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userProfile.soundEnabled) playSound.buttonClick();

    try {
      const reports = JSON.parse(localStorage.getItem('reported_puzzles') || '[]');
      reports.push({
        level: currentIdx + 1,
        puzzleId: activePuzzle.id,
        reason: reportReason,
        note: reportNote,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('reported_puzzles', JSON.stringify(reports));
    } catch {
      // Ignore storage errors in Safari Private mode
    }

    const msg =
      lang === 'vi'
        ? `Cảm ơn bạn! Báo lỗi cho Level ${currentIdx + 1} đã được ghi nhận.`
        : `Thank you! Feedback for Level ${currentIdx + 1} has been received.`;

    setReportToast(msg);
    setIsReportModalOpen(false);
    setReportNote('');
    setTimeout(() => setReportToast(''), 4000);
  };

  // Move counts calculation
  const totalSolutionLength = activePuzzle.solution?.length || 1;
  const totalPlayerSteps = Math.ceil(totalSolutionLength / 2);
  const currentPlayerStep = Math.min(Math.floor(moveStep / 2) + 1, totalPlayerSteps);

  // Helper function to check player move count for filtering
  const getMoveCount = (p: Puzzle) => Math.ceil((p.solution?.length || 1) / 2);

  const filteredPuzzles = activeLibrary.filter((p) => {
    const moves = getMoveCount(p);
    if (selectedDifficulty === 'Easy') return moves <= 1;
    if (selectedDifficulty === 'Medium') return moves === 2;
    if (selectedDifficulty === 'Hard') return moves >= 3;
    return true;
  });

  const selectPuzzleByIdx = (idx: number) => {
    if (userProfile.soundEnabled) playSound.buttonClick();
    setCurrentIdx(idx);
    const puzzle = activeLibrary[idx] || KID_PUZZLES[0];
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

      // Match SAN or SAN without special chars or UCI move notation
      const cleanPlayedSan = move.san.replace(/[\+#?!]/g, '');
      const cleanExpectedSan = expectedSan ? expectedSan.replace(/[\+#?!]/g, '') : '';
      const playedUci = `${from}${to}${promotion || ''}`;
      const expectedUci = expectedSan ? expectedSan.replace(/[\+#?!]/g, '') : '';

      const isCorrect =
        cleanPlayedSan === cleanExpectedSan ||
        move.san === expectedSan ||
        playedUci === expectedUci ||
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
    const nextIdx = (currentIdx + 1) % activeLibrary.length;
    selectPuzzleByIdx(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIdx - 1 + activeLibrary.length) % activeLibrary.length;
    selectPuzzleByIdx(prevIdx);
  };

  const activeValidation = validatePuzzle(activePuzzle);

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-white p-2 sm:p-4 animate-fade-in">
      
      {/* Top Source Switcher & Inspector Button */}
      <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-3xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveSource('curated')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-black transition flex items-center gap-1.5 border ${
              activeSource === 'curated'
                ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-500/20'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'vi' ? 'Thư Viện Chuẩn Quốc Tế' : 'Qualified Library'} ({KID_PUZZLES.length})</span>
          </button>

          <button
            onClick={() => setActiveSource('daily')}
            disabled={isFetchingLichess}
            className={`px-3.5 py-2 rounded-2xl text-xs font-black transition flex items-center gap-1.5 border ${
              activeSource === 'daily'
                ? 'bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-500/20'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>
              {lang === 'vi' ? 'Bộ Puzzles Lichess ⚡' : 'Lichess Puzzles ⚡'}{' '}
              {activeSource === 'daily' ? `(${activeLibrary.length})` : ''}
            </span>
          </button>

          {activeSource === 'daily' && (
            <button
              onClick={loadLichessPuzzles}
              disabled={isFetchingLichess}
              className="px-3 py-2 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-black transition flex items-center gap-1.5"
              title={lang === 'vi' ? 'Tải lại / Lấy thêm Puzzles từ Lichess' : 'Refresh / Fetch more Lichess Puzzles'}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isFetchingLichess ? 'animate-spin' : ''}`} />
              <span>{isFetchingLichess ? (lang === 'vi' ? 'Đang tải...' : 'Loading...') : (lang === 'vi' ? 'Làm Mới' : 'Refresh')}</span>
            </button>
          )}
        </div>

        <button
          onClick={() => setIsInspectorOpen(true)}
          className="px-3.5 py-2 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-black text-xs transition flex items-center gap-1.5"
        >
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>{lang === 'vi' ? 'Trình Kiểm Định & Review' : 'Review & Inspector'}</span>
        </button>
      </div>

      {lichessError && (
        <div className="bg-rose-500/20 border border-rose-500/40 p-3 rounded-2xl text-xs text-rose-300 font-bold text-center">
          {lichessError}
        </div>
      )}

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
            <span>Level {currentIdx + 1} / {activeLibrary.length}</span>
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
              <span>{lang === 'vi' ? `Chọn Level (${activeLibrary.length})` : `Select Level (${activeLibrary.length})`}</span>
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
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-black text-amber-300">
              {lang === 'vi' ? (activePuzzle.titleVi || activePuzzle.title) : activePuzzle.title}
            </h2>
            {activePuzzle.lichessUrl && (
              <a
                href={activePuzzle.lichessUrl}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition"
                title="View on Lichess.org"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-medium mt-1">
            {lang === 'vi' ? (activePuzzle.descriptionVi || activePuzzle.description) : activePuzzle.description}
          </p>
        </div>

        {/* Move Category Badge & Verification Status */}
        <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
          <span className={`px-3 py-1 rounded-full text-xs font-extrabold border flex items-center gap-1.5 ${
            totalPlayerSteps === 1
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : totalPlayerSteps === 2
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
          }`}>
            {totalPlayerSteps === 1 && <Zap className="w-3.5 h-3.5 text-emerald-400" />}
            {totalPlayerSteps === 2 && <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />}
            {totalPlayerSteps >= 3 && <Flame className="w-3.5 h-3.5 text-rose-400" />}
            <span>{totalPlayerSteps} {totalPlayerSteps === 1 ? (lang === 'vi' ? 'Nước để Thắng (Dễ)' : 'Move to Win (Easy)') : totalPlayerSteps === 2 ? (lang === 'vi' ? 'Nước để Thắng (Trung Bình)' : 'Moves to Win (Medium)') : (lang === 'vi' ? 'Nước để Thắng (Khó)' : 'Moves to Win (Hard)')}</span>
          </span>

          {activeValidation.isValid ? (
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {lang === 'vi' ? '100% Đã Kiểm Định' : '100% Qualified'}
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/40 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              {activeValidation.error}
            </span>
          )}

          {activePuzzle.lichessRating && (
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/40">
              Lichess Rating: {activePuzzle.lichessRating}
            </span>
          )}
        </div>

        {/* Move Count Difficulty Filters */}
        {activeSource === 'curated' && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
            {[
              { id: 'All', label: lang === 'vi' ? 'Tất cả' : 'All', icon: Award },
              { id: 'Easy', label: lang === 'vi' ? 'Dễ (1 Nước)' : 'Easy (1 Move)', icon: Zap },
              { id: 'Medium', label: lang === 'vi' ? 'Trung Bình (2 Nước)' : 'Medium (2 Moves)', icon: ShieldCheck },
              { id: 'Hard', label: lang === 'vi' ? 'Khó (3 Nước)' : 'Hard (3 Moves)', icon: Flame },
            ].map((diff) => {
              const IconComp = diff.icon;
              const isActive = selectedDifficulty === diff.id;
              return (
                <button
                  key={diff.id}
                  onClick={() => {
                    if (userProfile.soundEnabled) playSound.buttonClick();
                    setSelectedDifficulty(diff.id as FilterDifficulty);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-extrabold transition border flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-500/20'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700/60 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{diff.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Chess Board */}
        <div className="md:col-span-7 space-y-3">
          {/* Victory Controls Banner directly above the Chessboard */}
          {solved && (
            <div className="bg-emerald-950/95 border-2 border-emerald-400 p-4 rounded-2xl text-center space-y-3 shadow-2xl shadow-emerald-950/80 animate-fade-in">
              <div className="flex items-center justify-between flex-wrap gap-2 px-1">
                <div className="flex items-center gap-2 text-emerald-300 font-black text-base sm:text-lg">
                  <CheckCircle className="w-6 h-6 text-emerald-400 animate-bounce" />
                  <span>{getTranslation(lang, 'puzzleSolvedTitle')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-slate-900/80 py-1 px-3 rounded-full border border-amber-400/30">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>+{activePuzzle.starsReward} {lang === 'vi' ? 'Ngôi sao' : 'Stars'}</span>
                </div>
              </div>

              {/* Navigation buttons: Previous, Replay, Next */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  onClick={handlePrev}
                  className="py-2.5 px-2 sm:px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                  title={lang === 'vi' ? 'Bài trước' : 'Previous puzzle'}
                >
                  <ArrowLeft className="w-4 h-4 text-amber-400" />
                  <span className="truncate">{lang === 'vi' ? 'Bài Trước' : 'Previous'}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="py-2.5 px-2 sm:px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                  title={lang === 'vi' ? 'Chơi lại bài này' : 'Replay puzzle'}
                >
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                  <span className="truncate">{lang === 'vi' ? 'Chơi Lại' : 'Replay'}</span>
                </button>

                <button
                  onClick={handleNext}
                  className="py-2.5 px-2 sm:px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/30 transition flex items-center justify-center gap-1.5 active:scale-95"
                  title={lang === 'vi' ? 'Bài tiếp theo' : 'Next puzzle'}
                >
                  <span className="truncate">{lang === 'vi' ? 'Bài Tiếp' : 'Next'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

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
                +{activePuzzle.starsReward} ⭐
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
              <div className="bg-emerald-950/90 border-2 border-emerald-400 p-4 rounded-2xl text-center space-y-3 shadow-xl shadow-emerald-950/50 animate-fade-in">
                <div className="flex items-center justify-center gap-2 text-emerald-300 font-extrabold text-lg">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                  <span>{getTranslation(lang, 'puzzleSolvedTitle')}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-300 bg-slate-900/60 py-1 px-3 rounded-full w-fit mx-auto border border-amber-400/30">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>+{activePuzzle.starsReward} {lang === 'vi' ? 'Ngôi sao' : 'Stars'}</span>
                </div>

                {/* Victory Controls: Next, Previous, Replay */}
                <div className="pt-2 grid grid-cols-3 gap-2">
                  <button
                    onClick={handlePrev}
                    className="py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                  >
                    <ArrowLeft className="w-4 h-4 text-amber-400" />
                    <span className="truncate">{lang === 'vi' ? 'Bài Trước' : 'Previous'}</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="py-2.5 px-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4 text-amber-400" />
                    <span className="truncate">{lang === 'vi' ? 'Chơi Lại' : 'Replay'}</span>
                  </button>

                  <button
                    onClick={handleNext}
                    className="py-2.5 px-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/30 transition flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <span className="truncate">{lang === 'vi' ? 'Bài Tiếp' : 'Next'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
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
                <p className="font-semibold">
                  {lang === 'vi' ? (activePuzzle.hintVi || activePuzzle.hint) : activePuzzle.hint}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2 pt-2">
              {!solved && (
                <>
                  {!showHint && (
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

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handlePrev}
                      className="py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4 text-amber-400" />
                      <span>{lang === 'vi' ? 'Bài Trước' : 'Previous'}</span>
                    </button>

                    <button
                      onClick={handleReset}
                      className="py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-4 h-4 text-amber-400" />
                      <span>{getTranslation(lang, 'resetPuzzle')}</span>
                    </button>
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full py-3 rounded-2xl bg-purple-600 text-white font-extrabold text-xs shadow-lg shadow-purple-500/20 hover:scale-102 transition flex items-center justify-center gap-2"
                  >
                    <span>{getTranslation(lang, 'nextPuzzle')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

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
                <h3 className="text-lg font-black text-purple-300">
                  {lang === 'vi' ? `Thư Viện ${activeLibrary.length} Puzzles Cờ Vua` : `${activeLibrary.length} Chess Puzzles Gallery`}
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
              {[
                { id: 'All', label: lang === 'vi' ? 'Tất cả' : 'All' },
                { id: 'Easy', label: lang === 'vi' ? 'Dễ (1 Nước)' : 'Easy (1 Move)' },
                { id: 'Medium', label: lang === 'vi' ? 'Trung Bình (2 Nước)' : 'Medium (2 Moves)' },
                { id: 'Hard', label: lang === 'vi' ? 'Khó (3 Nước)' : 'Hard (3 Moves)' },
              ].map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id as FilterDifficulty)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                    selectedDifficulty === diff.id
                      ? 'bg-purple-500 text-white border-purple-400'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700/60 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {diff.label}
                </button>
              ))}
            </div>

            {/* Grid of Levels */}
            <div className="overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 p-1">
              {filteredPuzzles.map((p) => {
                const globalIdx = activeLibrary.findIndex((item) => item.id === p.id);
                const isCurrent = globalIdx === currentIdx;
                const movesCount = getMoveCount(p);

                let difficultyBadgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
                if (movesCount === 2) difficultyBadgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
                if (movesCount >= 3) difficultyBadgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/30';

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
                        {movesCount} {movesCount === 1 ? 'Move' : 'Moves'}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-slate-300 line-clamp-1">
                      {lang === 'vi' 
                        ? (p.titleVi || p.title).replace(/^(Level|Cấp)\s*\d+:\s*/, '') 
                        : p.title.replace(/^Level \d+:\s*/, '')}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold pt-1 border-t border-slate-700/40">
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        +{p.starsReward}
                      </span>
                      <span className="text-slate-400">
                        {movesCount} {movesCount === 1 ? 'move to win' : 'moves to win'}
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
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white font-extrabold text-xs shadow-lg shadow-rose-500/20 hover:scale-102 transition flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{lang === 'vi' ? 'Gửi Báo Lỗi' : 'Send Report'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Puzzle Inspector Modal */}
      <PuzzleInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        puzzles={activeLibrary}
        onSelectPuzzle={(p) => {
          setIsInspectorOpen(false);
          const foundIdx = activeLibrary.findIndex((item) => item.id === p.id);
          if (foundIdx !== -1) {
            selectPuzzleByIdx(foundIdx);
          } else {
            setActiveLibrary([p, ...activeLibrary]);
            setCurrentIdx(0);
            setGame(new Chess(p.fen));
            setMoveStep(0);
            setSolved(false);
            setShowHint(false);
            setErrorMsg('');
          }
        }}
        lang={lang}
      />
    </div>
  );
};
