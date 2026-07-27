import React from 'react';
import { PieceStyle } from '../types/chess';

interface ChessPieceProps {
  type: string; // 'p', 'n', 'b', 'r', 'q', 'k'
  color: 'w' | 'b';
  size?: number | string;
  pieceStyle?: PieceStyle;
}

export const ChessPiece: React.FC<ChessPieceProps> = ({
  type,
  color,
  size = '100%',
  pieceStyle = 'duo_3d',
}) => {
  const isWhite = color === 'w';
  const pType = type.toLowerCase();

  // 1. Duo 3D Gamified Style (Vibrant, expressive, glass gradients)
  if (pieceStyle === 'duo_3d') {
    const emojis: Record<string, { w: string; b: string }> = {
      p: { w: '♟️', b: '♟️' },
      n: { w: '🐴', b: '🐴' }, // Horse head for both White & Black Knights
      b: { w: '🧙‍♂️', b: '🧙‍♀️' },
      r: { w: '🏰', b: '🗿' },
      q: { w: '👑', b: '👸' },
      k: { w: '♚', b: '♚' },
    };

    const isWhiteFill = isWhite
      ? 'bg-gradient-to-tr from-amber-100 via-white to-slate-100 text-slate-900 border-2 border-amber-300/80 shadow-lg shadow-amber-500/20'
      : 'bg-gradient-to-tr from-slate-900 via-slate-800 to-emerald-950 text-emerald-300 border-2 border-emerald-500/60 shadow-lg shadow-emerald-500/20';

    return (
      <div
        className="w-full h-full flex items-center justify-center select-none transition-transform duration-150 hover:scale-110 active:scale-95 cursor-pointer"
        style={{ width: size, height: size }}
      >
        <div
          className={`w-[85%] h-[85%] rounded-2xl flex items-center justify-center font-black text-2xl sm:text-3xl relative overflow-hidden ${isWhiteFill}`}
        >
          {/* Top highlight shine */}
          <div className="absolute -top-3 -left-3 w-8 h-8 bg-white/40 rounded-full blur-sm" />
          <span className="filter drop-shadow-md z-10">{emojis[pType]?.[color] || '♟️'}</span>
        </div>
      </div>
    );
  }

  // Helper for rendering clear, beautiful Knight (Horse) SVG vector
  const renderKnightVector = (fill: string, stroke: string, strokeWidth = 1.5) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path
        d="M 22,10 C 32.5,11 38.5,18 31,29 C 31,30 31,31 32,32 L 32,35 L 13,35 L 13,32 C 14,31 14,30 14,29 C 14,26 12,23 11,20 C 11,15 15,10 22,10 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <path
        d="M 22,10 C 18,10 16,14 17,16 M 15,18 C 18,16 20,18 20,20"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <circle cx="24" cy="14" r="1.5" fill={stroke} />
      <path
        d="M 12.5,22 C 14,21 15.5,22 16.5,23"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </g>
  );

  // 2. Neon Cyber Style (Glow outlines)
  if (pieceStyle === 'neon_cyber') {
    const mainColor = isWhite ? '#38bdf8' : '#f43f5e'; // Cyan vs Rose
    const strokeGlow = isWhite ? 'drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]' : 'drop-shadow-[0_0_6px_rgba(244,63,94,0.8)]';

    return (
      <div
        className={`w-full h-full flex items-center justify-center select-none transition-transform duration-150 hover:scale-110 cursor-pointer ${strokeGlow}`}
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 45 45" className="w-[85%] h-[85%]">
          {pType === 'p' && (
            <path
              d="M 22.5,9 A 4,4 0 1,1 22.5,17 A 4,4 0 1,1 22.5,9 Z M 22.5,17 C 18,17 15,22 15,26 C 15,28 17,29 17,30 L 28,30 C 28,29 30,28 30,26 C 30,22 27,17 22.5,17 Z M 14,32 L 31,32 L 31,35 L 14,35 Z"
              fill="none"
              stroke={mainColor}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          )}
          {pType === 'n' && (
            <g stroke={mainColor} strokeWidth="2.5" fill="none" strokeLinejoin="round">
              <path d="M 22,10 C 32.5,11 38.5,18 31,29 C 31,30 31,31 32,32 L 32,35 L 13,35 L 13,32 C 14,31 14,30 14,29 C 14,26 12,23 11,20 C 11,15 15,10 22,10 Z" />
              <path d="M 22,10 C 18,10 16,14 17,16 M 15,18 C 18,16 20,18 20,20" />
              <circle cx="24" cy="14" r="1.5" fill={mainColor} />
            </g>
          )}
          {pType === 'b' && (
            <path
              d="M 22.5,8 A 2.5,2.5 0 1,1 22.5,13 A 2.5,2.5 0 1,1 22.5,8 Z M 22.5,13 C 17,13 14,19 14,25 C 14,28 16,30 16,31 L 29,31 C 29,30 31,28 31,25 C 31,19 28,13 22.5,13 Z M 13,33 L 32,33 L 32,36 L 13,36 Z M 19,20 L 26,20 M 22.5,17.5 L 22.5,22.5"
              fill="none"
              stroke={mainColor}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          )}
          {pType === 'r' && (
            <path
              d="M 12,36 L 33,36 L 33,33 L 12,33 Z M 14,33 L 14,26 L 31,26 L 31,33 Z M 14,26 L 12,14 L 16,14 L 16,18 L 20,18 L 20,14 L 25,14 L 25,18 L 29,18 L 29,14 L 33,14 L 31,26 Z"
              fill="none"
              stroke={mainColor}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          )}
          {pType === 'q' && (
            <g stroke={mainColor} strokeWidth="2.5" fill="none">
              <path d="M 9,26 L 36,26 L 38,13 L 30,21 L 22.5,9 L 15,21 L 7,13 Z M 9,26 L 11,32 L 34,32 L 36,26 Z M 11,34 L 34,34 L 34,37 L 11,37 Z" />
              <circle cx="22.5" cy="7" r="2.5" />
            </g>
          )}
          {pType === 'k' && (
            <path
              d="M 22.5,11.5 L 22.5,6 M 20,8.5 L 25,8.5 M 22.5,25 C 16,25 14,18 14,15 C 17,13 22.5,13 22.5,13 C 22.5,13 28,13 31,15 C 31,18 29,25 22.5,25 Z M 11.5,33 L 33.5,33 L 33.5,36 L 11.5,36 Z M 13.5,27 L 31.5,27 L 31.5,31 L 13.5,31 Z"
              fill="none"
              stroke={mainColor}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </div>
    );
  }

  // 3. Wood Carved Style (Rich warm wood gradient)
  if (pieceStyle === 'wood_carved') {
    const fillColor = isWhite ? '#fde68a' : '#78350f';
    const strokeColor = isWhite ? '#92400e' : '#27272a';

    return (
      <div
        className="w-full h-full flex items-center justify-center select-none transition-transform duration-150 hover:scale-105 cursor-pointer filter drop-shadow-md"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 45 45" className="w-[85%] h-[85%]">
          {pType === 'n' ? (
            renderKnightVector(fillColor, strokeColor, 2)
          ) : (
            <path
              d={
                pType === 'p'
                  ? 'M 22.5,9 A 4,4 0 1,1 22.5,17 A 4,4 0 1,1 22.5,9 Z M 22.5,17 C 18,17 15,22 15,26 C 15,28 17,29 17,30 L 28,30 C 28,29 30,28 30,26 C 30,22 27,17 22.5,17 Z M 14,32 L 31,32 L 31,35 L 14,35 Z'
                  : pType === 'b'
                  ? 'M 22.5,8 A 2.5,2.5 0 1,1 22.5,13 A 2.5,2.5 0 1,1 22.5,8 Z M 22.5,13 C 17,13 14,19 14,25 C 14,28 16,30 16,31 L 29,31 C 29,30 31,28 31,25 C 31,19 28,13 22.5,13 Z M 13,33 L 32,33 L 32,36 L 13,36 Z M 19,20 L 26,20 M 22.5,17.5 L 22.5,22.5'
                  : pType === 'r'
                  ? 'M 12,36 L 33,36 L 33,33 L 12,33 Z M 14,33 L 14,26 L 31,26 L 31,33 Z M 14,26 L 12,14 L 16,14 L 16,18 L 20,18 L 20,14 L 25,14 L 25,18 L 29,18 L 29,14 L 33,14 L 31,26 Z'
                  : pType === 'q'
                  ? 'M 9,26 L 36,26 L 38,13 L 30,21 L 22.5,9 L 15,21 L 7,13 Z M 9,26 L 11,32 L 34,32 L 36,26 Z M 11,34 L 34,34 L 34,37 L 11,37 Z'
                  : 'M 22.5,11.5 L 22.5,6 M 20,8.5 L 25,8.5 M 22.5,25 C 16,25 14,18 14,15 C 17,13 22.5,13 22.5,13 C 22.5,13 28,13 31,15 C 31,18 29,25 22.5,25 Z M 11.5,33 L 33.5,33 L 33.5,36 L 11.5,36 Z M 13.5,27 L 31.5,27 L 31.5,31 L 13.5,31 Z'
              }
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </div>
    );
  }

  // 4. Flat Minimal Style
  if (pieceStyle === 'flat_minimal') {
    const symbolMap: Record<string, string> = {
      p: '♟',
      n: '♞',
      b: '♝',
      r: '♜',
      q: '♛',
      k: '♚',
    };

    return (
      <div
        className="w-full h-full flex items-center justify-center select-none transition-transform duration-150 hover:scale-105 cursor-pointer"
        style={{ width: size, height: size }}
      >
        <span
          className={`text-3xl sm:text-4xl font-extrabold ${
            isWhite ? 'text-amber-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]' : 'text-slate-900 drop-shadow-[0_2px_4px_rgba(255,255,255,0.2)]'
          }`}
        >
          {symbolMap[pType] || '♟'}
        </span>
      </div>
    );
  }

  // 5. Default Classic Staunton Vector Style
  const stauntonFill = isWhite ? '#ffffff' : '#1e293b';
  const stauntonStroke = isWhite ? '#0f172a' : '#000000';

  return (
    <div
      className="w-full h-full flex items-center justify-center select-none filter drop-shadow-md transition-transform duration-150 hover:scale-105 cursor-pointer"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 45 45" className="w-[85%] h-[85%]">
        {pType === 'n' ? (
          renderKnightVector(stauntonFill, stauntonStroke, 1.5)
        ) : (
          <path
            d={
              pType === 'p'
                ? 'M 22.5,9 A 4,4 0 1,1 22.5,17 A 4,4 0 1,1 22.5,9 Z M 22.5,17 C 18,17 15,22 15,26 C 15,28 17,29 17,30 L 28,30 C 28,29 30,28 30,26 C 30,22 27,17 22.5,17 Z M 14,32 L 31,32 L 31,35 L 14,35 Z'
                : pType === 'b'
                ? 'M 22.5,8 A 2.5,2.5 0 1,1 22.5,13 A 2.5,2.5 0 1,1 22.5,8 Z M 22.5,13 C 17,13 14,19 14,25 C 14,28 16,30 16,31 L 29,31 C 29,30 31,28 31,25 C 31,19 28,13 22.5,13 Z M 13,33 L 32,33 L 32,36 L 13,36 Z M 19,20 L 26,20 M 22.5,17.5 L 22.5,22.5'
                : pType === 'r'
                ? 'M 12,36 L 33,36 L 33,33 L 12,33 Z M 14,33 L 14,26 L 31,26 L 31,33 Z M 14,26 L 12,14 L 16,14 L 16,18 L 20,18 L 20,14 L 25,14 L 25,18 L 29,18 L 29,14 L 33,14 L 31,26 Z'
                : pType === 'q'
                ? 'M 9,26 L 36,26 L 38,13 L 30,21 L 22.5,9 L 15,21 L 7,13 Z M 9,26 L 11,32 L 34,32 L 36,26 Z M 11,34 L 34,34 L 34,37 L 11,37 Z'
                : 'M 22.5,11.5 L 22.5,6 M 20,8.5 L 25,8.5 M 22.5,25 C 16,25 14,18 14,15 C 17,13 22.5,13 22.5,13 C 22.5,13 28,13 31,15 C 31,18 29,25 22.5,25 Z M 11.5,33 L 33.5,33 L 33.5,36 L 11.5,36 Z M 13.5,27 L 31.5,27 L 31.5,31 L 13.5,31 Z'
            }
            fill={stauntonFill}
            stroke={stauntonStroke}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
};
