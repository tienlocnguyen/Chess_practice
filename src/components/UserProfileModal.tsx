import React, { useState } from 'react';
import { UserProfile, BoardTheme, PieceStyle } from '../types/chess';
import { ALL_BADGES } from '../utils/storage';
import { BOARD_THEMES } from '../utils/themes';
import { ChessPiece } from './ChessPiece';
import { X, Trophy, Award, Sparkles, Volume2, VolumeX, Eye, EyeOff, Save, RotateCcw, Settings, Globe, User, Palette } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (updated: UserProfile) => void;
}

const AVATAR_OPTIONS = [
  '🦊', '🐰', '🦉', '🐲', '🦁', '🦄', '🧙‍♂️', '👑', '👸', '🚀', '🤖', '🐼', '🐯', '🐶'
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [name, setName] = useState(profile.name);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [theme, setTheme] = useState<BoardTheme>(profile.preferredTheme);
  const [pieceStyle, setPieceStyle] = useState<PieceStyle>(profile.pieceStyle || 'duo_3d');
  const [language, setLanguage] = useState(profile.language || 'vi');
  const [sound, setSound] = useState(profile.soundEnabled);
  const [coachTips, setCoachTips] = useState(profile.coachTipsEnabled);
  const [showLegal, setShowLegal] = useState(profile.showLegalMoves);
  const [flipBoard, setFlipBoard] = useState(profile.flipBoardInDualMode);

  if (!isOpen) return null;

  const handleSave = () => {
    const updated: UserProfile = {
      ...profile,
      name: name.trim() || 'Young Grandmaster',
      avatar,
      preferredTheme: theme,
      pieceStyle,
      language,
      soundEnabled: sound,
      coachTipsEnabled: coachTips,
      showLegalMoves: showLegal,
      flipBoardInDualMode: flipBoard,
    };
    onSaveProfile(updated);
    onClose();
  };

  const isVi = language === 'vi';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto text-white shadow-2xl p-5 sm:p-7 relative flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-2xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 text-2xl font-black shadow-lg">
            {avatar}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-emerald-300 flex items-center gap-2">
              <Settings className="w-5 h-5 text-emerald-400 inline-block" />
              <span>{isVi ? 'Cài Đặt Game & Hồ Sơ Player' : 'Game Settings & Player Profile'}</span>
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              {isVi ? 'Tùy chỉnh tên người chơi, ngôn ngữ, thiết kế quân cờ và giao diện' : 'Customize player name, language, chess icon designs & themes'}
            </p>
          </div>
        </div>

        {/* Settings Content Form */}
        <div className="space-y-6">
          {/* Section 1: Player Identity (Name & Avatar) */}
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-4">
            <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-amber-400" />
              <span>{isVi ? '1. Tên Người Chơi & Đại Diện' : '1. Player Name & Avatar'}</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isVi ? 'Tên Người Chơi (Lưu Tự Động)' : 'Player Name (Stored to local profile)'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={24}
                className="w-full bg-slate-950 border border-emerald-500/40 rounded-xl px-4 py-2.5 text-sm font-bold text-emerald-300 focus:outline-none focus:border-emerald-400 transition"
                placeholder={isVi ? 'Nhập tên của bạn...' : 'Enter player name...'}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {isVi ? 'Biểu Tượng Avatar' : 'Avatar Icon'}
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {AVATAR_OPTIONS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setAvatar(av)}
                    className={`w-10 h-10 rounded-2xl text-xl flex items-center justify-center transition-transform shrink-0 ${
                      avatar === av
                        ? 'bg-emerald-500 text-slate-950 scale-110 shadow-lg border-2 border-white'
                        : 'bg-slate-950 hover:bg-slate-800 border border-slate-700'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Language Preference */}
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-3">
            <h3 className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>{isVi ? '2. Ngôn Ngữ Hiển Thị (Language)' : '2. Language Setting'}</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLanguage('vi')}
                className={`p-3 rounded-2xl border font-black text-xs flex items-center justify-between transition ${
                  language === 'vi'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md'
                    : 'bg-slate-950 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">🇻🇳</span>
                  <span>Tiếng Việt</span>
                </span>
                {language === 'vi' && <span className="text-emerald-400 font-extrabold">✓</span>}
              </button>

              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`p-3 rounded-2xl border font-black text-xs flex items-center justify-between transition ${
                  language === 'en'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md'
                    : 'bg-slate-950 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">🇬🇧</span>
                  <span>English</span>
                </span>
                {language === 'en' && <span className="text-emerald-400 font-extrabold">✓</span>}
              </button>
            </div>
          </div>

          {/* Section 3: Unified Board & Piece Style Theme Selection */}
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-3">
            <h3 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isVi ? '3. Chủ Đề Giao Diện (Board & Chess Theme)' : '3. Board & Chess Theme Selection'}</span>
            </h3>

            <div className="space-y-2.5">
              {Object.values(BOARD_THEMES).map((th) => {
                const isSelected = theme === th.id;
                return (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => {
                      setTheme(th.id);
                      setPieceStyle(th.pieceStyle);
                    }}
                    className={`w-full p-3 rounded-2xl border text-left transition flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-500/30'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Live Board + Piece Preview Box */}
                      <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 shrink-0">
                        {/* 2x2 Board Preview */}
                        <div className="w-8 h-8 rounded-lg grid grid-cols-2 grid-rows-2 overflow-hidden border border-slate-700 shrink-0">
                          <div className={th.lightSquare} />
                          <div className={th.darkSquare} />
                          <div className={th.darkSquare} />
                          <div className={th.lightSquare} />
                        </div>
                        {/* Piece Icons Preview */}
                        <div className="flex items-center gap-1">
                          <div className="w-6 h-6">
                            <ChessPiece type="k" color="w" pieceStyle={th.pieceStyle} />
                          </div>
                          <div className="w-6 h-6">
                            <ChessPiece type="q" color="b" pieceStyle={th.pieceStyle} />
                          </div>
                          <div className="w-6 h-6">
                            <ChessPiece type="n" color="w" pieceStyle={th.pieceStyle} />
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-extrabold text-white flex items-center gap-2 flex-wrap">
                          <span>{th.name}</span>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {th.badge}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium line-clamp-1">
                          {isVi ? th.descriptionVi : th.descriptionEn}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] shrink-0">
                        {isVi ? 'Đang Chọn' : 'Selected'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Sound & Helpers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-slate-700/60">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                <span className="text-xs font-semibold flex items-center gap-2">
                  {sound ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                  {isVi ? 'Âm Thanh Nước Đi' : 'Sound Effects'}
                </span>
                <input
                  type="checkbox"
                  checked={sound}
                  onChange={(e) => setSound(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                <span className="text-xs font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {isVi ? 'Bóng Lời Nhắn Thầy Cú' : 'Coach Tips Speech'}
                </span>
                <input
                  type="checkbox"
                  checked={coachTips}
                  onChange={(e) => setCoachTips(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition"
          >
            {isVi ? 'Hủy' : 'Cancel'}
          </button>
          <button
            onClick={handleSave}
            className="px-7 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isVi ? 'Lưu Cài Đặt Hồ Sơ' : 'Save Settings'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
