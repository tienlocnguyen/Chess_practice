import React, { useState } from 'react';
import { UserProfile, BoardTheme } from '../types/chess';
import { ALL_BADGES } from '../utils/storage';
import { BOARD_THEMES } from '../utils/themes';
import { X, Trophy, Award, Sparkles, Volume2, VolumeX, Eye, EyeOff, Save, RotateCcw } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (updated: UserProfile) => void;
}

const AVATAR_OPTIONS = [
  '🦊', '🐰', '🦉', '🐲', '🦁', '🦄', '🧙‍♂️', '👑', '👸', '🚀', '🤖', '🐼', '🐯', '🐼', '🐶', '🦄'
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
      soundEnabled: sound,
      coachTipsEnabled: coachTips,
      showLegalMoves: showLegal,
      flipBoardInDualMode: flipBoard,
    };
    onSaveProfile(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto text-white shadow-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 text-2xl font-black shadow-lg">
            {avatar}
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-amber-300">Kid Player Profile</h2>
            <p className="text-xs text-slate-400">Customize your name, avatar, themes and view achievements</p>
          </div>
        </div>

        {/* Settings Form Grid */}
        <div className="space-y-6">
          {/* Name & Avatar Selector */}
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-4">
            <div>
              <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                Your Player Name (Saved to Local Storage)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={24}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-amber-400 transition"
                placeholder="Enter player name..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                Choose Your Avatar Icon
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {AVATAR_OPTIONS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setAvatar(av)}
                    className={`w-11 h-11 rounded-2xl text-2xl flex items-center justify-center transition-transform shrink-0 ${
                      avatar === av
                        ? 'bg-amber-500 scale-110 shadow-lg shadow-amber-500/30 border-2 border-white'
                        : 'bg-slate-900 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Summary Box */}
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Career Stats & Trophies</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/50">
                <div className="text-xl font-black text-amber-300">⭐ {profile.stars}</div>
                <div className="text-[11px] font-medium text-slate-400 mt-0.5">Total Stars</div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/50">
                <div className="text-xl font-black text-emerald-400">{profile.winsVsAi}</div>
                <div className="text-[11px] font-medium text-slate-400 mt-0.5">AI Wins</div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/50">
                <div className="text-xl font-black text-cyan-400">{profile.winsVsPlayer}</div>
                <div className="text-[11px] font-medium text-slate-400 mt-0.5">2P Wins</div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/50">
                <div className="text-xl font-black text-purple-400">{profile.puzzlesSolved}</div>
                <div className="text-[11px] font-medium text-slate-400 mt-0.5">Puzzles Cleared</div>
              </div>
            </div>
          </div>

          {/* Badges Collection */}
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Unlocked Star Badges ({profile.unlockedBadges.length} / {ALL_BADGES.length})</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {ALL_BADGES.map((b) => {
                const unlocked = profile.unlockedBadges.includes(b.id);
                return (
                  <div
                    key={b.id}
                    className={`p-2.5 rounded-xl border flex items-center gap-3 transition ${
                      unlocked
                        ? 'bg-amber-500/10 border-amber-500/40 text-white'
                        : 'bg-slate-900/50 border-slate-800 opacity-50 grayscale'
                    }`}
                  >
                    <div className="text-2xl">{b.icon}</div>
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span>{b.title}</span>
                        {unlocked && <span className="text-[10px] text-amber-400 font-extrabold">✓ Unlocked</span>}
                      </div>
                      <div className="text-[10px] text-slate-400">{b.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preferences & Theme Toggle */}
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-3">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Board Theme & Sound Settings</span>
            </h3>

            {/* Board Theme Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {Object.values(BOARD_THEMES).map((th) => (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => setTheme(th.id)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition ${
                    theme === th.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{th.name}</span>
                  {theme === th.id && <span className="text-amber-400 font-black">✓</span>}
                </button>
              ))}
            </div>

            {/* Sound & Hints Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-700/60 cursor-pointer">
                <span className="text-xs font-semibold flex items-center gap-2">
                  {sound ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                  Sound Effects
                </span>
                <input
                  type="checkbox"
                  checked={sound}
                  onChange={(e) => setSound(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-700/60 cursor-pointer">
                <span className="text-xs font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Coach Tip Speech Bubbles
                </span>
                <input
                  type="checkbox"
                  checked={coachTips}
                  onChange={(e) => setCoachTips(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-700/60 cursor-pointer">
                <span className="text-xs font-semibold flex items-center gap-2">
                  {showLegal ? <Eye className="w-4 h-4 text-cyan-400" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
                  Highlight Legal Move Dots
                </span>
                <input
                  type="checkbox"
                  checked={showLegal}
                  onChange={(e) => setShowLegal(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-700/60 cursor-pointer">
                <span className="text-xs font-semibold flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-indigo-400" />
                  Auto-Flip Board in 2P Mode
                </span>
                <input
                  type="checkbox"
                  checked={flipBoard}
                  onChange={(e) => setFlipBoard(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 hover:scale-105 transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};
