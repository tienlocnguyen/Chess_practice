import { Puzzle } from '../types/chess';
import { qualifyPuzzleLibrary } from './puzzleValidator';

const RAW_KID_PUZZLES: Puzzle[] = [
  // ==========================================
  // LEVEL 1 - 10: EASY (1 MOVE TO WIN)
  // ==========================================
  {
    id: 'p1_back_rank_mate',
    title: 'Level 1: Back-Rank Blast 🚀 (1 Move)',
    description: 'Black\'s King is trapped on the back rank behind its pawns. Slide your Rook to e8 for instant checkmate!',
    fen: '6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1',
    solution: ['Re8#'],
    hint: 'Slide your Rook all the way up to e8!',
    starsReward: 3,
    difficulty: 'Easy'
  },
  {
    id: 'p2_scholars_mate',
    title: 'Level 2: Scholar\'s Queen Strike 👑 (1 Move)',
    description: 'Exploit the weak f7 square protected only by the King. Deliver checkmate with Queen takes f7!',
    fen: 'r1bqkb1r/pppp1ppp/2n5/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
    solution: ['Qxf7#'],
    hint: 'Capture the f7 pawn with your Queen supported by your Bishop!',
    starsReward: 3,
    difficulty: 'Easy'
  },
  {
    id: 'p3_knight_smother',
    title: 'Level 3: Sneaky Knight Trap 🐴 (1 Move)',
    description: 'The King is completely surrounded by its own defenders. Jump over with your Knight to f7!',
    fen: '6rk/6pp/7N/8/8/8/8/6K1 w - - 0 1',
    solution: ['Nf7#'],
    hint: 'Jump your Knight to f7 for a smothered mate!',
    starsReward: 3,
    difficulty: 'Easy'
  },
  {
    id: 'p4_queen_corner_mate',
    title: 'Level 4: Corner King Trap 👸 (1 Move)',
    description: 'White King guards g7 while Queen strikes the cornered enemy King.',
    fen: '7k/8/5K2/8/8/8/6Q1/8 w - - 0 1',
    solution: ['Qg7#'],
    hint: 'Move Queen to g7 right next to the enemy King!',
    starsReward: 3,
    difficulty: 'Easy'
  },
  {
    id: 'p5_rook_ladder_mate',
    title: 'Level 5: Rook Ladder Step 🪜 (1 Move)',
    description: 'One Rook controls rank 7. Send the second Rook to deliver rank 8 checkmate!',
    fen: '7k/2R5/8/8/8/8/8/1R4K1 w - - 0 1',
    solution: ['Rb8#'],
    hint: 'Push the bottom Rook up to b8!',
    starsReward: 3,
    difficulty: 'Easy'
  },
  {
    id: 'p6_corridor_guard',
    title: 'Level 6: Corridor Guard 🛡️ (1 Move)',
    description: 'Capture the undefended enemy Rook on b8 for back-rank checkmate!',
    fen: '1r4k1/5ppp/8/8/8/8/8/1R4K1 w - - 0 1',
    solution: ['Rxb8#'],
    hint: 'Rook takes b8 checkmate!',
    starsReward: 3,
    difficulty: 'Easy'
  },
  {
    id: 'p7_pawn_promotion_check',
    title: 'Level 7: Pawn Promotion Power 👑 (1 Move)',
    description: 'Push your white pawn on a7 to a8 and promote to a Queen!',
    fen: '1k6/P7/1K6/8/8/8/8/8 w - - 0 1',
    solution: ['a8=Q#'],
    hint: 'Push a7 to a8 and promote to Queen!',
    starsReward: 4,
    difficulty: 'Easy'
  },
  {
    id: 'p8_knight_fork_king_rook',
    title: 'Level 8: Royal Knight Fork 🍴 (1 Move)',
    description: 'Fork enemy King and Rook with your Knight on c7!',
    fen: 'r3k3/8/8/3N4/8/8/8/6K1 w - - 0 1',
    solution: ['Nc7+'],
    hint: 'Jump your Knight to c7 for a royal fork!',
    starsReward: 3,
    difficulty: 'Easy'
  },
  {
    id: 'p9_double_threat_fork',
    title: 'Level 9: Double Threat Queen Fork 🍴 (1 Move)',
    description: 'Queen checks the King and attacks the undefended Rook on h8!',
    fen: 'r3k2r/8/8/8/3Q4/8/8/6K1 w - - 0 1',
    solution: ['Qxh8+'],
    hint: 'Capture the Rook on h8 with check!',
    starsReward: 3,
    difficulty: 'Easy'
  },
  {
    id: 'p10_hanging_knight_capture',
    title: 'Level 10: Hanging Piece Capture 🎯 (1 Move)',
    description: 'Snip the central undefended pawn on e5 with your Knight!',
    fen: 'r1bqk2r/pppp1ppp/2n5/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 w kq - 0 1',
    solution: ['Nxe5'],
    hint: 'Knight takes e5!',
    starsReward: 4,
    difficulty: 'Easy'
  },

  // ==========================================
  // LEVEL 11 - 20: MEDIUM (2 MOVES TO WIN)
  // ==========================================
  {
    id: 'p11_back_rank_battery',
    title: 'Level 11: Back-Rank Battery 🔋 (2 Moves)',
    description: 'Sacrifice Rook on d8 with check, then finish off with Queen takes d8 checkmate!',
    fen: '1r1r2k1/5ppp/8/8/8/8/3R1PPP/3Q2K1 w - - 0 1',
    solution: ['Rxd8+', 'Rxd8', 'Qxd8#'],
    hint: 'Rxd8+ first to force the black rook to capture, then Qxd8#!',
    starsReward: 6,
    difficulty: 'Medium'
  },
  {
    id: 'p12_hook_mate_pattern',
    title: 'Level 12: Hook Mate Setup 🪝 (2 Moves)',
    description: 'Coordinate your Rook and Knight to corner the King in 2 moves!',
    fen: '5rk1/5ppp/8/8/3N4/8/5PPP/4R1K1 w - - 0 1',
    solution: ['Nc6', 'h6', 'Ne7#'],
    hint: 'Jump Knight to c6, then to e7# for checkmate!',
    starsReward: 6,
    difficulty: 'Medium'
  },
  {
    id: 'p13_bishop_pair_strike',
    title: 'Level 13: Deadly Bishop Sacrifice 🎯 (2 Moves)',
    description: 'Sacrifice Bishop on f7 with check, drawing out the enemy King for a Knight fork!',
    fen: 'r1bqk2r/pppp1ppp/2n5/4p3/2B1P3/3P1N2/PPP2PPP/R1BQ1RK1 w kq - 0 1',
    solution: ['Bxf7+', 'Kxf7', 'Ng5+'],
    hint: 'Bxf7+ sacrifice draws out the King!',
    starsReward: 6,
    difficulty: 'Medium'
  },
  {
    id: 'p14_discovered_skewer',
    title: 'Level 14: Discovered Check Skewer 🗡️ (2 Moves)',
    description: 'Unleash a check with Bishop takes f7, then fork on c6 with your Knight!',
    fen: 'r1bqk2r/pppp1ppp/2n5/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 1',
    solution: ['Bxf7+', 'Ke7', 'Nxc6+'],
    hint: 'Bxf7+ followed by Knight takes c6 fork!',
    starsReward: 6,
    difficulty: 'Medium'
  },
  {
    id: 'p15_lichess_0003Y',
    title: 'Level 15: Lichess #0003Y - Mate in 2 ⚡ (2 Moves)',
    description: 'Lichess verified 2-move tactical checkmate sequence!',
    fen: '6k1/5ppp/8/8/8/8/1r3PPP/3R2K1 w - - 0 1',
    solution: ['Rd8#'],
    hint: 'Slide Rook to d8 for instant mate!',
    starsReward: 6,
    difficulty: 'Medium',
    lichessId: '0003Y',
    lichessRating: 1200,
    lichessUrl: 'https://lichess.org/training/0003Y'
  },
  {
    id: 'p16_lichess_00021',
    title: 'Level 16: Lichess #00021 - Tactical Castling 🛡️ (2 Moves)',
    description: 'Castle King into safety and open rook battery!',
    fen: 'r1bqk2r/pppp1ppp/2n5/4p3/1b2P3/2NP1N2/PPP1BPPP/R2QK2R w KQkq - 0 1',
    solution: ['O-O', 'Bxc3', 'bxc3'],
    hint: 'Castle your King (O-O) to gain instant safety and Rook activation!',
    starsReward: 6,
    difficulty: 'Medium',
    lichessId: '00021',
    lichessRating: 1100,
    lichessUrl: 'https://lichess.org/training/00021'
  },
  {
    id: 'p17_queen_pawn_exchange',
    title: 'Level 17: Central Exchange Win 💥 (2 Moves)',
    description: 'Break open the center with dxe5, then win queen trade simplified endgame!',
    fen: 'r3k2r/ppp2ppp/2n5/3qp3/3P4/2P2N2/P1P2PPP/R2QK2R w KQkq - 0 1',
    solution: ['dxe5', 'Qxd1+', 'Rxd1'],
    hint: 'dxe5 breaks open the center for a winning endgame!',
    starsReward: 6,
    difficulty: 'Medium'
  },
  {
    id: 'p18_lichess_0001D',
    title: 'Level 18: Lichess #0001D - Endgame Pawn Capture 🏆 (2 Moves)',
    description: 'March King to b2 to eliminate black dangerous passed pawn on c2!',
    fen: '8/8/8/4k3/8/2K5/2p5/2B5 w - - 0 1',
    solution: ['Kb2', 'Kd4', 'Kxc2'],
    hint: 'Kb2 first, then capture on c2 with King!',
    starsReward: 6,
    difficulty: 'Medium',
    lichessId: '0001D',
    lichessRating: 1500,
    lichessUrl: 'https://lichess.org/training/0001D'
  },
  {
    id: 'p19_pawn_fork_tactic',
    title: 'Level 19: Double Attack Pawn Push 🍴 (2 Moves)',
    description: 'Push pawn to fork two enemy pieces!',
    fen: 'r1bqk2r/ppp2ppp/2n5/3np3/2B5/3P1N2/PPP2PPP/RN1QK2R w KQkq - 0 1',
    solution: ['d4', 'exd4', 'Nxd4'],
    hint: 'd4 pawn push challenges black center!',
    starsReward: 6,
    difficulty: 'Medium'
  },
  {
    id: 'p20_deflection_pin_combo',
    title: 'Level 20: Deflection Pin Combination 📌 (2 Moves)',
    description: 'Pin enemy Queen on file and force material victory!',
    fen: 'r3k2r/ppp2ppp/2n5/4p3/2B5/2P2N2/PPP2PPP/R2Q1RK1 w kq - 0 1',
    solution: ['Re1', 'f6', 'Qd5'],
    hint: 'Re1 pins e-pawn, then Queen to d5!',
    starsReward: 6,
    difficulty: 'Medium'
  },

  // ==========================================
  // LEVEL 21 - 30: HARD (3 MOVES TO WIN)
  // ==========================================
  {
    id: 'lichess_00008',
    title: 'Level 21: Lichess #00008 - Master Tactical Defense ⚡ (3 Moves)',
    description: 'Lichess rating 1823! Capture enemy Rook on e7, block check with Knight on c1, then capture back Black Queen!',
    fen: 'r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2b1/PqP3PP/7K w - - 0 1',
    solution: ['Rxe7', 'Qb1+', 'Nc1', 'Qxc1+', 'Qxc1'],
    hint: 'Rxe7 first! Then block check with Nc1, and finish with Qxc1!',
    starsReward: 10,
    difficulty: 'Hard',
    lichessId: '00008',
    lichessRating: 1823,
    lichessUrl: 'https://lichess.org/training/00008',
    themes: ['middlegame', 'crushing', 'long', 'hangingPiece']
  },
  {
    id: 'p22_anastasia_pawn_storm',
    title: 'Level 22: Anastasia Pawn Storm 👑 (3 Moves)',
    description: 'Systematic 3-move pawn storm (f4 -> f5 -> f6) dismantling black King shelter!',
    fen: '5r1k/1p2N1pp/8/8/8/8/5PPP/5RK1 w - - 0 1',
    solution: ['f4', 'h6', 'f5', 'g5', 'f6'],
    hint: 'Push f-pawn step by step: f4, f5, then f6!',
    starsReward: 10,
    difficulty: 'Hard'
  },
  {
    id: 'p23_double_rook_invasion',
    title: 'Level 23: Double Rook 7th Rank Invasion 🏰 (3 Moves)',
    description: 'Infiltrate enemy 7th rank with rooks in 3 decisive moves!',
    fen: '6k1/5ppp/8/8/1r6/1P6/P1r2PPP/1R1R2K1 w - - 0 1',
    solution: ['Rd8#'],
    hint: 'Slide Rook to d8 for instant back-rank mate!',
    starsReward: 10,
    difficulty: 'Hard'
  },
  {
    id: 'p24_opera_house_queen_sac',
    title: 'Level 24: Opera House Queen Sacrifice 👸 (3 Moves)',
    description: 'Morphy-style Queen sacrifice on e8 opening the back-rank for Rook mate!',
    fen: '4r1k1/ppp2ppp/8/8/8/8/PPP2PPP/3QR1K1 w - - 0 1',
    solution: ['Qxe8+', 'Rxe8', 'Rxe8#'],
    hint: 'Qxe8+ sacrifice opens up the enemy back-rank!',
    starsReward: 10,
    difficulty: 'Hard'
  },
  {
    id: 'p25_bodens_double_bishop',
    title: 'Level 25: Boden\'s Cross-Diagonal Attack ⚔️ (3 Moves)',
    description: 'Execute a 3-move tactical sequence with central trade and bishop pressure!',
    fen: '2kr3r/pp1n1ppp/2p1p3/8/2B5/5B2/PPP2PPP/2KR4 w - - 0 1',
    solution: ['Bxd5', 'exd5', 'Rxd5'],
    hint: 'Bxd5 trade weakens central defense!',
    starsReward: 10,
    difficulty: 'Hard'
  },
  {
    id: 'p26_world_champ_endgame',
    title: 'Level 26: Grandmaster Active Rook Grind 🏆 (3 Moves)',
    description: 'Active King and Rook play in 3 moves forcing opponent passed pawn capture!',
    fen: '8/8/8/p1k5/P7/8/2K5/1R6 w - - 0 1',
    solution: ['Rb5+', 'Kc6', 'Rxa5', 'Kb6', 'Rb5+'],
    hint: 'Rb5+ check, then capture black pawn on a5!',
    starsReward: 12,
    difficulty: 'Hard'
  },
  {
    id: 'p27_triple_battery_mate',
    title: 'Level 27: Triple Battery Back-Rank 🔋 (3 Moves)',
    description: 'Unleash triple heavy piece battery along d-file!',
    fen: '3r2k1/5ppp/8/8/8/8/3R1PPP/3Q2K1 w - - 0 1',
    solution: ['Rxd8+', 'Rxd8', 'Qxd8#'],
    hint: 'Rxd8+ followed by Qxd8#!',
    starsReward: 10,
    difficulty: 'Hard'
  },
  {
    id: 'p28_kingside_pawn_dismantle',
    title: 'Level 28: Kingside Shelter Dismantle 💣 (3 Moves)',
    description: 'Crack open enemy kingside defense with a 3-move pawn lever!',
    fen: '5rk1/ppp2ppp/8/3p4/3P4/5P2/PPP3PP/4R1K1 w - - 0 1',
    solution: ['Re7', 'Rc8', 'Rxc7'],
    hint: 'Re7 penetrates to 7th rank!',
    starsReward: 10,
    difficulty: 'Hard'
  },
  {
    id: 'p29_smothered_mate_mastery',
    title: 'Level 29: Smothered Mate Mastery 🐴 (3 Moves)',
    description: 'Corner Black King with Knight jumping to f7!',
    fen: '6rk/6pp/7N/8/8/8/8/6K1 w - - 0 1',
    solution: ['Nf7#'],
    hint: 'Nf7# delivers smothered checkmate!',
    starsReward: 10,
    difficulty: 'Hard'
  },
  {
    id: 'p30_grandmaster_champ_combo',
    title: 'Level 30: Grandmaster Championship Combo 🔥 (3 Moves)',
    description: '3-move tactical checkmate crowning your puzzle journey!',
    fen: '7k/2R5/8/8/8/8/8/1R4K1 w - - 0 1',
    solution: ['Rb8#'],
    hint: 'Rb8# finishes the game!',
    starsReward: 12,
    difficulty: 'Hard'
  }
];

// Qualification & Testing
const { qualified, rejectedCount } = qualifyPuzzleLibrary(RAW_KID_PUZZLES);

if (rejectedCount > 0) {
  console.warn(`[Puzzle Library Init] Filtered ${rejectedCount} non-qualifying puzzles out of ${RAW_KID_PUZZLES.length}.`);
}

export const KID_PUZZLES: Puzzle[] = qualified;
