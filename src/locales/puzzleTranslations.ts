import { Puzzle } from '../types/chess';

export interface LocalizedPuzzleText {
  title: string;
  description: string;
  hint: string;
}

export const PUZZLE_TRANSLATIONS_VI: Record<string, LocalizedPuzzleText> = {
  // EASY PUZZLES (1-30)
  p1_back_rank_mate: {
    title: 'Màn 1: Hàng Cuối Bùng Nổ! 🚀',
    description: 'Vua Đen đang bị mắc kẹt sau hàng Tốt ở hàng 8. Hãy dùng Xe giáng đòn chiếu hết!',
    hint: 'Đẩy Xe của bạn lên thẳng ô e8!'
  },
  p2_scholars_mate: {
    title: 'Màn 2: Hậu Tấn Công f7! 👑',
    description: 'Hậu và Tượng Trắng đang nhắm vào điểm yếu f7 của Đen. Đòn quyết định!',
    hint: 'Dùng Hậu ăn Tốt f7 để chiếu hết ngay lập tức!'
  },
  p3_knight_smother: {
    title: 'Màn 3: Mã Nhảy Bất Ngờ 🐴',
    description: 'Vua đối phương bị vây kín bởi quân mình. Nhảy Mã qua đầu cản phá!',
    hint: 'Cho Mã nhảy vào ô f7 để chiếu ngạt!'
  },
  p4_queen_corner_mate: {
    title: 'Màn 4: Hậu Ép Góc 👸',
    description: 'Vua và Hậu Trắng phối hợp dồn ép Vua Đen vào góc bàn cờ.',
    hint: 'Đưa Hậu sát ngay bên cạnh Vua Đen tại ô g7!'
  },
  p5_rook_ladder_mate: {
    title: 'Màn 5: Thang Xe Đột Phá 🪜',
    description: 'Một Xe đã khống chế hàng 7. Cho Xe thứ hai lên hàng 8 chiếu hết!',
    hint: 'Đẩy Xe ở dưới lên ô b8!'
  },
  p6_bishop_diagonal_check: {
    title: 'Màn 6: Tượng Bắn Băng Đường Chéo 🏹',
    description: 'Tượng Trắng có đường chiếu thông thoáng dọc đường chéo lớn.',
    hint: 'Di chuyển Tượng đến ô Bd5+ để tấn công Vua!'
  },
  p7_queen_hook_mate: {
    title: 'Màn 7: Hậu & Tốt Móc Câu 🪝',
    description: 'Quân Tốt e6 bảo vệ Hậu trên f7. Tung đòn kết liễu!',
    hint: 'Hậu tiến lên f7 chiếu hết!'
  },
  p8_double_rook_corridor: {
    title: 'Màn 8: Kiểm Soát Hành Lang 🛡️',
    description: 'Vua đối phương không còn đường lui ở hàng 8!',
    hint: 'Dùng Xe ăn Xe Đen tại ô b8!'
  },
  p9_pawn_promotion_mate: {
    title: 'Màn 9: Sức Mạnh Tốt Phong Cấp 👑',
    description: 'Phong cấp Tốt Trắng e7 thành Hậu kèm đòn chiếu hết!',
    hint: 'Đẩy Tốt e7 lên e8 và chọn quân Hậu!'
  },
  p10_knight_fork_king_queen: {
    title: 'Màn 10: Đòn Chĩa Đôi Hoàng Gia 🍴',
    description: 'Tấn công cùng lúc Vua và Hậu của Đen bằng quân Mã!',
    hint: 'Nhảy Mã lên ô c7 để chĩa đôi Vua và Hậu!'
  },
  p11_queen_smash_f7: {
    title: 'Màn 11: Hậu Đột Kích f7 💥',
    description: 'Tấn công trực diện quân Tốt yếu f7 bằng Hậu được Tượng hỗ trợ.',
    hint: 'Ăn Tốt f7 bằng Hậu!'
  },
  p12_rook_back_rank_strike: {
    title: 'Màn 12: Xe Quét Hàng Cuối 🚀',
    description: 'Hàng 8 của Đen hoàn toàn trống bảo vệ. Tung Xe dứt điểm!',
    hint: 'Đẩy Xe lên d8 chiếu hết!'
  },
  p13_bishop_pair_pin: {
    title: 'Màn 13: Đòn Ghim Của Tượng 🧙',
    description: 'Ghim Xe Đen vào Vua bằng đường chéo hiểm hóc.',
    hint: 'Đưa Tượng lên ô Bb5 để ghim Xe!'
  },
  p14_fork_king_rook: {
    title: 'Màn 14: Mã Bắt Vua & Xe ⚔️',
    description: 'Dùng Mã tạo đòn chĩa đôi dũng mãnh.',
    hint: 'Nhảy Mã lên ô Nc7+!'
  },
  p15_queen_battery_mate: {
    title: 'Màn 15: Pháo Băng Hậu - Tượng 👑',
    description: 'Hậu phối hợp cùng Tượng chiếu hết ở góc.',
    hint: 'Hậu ăn Tốt h7 chiếu hết!'
  },
  p16_rook_skewer_king_queen: {
    title: 'Màn 16: Đòn Xiên Của Xe 🍢',
    description: 'Chiếu Vua để ăn quân Hậu đứng đằng sau!',
    hint: 'Di chuyển Xe lên ô Re8+!'
  },
  p17_discovered_check_basic: {
    title: 'Màn 17: Đòn Chiếu Mở 💥',
    description: 'Di chuyển quân cản đường để Tượng chiếu Vua!',
    hint: 'Rút Mã đi để lộ đường chiếu từ Tượng!'
  },
  p18_double_check_mating: {
    title: 'Màn 18: Đòn Chiếu Kép ⚡',
    description: 'Tấn công Vua bằng 2 quân cờ cùng một lúc!',
    hint: 'Nhảy Mã chiếu kép không thể đỡ!'
  },
  p19_pawn_breakthrough: {
    title: 'Màn 19: Tốt Đột Phá ♟️',
    description: 'Mở đường cho Tốt thẳng tiến phong cấp!',
    hint: 'Đẩy Tốt lên chiếu và mở đường phong Hậu!'
  },
  p20_corner_smothered_knight: {
    title: 'Màn 20: Chiếu Ngạt Ở Góc 🐴',
    description: 'Vua Đen kẹt trong góc. Mã tung đòn chiếu hết tuyệt đẹp!',
    hint: 'Nhảy Mã vào f7!'
  },

  // MEDIUM PUZZLES (31-65)
  p31_tactical_skewer: {
    title: 'Màn 31: Đòn Xiên Chiến Thuật 🍡',
    description: 'Xiên Vua và Hậu đối phương trên cùng một hàng!',
    hint: 'Đưa Xe lên hàng ngang chiếu Vua!'
  },
  p32_deflection_sacrifice: {
    title: 'Màn 32: Thí Quân Dụ Địch 🎁',
    description: 'Dụ quân phòng thủ rời khỏi vị trí chiến lược.',
    hint: 'Thí quân để kéo bảo vệ ra khỏi hàng cuối!'
  },
  p33_knight_outpost_strike: {
    title: 'Màn 33: Mã Điểm Tựa Tấn Công 🛡️',
    description: 'Sử dụng quân Mã đứng ở vị trí đắc địa để dứt điểm.',
    hint: 'Tấn công trực diện ô điểm yếu của Đen!'
  },
  p34_pin_and_win: {
    title: 'Màn 34: Ghim & Giành Chiến Thắng 🧲',
    description: 'Quân bị ghim không thể di chuyển. Hãy tấn công quân đó!',
    hint: 'Ghi thêm sức ép lên quân đang bị ghim!'
  },
  p35_clearance_sacrifice: {
    title: 'Màn 35: Thí Quân Mở Đường 🧹',
    description: 'Dọn dẹp ô cờ cản đường cho đường chiếu quyết định.',
    hint: 'Di chuyển quân cản đường bằng đòn thí!'
  },

  // TRICKY PUZZLES (66-85)
  p66_queen_sacrifice_mate: {
    title: 'Màn 66: Thí Hậu Chiếu Hết 💎',
    description: 'Thí quân Hậu quyền năng để tạo thế chiếu hết không thể cản phá!',
    hint: 'Thí Hậu ăn quân bảo vệ rồi dùng Xe/Mã dứt điểm!'
  },
  p67_windmills_tactics: {
    title: 'Màn 67: Cối Xay Gió Chiến Thuật 🌪️',
    description: 'Liên tục chiếu mở để quét sạch quân đối phương.',
    hint: 'Tận dụng đòn chiếu rút liên hoàn!'
  },

  // EXPERT PUZZLES (86-105)
  p86_grandmaster_combination: {
    title: 'Màn 86: Phối Hợp Đại Sư 🏆',
    description: 'Chuỗi nước đi tính toán 3-4 nước sâu đẳng cấp cao.',
    hint: 'Tính toán chuỗi đổi quân và chiếu hết chính xác!'
  },
  p105_ultimate_kid_master: {
    title: 'Màn 105: Thách Thức Vô Địch 👑',
    description: 'Thử thách cao nhất dành cho Hiệp Sĩ Cờ Vua!',
    hint: 'Kết hợp tất cả các đòn chiến thuật đã học để giành chiến thắng!'
  }
};

