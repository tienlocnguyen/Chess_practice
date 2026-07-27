export type GameMode = 'training' | 'dual' | 'puzzles' | 'rules' | 'cicd';

export type AiLevel = 'bunny' | 'fox' | 'owl' | 'dragon';

export interface AiPersonality {
  id: AiLevel;
  name: string;
  title: string;
  avatar: string;
  description: string;
  difficultyText: string;
  stars: number;
  color: string;
}

export type BoardTheme = 'wood' | 'candy' | 'space' | 'forest' | 'neon';

export interface ThemeConfig {
  id: BoardTheme;
  name: string;
  lightSquare: string;
  darkSquare: string;
  highlightSelected: string;
  highlightMove: string;
  highlightCheck: string;
  bgGradient: string;
  cardBg: string;
  borderColor: string;
  textAccent: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  stars: number;
  gamesPlayed: number;
  winsVsAi: number;
  winsVsPlayer: number;
  losses: number;
  draws: number;
  puzzlesSolved: number;
  unlockedBadges: string[];
  preferredTheme: BoardTheme;
  soundEnabled: boolean;
  coachTipsEnabled: boolean;
  showLegalMoves: boolean;
  flipBoardInDualMode: boolean;
}

export interface MoveRecord {
  from: string;
  to: string;
  san: string;
  piece: string;
  captured?: string;
  promotion?: string;
  color: 'w' | 'b';
  check: boolean;
  checkmate: boolean;
  moveNumber: number;
}

export interface Puzzle {
  id: string;
  title: string;
  description: string;
  fen: string;
  solution: string[]; // sequence of SAN moves (e.g. ["Qxf7#"])
  hint: string;
  starsReward: number;
  difficulty: 'Easy' | 'Medium' | 'Tricky';
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
}
