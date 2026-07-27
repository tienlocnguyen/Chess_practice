import { Puzzle } from '../types/chess';

export const KID_PUZZLES: Puzzle[] = [
  // ==========================================
  // LEVEL 1 - 30: EASY (Beginner - 1 Move)
  // ==========================================
  {
    id: 'p1_back_rank_mate',
    title: 'Level 1: Back-Rank Blast! 🚀',
    description: 'Black\'s King is stuck behind its pawns on the 8th rank. Deliver checkmate with your Rook!',
    fen: '6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1',
    solution: ['Re8#'],
    hint: 'Slide your Rook all the way up to e8!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p2_scholars_mate',
    title: 'Level 2: Scholar\'s Queen Strike 👑',
    description: 'White\'s Queen and Bishop target the weak f7 pawn. Strike for victory!',
    fen: 'r1bqkb1r/pppp1ppp/2n5/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
    solution: ['Qxf7#'],
    hint: 'Capture the pawn on f7 with your Queen!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p3_knight_smother',
    title: 'Level 3: Sneaky Knight Trap 🐴',
    description: 'The King is surrounded by its own defenders. Jump over with your Knight!',
    fen: '6rk/6pp/7N/8/8/8/8/6K1 w - - 0 1',
    solution: ['Nf7#'],
    hint: 'Jump your Knight to f7!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p4_queen_corner_mate',
    title: 'Level 4: Corner King Trap 👸',
    description: 'White\'s King and Queen work together to corner the enemy King.',
    fen: '7k/8/5K2/8/8/8/6Q1/8 w - - 0 1',
    solution: ['Qg7#'],
    hint: 'Bring your Queen right next to the King on g7!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p5_rook_ladder_mate',
    title: 'Level 5: Rook Ladder Step 🪜',
    description: 'One Rook controls rank 7. Send the second Rook to deliver rank 8 checkmate!',
    fen: '7k/2R5/8/8/8/8/8/1R4K1 w - - 0 1',
    solution: ['Rb8#'],
    hint: 'Push the bottom Rook up to b8!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p6_bishop_diagonal_check',
    title: 'Level 6: Diagonal Sniper 🏹',
    description: 'White\'s Bishop has a clear line to the black King on the long diagonal.',
    fen: '6k1/8/8/8/8/5B2/8/6K1 w - - 0 1',
    solution: ['Bd5+'],
    hint: 'Find a square to check or control the long diagonal!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p7_queen_hook_mate',
    title: 'Level 7: Queen & Pawn Hook 🪝',
    description: 'The pawn on e6 guards the Queen on f7. Deliver the final blow!',
    fen: '6k1/4Q3/4P3/8/8/8/8/6K1 w - - 0 1',
    solution: ['Qf7#'],
    hint: 'Queen to f7 checkmate!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p8_double_rook_corridor',
    title: 'Level 8: Corridor Guard 🛡️',
    description: 'The enemy King has nowhere to run on rank 8!',
    fen: '1r4k1/5ppp/8/8/8/8/8/1R4K1 w - - 0 1',
    solution: ['Rxb8#'],
    hint: 'Capture the black rook on b8!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p9_pawn_promotion_mate',
    title: 'Level 9: Pawn Promotion Power 👑',
    description: 'Promote your white pawn on e7 to a Queen with checkmate!',
    fen: '4k3/4P3/4K3/8/8/8/8/8 w - - 0 1',
    solution: ['e8=Q#'],
    hint: 'Push e7 to e8 and choose Queen!',
    starsReward: 3,
    difficulty: 'Easy'
  },
  {
    id: 'p10_knight_fork_king_queen',
    title: 'Level 10: Royal Knight Fork 🍴',
    description: 'Fork Black\'s King and Queen with your Knight!',
    fen: 'r3k2r/ppp2ppp/8/3N4/8/8/PPP2PPP/R3K2R w KQkq - 0 1',
    solution: ['Nxc7+'],
    hint: 'Jump to c7 to check King and attack Rook/Queen!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p11_easy_skewer',
    title: 'Level 11: The Skewer Line 🗡️',
    description: 'Skewer the enemy King and Rook with your Rook on the 1st rank!',
    fen: 'r3k3/8/8/8/8/8/8/R3K3 w Qq - 0 1',
    solution: ['Rxa8+'],
    hint: 'Capture the undefended Rook on a8!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p12_bishop_mate_corner',
    title: 'Level 12: Corner Bishop Cross ⚔️',
    description: 'Black\'s King is stuck on h8. Slide your Bishop to f6 for mate!',
    fen: '7k/5p1p/5P2/8/8/8/1B6/6K1 w - - 0 1',
    solution: ['Bf6'],
    hint: 'Place your Bishop on f6!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p13_queen_f7_blast',
    title: 'Level 13: Classic Queen Infiltration 💥',
    description: 'White\'s Bishop on c4 protects f7. Deliver mate with the Queen!',
    fen: 'r1bqk2r/pppp1ppp/2n5/2b1p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
    solution: ['Qxf7#'],
    hint: 'Take the pawn on f7 with your Queen!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p14_back_rank_a8',
    title: 'Level 14: Left Flank Back-Rank 🚀',
    description: 'Infiltrate the a-file for back-rank checkmate!',
    fen: 'k7/1pp5/8/8/8/8/8/R5K1 w - - 0 1',
    solution: ['Ra8#'],
    hint: 'Rook to a8 checkmate!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p15_queen_h7_mate',
    title: 'Level 15: Sunlight h7 Checkmate ☀️',
    description: 'White\'s Knight on g5 guards h7. Strike with Queen!',
    fen: 'r1bq1rk1/ppp2ppp/2np4/4p1N1/2B1P3/3P3Q/PPP2PPP/R3K2R w KQ - 0 1',
    solution: ['Qxh7#'],
    hint: 'Queen takes h7 checkmate!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p16_pawn_breakthrough',
    title: 'Level 16: Golden Pawn Guard 🛡️',
    description: 'White\'s pawn on g6 shields the King. Queen to g7 checkmate!',
    fen: '6k1/5p2/6P1/8/8/8/6Q1/6K1 w - - 0 1',
    solution: ['gxf7+'],
    hint: 'Capture f7 with your pawn!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p17_rook_h8_mate',
    title: 'Level 17: East Coast Rook 🌊',
    description: 'The King on g8 is blocked by f7 and g7 pawns. Send Rook to h8!',
    fen: '6k1/5ppp/8/7R/8/8/8/6K1 w - - 0 1',
    solution: ['Rh8#'],
    hint: 'Rook to h8 checkmate!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p18_battery_queen_bishop',
    title: 'Level 18: Battery Cannon 🔋',
    description: 'Queen and Bishop lined up on c1-f7. Strike on f7!',
    fen: 'r1bq1rk1/ppp2ppp/2np4/2b1p1N1/2B1P3/3P1Q2/PPP2PPP/RNB1K2R w KQ - 0 1',
    solution: ['Qxf7+'],
    hint: 'Fire your Queen at f7!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p19_knight_fork_rooks',
    title: 'Level 19: Double Rook Fork 🍴',
    description: 'Jump your Knight to fork both black Rooks!',
    fen: '1r2k2r/ppp2ppp/8/3N4/8/8/PPP2PPP/R3K2R w KQk - 0 1',
    solution: ['Nxc7+'],
    hint: 'Knight to c7 checks the King and attacks Rooks!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p20_queen_b7_mate',
    title: 'Level 20: Queenside Crush 👑',
    description: 'White\'s Bishop on f3 supports Queen on b7.',
    fen: 'k7/1p6/8/8/8/5B2/1Q6/6K1 w - - 0 1',
    solution: ['Qxb7#'],
    hint: 'Capture the b7 pawn with Queen!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p21_easy_pin_queen',
    title: 'Level 21: Pin the Queen! 📌',
    description: 'Black\'s Queen is in front of their King on e5. Pin it with your Rook on e1!',
    fen: '4k3/8/8/4q3/8/8/8/4R1K1 w - - 0 1',
    solution: ['Rxe5+'],
    hint: 'Rook takes Queen on e5!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p22_bishop_pair_mate',
    title: 'Level 22: Twin Bishops Cross ⚔️',
    description: 'Two dark and light Bishops trap the enemy King on g8.',
    fen: '6k1/8/5K1B/8/8/8/4B3/8 w - - 0 1',
    solution: ['Bc4+'],
    hint: 'Bishop to c4 check!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p23_pawn_shield_push',
    title: 'Level 23: Marching Pawn 🎖️',
    description: 'Push your passed pawn to c8 to promote!',
    fen: '2P1k3/8/4K3/8/8/8/8/8 w - - 0 1',
    solution: ['c8=Q#'],
    hint: 'Advance pawn to c8=Q#!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p24_rook_f8_mate',
    title: 'Level 24: Top Rank Overload 💥',
    description: 'Black\'s back rank is vulnerable. Rook to f8 checkmate!',
    fen: '5rk1/5ppp/8/8/8/8/5PPP/5RK1 w - - 0 1',
    solution: ['Rxf8#'],
    hint: 'Rook takes f8 checkmate!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p25_queen_d8_mate',
    title: 'Level 25: Central Infiltration 👑',
    description: 'White\'s Rook supports Queen going to d8.',
    fen: '3k4/3p4/3K4/8/8/8/8/3Q4 w - - 0 1',
    solution: ['Qd8#'],
    hint: 'Queen to d8 checkmate!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p26_knight_e7_check',
    title: 'Level 26: Royal Outpost 🐴',
    description: 'Place your Knight on e7 to fork King and Queen!',
    fen: 'r3k2r/ppp2ppp/3q4/3N4/8/8/PPP2PPP/R3K2R w KQkq - 0 1',
    solution: ['Nxc7+'],
    hint: 'Knight to c7 checks King!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p27_king_queen_endgame_mate',
    title: 'Level 27: Roller Coaster Mate 🎢',
    description: 'White King at f6 locks Black King on h8. Deliver mate with Queen on g7!',
    fen: '7k/6p1/5K2/8/8/8/6Q1/8 w - - 0 1',
    solution: ['Qg7#'],
    hint: 'Queen to g7 checkmate!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p28_discovered_check_easy',
    title: 'Level 28: Discovered Attack 🔮',
    description: 'Move your Knight to open a direct line from your Rook to the enemy King!',
    fen: '4k3/8/8/8/4N3/8/8/4R1K1 w - - 0 1',
    solution: ['Nf6+'],
    hint: 'Move Knight to f6 giving check with Rook!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p29_rook_g7_blast',
    title: 'Level 29: Seventh Rank Monster 👾',
    description: 'Rook delivers rank 8 checkmate!',
    fen: '6k1/6r1/5K2/8/8/8/8/7R w - - 0 1',
    solution: ['Rh8#'],
    hint: 'Rook to h8 checkmate!',
    starsReward: 2,
    difficulty: 'Easy'
  },
  {
    id: 'p30_queen_h8_mate',
    title: 'Level 30: Corner Solitude 👑',
    description: 'Queen on h5 supported by Bishop on c3 goes to h8 mate!',
    fen: '6k1/5p1p/8/7Q/8/2B5/8/6K1 w - - 0 1',
    solution: ['Qh8#'],
    hint: 'Queen to h8 checkmate!',
    starsReward: 3,
    difficulty: 'Easy'
  },

  // ==========================================
  // LEVEL 31 - 65: MEDIUM (Intermediate - 2 Moves)
  // ==========================================
  {
    id: 'p31_duo_double_strike',
    title: 'Level 31: Duo\'s Double Strike ⚡',
    description: 'Sacrifice Queen on h7+ to draw King out, then slide Rook to h3# for Checkmate!',
    fen: '6rk/5p1p/5P2/8/8/7R/6QP/7K w - - 0 1',
    solution: ['Qxh7+', 'Kxh7', 'Rh3#'],
    hint: 'Step 1: Queen takes h7+! Step 2: Rook to h3#',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p32_pin_and_bishop_strike',
    title: 'Level 32: Pin & Bishop Strike 📌',
    description: 'Bishop takes f7+ drawing the Rook away, then invade e8 with your Rook!',
    fen: 'r1b2rk1/ppp2ppp/8/3B4/8/5Q2/PPP2PPP/4R1K1 w - - 0 1',
    solution: ['Bxf7+', 'Rxf7', 'Re8#'],
    hint: 'Step 1: Bishop takes f7+! Step 2: Rook to e8#',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p33_rook_pin_queen',
    title: 'Level 33: Rook Pin & Queen Capture 👑',
    description: 'Pin Black\'s Queen to their King using your Rook on e1, then capture it!',
    fen: 'r1b1k2r/pppp1ppp/8/4q3/2B5/8/P1P2PPP/R2Q1RK1 w kq - 0 1',
    solution: ['Re1', 'Qxe1+', 'Rxe1+'],
    hint: 'Step 1: Rook to e1! Step 2: Recapture Queen on e1!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p34_deflection_mate_2',
    title: 'Level 34: Royal Deflection 🧲',
    description: 'Deflect the black Queen from defending f7!',
    fen: 'r1b1kb1r/pppp1qpp/8/4N3/2B1P3/8/PPP2PPP/R2QK2R w KQkq - 0 1',
    solution: ['Bxf7+', 'Ke7', 'Nxf7'],
    hint: 'Bishop takes f7+ checking King!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p35_knight_fork_tactic_2',
    title: 'Level 35: Golden Knight Fork 🍴',
    description: 'Sacrifice your Bishop on f7+ then jump your Knight to g5+ forking King and Queen!',
    fen: 'r1bqk2r/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
    solution: ['Bxf7+', 'Kxf7', 'Ng5+'],
    hint: 'Step 1: Bishop takes f7+! Step 2: Knight to g5+!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p36_greek_gift_lite',
    title: 'Level 36: Mini Greek Gift 🎁',
    description: 'Sacrifice your Bishop on h7+ to pull out the enemy King!',
    fen: 'r1bq1rk1/ppp2ppp/2np4/4p3/2B1P1n1/3P1N2/PPP2PPP/R2Q1RK1 w - - 0 1',
    solution: ['Bxf7+', 'Rxf7', 'c3'],
    hint: 'Bishop takes f7+!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p37_back_rank_decoy_2',
    title: 'Level 37: Back-Rank Decoy 🎣',
    description: 'Force Black\'s Rook off the 8th rank to deliver checkmate!',
    fen: '3r2k1/5ppp/8/8/3Q4/8/5PPP/3R2K1 w - - 0 1',
    solution: ['Qxd8+', 'Rxd8', 'Rxd8#'],
    hint: 'Step 1: Queen takes d8+! Step 2: Rook takes d8#',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p38_battery_f7_2',
    title: 'Level 38: Double Battery Blast 🔋',
    description: 'Infiltrate on f7 with Queen supported by Rook on f1!',
    fen: 'r1bqk2r/pppp1ppp/8/4n3/2B1P3/8/PPP2PPP/RNBQ1RK1 w kq - 0 1',
    solution: ['Bxf7+', 'Nxf7', 'Qd5'],
    hint: 'Bishop takes f7+ first!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p39_queen_rook_battery_h7',
    title: 'Level 39: h7 Cannon Assault 💣',
    description: 'Sacrifice Queen on h7 to force King out, followed by Rook mate!',
    fen: '5r1k/6pp/8/8/8/7Q/6R1/7K w - - 0 1',
    solution: ['Qxh7+', 'Kxh7', 'Rh2#'],
    hint: 'Step 1: Queen takes h7+! Step 2: Rook to h2#',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p40_underpromotion_knight',
    title: 'Level 40: Underpromotion Trick 🦄',
    description: 'Promote to a Knight with check to win the enemy Queen!',
    fen: '8/2P1k3/8/8/8/8/q7/2K5 w - - 0 1',
    solution: ['c8=N+', 'Ke6', 'Nxa7'],
    hint: 'Promote c7 to a Knight on c8 to fork King and Queen!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p41_discovered_check_win_queen',
    title: 'Level 41: Discovered Queen Trap 👑',
    description: 'Check Black King with Bishop while your Queen attacks theirs!',
    fen: 'r1bqk2r/pppp1ppp/2n5/4P3/2B1n3/5N2/PPP2PPP/RNBQK2R w KQkq - 0 1',
    solution: ['Bxf7+', 'Kxf7', 'Qxd8'],
    hint: 'Step 1: Bishop takes f7+! Step 2: Queen takes Queen on d8!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p42_skewer_king_rook_2',
    title: 'Level 42: Long Range Skewer 🏹',
    description: 'Check the King on h8 and win the Rook behind it on a8!',
    fen: 'r6k/8/8/8/8/8/8/1Q4K1 w - - 0 1',
    solution: ['Qg6', 'Rb8', 'Qf6+'],
    hint: 'Position Queen for maximum pressure!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p43_trapped_piece_2',
    title: 'Level 43: Trapped Knight Hunt 🕸️',
    description: 'Trapped Black Knight on a2! Attack it with your King or Bishop!',
    fen: `n7/8/8/8/8/8/2P5/3K4 w - - 0 1`,
    solution: ['Kc1', 'Kb7', 'Kb2'],
    hint: 'March King to c1 and b2 to capture the trapped knight!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p44_rook_elevator_2',
    title: 'Level 44: Rook Elevator 🛗',
    description: 'Lift your Rook to rank 3 then swing to h3 for mate!',
    fen: '6rk/5ppp/8/8/8/1R6/6PP/6K1 w - - 0 1',
    solution: ['Rb7', 'Rf8', 'Rxf7'],
    hint: 'Attack f7 with your Rook!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p45_smothered_lite_2',
    title: 'Level 45: Mini Smothered Mate 🐴',
    description: 'Knight to f7 checks the King trapped by its own pieces!',
    fen: '6rk/6pp/5N2/8/8/8/8/6K1 w - - 0 1',
    solution: ['Nf7#'],
    hint: 'Knight to f7 is instant smothered mate!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p46_bishop_sacrifice_h6',
    title: 'Level 46: Bishop Breakout 💥',
    description: 'Sacrifice Bishop on h6 to destroy Black\'s pawn fortress!',
    fen: 'r1bq1rk1/ppp2p1p/2np2p1/4p3/2B1P3/3P1N2/PPP2PPP/R2Q1RK1 w - - 0 1',
    solution: ['Bxf7+', 'Rxf7', 'Qd2'],
    hint: 'Bishop takes f7+!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p47_queen_exchange_endgame',
    title: 'Level 47: Simplification to Victory 🏆',
    description: 'Force Queen exchange when you are ahead a full Rook!',
    fen: 'r3k2r/ppp2ppp/8/4Q3/8/8/PPP2PPP/R3K2R w KQkq - 0 1',
    solution: ['Qxe7+', 'Kxe7', 'O-O-O'],
    hint: 'Exchange Queens on e7 then castle!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p48_double_check_2',
    title: 'Level 48: Double Check Explosion 💥',
    description: 'Deliver check with BOTH Bishop and Rook at the same time!',
    fen: 'r1b1k2r/pppp1ppp/8/4N3/2B5/8/PPP2PPP/R2Q1RK1 w kq - 0 1',
    solution: ['Bxf7+', 'Ke7', 'Re1'],
    hint: 'Bishop takes f7+ then Rook to e1!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p49_overworked_defender_2',
    title: 'Level 49: Overworked Guard 🛡️',
    description: 'Black\'s Queen guards both c7 and e8. Overload it!',
    fen: 'r2q1rk1/ppp2ppp/8/4N3/2B5/8/PPP2PPP/R2Q1RK1 w - - 0 1',
    solution: ['Bxf7+', 'Rxf7', 'Qxd8+'],
    hint: 'Take f7 with Bishop first!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p50_queen_deflection_backrank',
    title: 'Level 50: Golden Deflection 🌟',
    description: 'Capture on f8 with your Queen for checkmate!',
    fen: '5rk1/5ppp/8/8/8/5Q2/5PPP/5RK1 w - - 0 1',
    solution: ['Qxf8#'],
    hint: 'Queen takes f8 checkmate!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p51_pin_knight_win_material',
    title: 'Level 51: Pin and Win Material 📌',
    description: 'Pin Black\'s Knight on f6 using Bishop on g5!',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
    solution: ['Bg5', 'h6', 'Bxf6'],
    hint: 'Pin Knight with Bg5!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p52_pawn_fork_pieces',
    title: 'Level 52: Pawn Fork Frenzy 🍴',
    description: 'Push your pawn to e5 to fork Black\'s Knight and Bishop!',
    fen: 'r1bqk2r/pppp1ppp/2n5/4p3/2B1n3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
    solution: ['d4', 'exd4', 'e5'],
    hint: 'Push d4 then e5 to fork two pieces!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p53_f7_weakness_sacrifice',
    title: 'Level 53: F7 Weakness Strike 🎯',
    description: 'Rip open the King\'s shelter with Bxf7+!',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
    solution: ['Bxf7+', 'Kxf7', 'Nxe5+'],
    hint: 'Bishop takes f7+ followed by Nxe5+!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p54_rook_seventh_rank_2',
    title: 'Level 54: Seventh Rank Terror 🦖',
    description: 'Infiltrate Rook on c7 targeting both f7 and g7 pawns!',
    fen: '2r3k1/5ppp/8/8/8/8/2R2PPP/6K1 w - - 0 1',
    solution: ['Rxc8#'],
    hint: 'Rook takes c8# back rank mate!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p55_trapped_queen_2',
    title: 'Level 55: Trapped Queen Hunt 🕸️',
    description: 'Black\'s Queen is stranded on a4. Trap it with b3!',
    fen: 'r1b1k2r/pppp1ppp/8/8/q7/2P5/PP1PPPPP/R1BQKB1R w KQkq - 0 1',
    solution: ['b3', 'Qxa2', 'Rxa2'],
    hint: 'Push b3 to attack Queen!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p56_xray_attack_2',
    title: 'Level 56: X-Ray Vision 👁️',
    description: 'X-Ray through the enemy Rook to checkmate on d8!',
    fen: '3r2k1/5ppp/8/8/3R4/8/5PPP/3R2K1 w - - 0 1',
    solution: ['Rxd8+', 'Rxd8', 'Rxd8#'],
    hint: 'Rook takes d8+!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p57_corner_king_stalemate_escape',
    title: 'Level 57: Break the Lock! 🔓',
    description: 'Avoid stalemate and deliver checkmate with your Queen!',
    fen: '7k/8/6K1/8/8/8/6Q1/8 w - - 0 1',
    solution: ['Qa8#'],
    hint: 'Queen to a8# checkmate!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p58_knight_outpost_e6',
    title: 'Level 58: Outpost Knight Invasion 🏰',
    description: 'Plant your Knight on e6 to attack King and Rook!',
    fen: 'r3k2r/ppp2ppp/4b3/3N4/8/8/PPP2PPP/R3K2R w KQkq - 0 1',
    solution: ['Nxc7+', 'Ke7', 'Nxa8'],
    hint: 'Knight to c7+ forks King and Rook!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p59_bishop_skewer_king_queen',
    title: 'Level 59: Diagonal Skewer 🗡️',
    description: 'Bishop to g5 skewering King on e7 and Queen on d8!',
    fen: 'r2qk2r/ppp1bppp/2n2n2/4p3/4P3/5N2/PPP2PPP/RNBQ1RK1 w kq - 0 1',
    solution: ['Bg5', 'h6', 'Bxf6'],
    hint: 'Develop Bishop to g5!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p60_pawn_storm_breakthrough',
    title: 'Level 60: Pawn Storm Breakthrough ⚡',
    description: 'Push g6 to rip open the black King\'s pawn cover!',
    fen: '6k1/5p1p/6p1/8/8/8/5PPP/6K1 w - - 0 1',
    solution: ['g4', 'h6', 'h4'],
    hint: 'Advance g4 and h4 to march pawns!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p61_queen_rook_battery_f7',
    title: 'Level 61: F7 Heavy Artillery 💣',
    description: 'Stack Queen and Rook on the f-file to crush f7!',
    fen: 'r1bq1rk1/ppp2ppp/2n5/4p3/2B1P3/5Q2/PPP2PPP/R1B1K2R w KQ - 0 1',
    solution: ['Bxf7+', 'Rxf7', 'Qxf7+'],
    hint: 'Bishop takes f7+!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p62_clearance_sacrifice_2',
    title: 'Level 62: Clearance Sacrifice 🧹',
    description: 'Move your Knight out of the way to clear line for your Queen!',
    fen: 'r1bqk2r/ppp2ppp/2n5/3pP3/2BP4/5N2/PPP2PPP/R2QK2R w KQkq d6 0 1',
    solution: ['exd6', 'cxd6', 'O-O'],
    hint: 'En passant take on d6!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p63_royal_family_fork',
    title: 'Level 63: Family Fork! 🍴',
    description: 'Fork King, Queen, AND Rook with your Knight on c7!',
    fen: 'r3k2r/ppp1qppp/8/3N4/8/8/PPP2PPP/R3K2R w KQkq - 0 1',
    solution: ['Nxc7+', 'Kd8', 'Nxa8'],
    hint: 'Knight to c7+ check!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p64_back_rank_double_rook',
    title: 'Level 64: Twin Rooks Back-Rank 🚀',
    description: 'Both Rooks combine to force back-rank checkmate!',
    fen: '3r2k1/5ppp/8/8/8/8/1R3PPP/1R4K1 w - - 0 1',
    solution: ['Rb8', 'Rxb8', 'Rxb8#'],
    hint: 'Rook to b8!',
    starsReward: 4,
    difficulty: 'Medium'
  },
  {
    id: 'p65_smothered_queen_trap',
    title: 'Level 65: Smothered Queen Trap 🐴👑',
    description: 'Sacrifice Queen on g8 to force Rook block, then Knight to f7#!',
    fen: '6rk/6pp/7N/8/8/8/1Q6/7K w - - 0 1',
    solution: ['Qg8+', 'Rxg8', 'Nf7#'],
    hint: 'Step 1: Queen to g8+! Step 2: Knight to f7# smothered mate!',
    starsReward: 5,
    difficulty: 'Medium'
  },

  // ==========================================
  // LEVEL 66 - 85: TRICKY (Advanced - 2-3 Moves)
  // ==========================================
  {
    id: 'p66_anastasias_mate',
    title: 'Level 66: Anastasia\'s Mate Legend 🌟',
    description: 'Sacrifice Queen on h7+ to open h-file, then Rook to h3# checkmate!',
    fen: '5r1k/1p2N1pp/8/8/8/7Q/5PPP/6KR w - - 0 1',
    solution: ['Qxh7+', 'Kxh7', 'Rh3#'],
    hint: 'Step 1: Queen takes h7+! Step 2: Rook to h3#',
    starsReward: 5,
    difficulty: 'Tricky'
  },
  {
    id: 'p67_bodens_double_bishop',
    title: 'Level 67: Boden\'s Double Bishop Mate ⚔️',
    description: 'Sacrifice Queen on c6+ to tear open Black\'s pawn wall, then Bishop to a6#!',
    fen: '2kr3r/pp1n1ppp/2p1p3/8/2B5/1Q3B2/PPP2PPP/2KR4 w - - 0 1',
    solution: ['Qxc6+', 'bxc6', 'Ba6#'],
    hint: 'Step 1: Queen takes c6+! Step 2: Bishop to a6#',
    starsReward: 5,
    difficulty: 'Tricky'
  },
  {
    id: 'p68_greek_gift_full',
    title: 'Level 68: The Classic Greek Gift 🎁',
    description: 'Sacrifice Bishop on h7+, follow up with Ng5+ and Qh5!',
    fen: 'r1bq1rk1/ppp2ppp/2np4/4p3/2B1P3/3P1N2/PPP2PPP/R2Q1RK1 w - - 0 1',
    solution: ['Bxf7+', 'Rxf7', 'Ng5'],
    hint: 'Bxf7+ followed by Ng5!',
    starsReward: 5,
    difficulty: 'Tricky'
  },
  {
    id: 'p69_blackburne_mate',
    title: 'Level 69: Blackburne\'s Mate 🌟',
    description: 'Two Bishops weave a deadly checkmate on the black King!',
    fen: '6rk/5p1p/5n2/8/2B5/8/1B6/6K1 w - - 0 1',
    solution: ['Bxf6+', 'Rg7', 'Bxg7#'],
    hint: 'Bishop takes f6+ then Bishop takes g7#!',
    starsReward: 5,
    difficulty: 'Tricky'
  },
  {
    id: 'p70_damiano_mate',
    title: 'Level 70: Damiano\'s Mate 👑',
    description: 'Pawn on g6 locks the King, Queen infiltrates to h7!',
    fen: '6rk/5p1p/6P1/8/8/7Q/8/6K1 w - - 0 1',
    solution: ['Qxh7#'],
    hint: 'Queen takes h7# instant mate!',
    starsReward: 5,
    difficulty: 'Tricky'
  },
  {
    id: 'p71_loli_mate_3',
    title: 'Level 71: Lolli\'s Pawn & Queen Mate ♟️',
    description: 'Pawn on f6 wedges into Black\'s castle. Queen to g7 checkmate!',
    fen: '6rk/5p1p/5P2/8/8/7Q/8/6K1 w - - 0 1',
    solution: ['Qh6', 'Rg7', 'Qxg7#'],
    hint: 'Queen to h6 targeting g7!',
    starsReward: 5,
    difficulty: 'Tricky'
  },
  {
    id: 'p72_opera_house_mate_3',
    title: 'Level 72: Morphy\'s Opera House Tactic 🎭',
    description: 'Sacrifice Queen on b8+ to force Rook block, then Rook to d8# checkmate!',
    fen: '1r2kb1r/p2n1ppp/4p3/4P3/3Q4/8/PPP2PPP/3R1RK1 w k - 0 1',
    solution: ['Qxd7#'],
    hint: 'Queen takes d7# mate!',
    starsReward: 5,
    difficulty: 'Tricky'
  },
  {
    id: 'p73_pillsbury_mate_3',
    title: 'Level 73: Pillsbury\'s Mate 💣',
    description: 'Rook on g1 and Bishop on b2 line up against the King on g8!',
    fen: '6rk/5p1p/5n2/8/8/8/1B4PP/6RK w - - 0 1',
    solution: ['Bxf6+', 'Rg7', 'Bxg7#'],
    hint: 'Bishop takes f6+!',
    starsReward: 5,
    difficulty: 'Tricky'
  },
  {
    id: 'p74_retis_mate_3',
    title: 'Level 74: Réti\'s Mating Net 🕸️',
    description: 'Bishop and Rook collaborate in the center to trap the uncastled King!',
    fen: '3k4/3p4/8/3B4/8/8/3R4/3K4 w - - 0 1',
    solution: ['Bc6', 'Kc8', 'Bxd7+'],
    hint: 'Bishop to c6 pinning d7!',
    starsReward: 5,
    difficulty: 'Tricky'
  },
  {
    id: 'p75_morphy_combination_3',
    title: 'Level 75: Morphy\'s Triple Cannon 🚀',
    description: 'A 3-move combination! Sacrifice Queen on f7+, then Rooks crush e8 and f8!',
    fen: 'r1b2rk1/ppp2ppp/8/8/3q4/5Q2/PPP3PP/4RR1K w - - 0 1',
    solution: ['Qxf7+', 'Rxf7', 'Re8+', 'Rf8', 'Rxf8#'],
    hint: 'Step 1: Queen takes f7+! Step 2: Rook to e8+! Step 3: Rxf8#',
    starsReward: 6,
    difficulty: 'Tricky'
  },
  {
    id: 'p76_hook_and_ladder_mate',
    title: 'Level 76: Royal Hook & Knight Ladder 🪝',
    description: 'Sacrifice Knight on f7 then Rook down to e8#!',
    fen: 'r4rk1/ppp2ppp/3N4/8/8/8/PPP2PPP/4R1K1 w - - 0 1',
    solution: ['Nxf7', 'Rxf7', 'Re8#'],
    hint: 'Step 1: Knight takes f7! Step 2: Rook to e8#',
    starsReward: 6,
    difficulty: 'Tricky'
  },
  {
    id: 'p77_arabian_mate_3',
    title: 'Level 77: Arabian Knight & Rook Mate 🐪',
    description: 'Knight on f6 shields the Rook on h7 to deliver Arabian Mate!',
    fen: '7k/7p/5N2/8/8/8/8/6RK w - - 0 1',
    solution: ['Rg8#'],
    hint: 'Rook to g8# supported by Knight!',
    starsReward: 5,
    difficulty: 'Tricky'
  },
  {
    id: 'p78_dovetail_mate_3',
    title: 'Level 78: Dovetail Queen Mate 🕊️',
    description: 'Position your Queen diagonally adjacent to enemy King blocked by friendly pieces!',
    fen: '6k1/5p2/6p1/7Q/8/8/8/6K1 w - - 0 1',
    solution: ['Qxg6+', 'Kf8', 'Qf7#'],
    hint: 'Queen takes g6+!',
    starsReward: 5,
    difficulty: 'Tricky'
  },
  {
    id: 'p79_epaulette_mate_3',
    title: 'Level 79: Epaulette Mate 👑',
    description: 'Black King flanked by two Rooks. Deliver mate straight down the middle!',
    fen: '1r1k1r2/8/3Q4/8/8/8/8/6K1 w - - 0 1',
    solution: ['Qxf8+', 'Kc7', 'Qxe7+'],
    hint: 'Queen takes f8+ check!',
    starsReward: 5,
    difficulty: 'Tricky'
  },
  {
    id: 'p80_swallow_tail_mate_3',
    title: 'Level 80: Swallow\'s Tail Mate 🕊️',
    description: 'Queen supported by Rook checks King backed by its own Rooks!',
    fen: '2rkr3/8/3Q4/8/8/8/8/6K1 w - - 0 1',
    solution: ['Qd7#'],
    hint: 'Queen to d7# mate!',
    starsReward: 5,
    difficulty: 'Tricky'
  },
  {
    id: 'p81_guuerini_mate_3',
    title: 'Level 81: Guerrini\'s Diagonal Trap ⚔️',
    description: 'Bishop and Queen trap the King on the corner light squares.',
    fen: '6k1/6p1/6B1/8/8/4Q3/8/6K1 w - - 0 1',
    solution: ['Qe8#'],
    hint: 'Queen to e8# mate!',
    starsReward: 5,
    difficulty: 'Tricky'
  },
  {
    id: 'p82_kill_box_mate_3',
    title: 'Level 82: The Kill Box Mate 📦',
    description: 'Rook and Queen lock the King in a 3x3 kill box!',
    fen: '6rk/6p1/5p2/8/8/4Q3/6R1/7K w - - 0 1',
    solution: ['Qh3#'],
    hint: 'Queen to h3# checkmate!',
    starsReward: 5,
    difficulty: 'Tricky'
  },
  {
    id: 'p83_triangle_mate_3',
    title: 'Level 83: Triangle Mate 🔺',
    description: 'Queen, Rook, and Bishop form a triangular prison around the King!',
    fen: '6rk/6p1/5p2/8/3B4/4Q3/6R1/7K w - - 0 1',
    solution: ['Qh3#'],
    hint: 'Queen to h3# mate!',
    starsReward: 5,
    difficulty: 'Tricky'
  },
  {
    id: 'p84_corner_hook_mate_3',
    title: 'Level 84: Corner Hook Trap 🪝',
    description: 'Rook on a7 and Knight on f6 lock down h8 King!',
    fen: '7k/R7/5N2/8/8/8/8/6K1 w - - 0 1',
    solution: ['Rh7#'],
    hint: 'Rook to h7 checkmate!',
    starsReward: 5,
    difficulty: 'Tricky'
  },
  {
    id: 'p85_double_knight_mate_3',
    title: 'Level 85: Twin Knights Leap 🐴🐴',
    description: 'Two Knights working together to checkmate in the corner!',
    fen: '7k/7p/5N1N/8/8/8/8/6K1 w - - 0 1',
    solution: ['Nf7#'],
    hint: 'Knight to f7# smothered checkmate!',
    starsReward: 5,
    difficulty: 'Tricky'
  },

  // ==========================================
  // LEVEL 86 - 105+: EXPERT (Master - 3-4 Moves)
  // ==========================================
  {
    id: 'p86_kasparov_immortal_combo',
    title: 'Level 86: Kasparov\'s Immortal Combination 👑',
    description: 'Sacrifice Rook on d8+ then Queen to f7+ to launch a legendary master king hunt!',
    fen: 'r2r2k1/ppp2ppp/8/4N3/2B5/8/PPP2PPP/3R1RK1 w - - 0 1',
    solution: ['Rxd8+', 'Rxd8', 'Bxf7+', 'Kf8', 'Bb3'],
    hint: 'Step 1: Trade Rooks on d8+! Step 2: Bishop takes f7+!',
    starsReward: 7,
    difficulty: 'Expert'
  },
  {
    id: 'p87_evergreen_game_tactic',
    title: 'Level 87: The Evergreen Game Finish 🌲',
    description: 'Anderssen\'s immortal idea! Sacrifice Queen to force checkmate with double Bishop and Rook!',
    fen: 'r1bk3r/pp1p1ppp/2p5/8/2B1q3/8/PPP2PPP/R1B1R1K1 w - - 0 1',
    solution: ['Rxe4', 'd5', 'Bxd5'],
    hint: 'Step 1: Capture Black\'s Queen on e4 with your Rook!',
    starsReward: 7,
    difficulty: 'Expert'
  },
  {
    id: 'p88_immortal_game_bishop_sac',
    title: 'Level 88: The Immortal Game Sacrifice 💎',
    description: 'Sacrifice your Bishop on f7+ then march your Knight to d5 for total domination!',
    fen: 'r1bqk2r/pppp1ppp/2n5/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1',
    solution: ['Bxf7+', 'Kxf7', 'Nxe5+', 'Nxe5', 'Qh5+'],
    hint: 'Step 1: Bishop takes f7+! Step 2: Knight to e5+!',
    starsReward: 7,
    difficulty: 'Expert'
  },
  {
    id: 'p89_fisher_game_of_century',
    title: 'Level 89: Fischer\'s Game of the Century ⚡',
    description: 'Bobby Fischer\'s famous Queen sacrifice on Be6!! Destroy the King\'s cover!',
    fen: 'r1bq1rk1/ppp2ppp/2n5/4p3/2B1P3/3P1N2/PPP2PPP/R2Q1RK1 w - - 0 1',
    solution: ['Bxf7+', 'Rxf7', 'Ng5'],
    hint: 'Bishop takes f7+ followed by Ng5!',
    starsReward: 7,
    difficulty: 'Expert'
  },
  {
    id: 'p90_tal_magician_combo',
    title: 'Level 90: Mikhail Tal\'s Fire on the Board 🔥',
    description: 'The Magician from Riga sacrifices piece after piece to hunt down the Black King!',
    fen: 'r1b2rk1/pp1n1ppp/2p1p3/q7/2B1P3/2P2N2/PP1Q1PPP/R3K2R w KQ - 0 1',
    solution: ['Bxf7+', 'Rxf7', 'Ng5'],
    hint: 'Bxf7+ unleashing the knight on g5!',
    starsReward: 7,
    difficulty: 'Expert'
  },
  {
    id: 'p91_capablanca_endgame_mastery',
    title: 'Level 91: Capablanca\'s Endgame Precision ♟️',
    description: 'Pass the pawn on c6 and restrict Black\'s King with quiet precision!',
    fen: '4k3/2P5/4K3/8/8/8/8/8 w - - 0 1',
    solution: ['c8=Q#'],
    hint: 'Promote c7 to c8=Q# checkmate!',
    starsReward: 7,
    difficulty: 'Expert'
  },
  {
    id: 'p92_alekhines_gun_explosion',
    title: 'Level 92: Alekhine\'s Gun Explosion 🔫',
    description: 'Heavy pieces on the f-file smash Black\'s back rank!',
    fen: '5rk1/5ppp/8/8/8/5Q2/5PPP/5RK1 w - - 0 1',
    solution: ['Qxf8#'],
    hint: 'Queen takes f8 checkmate!',
    starsReward: 7,
    difficulty: 'Expert'
  },
  {
    id: 'p93_carlsen_positional_squeeze',
    title: 'Level 93: Carlsen\'s Endgame Squeeze 🍋',
    description: 'Squeeze Black in the endgame with unstoppable King centralization and pawn push!',
    fen: '8/2p5/1p1k4/1P6/3K4/8/8/8 w - - 0 1',
    solution: ['Kc4', 'Ke5', 'Kb4'],
    hint: 'King to c4 controlling entry squares!',
    starsReward: 7,
    difficulty: 'Expert'
  },
  {
    id: 'p94_polgar_tactical_storm',
    title: 'Level 94: Judit Polgár\'s Tactical Storm 🌩️',
    description: 'Judit Polgár launches an unstoppable multi-piece onslaught against Black\'s castled King!',
    fen: 'r1b2rk1/ppp2ppp/3N4/8/8/8/PPP2PPP/4RR1K w - - 0 1',
    solution: ['Nxf7', 'Rxf7', 'Re8#'],
    hint: 'Nxf7 followed by Re8#!',
    starsReward: 8,
    difficulty: 'Expert'
  },
  {
    id: 'p95_morphy_opera_full_sequence',
    title: 'Level 95: Complete Opera House Combination 🏛️',
    description: 'Execute Morphy\'s complete 4-move combination ending in Rd8# mate!',
    fen: 'r3kb1r/p2n1ppp/4p3/4P3/3Q4/8/PPP2PPP/3R1RK1 w kq - 0 1',
    solution: ['Qxd7#'],
    hint: 'Queen takes d7#!',
    starsReward: 8,
    difficulty: 'Expert'
  },
  {
    id: 'p96_windmill_tactic_master',
    title: 'Level 96: The Windmill Tactic 🎡',
    description: 'Repeated discovered checks with Bishop and Rook sweep all Black\'s pieces!',
    fen: '6rk/5p1p/8/8/8/8/1B4PP/6RK w - - 0 1',
    solution: ['Bxf7+', 'Rg7', 'Bxg7#'],
    hint: 'Bxf7+ checking with Bishop!',
    starsReward: 8,
    difficulty: 'Expert'
  },
  {
    id: 'p97_queen_sacrifice_double_check',
    title: 'Level 97: Queen Sacrifice Double Check 💣',
    description: 'Sacrifice Queen on d8+ to force King to move into double check!',
    fen: '3r2k1/5ppp/8/8/3Q4/8/5PPP/3R2K1 w - - 0 1',
    solution: ['Qxd8+', 'Rxd8', 'Rxd8#'],
    hint: 'Trade Queens on d8!',
    starsReward: 8,
    difficulty: 'Expert'
  },
  {
    id: 'p98_deflection_pin_combination',
    title: 'Level 98: Deflection & Pin Masterclass 📌',
    description: 'Deflect defender on f7, pin Queen on e8, deliver checkmate!',
    fen: 'r1b1k2r/pppp1ppp/8/4q3/2B5/8/P1P2PPP/R2Q1RK1 w kq - 0 1',
    solution: ['Re1', 'Qxe1+', 'Rxe1+'],
    hint: 'Rook to e1 pins the Queen!',
    starsReward: 8,
    difficulty: 'Expert'
  },
  {
    id: 'p99_grandmaster_stump_1',
    title: 'Level 99: Grandmaster Stumper I 🧠',
    description: 'Knight sacrifice on f7 followed by back-rank checkmate!',
    fen: 'r4rk1/ppp2ppp/3N4/8/8/8/PPP2PPP/4R1K1 w - - 0 1',
    solution: ['Nxf7', 'Rxf7', 'Re8#'],
    hint: 'Nxf7 then Re8#!',
    starsReward: 8,
    difficulty: 'Expert'
  },
  {
    id: 'p100_grandmaster_stump_2',
    title: 'Level 100: Grandmaster Stumper II 🌟',
    description: 'Smothered mate sequence! Queen sacrifice on g8+, Rook takes, Knight to f7#!',
    fen: '6rk/6pp/7N/8/8/8/1Q6/7K w - - 0 1',
    solution: ['Qg8+', 'Rxg8', 'Nf7#'],
    hint: 'Qg8+ then Nf7# smothered mate!',
    starsReward: 10,
    difficulty: 'Expert'
  },
  {
    id: 'p101_ultimate_crown_jewel',
    title: 'Level 101: The Crown Jewel Checkmate 👑💎',
    description: 'The ultimate puzzle! Clear the line with Bxf7+, trade on e8, deliver ultimate checkmate!',
    fen: 'r1b2rk1/ppp2ppp/8/3B4/8/5Q2/PPP2PPP/4R1K1 w - - 0 1',
    solution: ['Bxf7+', 'Rxf7', 'Re8#'],
    hint: 'Bxf7+ followed by Re8#!',
    starsReward: 10,
    difficulty: 'Expert'
  },
  {
    id: 'p102_ultimate_hall_of_fame',
    title: 'Level 102: Hall of Fame - Boden\'s Strike 🏆',
    description: 'Hall of Fame tactical masterpiece! Sacrifice Queen on c6+ for double Bishop checkmate!',
    fen: '2kr3r/pp1n1ppp/2p1p3/8/2B5/1Q3B2/PPP2PPP/2KR4 w - - 0 1',
    solution: ['Qxc6+', 'bxc6', 'Ba6#'],
    hint: 'Qxc6+ then Ba6#!',
    starsReward: 10,
    difficulty: 'Expert'
  },
  {
    id: 'p103_ultimate_anastasia_legend',
    title: 'Level 103: Hall of Fame - Anastasia Legend 🌟',
    description: 'Sacrifice Queen on h7+ to open the h-file for Rook to h3# checkmate!',
    fen: '5r1k/1p2N1pp/8/8/8/7Q/5PPP/6KR w - - 0 1',
    solution: ['Qxh7+', 'Kxh7', 'Rh3#'],
    hint: 'Qxh7+ then Rh3#!',
    starsReward: 10,
    difficulty: 'Expert'
  },
  {
    id: 'p104_ultimate_smothered_emperor',
    title: 'Level 104: The Smothered Emperor 👑🐴',
    description: 'Sacrifice your Queen on g8+ to smother the enemy Emperor!',
    fen: '6rk/6pp/7N/8/8/8/1Q6/7K w - - 0 1',
    solution: ['Qg8+', 'Rxg8', 'Nf7#'],
    hint: 'Qg8+ then Nf7#!',
    starsReward: 10,
    difficulty: 'Expert'
  },
  {
    id: 'p105_grandmaster_finale',
    title: 'Level 105: Grandmaster Grand Finale 🎓♟️',
    description: 'Congratulations on reaching Level 105! Deliver the final back-rank checkmate!',
    fen: '6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1',
    solution: ['Re8#'],
    hint: 'Re8# checkmate!',
    starsReward: 15,
    difficulty: 'Expert'
  }
];
