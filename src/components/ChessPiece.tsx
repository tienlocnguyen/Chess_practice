import React from 'react';
import { PieceStyle } from '../types/chess';

interface ChessPieceProps {
  type: string; // 'p', 'n', 'b', 'r', 'q', 'k'
  color: 'w' | 'b';
  size?: number | string;
  pieceStyle?: PieceStyle;
}

// Helper for rendering clear, standard vector chess pieces (with unmistakable Horse Knight)
const renderPieceVector = (pType: string, fill: string, stroke: string, strokeWidth = 1.8) => {
  if (pType === 'p') {
    return (
      <g strokeLinejoin="round" strokeLinecap="round">
        <circle cx="22.5" cy="12" r="5" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        <path d="M 22.5,17 C 18,17 15,22 15,27 L 30,27 C 30,22 27,17 22.5,17 Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        <path d="M 13,29 L 32,29 L 32,34 L 13,34 Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      </g>
    );
  }

  if (pType === 'n') {
    // Highly detailed, unmistakable Horse Head with Ear, Eye, Snout, Mane, and Body
    return (
      <g strokeLinejoin="round" strokeLinecap="round">
        {/* Main Horse Head & Body */}
        <path
          d="M 13,35 L 32,35 L 32,31 C 32,29 30,28 29,26 C 30,23 32,19 32,15 C 32,10 27,7 21,7 C 17,7 14,10 13,13 C 12,16 13,18 15,20 C 13,21 11,24 11,27 C 11,29 12,32 13,35 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
        {/* Pointed Ear */}
        <path
          d="M 19,8 L 22,3 L 25,7"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
        {/* Snout / Nostril line */}
        <path
          d="M 12,15 C 13.5,14 15,15 16,16"
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
        {/* Eye */}
        <circle cx="23" cy="11" r="1.5" fill={stroke} />
        {/* Mane Details */}
        <path
          d="M 27,11 C 30,13 30,17 28,21"
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </g>
    );
  }

  if (pType === 'b') {
    return (
      <g strokeLinejoin="round" strokeLinecap="round">
        <circle cx="22.5" cy="8" r="2.5" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        <path d="M 22.5,11 C 17,11 14,16 14,25 C 14,28 16,30 16,31 L 29,31 C 29,30 31,28 31,25 C 31,16 28,11 22.5,11 Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        <path d="M 18,20 L 27,20 M 22.5,16 L 22.5,23" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
        <path d="M 13,33 L 32,33 L 32,36 L 13,36 Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      </g>
    );
  }

  if (pType === 'r') {
    return (
      <g strokeLinejoin="round" strokeLinecap="round">
        <path d="M 14,26 L 12,14 L 16,14 L 16,18 L 20,18 L 20,14 L 25,14 L 25,18 L 29,18 L 29,14 L 33,14 L 31,26 Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        <path d="M 14,26 L 31,26 L 31,32 L 14,32 Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        <path d="M 12,32 L 33,32 L 33,36 L 12,36 Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      </g>
    );
  }

  if (pType === 'q') {
    return (
      <g strokeLinejoin="round" strokeLinecap="round">
        <circle cx="8" cy="11" r="1.5" fill={stroke} />
        <circle cx="15" cy="8" r="1.5" fill={stroke} />
        <circle cx="22.5" cy="6" r="1.5" fill={stroke} />
        <circle cx="30" cy="8" r="1.5" fill={stroke} />
        <circle cx="37" cy="11" r="1.5" fill={stroke} />
        <path d="M 8,26 L 37,26 L 37,13 L 30,20 L 22.5,9 L 15,20 L 8,13 Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        <path d="M 10,26 L 35,26 L 33,32 L 12,32 Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        <path d="M 10,32 L 35,32 L 35,36 L 10,36 Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      </g>
    );
  }

  // King ('k')
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M 22.5,4 L 22.5,10 M 19.5,7 L 25.5,7" stroke={stroke} strokeWidth={strokeWidth} fill="none" />
      <path d="M 22.5,25 C 16,25 14,18 14,13 C 17,11 22.5,11 22.5,11 C 22.5,11 28,11 31,13 C 31,18 29,25 22.5,25 Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M 13.5,25 L 31.5,25 L 31.5,30 L 13.5,30 Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M 11.5,31 L 33.5,31 L 33.5,36 L 11.5,36 Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </g>
  );
};

