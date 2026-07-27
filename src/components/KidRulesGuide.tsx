import React, { useState } from 'react';
import { BookOpen, Sparkles, Zap, Shield, Award } from 'lucide-react';

const PIECE_GUIDES = [
  {
    id: 'pawn',
    name: 'The Brave Pawn ♟️',
    icon: '♟️',
    points: '1 Point',
    motto: 'Small step forward, big dream to become Queen!',
    movesText: 'Moves 1 square forward. On its very first move, it can leap 2 squares forward! Captures 1 square diagonally forward.',
    specialTip: 'When a Pawn reaches the opponent\'s back row, it undergoes Promotion into a Queen, Rook, Bishop, or Knight!',
    bg: 'from-amber-500/20 to-orange-500/10 border-amber-500/30',
  },
  {
    id: 'knight',
    name: 'The Jumping Knight 🐴',
    icon: '♞',
    points: '3 Points',
    motto: 'L-shaped jumpers! The only piece that can hop over others!',
    movesText: 'Moves in an "L" shape: 2 squares straight and then 1 square to the side. It can jump right over other pieces on its way!',
    specialTip: 'Knights are great at "Forking" two enemy pieces at once!',
    bg: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30',
  },
  {
    id: 'bishop',
    name: 'The Wise Bishop 🧙',
    icon: '♝',
    points: '3 Points',
    motto: 'Diagonal lasers across the board!',
    movesText: 'Moves as many squares as it wants diagonally! Each Bishop stays on its starting color (light or dark square) for the entire game.',
    specialTip: 'Place your Bishops on open diagonals to control long distances!',
    bg: 'from-purple-500/20 to-pink-500/10 border-purple-500/30',
  },
  {
    id: 'rook',
    name: 'The Mighty Rook 🏰',
    icon: '♜',
    points: '5 Points',
    motto: 'Straight lines of power!',
    movesText: 'Moves as far as it wants vertically or horizontally in straight lines.',
    specialTip: 'Rooks love open files with no pawns blocking them!',
    bg: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
  },
  {
    id: 'queen',
    name: 'The Powerful Queen 👑',
    icon: '♛',
    points: '9 Points',
    motto: 'The ultimate superpower on the board!',
    movesText: 'Combines the movement of Rook + Bishop! Can move any number of squares straight or diagonally.',
    specialTip: 'Keep your Queen safe early on, and bring her out when enemy pieces are vulnerable!',
    bg: 'from-rose-500/20 to-pink-500/10 border-rose-500/30',
  },
  {
    id: 'king',
    name: 'The Royal King ♚',
    icon: '♚',
    points: 'Priceless!',
    motto: 'Protect the King at all costs!',
    movesText: 'Moves 1 square in any direction. If your King is attacked, it is in CHECK and you MUST protect it immediately!',
    specialTip: 'If the King is attacked and cannot escape, it is CHECKMATE!',
    bg: 'from-yellow-500/20 to-amber-500/10 border-yellow-500/30',
  },
];

export const KidRulesGuide: React.FC = () => {
  const [selectedPiece, setSelectedPiece] = useState(PIECE_GUIDES[0]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-white p-4 animate-fade-in">
      {/* Title */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl text-center space-y-2 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-xs border border-amber-500/30 mb-1">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Chess Rules & Move Academy</span>
        </div>
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
          How to Play Chess like a Champion
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Click any piece below to discover its secret superpowers, point values, and winning tactics!
        </p>
      </div>

      {/* Piece Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {PIECE_GUIDES.map((piece) => (
          <button
            key={piece.id}
            onClick={() => setSelectedPiece(piece)}
            className={`p-3.5 rounded-2xl border text-center transition-all ${
              selectedPiece.id === piece.id
                ? 'bg-gradient-to-b from-amber-500 to-orange-500 text-slate-950 font-black border-white shadow-xl scale-105'
                : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="text-3xl mb-1">{piece.icon}</div>
            <div className="text-xs font-extrabold">{piece.name.split(' ')[1]}</div>
            <div className={`text-[10px] mt-0.5 ${selectedPiece.id === piece.id ? 'text-slate-950/80' : 'text-amber-400'}`}>
              {piece.points}
            </div>
          </button>
        ))}
      </div>

      {/* Active Piece Detailed Display */}
      <div className={`bg-gradient-to-br ${selectedPiece.bg} bg-slate-900 border p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden`}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 rounded-3xl bg-slate-950/80 border-2 border-amber-400/50 flex items-center justify-center text-6xl shadow-2xl shrink-0">
            {selectedPiece.icon}
          </div>

          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-2xl font-black text-amber-300">{selectedPiece.name}</h3>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-xs border border-amber-500/40 w-fit mx-auto sm:mx-0">
                Value: {selectedPiece.points}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-medium italic">
              "{selectedPiece.motto}"
            </p>

            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-amber-400 flex items-center justify-center sm:justify-start gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>How It Moves:</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedPiece.movesText}
              </p>
            </div>

            <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/30 space-y-1">
              <div className="text-xs font-bold text-amber-300 flex items-center justify-center sm:justify-start gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Coach Champion Tip:</span>
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                {selectedPiece.specialTip}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Special Moves Section */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
        <h3 className="text-lg font-black text-amber-300 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Special Chess Superpowers</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1">
            <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <span>🏰 Castling (The Royal Shield)</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              If your King and Rook haven't moved yet and no pieces are between them, the King moves 2 squares towards the Rook, and the Rook leaps over to stand next to it!
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1">
            <h4 className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
              <span>👑 Pawn Promotion</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              When a brave Pawn marches all the way across the board to the last rank, it instantly transforms into a Queen, Rook, Bishop, or Knight!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
