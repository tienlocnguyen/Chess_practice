import React from 'react';
import { PieceStyle, UserProfile } from '../types/chess';
import { ChessPiece } from './ChessPiece';
import { playSound } from '../utils/sound';
import { getTranslation } from '../utils/i18n';
import { Sparkles, Check, X, Palette, Crown, Shield, Zap } from 'lucide-react';

import chessBanner from '../assets/images/chess_icon_banner_1785145747142.jpg';

interface ChessIconGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSelectPieceStyle: (style: PieceStyle) => void;
}

export interface PieceSetOption {
  id: PieceStyle;
  nameEn: string;
  nameVi: string;
  badge: string;
  descriptionEn: string;
  descriptionVi: string;
  accentBg: string;
  tagColor: string;
}

export const PIECE_SET_OPTIONS: PieceSetOption[] = [
  {
    id: 'duo_3d',
    nameEn: 'Duo Emerald 3D Badges 🦉',
    nameVi: 'Huy Hiệu Duo 3D Nổi Bật 🦉',
    badge: 'Popular & Modern',
    descriptionEn: 'Vibrant 3D badges with glass shine and crystal-clear vector horse knight and king icons.',
    descriptionVi: 'Huy hiệu 3D nổi bật với lớp bóng thủy tinh, hình ảnh Ngựa (Mã) và Vua rõ nét tương phản cao.',
    accentBg: 'from-emerald-900/60 via-lime-950/40 to-slate-900 border-emerald-400/50',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  {
    id: 'cute_emoji',
    nameEn: 'Cute Kingdom Animals & Royals 🐴👑',
    nameVi: 'Bộ Linh Vật Ngựa & Vương Quốc 🐴👑',
    badge: 'Kid Favorite',
    descriptionEn: 'Adorable character icons with Horse (Knight) 🐴, Unicorn 🦄, Castle 🏰, and Royal Crown 👑.',
    descriptionVi: 'Bộ linh vật đáng yêu dành cho trẻ em với Ngựa (Mã) 🐴, Kỳ Lân 🦄, Lâu Đài 🏰 và Vương Miện 👑.',
    accentBg: 'from-amber-900/60 via-pink-950/40 to-slate-900 border-amber-400/50',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  {
    id: 'staunton',
    nameEn: 'Classic Staunton Vector ♟️',
    nameVi: 'Cờ Vua Staunton Truyền Thống ♟️',
    badge: 'Standard Tournament',
    descriptionEn: 'Crisp, high-contrast tournament-grade vector chess pieces used worldwide.',
    descriptionVi: 'Bộ cờ tiêu chuẩn thi đấu quốc tế, nét vẽ sắc sảo, tương phản cao truyền thống.',
    accentBg: 'from-slate-900 via-slate-800 to-amber-950/40 border-amber-400/40',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  {
    id: 'neon_cyber',
    nameEn: 'Neon Cyberpunk Arcade ⚡',
    nameVi: 'Cyberpunk Dạ Quang Neon ⚡',
    badge: 'Futuristic Glow',
    descriptionEn: 'Electric cyan and rose glowing outline icons with dark gaming atmosphere.',
    descriptionVi: 'Đường nét dạ quang phát sáng màu Cyan & Rose cực ngầu phong cách Gaming Arcade.',
    accentBg: 'from-cyan-950/60 via-slate-900 to-pink-950/40 border-cyan-400/50',
    tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  },
  {
    id: 'wood_carved',
    nameEn: 'Warm Carved Mahogany Wood 🪵',
    nameVi: 'Gỗ Trầm Khắc Tay Cổ Điển 🪵',
    badge: 'Grandmaster Warmth',
    descriptionEn: 'Rich warm birch and mahogany wood gradients with carved tactile aesthetic.',
    descriptionVi: 'Tông màu gỗ bạch dương và sồi trầm ấm, cảm giác khắc gỗ thủ công tinh tế.',
    accentBg: 'from-amber-950/80 via-orange-950/40 to-slate-900 border-amber-500/50',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  {
    id: 'flat_minimal',
    nameEn: 'Modern Flat Minimalist 🎨',
    nameVi: 'Tối Giản Hiện Đại Flat 🎨',
    badge: 'Clean & Sleek',
    descriptionEn: 'Clean geometric typography silhouettes with uncluttered focus.',
    descriptionVi: 'Hình khối phẳng tối giản hiện đại, tập trung cao độ không xao nhãng.',
    accentBg: 'from-purple-950/60 via-slate-900 to-slate-950 border-purple-400/40',
    tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  },
];

export const ChessIconGalleryModal: React.FC<ChessIconGalleryModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSelectPieceStyle,
}) => {
  if (!isOpen) return null;

  const currentStyle = userProfile.pieceStyle || 'duo_3d';
  const lang = userProfile.language || 'vi';

  const pieceTypes = ['k', 'q', 'r', 'b', 'n', 'p'];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-slate-900 border border-emerald-500/40 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden text-white my-auto flex flex-col max-h-[90vh]">
        {/* Header Banner */}
        <div className="relative h-28 sm:h-36 overflow-hidden shrink-0 border-b border-emerald-500/30">
          <img
            src={chessBanner}
            alt="Chess Piece Design Collection"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-950/60 to-transparent flex items-end p-5">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-emerald-400 to-lime-300 flex items-center justify-center text-slate-950 font-black text-xl shadow-xl">
                  🎨
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black bg-gradient-to-r from-emerald-300 via-amber-200 to-white bg-clip-text text-transparent flex items-center gap-2">
                    <span>{lang === 'vi' ? 'Chọn Thiết Kế Quân Cờ Vua' : 'Choose Chess Piece Icon Style'}</span>
                  </h2>
                  <p className="text-xs text-slate-300 font-semibold drop-shadow">
                    {lang === 'vi'
                      ? 'Bấm chọn mẫu quân cờ bạn yêu thích để thay đổi ngay lập tức trên bàn cờ!'
                      : 'Click any collection below to switch piece icons immediately!'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  playSound.buttonClick();
                  onClose();
                }}
                className="p-2 rounded-2xl bg-slate-950/80 backdrop-blur-md text-slate-300 hover:text-white hover:bg-slate-800 transition border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* List of Options */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {PIECE_SET_OPTIONS.map((opt) => {
            const isSelected = currentStyle === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => {
                  playSound.buttonClick();
                  onSelectPieceStyle(opt.id);
                }}
                className={`bg-gradient-to-r ${opt.accentBg} p-5 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden group hover:scale-[1.01] shadow-xl ${
                  isSelected
                    ? 'border-emerald-400 ring-4 ring-emerald-500/20 bg-slate-900/90'
                    : 'border-slate-800 hover:border-slate-600'
                }`}
              >
                {/* Active Indicator Chip */}
                {isSelected && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center gap-1 shadow-lg animate-pulse">
                    <Check className="w-3.5 h-3.5" />
                    <span>{lang === 'vi' ? 'Đang Dùng' : 'Selected'}</span>
                  </div>
                )}

                <div className="space-y-3">
                  {/* Title & Badge */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-black text-amber-300">
                      {lang === 'vi' ? opt.nameVi : opt.nameEn}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${opt.tagColor}`}>
                      {opt.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-medium max-w-2xl">
                    {lang === 'vi' ? opt.descriptionVi : opt.descriptionEn}
                  </p>

                  {/* Icon Set Row Preview */}
                  <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80 flex items-center justify-around flex-wrap gap-2">
                    {/* White Pieces */}
                    <div className="flex items-center gap-2 sm:gap-4">
                      {pieceTypes.map((pt) => (
                        <div key={`w-${pt}`} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                          <ChessPiece type={pt} color="w" pieceStyle={opt.id} />
                        </div>
                      ))}
                    </div>

                    <div className="w-px h-8 bg-slate-800 hidden sm:block" />

                    {/* Black Pieces */}
                    <div className="flex items-center gap-2 sm:gap-4">
                      {pieceTypes.map((pt) => (
                        <div key={`b-${pt}`} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                          <ChessPiece type={pt} color="b" pieceStyle={opt.id} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 border-t border-slate-800 p-4 text-center shrink-0">
          <button
            onClick={() => {
              playSound.buttonClick();
              onClose();
            }}
            className="px-8 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-500 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 hover:scale-105 transition"
          >
            {lang === 'vi' ? 'Hoàn Tất & Áp Dụng' : 'Done & Apply'}
          </button>
        </div>
      </div>
    </div>
  );
};
