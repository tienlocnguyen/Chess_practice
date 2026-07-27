import React, { useState, useEffect, useRef } from 'react';
import { Chess, Square, Move } from 'chess.js';
import { GameMode, BoardTheme, UserProfile, AiLevel } from '../types/chess';
import { AI_PERSONALITIES, getAiMove, getBestMoveHint, getCoachTip } from '../utils/chessAi';
import { ChessBoard } from './ChessBoard';
import { CapturedPieces } from './CapturedPieces';
import { CoachBubble } from './CoachBubble';
import { MoveLog } from './MoveLog';
import { playSound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { Bot, Users, RotateCcw, Sparkles, Trophy, Play, Shield, RefreshCw, Zap } from 'lucide-react';

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
        playSound.victory();
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });

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
        playSound.defeat();
        onUpdateStats('draw', mode, 1);
      }
    }
  }, [game, gameOverHandled, mode, playerSide, activeAi.stars, onUpdateStats]);

  // AI Turn Trigger
  useEffect(() => {
    if (
      mode === 'training' &&
      game.turn() !== playerSide &&
      !game.isGameOver() &&
      !isAiThinking
    ) {
      setIsAiThinking(true);
      const timer = setTimeout(() => {
        const aiMove = getAiMove(game, aiLevel);
        if (aiMove) {
          const moveResult = game.move(aiMove);
          setGame(new Chess(game.fen()));
          setLastMove(moveResult);
          setHintMove(null);

          if (moveResult?.captured) playSound.capture();
          else if (game.isCheck()) playSound.check();
          else playSound.move();
        }
        setIsAiThinking(false);
      }, 400 + Math.random() * 400);

      return () => clearTimeout(timer);
    }
  }, [game, mode, playerSide, aiLevel, isAiThinking]);

  // Player Move Handler
  const handlePlayerMove = (from: Square, to: Square, promotion?: string) => {
    if (game.isGameOver() || isAiThinking) return;

    try {
      const move = game.move({ from, to, promotion: promotion || 'q' });
      if (!move) return;

      const newGame = new Chess(game.fen());
      setGame(newGame);
      setLastMove(move);
      setHintMove(null);

      if (move.captured) playSound.capture();
      else if (newGame.isCheck()) playSound.check();
      else playSound.move();
    } catch {
      // Invalid move
    }
  };

  const handleNewGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setLastMove(null);
    setHintMove(null);
    setGameOverHandled(false);
    setIsAiThinking(false);
  };

  const handleUndo = () => {
    if (isAiThinking) return;
    if (mode === 'training') {
      // Undo both player move & AI move
      game.undo();
      game.undo();
    } else {
      game.undo();
    }
    setGame(new Chess(game.fen()));
    setLastMove(null);
    setHintMove(null);
    setGameOverHandled(false);
  };

  const handleRequestHint = () => {
    const hint = getBestMoveHint(game);
    setHintMove(hint);
    if (hint) playSound.hint();
  };

  const coachMessage = getCoachTip(game, lastMove || undefined);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 animate-fade-in text-white">
      {/* Top Mode Header / Controls Banner */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Mode & Opponent Badge */}
        <div className="flex items-center gap-3">
          {mode === 'training' ? (
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${activeAi.color} flex items-center justify-center text-slate-950 text-2xl font-black shadow-lg shrink-0`}>
              {activeAi.avatar}
            </div>
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-slate-950 text-2xl font-black shadow-lg shrink-0">
              👥
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-amber-300">
                {mode === 'training' ? `VS ${activeAi.name}` : '2-Player Pass & Play'}
              </h2>
              {mode === 'training' && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-black border border-amber-500/30">
                  {activeAi.difficultyText}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {mode === 'training' ? activeAi.description : 'Play locally on the same screen with automatic board turn rotation!'}
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
                  return (
                    <button
                      key={lvl}
                      onClick={() => {
                        setAiLevel(lvl);
                        handleNewGame();
                      }}
                      className={`px-2.5 py-1 rounded-xl text-xs font-black transition flex items-center gap-1 ${
                        aiLevel === lvl
                          ? 'bg-amber-500 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title={p.title}
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
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                    playerSide === 'w' ? 'bg-slate-200 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  White ⚪
                </button>
                <button
                  onClick={() => {
                    setPlayerSide('b');
                    handleNewGame();
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                    playerSide === 'b' ? 'bg-slate-800 text-amber-300' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Black 🔴
                </button>
              </div>
            </>
          )}

          <button
            onClick={handleNewGame}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 hover:scale-105 transition flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>New Game</span>
          </button>
        </div>
      </div>

      {/* Main Board & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Board & Captured Pieces */}
        <div className="lg:col-span-7 space-y-4">
          <CapturedPieces game={game} />

          <ChessBoard
            game={game}
            theme={theme}
            orientation={boardOrientation}
            onMove={handlePlayerMove}
            showLegalMoves={userProfile.showLegalMoves}
            lastMove={lastMove}
            hintMove={hintMove}
            disabled={isAiThinking || game.isGameOver()}
            onFlipBoard={() =>
              setBoardOrientation((prev) => (prev === 'w' ? 'b' : 'w'))
            }
          />

          {/* AI Thinking Indicator */}
          {isAiThinking && (
            <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-2xl text-center text-xs font-bold text-amber-300 flex items-center justify-center gap-2 animate-pulse">
              <span>{activeAi.avatar}</span>
              <span>{activeAi.name} is thinking about its move...</span>
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
            />
          )}

          <div className="h-[380px]">
            <MoveLog
              game={game}
              onUndoMove={handleUndo}
              canUndo={game.history().length > 0 && !isAiThinking}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
