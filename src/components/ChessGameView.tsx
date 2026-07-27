import React, { useState, useEffect } from 'react';
import { Chess, Square, Move } from 'chess.js';
import { GameMode, BoardTheme, UserProfile, AiLevel } from '../types/chess';
import { AI_PERSONALITIES, getAiMove, getBestMoveHint, getCoachTip } from '../utils/chessAi';
import { ChessBoard } from './ChessBoard';
import { CapturedPieces } from './CapturedPieces';
import { CoachBubble } from './CoachBubble';
import { MoveLog } from './MoveLog';
import { EvaluationBar } from './EvaluationBar';
import { playSound } from '../utils/sound';
import { getTranslation } from '../utils/i18n';
import confetti from 'canvas-confetti';
import { RefreshCw } from 'lucide-react';

interface ChessGameViewProps {
  mode: 'training' | 'dual';
  theme: BoardTheme;
  userProfile: UserProfile;
  onUpdateStats: (winner: 'user' | 'ai' | 'player2' | 'draw', mode: 'training' | 'dual', starsEarned: number) => void;
}

export const ChessGameView: React.FC<ChessGameViewProps> = ({
  mode,
  theme,
  userProfile,
  onUpdateStats,
}) => {
  const [game, setGame] = useState(() => new Chess());
  const [playerSide, setPlayerSide] = useState<'w' | 'b'>('w');
  const [aiLevel, setAiLevel] = useState<AiLevel>('fox');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [lastMove, setLastMove] = useState<Move | null>(null);
  const [hintMove, setHintMove] = useState<Move | null>(null);
  const [boardOrientation, setBoardOrientation] = useState<'w' | 'b'>('w');
  const [gameOverHandled, setGameOverHandled] = useState(false);

  const lang = userProfile.language || 'vi';
  const activeAi = AI_PERSONALITIES[aiLevel];

  // Auto flip orientation in 2-Player mode if option enabled
  useEffect(() => {
    if (mode === 'dual' && userProfile.flipBoardInDualMode) {
      setBoardOrientation(game.turn());
    } else if (mode === 'training') {
      setBoardOrientation(playerSide);
    }
  }, [game, mode, playerSide, userProfile.flipBoardInDualMode]);

  // Handle Game Over
  useEffect(() => {
    if (game.isGameOver() && !gameOverHandled) {
      setGameOverHandled(true);

      if (game.isCheckmate()) {
        const winnerColor = game.turn() === 'w' ? 'b' : 'w';
        if (userProfile.soundEnabled) playSound.duoSuccess();
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });

        if (mode === 'training') {
          if (winnerColor === playerSide) {
            onUpdateStats('user', 'training', activeAi.stars);
          } else {
            onUpdateStats('ai', 'training', 0);
          }
        } else {
          onUpdateStats(winnerColor === 'w' ? 'user' : 'player2', 'dual', 3);
        }
      } else if (game.isDraw() || game.isStalemate()) {
        if (userProfile.soundEnabled) playSound.duoError();
        onUpdateStats('draw', mode, 1);
      }
    }
  }, [game, gameOverHandled, mode, playerSide, activeAi.stars, onUpdateStats, userProfile.soundEnabled]);

  // Helper to clone Chess instance while preserving move history
  const cloneChessGame = (srcGame: Chess): Chess => {
    const newGame = new Chess();
    const pgn = srcGame.pgn();
    if (pgn) {
      try {
        newGame.loadPgn(pgn);
        return newGame;
      } catch {
        // Fallback if PGN parsing fails
      }
    }
    newGame.load(srcGame.fen());
    return newGame;
  };

  // AI Turn Trigger
  useEffect(() => {
    let active = true;

    if (
      mode === 'training' &&
      game.turn() !== playerSide &&
      !game.isGameOver()
    ) {
      setIsAiThinking(true);
      const timer = setTimeout(() => {
        if (!active) return;
        try {
          const aiMove = getAiMove(game, aiLevel);
          if (aiMove) {
            const moveResult = game.move({
              from: aiMove.from,
              to: aiMove.to,
              promotion: aiMove.promotion || 'q',
            });
            const newGame = cloneChessGame(game);
            setGame(newGame);
            setLastMove(moveResult);
            setHintMove(null);

            if (userProfile.soundEnabled) {
              if (moveResult?.captured) playSound.capture();
              else if (newGame.isCheck()) playSound.check();
              else playSound.move();
            }
          }
        } catch (err) {
          console.error('Error making AI move:', err);
        } finally {
          if (active) {
            setIsAiThinking(false);
          }
        }
      }, 350 + Math.random() * 250);

      return () => {
        active = false;
        clearTimeout(timer);
      };
    }
  }, [game, mode, playerSide, aiLevel, userProfile.soundEnabled]);

  // Player Move Handler
  const handlePlayerMove = (from: Square, to: Square, promotion?: string) => {
    if (game.isGameOver() || isAiThinking) return;

    try {
      const move = game.move({ from, to, promotion: promotion || 'q' });
      if (!move) return;

      const newGame = cloneChessGame(game);
      setGame(newGame);
      setLastMove(move);
      setHintMove(null);

      if (userProfile.soundEnabled) {
        if (move.captured) playSound.capture();
        else if (newGame.isCheck()) playSound.check();
        else playSound.move();
      }
    } catch {
      if (userProfile.soundEnabled) playSound.duoError();
    }
  };

  const handleNewGame = () => {
    if (userProfile.soundEnabled) playSound.buttonClick();
    const newGame = new Chess();
    setGame(newGame);
    setLastMove(null);
    setHintMove(null);
    setGameOverHandled(false);
    setIsAiThinking(false);
  };

  const handleUndo = () => {
    if (isAiThinking) return;
    if (userProfile.soundEnabled) playSound.buttonClick();
    if (mode === 'training') {
      game.undo();
      game.undo();
    } else {
      game.undo();
    }
    setGame(cloneChessGame(game));
    setLastMove(null);
    setHintMove(null);
    setGameOverHandled(false);
  };

  const handleRequestHint = () => {
    const hint = getBestMoveHint(game);
    setHintMove(hint);
    if (hint && userProfile.soundEnabled) playSound.hint();
  };

  const rawCoachTip = getCoachTip(game, lastMove || undefined, lang);
  let coachMessage = rawCoachTip;
  if (game.isCheck()) {
    coachMessage = getTranslation(lang, 'coachCheck');
  } else if (lastMove?.captured) {
    coachMessage = getTranslation(lang, 'coachCapture');
  }

  // Get AI translated name & description
  const aiTranslatedName =
    aiLevel === 'bunny'
      ? getTranslation(lang, 'bunnyName')
      : aiLevel === 'fox'
      ? getTranslation(lang, 'foxName')
      : aiLevel === 'owl'
      ? getTranslation(lang, 'owlName')
      : getTranslation(lang, 'dragonName');

  const aiTranslatedDesc =
    aiLevel === 'bunny'
      ? getTranslation(lang, 'bunnyDesc')
      : aiLevel === 'fox'
      ? getTranslation(lang, 'foxDesc')
      : aiLevel === 'owl'
      ? getTranslation(lang, 'owlDesc')
      : getTranslation(lang, 'dragonDesc');

  return (
    <div className="max-w-6xl mx-auto p-2 sm:p-4 space-y-5 animate-fade-in text-white">
      {/* Top Mode Header / Controls Banner */}
      <div className="bg-slate-900/95 border border-emerald-500/30 p-4 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Mode & Opponent Badge */}
        <div className="flex items-center gap-3">
          {mode === 'training' ? (
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${activeAi.color} flex items-center justify-center text-slate-950 text-2xl font-black shadow-lg shrink-0 border border-white/20`}>
              {activeAi.avatar}
            </div>
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-slate-950 text-2xl font-black shadow-lg shrink-0 border border-white/20">
              👥
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-amber-300">
                {mode === 'training' ? `VS ${aiTranslatedName}` : getTranslation(lang, 'dualMode')}
              </h2>
              {mode === 'training' && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-black border border-emerald-500/30">
                  {aiLevel === 'bunny' ? getTranslation(lang, 'difficultyEasy') : aiLevel === 'fox' ? getTranslation(lang, 'difficultyMedium') : aiLevel === 'owl' ? getTranslation(lang, 'difficultyHard') : getTranslation(lang, 'difficultyExpert')}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 font-medium max-w-md">
              {mode === 'training' ? aiTranslatedDesc : getTranslation(lang, 'passAndPlayTip')}
            </p>
          </div>
        </div>

        {/* Training AI Selector / Player Side Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {mode === 'training' && (
            <>
              {/* AI Level Switcher */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800">
                {(Object.keys(AI_PERSONALITIES) as AiLevel[]).map((lvl) => {
                  const p = AI_PERSONALITIES[lvl];
                  const isSel = aiLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => {
                        if (userProfile.soundEnabled) playSound.buttonClick();
                        setAiLevel(lvl);
                        handleNewGame();
                      }}
                      className={`px-2.5 py-1 rounded-xl text-xs font-black transition flex items-center gap-1 ${
                        isSel
                          ? 'bg-emerald-500 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{p.avatar}</span>
                      <span className="hidden sm:inline">{p.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Side Selector */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800">
                <button
                  onClick={() => {
                    setPlayerSide('w');
                    handleNewGame();
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-black transition ${
                    playerSide === 'w' ? 'bg-slate-100 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {getTranslation(lang, 'white')}
                </button>
                <button
                  onClick={() => {
                    setPlayerSide('b');
                    handleNewGame();
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-black transition ${
                    playerSide === 'b' ? 'bg-slate-800 text-amber-300' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {getTranslation(lang, 'black')}
                </button>
              </div>
            </>
          )}

          <button
            onClick={handleNewGame}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-lime-500 to-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 transition flex items-center gap-1.5 border border-emerald-300/40"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{getTranslation(lang, 'newGame')}</span>
          </button>
        </div>
      </div>

      {/* Evaluation Bar */}
      <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl shadow-xl">
        <EvaluationBar game={game} language={lang} />
      </div>

      {/* Main Board & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Board & Captured Pieces */}
        <div className="lg:col-span-7 space-y-4">
          <CapturedPieces game={game} language={lang} />

          <ChessBoard
            game={game}
            theme={theme}
            pieceStyle={userProfile.pieceStyle}
            orientation={boardOrientation}
            onMove={handlePlayerMove}
            showLegalMoves={userProfile.showLegalMoves}
            lastMove={lastMove}
            hintMove={hintMove}
            disabled={isAiThinking || game.isGameOver()}
            onFlipBoard={() => {
              if (userProfile.soundEnabled) playSound.buttonClick();
              setBoardOrientation((prev) => (prev === 'w' ? 'b' : 'w'));
            }}
          />

          {/* AI Thinking Indicator */}
          {isAiThinking && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-2xl text-center text-xs font-extrabold text-emerald-300 flex items-center justify-center gap-2 animate-pulse shadow-md">
              <span>{activeAi.avatar}</span>
              <span>{aiTranslatedName} {getTranslation(lang, 'thinking')}</span>
            </div>
          )}
        </div>

        {/* Right Column: Coach Speech & Move History */}
        <div className="lg:col-span-5 space-y-4">
          {userProfile.coachTipsEnabled && (
            <CoachBubble
              message={coachMessage}
              onRequestHint={handleRequestHint}
              disabled={isAiThinking || game.isGameOver()}
              language={lang}
            />
          )}

          <div className="h-[380px]">
            <MoveLog
              game={game}
              onUndoMove={handleUndo}
              canUndo={game.history().length > 0 && !isAiThinking}
              language={lang}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