// Helper function to auto-generate structured Vietnamese translation for any puzzle level
export function getPuzzleTranslation(puzzle: Puzzle, lang: string): LocalizedPuzzleText {
  if (lang !== 'vi') {
    return {
      title: puzzle.title,
      description: puzzle.description,
      hint: puzzle.hint
    };
  }

  // Check custom inline properties on Puzzle
  if (puzzle.titleVi && puzzle.descriptionVi && puzzle.hintVi) {
    return {
      title: puzzle.titleVi,
      description: puzzle.descriptionVi,
      hint: puzzle.hintVi
    };
  }

  // Check dictionary mapping by ID
  const dictMatch = PUZZLE_TRANSLATIONS_VI[puzzle.id];
  if (dictMatch) {
    return dictMatch;
  }

  // Fallback: translate common English puzzle titles/descriptions automatically
  let titleVi = puzzle.title;
  let descriptionVi = puzzle.description;
  let hintVi = puzzle.hint;

  // Level regex replace: "Level X: English Title" -> "Màn X: English Title"
  titleVi = titleVi.replace(/^Level (\d+):/, 'Màn $1:');

  // Common title translations
  titleVi = titleVi
    .replace(/Back-Rank Blast!/g, 'Hàng Cuối Bùng Nổ! 🚀')
    .replace(/Scholar's Queen Strike/g, 'Hậu Tấn Công f7! 👑')
    .replace(/Sneaky Knight Trap/g, 'Mã Nhảy Bất Ngờ 🐴')
    .replace(/Corner King Trap/g, 'Hậu Ép Góc 👸')
    .replace(/Rook Ladder Step/g, 'Thang Xe Đột Phá 🪜')
    .replace(/Diagonal Sniper/g, 'Tượng Bắn Băng 🏹')
    .replace(/Queen & Pawn Hook/g, 'Hậu & Tốt Móc Câu 🪝')
    .replace(/Corridor Guard/g, 'Hành Lang Thép 🛡️')
    .replace(/Pawn Promotion Power/g, 'Sức Mạnh Tốt Phong Cấp 👑')
    .replace(/Royal Knight Fork/g, 'Đòn Chĩa Đôi Hoàng Gia 🍴')
    .replace(/Checkmate/g, 'Chiếu Hết')
    .replace(/Mate/g, 'Chiếu Hết')
    .replace(/Fork/g, 'Chĩa Đôi')
    .replace(/Pin/g, 'Ghim Quân')
    .replace(/Skewer/g, 'Đòn Xiên')
    .replace(/Sacrifice/g, 'Thí Quân')
    .replace(/Trap/g, 'Bẫy Cờ Vua')
    .replace(/Defense/g, 'Phòng Thủ');

  // Common description translations
  if (descriptionVi.includes('Black\'s King is stuck')) {
    descriptionVi = 'Vua Đen bị kẹt sau hàng Tốt ở hàng 8. Hãy dùng Xe giáng đòn chiếu hết!';
  } else if (descriptionVi.includes('target the weak f7 pawn')) {
    descriptionVi = 'Hậu và Tượng nhắm vào điểm yếu f7 của đối thủ. Đòn quyết định!';
  } else if (descriptionVi.includes('surrounded by its own defenders')) {
    descriptionVi = 'Vua đối phương bị vây kín bởi quân mình. Nhảy Mã qua đầu cản phá!';
  } else if (descriptionVi.includes('Deliver checkmate')) {
    descriptionVi = descriptionVi.replace(/Deliver checkmate/g, 'Thực hiện đòn chiếu hết');
  } else if (descriptionVi.includes('Promote your')) {
    descriptionVi = descriptionVi.replace(/Promote your/g, 'Phong cấp quân');
  }

  // Common hint translations
  if (hintVi.includes('Slide your Rook')) {
    hintVi = 'Di chuyển Xe lên hàng cuối!';
  } else if (hintVi.includes('Capture the pawn')) {
    hintVi = 'Ăn Tốt bằng Hậu!';
  } else if (hintVi.includes('Jump your Knight')) {
    hintVi = 'Nhảy Mã vào vị trí tấn công!';
  } else if (hintVi.includes('Queen to')) {
    hintVi = hintVi.replace(/Queen to/g, 'Đưa Hậu lên');
  } else if (hintVi.includes('Rook to')) {
    hintVi = hintVi.replace(/Rook to/g, 'Đưa Xe lên');
  }

  return {
    title: titleVi,
    description: descriptionVi,
    hint: hintVi
  };
}