export const ChessPiece: React.FC<ChessPieceProps> = ({
  type,
  color,
  size = '100%',
  pieceStyle = 'duo_3d',
}) => {
  const isWhite = color === 'w';
  const pType = type.toLowerCase();

  // 1. Duo 3D Gamified Style (High contrast 3D rounded badges)
  if (pieceStyle === 'duo_3d') {
    const isWhiteBadge = isWhite
      ? 'bg-gradient-to-tr from-amber-100 via-amber-50 to-white border-2 border-amber-300/90 shadow-md shadow-amber-500/20'
      : 'bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 border-2 border-indigo-400/80 shadow-md shadow-indigo-500/30';

    const pieceFill = isWhite ? '#ffffff' : '#818cf8';
    const pieceStroke = isWhite ? '#78350f' : '#e0e7ff';

    return (
      <div
        className="w-full h-full flex items-center justify-center select-none transition-transform duration-150 hover:scale-110 active:scale-95 cursor-pointer"
        style={{ width: size, height: size }}
      >
        <div
          className={`w-[88%] h-[88%] rounded-2xl flex items-center justify-center relative overflow-hidden ${isWhiteBadge}`}
        >
          {/* Top highlight shine */}
          <div className="absolute -top-3 -left-3 w-8 h-8 bg-white/40 rounded-full blur-sm pointer-events-none z-10" />
          
          <svg viewBox="0 0 45 45" className="w-[82%] h-[82%] z-0 filter drop-shadow-sm">
            {renderPieceVector(pType, pieceFill, pieceStroke, 2)}
          </svg>
        </div>
      </div>
    );
  }

  // 2. Cute Emoji / Animal Characters Style 🐴👑
  if (pieceStyle === 'cute_emoji') {
    const pieceEmojis: Record<string, string> = {
      p: '♟️',
      n: '🐴', // Horse for both White & Black Knight
      b: '🧙‍♂️', // Wizard for both
      r: '🏰', // Castle for both
      q: '👸', // Queen for both
      k: '👑', // Crown for both
    };

    const emoji = pieceEmojis[pType] || '♟️';
    const badgeBg = isWhite
      ? 'bg-gradient-to-tr from-amber-100 via-yellow-100 to-amber-200 border-2 border-amber-400 shadow-md shadow-amber-500/20'
      : 'bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 border-2 border-indigo-400 shadow-md shadow-indigo-500/30';

    return (
      <div
        className="w-full h-full flex items-center justify-center select-none transition-transform duration-150 hover:scale-110 active:scale-95 cursor-pointer"
        style={{ width: size, height: size }}
      >
        <div
          className={`w-[88%] h-[88%] rounded-2xl flex items-center justify-center relative overflow-hidden ${badgeBg}`}
        >
          <span className="text-xl sm:text-2xl filter drop-shadow">
            {emoji}
          </span>
        </div>
      </div>
    );
  }

  // 3. Neon Cyber Style (Glow outlines)
  if (pieceStyle === 'neon_cyber') {
    const mainColor = isWhite ? '#38bdf8' : '#a855f7'; // Cyan vs Neon Purple
    const strokeGlow = isWhite ? 'drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]' : 'drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]';

    return (
      <div
        className={`w-full h-full flex items-center justify-center select-none transition-transform duration-150 hover:scale-110 cursor-pointer ${strokeGlow}`}
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 45 45" className="w-[85%] h-[85%]">
          {renderPieceVector(pType, 'none', mainColor, 2.5)}
        </svg>
      </div>
    );
  }

  // 4. Wood Carved Style (Rich warm wood gradient)
  if (pieceStyle === 'wood_carved') {
    const fillColor = isWhite ? '#fde68a' : '#451a03';
    const strokeColor = isWhite ? '#92400e' : '#f59e0b';

    return (
      <div
        className="w-full h-full flex items-center justify-center select-none transition-transform duration-150 hover:scale-105 cursor-pointer filter drop-shadow-md"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 45 45" className="w-[85%] h-[85%]">
          {renderPieceVector(pType, fillColor, strokeColor, 2)}
        </svg>
      </div>
    );
  }

  // 5. Flat Minimal Style
  if (pieceStyle === 'flat_minimal') {
    const fillColor = isWhite ? '#fef08a' : '#1e293b';
    const strokeColor = isWhite ? '#713f12' : '#0f172a';

    return (
      <div
        className="w-full h-full flex items-center justify-center select-none transition-transform duration-150 hover:scale-105 cursor-pointer"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 45 45" className="w-[85%] h-[85%] filter drop-shadow">
          {renderPieceVector(pType, fillColor, strokeColor, 1.8)}
        </svg>
      </div>
    );
  }

  // 6. Default Classic Staunton Vector Style
  const stauntonFill = isWhite ? '#ffffff' : '#1e293b';
  const stauntonStroke = isWhite ? '#0f172a' : '#f8fafc';

  return (
    <div
      className="w-full h-full flex items-center justify-center select-none filter drop-shadow-md transition-transform duration-150 hover:scale-105 cursor-pointer"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 45 45" className="w-[85%] h-[85%]">
        {renderPieceVector(pType, stauntonFill, stauntonStroke, 1.8)}
      </svg>
    </div>
  );
};
