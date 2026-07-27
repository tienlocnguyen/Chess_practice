import React, { useState } from 'react';
import { BookOpen, Sparkles, Zap, Award } from 'lucide-react';
import { Language, getTranslation } from '../utils/i18n';

interface KidRulesGuideProps {
  language?: Language;
}

export const KidRulesGuide: React.FC<KidRulesGuideProps> = ({ language = 'vi' }) => {
  const PIECE_GUIDES = [
    {
      id: 'pawn',
      name: language === 'vi' ? 'Tốt Dũng Cảm ♟️' : 'The Brave Pawn ♟️',
      icon: '♟️',
      points: language === 'vi' ? '1 Điểm' : '1 Point',
      motto: language === 'vi' ? 'Bước nhỏ về phía trước, ước mơ thành Hậu!' : 'Small step forward, big dream to become Queen!',
      movesText: language === 'vi' ? 'Đi 1 ô về phía trước. Ở nước đi đầu tiên, Tốt có thể nhảy 2 ô! Ăn quân 1 ô chéo về phía trước.' : 'Moves 1 square forward. On its very first move, it can leap 2 squares forward! Captures 1 square diagonally forward.',
      specialTip: language === 'vi' ? 'Khi Tốt đi đến hàng cuối cùng của đối thủ, nó sẽ Phong Hậu thành Hậu, Xe, Tượng hoặc Mã!' : 'When a Pawn reaches the opponent\'s back row, it undergoes Promotion into a Queen, Rook, Bishop, or Knight!',
      bg: 'from-amber-500/20 to-orange-500/10 border-amber-500/30',
    },
    {
      id: 'knight',
      name: language === 'vi' ? 'Mã Nhảy Nhót 🐴' : 'The Jumping Knight 🐴',
      icon: '♞',
      points: language === 'vi' ? '3 Điểm' : '3 Points',
      motto: language === 'vi' ? 'Đi hình chữ L! Quân duy nhất nhảy qua đầu các quân khác!' : 'L-shaped jumpers! The only piece that can hop over others!',
      movesText: language === 'vi' ? 'Đi hình chữ L (2 ô thẳng và 1 ô ngang). Mã có thể nhảy qua các quân cờ ngáng đường!' : 'Moves in an "L" shape: 2 squares straight and then 1 square to the side. It can jump right over other pieces on its way!',
      specialTip: language === 'vi' ? 'Mã rất giỏi đòn "Chĩa" (Bắt đôi) 2 quân địch cùng lúc!' : 'Knights are great at "Forking" two enemy pieces at once!',
      bg: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30',
    },
    {
      id: 'bishop',
      name: language === 'vi' ? 'Tượng Thông Thái 🧙' : 'The Wise Bishop 🧙',
      icon: '♝',
      points: language === 'vi' ? '3 Điểm' : '3 Points',
      motto: language === 'vi' ? 'Bắn tia laser đường chéo khắp bàn cờ!' : 'Diagonal lasers across the board!',
      movesText: language === 'vi' ? 'Đi bao nhiêu ô tùy thích theo đường chéo. Tượng ô trắng luôn ở ô trắng, Tượng ô đen luôn ở ô đen.' : 'Moves as many squares as it wants diagonally! Each Bishop stays on its starting color (light or dark square) for the entire game.',
      specialTip: language === 'vi' ? 'Đặt Tượng ở các đường chéo mở để kiểm soát không gian rộng lớn!' : 'Place your Bishops on open diagonals to control long distances!',
      bg: 'from-purple-500/20 to-pink-500/10 border-purple-500/30',
    },
    {
      id: 'rook',
      name: language === 'vi' ? 'Xe Sức Mạnh 🏰' : 'The Mighty Rook 🏰',
      icon: '♜',
      points: language === 'vi' ? '5 Điểm' : '5 Points',
      motto: language === 'vi' ? 'Sức mạnh theo đường thẳng!' : 'Straight lines of power!',
      movesText: language === 'vi' ? 'Đi bao nhiêu ô tùy thích theo đường ngang hoặc đường dọc.' : 'Moves as far as it wants vertically or horizontally in straight lines.',
      specialTip: language === 'vi' ? 'Xe thích những cột mở không có Tốt ngáng đường!' : 'Rooks love open files with no pawns blocking them!',
      bg: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
    },
    {
      id: 'queen',
      name: language === 'vi' ? 'Hậu Quyền Năng 👑' : 'The Powerful Queen 👑',
      icon: '♛',
      points: language === 'vi' ? '9 Điểm' : '9 Points',
      motto: language === 'vi' ? 'Sức mạnh bá chủ trên bàn cờ!' : 'The ultimate superpower on the board!',
      movesText: language === 'vi' ? 'Kết hợp sức mạnh của Xe + Tượng! Có thể đi thẳng hoặc chéo bao nhiêu ô tùy thích.' : 'Combines the movement of Rook + Bishop! Can move any number of squares straight or diagonally.',
      specialTip: language === 'vi' ? 'Giữ Hậu an toàn lúc đầu game, và ra trận khi đối thủ hở lưng!' : 'Keep your Queen safe early on, and bring her out when enemy pieces are vulnerable!',
      bg: 'from-rose-500/20 to-pink-500/10 border-rose-500/30',
    },
    {
      id: 'king',
      name: language === 'vi' ? 'Vua Hoàng Gia ♚' : 'The Royal King ♚',
      icon: '♚',
      points: language === 'vi' ? 'Vô Giá!' : 'Priceless!',
      motto: language === 'vi' ? 'Bảo vệ Vua bằng mọi giá!' : 'Protect the King at all costs!',
      movesText: language === 'vi' ? 'Đi 1 ô theo bất kỳ hướng nào. Khi Vua bị chiếu, bạn BẮT BUỘC phải giải chiếu ngay lập tức!' : 'Moves 1 square in any direction. If your King is attacked, it is in CHECK and you MUST protect it immediately!',
      specialTip: language === 'vi' ? 'Nếu Vua bị chiếu mà không còn đường thoát, đó là CHIẾU HẾT (Thắng cuộc)!' : 'If the King is attacked and cannot escape, it is CHECKMATE!',
      bg: 'from-yellow-500/20 to-amber-500/10 border-yellow-500/30',
    },
  ];

  const [selectedPiece, setSelectedPiece] = useState(PIECE_GUIDES[0]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-white p-2 sm:p-4 animate-fade-in">
      {/* Title */}
      <div className="bg-slate-900/90 border border-emerald-500/30 p-6 rounded-3xl text-center space-y-2 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-500/30 mb-1">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>{getTranslation(language, 'rules')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-emerald-300 via-lime-200 to-amber-300 bg-clip-text text-transparent">
          {language === 'vi' ? 'Học Luật Cờ Vua Cùng Thầy Cú Duo 🦉' : 'Chess Rules & Tactics Academy'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium">
          {language === 'vi'
            ? 'Bấm vào từng quân cờ bên dưới để khám phá siêu năng lực, giá trị điểm và mẹo chiến thắng!'
            : 'Click any piece below to discover its secret superpowers, point values, and winning tactics!'}
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
                ? 'bg-gradient-to-b from-emerald-500 to-lime-500 text-slate-950 font-black border-white shadow-xl scale-105'
                : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="text-3xl mb-1">{piece.icon}</div>
            <div className="text-xs font-extrabold">{piece.name.split(' ')[1]}</div>
            <div className={`text-[10px] mt-0.5 ${selectedPiece.id === piece.id ? 'text-slate-950/80' : 'text-emerald-400'}`}>
              {piece.points}
            </div>
          </button>
        ))}
      </div>

      {/* Active Piece Detailed Display */}
      <div className={`bg-gradient-to-br ${selectedPiece.bg} bg-slate-900 border p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden`}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 rounded-3xl bg-slate-950/80 border-2 border-emerald-400/50 flex items-center justify-center text-6xl shadow-2xl shrink-0">
            {selectedPiece.icon}
          </div>

          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-2xl font-black text-amber-300">{selectedPiece.name}</h3>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-500/40 w-fit mx-auto sm:mx-0">
                Giá trị: {selectedPiece.points}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 font-semibold italic">
              "{selectedPiece.motto}"
            </p>

            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400 flex items-center justify-center sm:justify-start gap-1.5">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Cách di chuyển:</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {selectedPiece.movesText}
              </p>
            </div>

            <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/30 space-y-1">
              <div className="text-xs font-bold text-amber-300 flex items-center justify-center sm:justify-start gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Mẹo từ Thầy Cú Duo:</span>
              </div>
              <p className="text-xs text-emerald-200 leading-relaxed font-semibold">
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
          <span>{language === 'vi' ? 'Tuyệt Chiêu Đặc Biệt Trong Cờ Vua' : 'Special Chess Superpowers'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1">
            <h4 className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5">
              <span>🏰 Nhập Thành (Castling)</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {language === 'vi'
                ? 'Nếu Vua và Xe chưa từng di chuyển và không có quân cờ ngáng đường, Vua đi 2 ô về phía Xe, và Xe nhảy qua đứng cạnh Vua để bảo vệ Vua an toàn!'
                : 'If your King and Rook haven\'t moved yet, the King moves 2 squares towards the Rook, and the Rook leaps over to defend the King!'}
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1">
            <h4 className="text-xs font-extrabold text-purple-400 flex items-center gap-1.5">
              <span>👑 Phong Hậu (Pawn Promotion)</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {language === 'vi'
                ? 'Khi Tốt dũng cảm đi đến tận hàng cuối cùng của đối thủ, nó ngay lập tức biến hình thành Hậu, Xe, Tượng hoặc Mã!'
                : 'When a brave Pawn marches all the way across the board to the last rank, it transforms into a Queen, Rook, Bishop, or Knight!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
