import React from 'react';
import { GameMode, BoardTheme, UserProfile, PieceStyle } from '../types/chess';
import { BOARD_THEMES } from '../utils/themes';
import { Language, getTranslation } from '../utils/i18n';
import { playSound } from '../utils/sound';
import { ChessPiece } from './ChessPiece';
import { PIECE_SET_OPTIONS } from './ChessIconGalleryModal';
import { Bot, Users, BookOpen, Puzzle, Sparkles, Settings, Flame, Star, Volume2, VolumeX, Globe, Palette, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  userProfile: UserProfile;
  onOpenProfile: () => void;
  onOpenIconGallery: () => void;
  currentTheme: BoardTheme;
  onChangeTheme: (theme: BoardTheme) => void;
  onChangePieceStyle: (style: PieceStyle) => void;
  onToggleLanguage: () => void;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  userProfile,
  onOpenProfile,
  onOpenIconGallery,
  currentTheme,
  onChangeTheme,
  onChangePieceStyle,
  onToggleLanguage,
  onToggleSound,
}) => {
  const lang = userProfile.language || 'vi';
  const currentPieceStyle = userProfile.pieceStyle || 'duo_3d';
  const activePieceOption = PIECE_SET_OPTIONS.find((p) => p.id === currentPieceStyle) || PIECE_SET_OPTIONS[0];

  const handleNavClick = (mode: GameMode) => {
    playSound.buttonClick();
    onSelectMode(mode);
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-emerald-500/30 text-white sticky top-0 z-40 shadow-2xl">
      {/* Top Duolingo Gamification Banner */}
      <div className="bg-emerald-950/80 border-b border-emerald-500/20 px-4 py-1 flex items-center justify-between text-xs font-black">
        <div className="flex items-center gap-4 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-orange-400 font-extrabold animate-pulse">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-400" />
              <span>{userProfile.streakDays || 1} {getTranslation(lang, 'streak')}</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1 text-emerald-400 font-extrabold">
              <Star className="w-4 h-4 fill-emerald-400 text-emerald-300" />
              <span>{userProfile.xp || 50} {getTranslation(lang, 'xp')}</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1 text-amber-300 font-extrabold">
              <span>⭐ {userProfile.stars} {getTranslation(lang, 'stars')}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Sound Toggle */}
            <button
              onClick={() => {
                playSound.buttonClick();
                onToggleSound();
              }}
              className="px-2 py-0.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 text-[11px] transition"
              title="Toggle Audio Sound Effects"
            >
              {userProfile.soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Sound ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden sm:inline">Sound OFF</span>
                </>
              )}
            </button>

            {/* Quick Language Toggle */}
            <button
              onClick={() => {
                playSound.buttonClick();
                onToggleLanguage();
              }}
              className="px-2.5 py-0.5 rounded-lg bg-emerald-500 text-slate-950 font-black border border-emerald-400 hover:scale-105 transition flex items-center gap-1 shadow-sm text-[11px]"
              title="Switch Language / Đổi Ngôn Ngữ"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? '🇻🇳 Tiếng Việt' : '🇬🇧 English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo & Kid Title */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div
            onClick={() => handleNavClick('training')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-emerald-400 to-lime-300 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform border border-emerald-300/40">
              🦉
            </div>
            <div>
              <h1 className="font-black text-lg sm:text-xl tracking-tight bg-gradient-to-r from-emerald-300 via-lime-200 to-amber-200 bg-clip-text text-transparent flex items-center gap-1.5">
                <span>{getTranslation(lang, 'appTitle')}</span>
              </h1>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                {getTranslation(lang, 'appSubtitle')}
              </p>
            </div>
          </div>

          {/* Mobile Profile Chip */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => {
                playSound.buttonClick();
                onOpenProfile();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-800 border border-emerald-500/40 hover:bg-slate-700 transition"
            >
              <span className="text-xl">{userProfile.avatar}</span>
              <span className="text-xs font-bold text-amber-300">⭐ {userProfile.stars}</span>
            </button>
          </div>
        </div>

        {/* Navigation Mode Tabs */}
        <nav className="flex items-center justify-center flex-wrap gap-1 bg-slate-950/90 p-1.5 rounded-2xl border border-slate-800/90 w-full md:w-auto">
          <button
            onClick={() => handleNavClick('training')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
              currentMode === 'training'
                ? 'bg-gradient-to-r from-emerald-500 to-lime-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>{getTranslation(lang, 'vsAi')}</span>
          </button>

          <button
            onClick={() => handleNavClick('dual')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
              currentMode === 'dual'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{getTranslation(lang, 'dualMode')}</span>
          </button>

          <button
            onClick={() => handleNavClick('puzzles')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
              currentMode === 'puzzles'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Puzzle className="w-4 h-4" />
            <span>{getTranslation(lang, 'puzzles')}</span>
          </button>

          <button
            onClick={() => handleNavClick('rules')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
              currentMode === 'rules'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{getTranslation(lang, 'rules')}</span>
          </button>

          {/* Dedicated Settings Button in Navbar */}
          <button
            onClick={() => {
              playSound.buttonClick();
              onOpenProfile();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 hover:text-emerald-300"
            title="Open Game Settings & User Profile"
          >
            <Settings className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'vi' ? '⚙️ Cài Đặt' : '⚙️ Settings'}</span>
          </button>
        </nav>

        {/* Right Desktop Controls & Kid Profile */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Piece Icon Quick Selector Dropdown */}
          <div className="relative group">
            <button
              onClick={() => {
                playSound.buttonClick();
                onOpenIconGallery();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-emerald-500/40 text-xs font-bold text-emerald-300 hover:text-white hover:border-emerald-400 transition shadow-sm"
              title="Choose Chess Piece Design Collection"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <ChessPiece type="k" color="w" pieceStyle={currentPieceStyle} />
              </div>
              <span>{lang === 'vi' ? activePieceOption.nameVi.split(' ')[0] + ' ' + activePieceOption.nameVi.split(' ')[1] : activePieceOption.nameEn.split(' ')[0] + ' ' + activePieceOption.nameEn.split(' ')[1]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-400 opacity-75 group-hover:rotate-180 transition-transform" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-1.5 hidden group-hover:block bg-slate-900 border border-slate-700/80 rounded-2xl p-2 shadow-2xl w-64 z-50 animate-fade-in space-y-1">
              <div className="px-3 py-1 text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-1.5 mb-1">
                <span>{lang === 'vi' ? 'Thiết Kế Quân Cờ' : 'Piece Icon Design'}</span>
                <span className="text-emerald-400 font-bold">{PIECE_SET_OPTIONS.length} Designs</span>
              </div>

              {PIECE_SET_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    playSound.buttonClick();
                    onChangePieceStyle(opt.id);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition group/item ${
                    currentPieceStyle === opt.id
                      ? 'bg-gradient-to-r from-emerald-500/20 to-lime-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Mini Icon Pair Preview */}
                    <div className="flex items-center gap-0.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
                      <div className="w-5 h-5">
                        <ChessPiece type="k" color="w" pieceStyle={opt.id} />
                      </div>
                      <div className="w-5 h-5">
                        <ChessPiece type="q" color="b" pieceStyle={opt.id} />
                      </div>
                    </div>
                    <span className="truncate">{lang === 'vi' ? opt.nameVi : opt.nameEn}</span>
                  </div>
                  {currentPieceStyle === opt.id && <span className="text-emerald-400 font-extrabold ml-1">✓</span>}
                </button>
              ))}

              <div className="border-t border-slate-800 pt-1.5 mt-1">
                <button
                  onClick={() => {
                    playSound.buttonClick();
                    onOpenIconGallery();
                  }}
                  className="w-full text-center py-1.5 rounded-xl bg-slate-950 text-emerald-400 hover:bg-emerald-500/20 text-[11px] font-extrabold transition border border-emerald-500/30 flex items-center justify-center gap-1.5"
                >
                  <Palette className="w-3 h-3 text-emerald-400" />
                  <span>{lang === 'vi' ? 'Xem Bộ Sưu Tập Mới' : 'Open Full Icon Gallery'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Theme Quick Selector */}
          <div className="relative group">
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white hover:border-amber-500/50 transition shadow-sm"
              title="Change Board Theme"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{BOARD_THEMES[currentTheme]?.name || BOARD_THEMES.duolingo.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute right-0 top-full mt-1.5 hidden group-hover:block bg-slate-900 border border-slate-700/80 rounded-2xl p-2 shadow-2xl w-52 z-50 animate-fade-in space-y-1">
              <div className="px-3 py-1 text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-1.5 mb-1">
                {lang === 'vi' ? 'Giao Diện Bàn Cờ' : 'Board Theme'}
              </div>
              {Object.values(BOARD_THEMES).map((th) => (
                <button
                  key={th.id}
                  onClick={() => {
                    playSound.buttonClick();
                    onChangeTheme(th.id);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-between transition ${
                    currentTheme === th.id
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{th.name}</span>
                  {currentTheme === th.id && <span className="text-emerald-400 font-extrabold">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Player Profile Chip */}
          <button
            onClick={() => {
              playSound.buttonClick();
              onOpenProfile();
            }}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-emerald-500/40 hover:border-emerald-400 transition shadow-lg group"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
              {userProfile.avatar}
            </div>
            <div className="text-left">
              <div className="text-xs font-extrabold text-slate-200 line-clamp-1 max-w-[110px]">
                {userProfile.name}
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400">
                <span>⭐ {userProfile.stars}</span>
              </div>
            </div>
            <Settings className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-300 transition" />
          </button>
        </div>
      </div>
    </header>
  );
};
