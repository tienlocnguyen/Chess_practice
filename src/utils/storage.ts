import { UserProfile, BoardTheme, Badge } from '../types/chess';

const PROFILE_KEY = 'kid_chess_user_profile_v1';

export const ALL_BADGES: Badge[] = [
  { id: 'first_move', title: 'First Pawn Step', description: 'Played your very first chess game!', icon: '🌱' },
  { id: 'bunny_slayer', title: 'Bunny Friend', description: 'Defeated Bunny Hop in Training Mode!', icon: '🐰' },
  { id: 'fox_master', title: 'Clever Fox Buster', description: 'Outsmarted Clever Fox!', icon: '🦊' },
  { id: 'owl_genius', title: 'Wise Owl Scholar', description: 'Beat the Wise Owl AI!', icon: '🦉' },
  { id: 'dragon_slayer', title: 'Dragon Champion', description: 'Defeated the mighty Dragon Master!', icon: '🐲' },
  { id: 'dual_champion', title: 'Friendship Grandmaster', description: 'Won a 2-Player match!', icon: '👥' },
  { id: 'puzzle_star', title: 'Puzzle Wizard', description: 'Solved a tactical kid puzzle!', icon: '🧩' },
  { id: 'star_collector', title: 'Star Collector', description: 'Earned 10 or more stars!', icon: '⭐' },
];

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Alex the Chess Knight',
  avatar: '🦊',
  stars: 5,
  gamesPlayed: 0,
  winsVsAi: 0,
  winsVsPlayer: 0,
  losses: 0,
  draws: 0,
  puzzlesSolved: 0,
  unlockedBadges: ['first_move'],
  preferredTheme: 'wood',
  soundEnabled: true,
  coachTipsEnabled: true,
  showLegalMoves: true,
  flipBoardInDualMode: true,
};

export function loadUserProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROFILE,
      ...parsed,
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile to localStorage:', err);
  }
}

export function addStarsAndUnlockBadges(
  current: UserProfile,
  addStars: number,
  newBadgeId?: string
): UserProfile {
  const newStars = current.stars + addStars;
  const newBadges = new Set(current.unlockedBadges);

  if (newBadgeId) {
    newBadges.add(newBadgeId);
  }

  if (newStars >= 10) {
    newBadges.add('star_collector');
  }

  const updated: UserProfile = {
    ...current,
    stars: newStars,
    unlockedBadges: Array.from(newBadges),
  };

  saveUserProfile(updated);
  return updated;
}
