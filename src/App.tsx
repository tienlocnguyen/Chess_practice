import React, { useState, useEffect } from 'react';
import { GameMode, BoardTheme, UserProfile } from './types/chess';
import { loadUserProfile, saveUserProfile, addStarsAndUnlockBadges } from './utils/storage';
import { BOARD_THEMES } from './utils/themes';
import { Navbar } from './components/Navbar';
import { UserProfileModal } from './components/UserProfileModal';
import { GithubDeployGuideModal } from './components/GithubDeployGuideModal';
import { ChessGameView } from './components/ChessGameView';
import { PuzzleMode } from './components/PuzzleMode';
import { KidRulesGuide } from './components/KidRulesGuide';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => loadUserProfile());
  const [currentMode, setCurrentMode] = useState<GameMode>('training');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);

  // Sync profile changes to localStorage
  const handleSaveProfile = (updated: UserProfile) => {
    setProfile(updated);
    saveUserProfile(updated);
  };

  const handleChangeTheme = (theme: BoardTheme) => {
    const updated = { ...profile, preferredTheme: theme };
    setProfile(updated);
    saveUserProfile(updated);
  };

  const handleSolvePuzzle = (rewardStars: number) => {
    const updated = addStarsAndUnlockBadges(profile, rewardStars, 'puzzle_star');
    setProfile({
      ...updated,
      puzzlesSolved: updated.puzzlesSolved + 1,
    });
  };

  const handleUpdateStats = (
    winner: 'user' | 'ai' | 'player2' | 'draw',
    mode: 'training' | 'dual',
    starsEarned: number
  ) => {
    let addBadge: string | undefined;
    let userWinsAi = profile.winsVsAi;
    let userWins2P = profile.winsVsPlayer;
    let losses = profile.losses;
    let draws = profile.draws;

    if (winner === 'user') {
      if (mode === 'training') {
        userWinsAi += 1;
        addBadge = 'bunny_slayer';
      } else {
        userWins2P += 1;
        addBadge = 'dual_champion';
      }
    } else if (winner === 'ai') {
      losses += 1;
    } else if (winner === 'draw') {
      draws += 1;
    }

    const updated = addStarsAndUnlockBadges(profile, starsEarned, addBadge);
    const finalProfile: UserProfile = {
      ...updated,
      gamesPlayed: profile.gamesPlayed + 1,
      winsVsAi: userWinsAi,
      winsVsPlayer: userWins2P,
      losses,
      draws,
    };

    setProfile(finalProfile);
    saveUserProfile(finalProfile);
  };

  const activeThemeConfig = BOARD_THEMES[profile.preferredTheme] || BOARD_THEMES.wood;

  return (
    <div className={`min-screen bg-gradient-to-b ${activeThemeConfig.bgGradient} bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors duration-300 min-h-screen`}>
      {/* Navigation Header */}
      <Navbar
        currentMode={currentMode}
        onSelectMode={(mode) => setCurrentMode(mode)}
        userProfile={profile}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenDeployModal={() => setIsDeployGuideOpen(true)}
        currentTheme={profile.preferredTheme}
        onChangeTheme={handleChangeTheme}
      />

      {/* Main App Content View */}
      <main className="flex-1 py-6 px-2 sm:px-4">
        {currentMode === 'training' && (
          <ChessGameView
            mode="training"
            theme={profile.preferredTheme}
            userProfile={profile}
            onUpdateStats={handleUpdateStats}
          />
        )}

        {currentMode === 'dual' && (
          <ChessGameView
            mode="dual"
            theme={profile.preferredTheme}
            userProfile={profile}
            onUpdateStats={handleUpdateStats}
          />
        )}

        {currentMode === 'puzzles' && (
          <PuzzleMode
            theme={profile.preferredTheme}
            userProfile={profile}
            onSolvePuzzle={handleSolvePuzzle}
          />
        )}

        {currentMode === 'rules' && <KidRulesGuide />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>♟️ Kid Chess Academy • Automatic GitHub Pages Deployment Pipeline</span>
          <button
            onClick={() => setIsDeployGuideOpen(true)}
            className="text-emerald-400 hover:underline font-semibold"
          >
            🚀 View GitHub Actions Deploy Guide
          </button>
        </div>
      </footer>

      {/* Modals */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />

      <GithubDeployGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />
    </div>
  );
}
