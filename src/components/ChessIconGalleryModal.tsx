import React from 'react';
import { BoardTheme, PieceStyle, UserProfile } from '../types/chess';
import { BOARD_THEMES } from '../utils/themes';
import { ChessPiece } from './ChessPiece';
import { playSound } from '../utils/sound';
import { Sparkles, Check, X } from 'lucide-react';

import chessBanner from '../assets/images/chess_icon_banner_1785145747142.jpg';

interface ChessIconGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSelectPieceStyle: (style: PieceStyle) => void;
  onChangeTheme?: (theme: BoardTheme) => void;
}

export const ChessIconGalleryModal: React.FC<ChessIconGalleryModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSelectPieceStyle,
  onChangeTheme,
}) => {
  if (!isOpen) return null;

  const currentTheme = userProfile.preferredTheme || 'duolingo';
  const lang = userProfile.language || 'vi';

  const pieceTypes = ['k', 'q', 'r', 'b', 'n', 'p'];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-slate-900 border border-emerald-500/40 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden text-white my-auto flex flex-col max-h-[90vh]">
        {/* Header Banner */}
        <div className="relative h-28 sm:h-36 overflow-hidden shrink-0 border-b border-emerald-500/30">
          <img
            src={chessBanner}
            alt="Chess Theme Collection"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-950/60 to-transparent flex items-end p-5">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-xl">
                  🎨
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-emerald-300 flex items-center gap-2">
                    <span>{lang === 'vi' ? 'Bộ Sưu Tập Chủ Đề Cờ Vua' : 'Chess Theme Collection'}</span>
                  </h2>
                  <p className="text-xs text-slate-300 font-semibold drop-shadow">
                    {lang === 'vi'
                      ? 'Mỗi chủ đề đã đồng bộ hoàn hảo màu bàn cờ và thiết kế quân cờ độc đáo!'
                      : 'Each theme perfectly matches board colors with custom piece design!'}
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

        {/* List of Unified Themes */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {Object.values(BOARD_THEMES).map((th) => {
            const isSelected = currentTheme === th.id;
            return (
              <div
                key={th.id}
                onClick={() => {
                  playSound.buttonClick();
                  if (onChangeTheme) onChangeTheme(th.id);
                  onSelectPieceStyle(th.pieceStyle);
                }}
                className={`bg-slate-950/80 p-5 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden group hover:scale-[1.01] shadow-xl ${
                  isSelected
                    ? 'border-emerald-400 ring-4 ring-emerald-500/20 bg-emerald-950/20'
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
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="w-8 h-8 rounded-lg grid grid-cols-2 grid-rows-2 overflow-hidden border border-slate-700 shrink-0">
                      <div className={th.lightSquare} />
                      <div className={th.darkSquare} />
                      <div className={th.darkSquare} />
                      <div className={th.lightSquare} />
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-amber-300">
                      {th.name}
                    </h3>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {th.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-medium max-w-2xl">
                    {lang === 'vi' ? th.descriptionVi : th.descriptionEn}
                  </p>

                  {/* Icon Set Row Preview rendered on Mini Board background */}
                  <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 flex items-center justify-around flex-wrap gap-2">
                    {/* White Pieces */}
                    <div className="flex items-center gap-2 sm:gap-4">
                      {pieceTypes.map((pt) => (
                        <div key={`w-${pt}`} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                          <ChessPiece type={pt} color="w" pieceStyle={th.pieceStyle} />
                        </div>
                      ))}
                    </div>

                    <div className="w-px h-8 bg-slate-800 hidden sm:block" />

                    {/* Black Pieces */}
                    <div className="flex items-center gap-2 sm:gap-4">
                      {pieceTypes.map((pt) => (
                        <div key={`b-${pt}`} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                          <ChessPiece type={pt} color="b" pieceStyle={th.pieceStyle} />
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
            className="px-8 py-2.5 rounded-2xl bg-emerald-500 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 hover:scale-105 transition flex items-center justify-center gap-2 mx-auto"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>{lang === 'vi' ? 'Hoàn Tất & Áp Dụng' : 'Done & Apply'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
