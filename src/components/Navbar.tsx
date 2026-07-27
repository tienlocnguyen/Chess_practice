import React from 'react';
import { GameMode, BoardTheme, UserProfile } from '../types/chess';
import { BOARD_THEMES } from '../utils/themes';
import { Bot, Users, BookOpen, Puzzle, Sparkles, GitBranch, Settings, Trophy } from 'lucide-react';

interface NavbarProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  userProfile: UserProfile;
  onOpenProfile: () => void;
  onOpenDeployModal: () => void;
  currentTheme: BoardTheme;
  onChangeTheme: (theme: BoardTheme) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  userProfile,
  onOpenProfile,
  onOpenDeployModal,
  currentTheme,
  onChangeTheme,
}) => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo & Kid Title */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div
            onClick={() => onSelectMode('training')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              ♟️
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200 bg-clip-text text-transparent">
                Kid Chess Academy
              </h1>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                Learn, Play & Master Chess with AI!
              </p>
            </div>
          </div>

          {/* Mobile Profile Chip */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 transition"
            >
              <span className="text-xl">{userProfile.avatar}</span>
              <span className="text-xs font-bold text-amber-300">⭐ {userProfile.stars}</span>
            </button>
          </div>
        </div>

        {/* Navigation Mode Tabs */}
        <nav className="flex items-center justify-center flex-wrap gap-1 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800/80 w-full md:w-auto">
          <button
            onClick={() => onSelectMode('training')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              currentMode === 'training'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>VS AI Engine</span>
          </button>

          <button
            onClick={() => onSelectMode('dual')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              currentMode === 'dual'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>2-Player Mode</span>
          </button>

          <button
            onClick={() => onSelectMode('puzzles')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              currentMode === 'puzzles'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Puzzle className="w-4 h-4" />
            <span>Puzzles</span>
          </button>

          <button
            onClick={() => onSelectMode('rules')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              currentMode === 'rules'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Kid Rules</span>
          </button>

          <button
            onClick={onOpenDeployModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800 text-emerald-400`}
            title="GitHub Pages Automatic CI/CD Pipeline Setup"
          >
            <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">GitHub Deploy</span>
          </button>
        </nav>

        {/* Right Desktop Controls & Kid Profile */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Quick Selector */}
          <div className="relative group">
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white hover:border-amber-500/50 transition"
              title="Change Board Theme"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{BOARD_THEMES[currentTheme].name}</span>
            </button>
            <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-slate-900 border border-slate-700 rounded-xl p-2 shadow-2xl w-44 z-50">
              {Object.values(BOARD_THEMES).map((th) => (
                <button
                  key={th.id}
                  onClick={() => onChangeTheme(th.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                    currentTheme === th.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{th.name}</span>
                  {currentTheme === th.id && <span className="text-amber-400">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Player Profile Chip */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-amber-500/30 hover:border-amber-400 transition shadow-lg group"
          >
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
              {userProfile.avatar}
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-200 line-clamp-1 max-w-[110px]">
                {userProfile.name}
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400">
                <Trophy className="w-3 h-3 text-amber-400" />
                <span>{userProfile.stars} Stars</span>
              </div>
            </div>
            <Settings className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300 transition" />
          </button>
        </div>
      </div>
    </header>
  );
};
