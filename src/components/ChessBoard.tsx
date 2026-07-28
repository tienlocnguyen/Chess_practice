import React, { useState } from 'react';
import { Chess, Square, Move } from 'chess.js';
import { BoardTheme, PieceStyle } from '../types/chess';
import { BOARD_THEMES } from '../utils/themes';
import { ChessPiece } from './ChessPiece';
import { playSound } from '../utils/sound';
import { RotateCw, Crown } from 'lucide-react';

interface ChessBoardProps {
  game: Chess;
  theme: BoardTheme;
  pieceStyle?: PieceStyle;
  orientation?: 'w' | 'b';
  onMove: (from: Square, to: Square, promotion?: string) => void;
  showLegalMoves?: boolean;
  lastMove?: Move | null;
  hintMove?: Move | null;
  disabled?: boolean;
  onFlipBoard?: () => void;
}

export const ChessBoard: React.FC<ChessBoardProps> = ({
  game,
  theme,
  pieceStyle = 'duo_3d',
  orientation = 'w',
  onMove,
  showLegalMoves = true,
  lastMove = null,
  hintMove = null,
  disabled = false,
  onFlipBoard,
}) => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [pendingPromotion, setPendingPromotion] = useState<{ from: Square; to: Square } | null>(null);

  const themeConfig = BOARD_THEMES[theme] || BOARD_THEMES.duolingo;
  const effectivePieceStyle = themeConfig.pieceStyle || pieceStyle || 'duo_3d';

  // Get legal moves for currently selected square
  const legalDestinations = selectedSquare
    ? game.moves({ square: selectedSquare, verbose: true }).map((m) => m.to)
    : [];

  const boardMatrix = game.board(); // 8x8 matrix from rank 8 to 1 (top to bottom)
  const ranks = orientation === 'w' ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];
  const files = orientation === 'w' ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];

  const fileNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const rankNames = ['8', '7', '6', '5', '4', '3', '2', '1'];

  // Handle Square Click
  const handleSquareClick = (square: Square) => {
    if (disabled) return;

    const pieceOnSquare = game.get(square);
    const turn = game.turn();

    // If already selected a piece and clicking a legal destination square
    if (selectedSquare) {
      if (legalDestinations.includes(square)) {
        const selectedPiece = game.get(selectedSquare);

        // Check if pawn promotion
        const isPawn = selectedPiece?.type === 'p';
        const isPromotionRank =
          (selectedPiece?.color === 'w' && square.endsWith('8')) ||
          (selectedPiece?.color === 'b' && square.endsWith('1'));

        if (isPawn && isPromotionRank) {
          playSound.buttonClick();
          setPendingPromotion({ from: selectedSquare, to: square });
          return;
        }

        onMove(selectedSquare, square);
        setSelectedSquare(null);
        return;
      }
    }

    // Select piece if it belongs to current player turn
    if (pieceOnSquare && pieceOnSquare.color === turn) {
      playSound.buttonClick();
      setSelectedSquare(square);
    } else {
      setSelectedSquare(null);
    }
  };

  const handlePromotionSelect = (pieceSymbol: string) => {
    if (pendingPromotion) {
      onMove(pendingPromotion.from, pendingPromotion.to, pieceSymbol);
      setPendingPromotion(null);
      setSelectedSquare(null);
    }
  };

  // Identify square in check
  let inCheckSquare: Square | null = null;
  if (game.isCheck()) {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = boardMatrix[r][c];
        if (p && p.type === 'k' && p.color === game.turn()) {
          inCheckSquare = `${fileNames[c]}${rankNames[r]}` as Square;
        }
      }
    }
  }

  return (
    <div className="relative w-full max-w-[560px] mx-auto select-none">
      {/* Board Container */}
      <div className={`aspect-square w-full rounded-2xl p-2.5 sm:p-3 shadow-2xl border-4 ${themeConfig.borderColor} bg-slate-900 transition-all relative overflow-hidden`}>
        <div className="grid grid-cols-8 grid-rows-8 w-full h-full rounded-xl overflow-hidden border border-slate-950/40 shadow-inner">
          {ranks.map((r) =>
            files.map((c) => {
              const squareName = `${fileNames[c]}${rankNames[r]}` as Square;
              const isLight = (r + c) % 2 === 0;
              const piece = boardMatrix[r][c];

              const isSelected = selectedSquare === squareName;
              const isLegalDestination = showLegalMoves && legalDestinations.includes(squareName);
              const isLastMoveFrom = lastMove?.from === squareName;
              const isLastMoveTo = lastMove?.to === squareName;
              const isCheck = inCheckSquare === squareName;
              const isHintFrom = hintMove?.from === squareName;
              const isHintTo = hintMove?.to === squareName;

              return (
                <div
                  key={squareName}
                  onClick={() => handleSquareClick(squareName)}
                  className={`relative flex items-center justify-center cursor-pointer transition-colors duration-100 ${
                    isLight ? themeConfig.lightSquare : themeConfig.darkSquare
                  } ${isSelected ? themeConfig.highlightSelected : ''} ${
                    isLastMoveFrom || isLastMoveTo ? themeConfig.highlightMove : ''
                  } ${isCheck ? themeConfig.highlightCheck : ''}`}
                >
                  {/* File / Rank Corner Indicators */}
                  {c === (orientation === 'w' ? 0 : 7) && (
                    <span
                      className={`absolute top-0.5 left-1 text-[9px] font-black uppercase pointer-events-none opacity-60 ${
                        isLight ? 'text-slate-800' : 'text-slate-100'
                      }`}
                    >
                      {rankNames[r]}
                    </span>
                  )}
                  {r === (orientation === 'w' ? 7 : 0) && (
                    <span
                      className={`absolute bottom-0.5 right-1 text-[9px] font-black uppercase pointer-events-none opacity-60 ${
                        isLight ? 'text-slate-800' : 'text-slate-100'
                      }`}
                    >
                      {fileNames[c]}
                    </span>
                  )}

                  {/* Hint Glow */}
                  {(isHintFrom || isHintTo) && (
                    <div className="absolute inset-0 bg-yellow-400/40 animate-pulse border-2 border-yellow-300 rounded-lg pointer-events-none z-10" />
                  )}

                  {/* Chess Piece */}
                  {piece && (
                    <div className="w-[85%] h-[85%] z-10 relative">
                      <ChessPiece type={piece.type} color={piece.color} pieceStyle={effectivePieceStyle} />
                    </div>
                  )}

                  {/* Legal Move Destination Dots */}
                  {isLegalDestination && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      {piece ? (
                        <div className="w-[90%] h-[90%] rounded-full border-4 border-amber-400/80 bg-amber-400/30 animate-pulse" />
                      ) : (
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-400/80 shadow-md shadow-amber-400/50" />
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Promotion Dialog Overlay */}
        {pendingPromotion && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-4 animate-fade-in">
            <div className="bg-slate-900 border-2 border-amber-400 rounded-2xl p-4 shadow-2xl text-center max-w-xs space-y-3">
              <div className="text-amber-300 font-extrabold text-sm flex items-center justify-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>Pawn Promotion!</span>
              </div>
              <p className="text-xs text-slate-300 font-medium">Choose a super piece for your pawn:</p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { type: 'q', name: 'Queen', icon: '👑' },
                  { type: 'r', name: 'Rook', icon: '🏰' },
                  { type: 'b', name: 'Bishop', icon: '🧙' },
                  { type: 'n', name: 'Knight', icon: '🐴' },
                ].map((p) => (
                  <button
                    key={p.type}
                    onClick={() => handlePromotionSelect(p.type)}
                    className="flex flex-col items-center p-2 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 border border-slate-700 transition font-bold"
                  >
                    <span className="text-2xl">{p.icon}</span>
                    <span className="text-[10px] mt-1">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Board Flip Button */}
      {onFlipBoard && (
        <button
          onClick={onFlipBoard}
          className="absolute -bottom-3 right-3 z-20 px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 hover:text-white hover:border-amber-400 text-xs font-bold flex items-center gap-1 shadow-lg backdrop-blur-sm transition"
        >
          <RotateCw className="w-3 h-3 text-amber-400" />
          <span>Flip Board</span>
        </button>
      )}
    </div>
  );
};
