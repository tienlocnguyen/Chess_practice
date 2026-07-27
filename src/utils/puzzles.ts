import { Puzzle } from '../types/chess';

export const KID_PUZZLES: Puzzle[] = [
  {
    id: 'p1_scholars_mate',
    title: 'Scholar\'s Mate Strike! 👑',
    description: 'White can deliver checkmate in ONE move! Look at Black\'s weak f7 square.',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: ['Qxf7#'],
    hint: 'Move your Queen (Q) to capture the pawn right next to the King on f7!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p2_back_rank',
    title: 'Back-Rank Trap! 🏰',
    description: 'Black\'s King is trapped behind its own pawns! Deliver checkmate with the Rook.',
    fen: '6k1/5ppp/8/8/8/8/8/1R2K3 w - - 0 1',
    solution: ['Rb8#'],
    hint: 'Slide your Rook all the way to the top row (b8)!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p3_knight_fork',
    title: 'Royal Knight Fork! 🐴',
    description: 'Jump your Knight to attack BOTH the King and the Queen at the exact same time!',
    fen: 'r1bqk2r/pppp1ppp/2n5/4p3/1b2n3/2N2N2/PPPPQPPP/R1B1KB1R w KQkq - 0 6',
    solution: ['Nxe4'],
    hint: 'Capture Black\'s Knight on e4 with your Knight!',
    starsReward: 3,
    difficulty: 'Medium'
  },
  {
    id: 'p4_queen_checkmate',
    title: 'Corner King Trap! 👸',
    description: 'White\'s Queen and Rook can trap the King in the corner. Find the checkmate move!',
    fen: '7k/6Q1/5K2/8/8/8/8/8 b - - 0 1',
    solution: [],
    hint: 'Look closely at the Queen right next to the King!',
    starsReward: 1,
    difficulty: 'Easy'
  },
  {
    id: 'p5_smothered_mate',
    title: 'Smothered Mate Magic! 🌟',
    description: 'Black\'s King is completely surrounded by its own pieces. Jump in with the Knight!',
    fen: '6rk/5Npp/8/8/8/8/8/4K3 w - - 0 1',
    solution: ['Nf7#'],
    hint: 'The Knight jumps to f7 to checkmate!',
    starsReward: 3,
    difficulty: 'Tricky'
  }
];
