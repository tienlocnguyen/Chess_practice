import React from 'react';

interface ChessPieceProps {
  type: string; // 'p', 'n', 'b', 'r', 'q', 'k'
  color: 'w' | 'b';
  size?: number | string;
}

export const ChessPiece: React.FC<ChessPieceProps> = ({ type, color, size = '100%' }) => {
  const isWhite = color === 'w';

  // Crisp SVG vector chess pieces
  const renderSvg = () => {
    switch (type.toLowerCase()) {
      case 'p': // Pawn
        return (
          <svg viewBox="0 0 45 45" style={{ width: size, height: size }}>
            <path
              d="M 22.5,9 A 4,4 0 1,1 22.5,17 A 4,4 0 1,1 22.5,9 Z M 22.5,17 C 18,17 15,22 15,26 C 15,28 17,29 17,30 L 28,30 C 28,29 30,28 30,26 C 30,22 27,17 22.5,17 Z M 14,32 L 31,32 L 31,35 L 14,35 Z"
              fill={isWhite ? '#ffffff' : '#1e293b'}
              stroke={isWhite ? '#0f172a' : '#000000'}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        );

      case 'n': // Knight
        return (
          <svg viewBox="0 0 45 45" style={{ width: size, height: size }}>
            <path
              d="M 22,10 C 32.5,11 38.5,18 31,29 C 31,30 31,31 32,32 L 32,35 L 13,35 L 13,32 C 14,31 14,30 14,29 C 14,26 12,23 11,20 C 11,15 15,10 22,10 Z M 22,10 C 18,10 16,14 17,16 M 15,18 C 18,16 20,18 20,20 M 24,14 A 1.5,1.5 0 1,1 24,17 A 1.5,1.5 0 1,1 24,14 Z"
              fill={isWhite ? '#ffffff' : '#1e293b'}
              stroke={isWhite ? '#0f172a' : '#000000'}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        );

      case 'b': // Bishop
        return (
          <svg viewBox="0 0 45 45" style={{ width: size, height: size }}>
            <path
              d="M 22.5,8 A 2.5,2.5 0 1,1 22.5,13 A 2.5,2.5 0 1,1 22.5,8 Z M 22.5,13 C 17,13 14,19 14,25 C 14,28 16,30 16,31 L 29,31 C 29,30 31,28 31,25 C 31,19 28,13 22.5,13 Z M 13,33 L 32,33 L 32,36 L 13,36 Z M 19,20 L 26,20 M 22.5,17.5 L 22.5,22.5"
              fill={isWhite ? '#ffffff' : '#1e293b'}
              stroke={isWhite ? '#0f172a' : '#000000'}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        );

      case 'r': // Rook
        return (
          <svg viewBox="0 0 45 45" style={{ width: size, height: size }}>
            <path
              d="M 12,36 L 33,36 L 33,33 L 12,33 Z M 14,33 L 14,26 L 31,26 L 31,33 Z M 14,26 L 12,14 L 16,14 L 16,18 L 20,18 L 20,14 L 25,14 L 25,18 L 29,18 L 29,14 L 33,14 L 31,26 Z"
              fill={isWhite ? '#ffffff' : '#1e293b'}
              stroke={isWhite ? '#0f172a' : '#000000'}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        );

      case 'q': // Queen
        return (
          <svg viewBox="0 0 45 45" style={{ width: size, height: size }}>
            <path
              d="M 9,26 L 36,26 L 38,13 L 30,21 L 22.5,9 L 15,21 L 7,13 Z M 9,26 L 11,32 L 34,32 L 36,26 Z M 11,34 L 34,34 L 34,37 L 11,37 Z"
              fill={isWhite ? '#ffffff' : '#1e293b'}
              stroke={isWhite ? '#0f172a' : '#000000'}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="7" cy="12" r="2" fill={isWhite ? '#ffffff' : '#1e293b'} stroke="#000" strokeWidth="1" />
            <circle cx="15" cy="19" r="2" fill={isWhite ? '#ffffff' : '#1e293b'} stroke="#000" strokeWidth="1" />
            <circle cx="22.5" cy="7" r="2" fill={isWhite ? '#ffffff' : '#1e293b'} stroke="#000" strokeWidth="1" />
            <circle cx="30" cy="19" r="2" fill={isWhite ? '#ffffff' : '#1e293b'} stroke="#000" strokeWidth="1" />
            <circle cx="38" cy="12" r="2" fill={isWhite ? '#ffffff' : '#1e293b'} stroke="#000" strokeWidth="1" />
          </svg>
        );

      case 'k': // King
        return (
          <svg viewBox="0 0 45 45" style={{ width: size, height: size }}>
            <path
              d="M 22.5,11.5 L 22.5,6 M 20,8.5 L 25,8.5 M 22.5,25 C 16,25 14,18 14,15 C 17,13 22.5,13 22.5,13 C 22.5,13 28,13 31,15 C 31,18 29,25 22.5,25 Z M 11.5,33 L 33.5,33 L 33.5,36 L 11.5,36 Z M 13.5,27 L 31.5,27 L 31.5,31 L 13.5,31 Z"
              fill={isWhite ? '#ffffff' : '#1e293b'}
              stroke={isWhite ? '#0f172a' : '#000000'}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center select-none filter drop-shadow-md transition-transform duration-150 hover:scale-105 cursor-pointer">
      {renderSvg()}
    </div>
  );
};
