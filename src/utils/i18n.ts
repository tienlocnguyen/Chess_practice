// Internationalization (i18n) for Kid Chess Academy
export type Language = 'en' | 'vi';

export const TRANSLATIONS = {
  en: {
    appTitle: 'Kid Chess Academy',
    appSubtitle: 'Learn, Play & Master Chess with AI!',
    streak: 'Streak',
    xp: 'XP',
    stars: 'Stars',
    vsAi: 'VS AI Engine',
    dualMode: '2-Player Local',
    puzzles: 'Chess Puzzles',
    rules: 'Kid Rules Guide',
    deploy: 'GitHub Deploy',
    
    // AI personalities
    bunnyName: 'Bunny Hop',
    bunnyDesc: 'Cute & cheerful beginner bot. Perfect for first steps!',
    foxName: 'Clever Fox',
    foxDesc: 'Quick & crafty player. Likes to attack open lines!',
    owlName: 'Wise Owl',
    owlDesc: 'Strategic grandmaster owl. Precise and tactical!',
    dragonName: 'Dragon Master',
    dragonDesc: 'Legendary beast! Ruthless tactical calculation!',
    
    difficultyEasy: 'Easy',
    difficultyMedium: 'Medium',
    difficultyHard: 'Hard',
    difficultyExpert: 'Legendary',

    // Game view
    white: 'White ⚪',
    black: 'Black 🔴',
    newGame: 'New Game',
    undo: 'Undo',
    getHint: 'Get Hint',
    resign: 'Resign',
    flipBoard: 'Flip Board',
    soundOn: 'Sound ON 🔊',
    soundOff: 'Sound OFF 🔇',
    evalEqual: 'Equal Position (0.0)',
    evalWhiteLead: 'White is leading by',
    evalBlackLead: 'Black is leading by',
    thinking: 'is thinking about its move...',
    passAndPlayTip: 'Play locally on the same screen with automatic board turn rotation!',
    
    // Coach / Duo Owl
    coachTitle: 'Duo the Chess Owl 🦉',
    coachDefault: 'Welcome! Choose a piece to move. Remember to protect your King!',
    coachCheck: '⚠️ Watch out! Your King is in CHECK! Protect your King now!',
    coachCapture: '🎯 Great capture! You took an enemy piece!',
    coachGreatMove: '🌟 Fantastic move! Duo is super proud of you!',
    coachPromotion: '👑 Pawn promoted to a mighty Queen!',
    
    // Puzzles
    puzzleTitle: 'Kid Tactical Puzzles',
    puzzleSubtitle: 'Solve tactical chess riddles to earn XP and extend your Daily Streak!',
    puzzleSolvedTitle: 'PUZZLE SOLVED! 🎉',
    puzzleSolvedDesc: 'Awesome job! You earned +10 XP and kept your Streak alive!',
    puzzleWrong: 'Not quite right! Try another move or click Show Hint.',
    showHint: 'Show Hint',
    resetPuzzle: 'Reset Puzzle',
    nextPuzzle: 'Next Puzzle',

    // Piece Rules
    rulesTitle: 'How to Play Chess like a Champion',
    rulesSubtitle: 'Click any piece below to discover its secret superpowers, point values, and winning tactics!',
    pawnTitle: 'The Brave Pawn ♟️',
    pawnMotto: 'Small step forward, big dream to become Queen!',
    pawnMoves: 'Moves 1 square forward. On its very first move, it can leap 2 squares forward! Captures 1 square diagonally forward.',
    pawnTip: 'When a Pawn reaches the opponent\'s back row, it undergoes Promotion into a Queen, Rook, Bishop, or Knight!',
    
    knightTitle: 'The Jumping Knight 🐴',
    knightMotto: 'L-shaped jumpers! The only piece that can hop over others!',
    knightMoves: 'Moves in an "L" shape: 2 squares straight and then 1 square to the side. It can jump right over other pieces on its way!',
    knightTip: 'Knights are great at "Forking" two enemy pieces at once!',

    bishopTitle: 'The Wise Bishop 🧙',
    bishopMotto: 'Diagonal lasers across the board!',
    bishopMoves: 'Moves as many squares as it wants diagonally! Each Bishop stays on its starting color for the entire game.',
    bishopTip: 'Place your Bishops on open diagonals to control long distances!',

    rookTitle: 'The Mighty Rook 🏰',
    rookMotto: 'Straight lines of power!',
    rookMoves: 'Moves as far as it wants vertically or horizontally in straight lines.',
    rookTip: 'Rooks love open files with no pawns blocking them!',

    queenTitle: 'The Powerful Queen 👑',
    queenMotto: 'The ultimate superpower on the board!',
    queenMoves: 'Combines the movement of Rook + Bishop! Can move any number of squares straight or diagonally.',
    queenTip: 'Keep your Queen safe early on, and bring her out when enemy pieces are vulnerable!',

    kingTitle: 'The Royal King ♚',
    kingMotto: 'Protect the King at all costs!',
    kingMoves: 'Moves 1 square in any direction. If your King is attacked, it is in CHECK and you MUST protect it immediately!',
    kingTip: 'If the King is attacked and cannot escape, it is CHECKMATE!',

    // Themes
    themeWood: 'Classic Wood 🪵',
    themeCandy: 'Candy Land 🍬',
    themeSpace: 'Cosmic Space 🚀',
    themeForest: 'Forest Adventure 🌿',
    themeNeon: 'Neon Arcade ⚡',
    themeDuolingo: 'Duolingo Emerald 🦉',

    // User Profile
    profileTitle: 'Kid Chess Knight Profile',
    editProfile: 'Edit Profile',
    yourName: 'Knight Name',
    selectAvatar: 'Choose Avatar',
    languageLabel: 'Application Language',
    badgesHeader: 'Unlocked Badges & Achievements',
    statsHeader: 'Game History Stats',
    winsVsAi: 'Wins vs AI',
    winsVsPlayer: 'Wins in 2-Player',
    totalGames: 'Total Games',
    saveProfile: 'Save Profile',

    // Game Over
    checkmateTitle: 'CHECKMATE! 🏆',
    drawTitle: 'STALEMATE / DRAW 🤝',
    winMessage: 'Congratulations! You won the match!',
    lossMessage: 'Good fight! Keep practicing with Duo Owl!',
    drawMessage: 'It is a draw! Both players played bravely.',
  },

  vi: {
    appTitle: 'Học Viện Cờ Vua Kid',
    appSubtitle: 'Học, Chơi & Rèn Luyện Cờ Vua Với AI Duolingo!',
    streak: 'Chuỗi Ngày',
    xp: 'Điểm XP',
    stars: 'Ngôi Sao',
    vsAi: 'Đấu Với AI',
    dualMode: '2 Người Chơi',
    puzzles: 'Câu Đố Cờ Vua',
    rules: 'Hướng Dẫn Luật',
    deploy: 'Đăng Lên GitHub',

    // AI personalities
    bunnyName: 'Thỏ Con Háo Hức',
    bunnyDesc: 'Đối thủ siêu đáng yêu cho các bạn mới tập chơi cờ!',
    foxName: 'Cáo Tinh Anh',
    foxDesc: 'Nhanh nhẹn và khéo léo. Thích tấn công bất ngờ!',
    owlName: 'Cú Tri Thức',
    owlDesc: 'Đại sư cú thông thái với những nước đi chiến thuật chính xác!',
    dragonName: 'Rồng Huyền Thoại',
    dragonDesc: 'Thách thức cao nhất! Tính toán cờ vua đỉnh cao!',

    difficultyEasy: 'Dễ',
    difficultyMedium: 'Trung Bình',
    difficultyHard: 'Khó',
    difficultyExpert: 'Siêu Khó',

    // Game view
    white: 'Quân Trắng ⚪',
    black: 'Quân Đen 🔴',
    newGame: 'Ván Mới',
    undo: 'Đi Lại',
    getHint: 'Gợi Ý',
    resign: 'Chịu Thua',
    flipBoard: 'Lật Bàn Cờ',
    soundOn: 'Âm Thanh BẬT 🔊',
    soundOff: 'Âm Thanh TẮT 🔇',
    evalEqual: 'Cân Bằng (0.0)',
    evalWhiteLead: 'Trắng đang dẫn trước',
    evalBlackLead: 'Đen đang dẫn trước',
    thinking: 'đang suy nghĩ nước đi tiếp theo...',
    passAndPlayTip: 'Chơi 2 người trên cùng một màn hình với tính năng xoay bàn cờ tự động!',

    // Coach / Duo Owl
    coachTitle: 'Thầy Cú Duo Cờ Vua 🦉',
    coachDefault: 'Chào mừng bạn! Hãy chọn một quân cờ để di chuyển. Nhớ bảo vệ Vua nhé!',
    coachCheck: '⚠️ Chú ý! Vua của bạn đang BỊ CHIẾU! Hãy bảo vệ Vua ngay lập tức!',
    coachCapture: '🎯 Tuyệt vời! Bạn vừa ăn được một quân cờ đối phương!',
    coachGreatMove: '🌟 Nước đi xuất sắc! Thầy Cú Duo rất tự hào về bạn!',
    coachPromotion: '👑 Quân Tốt đã phong cấp thành Hậu hùng mạnh!',

    // Puzzles
    puzzleTitle: 'Câu Đố Chiến Thuật Cờ Vua',
    puzzleSubtitle: 'Giải các câu đố cờ vua vui nhộn để tích lũy XP và giữ vững Chuỗi Ngày!',
    puzzleSolvedTitle: 'GIẢI CÂU ĐỐ THÀNH CÔNG! 🎉',
    puzzleSolvedDesc: 'Tuyệt đỉnh! Bạn nhận được +10 XP và tiếp tục Chuỗi Ngày!',
    puzzleWrong: 'Chưa chính xác rồi! Hãy thử nước đi khác hoặc nhấn Gợi Ý.',
    showHint: 'Xem Gợi Ý',
    resetPuzzle: 'Chơi Lại Câu Đố',
    nextPuzzle: 'Câu Đố Tiếp Theo',

    // Piece Rules
    rulesTitle: 'Bí Kíp Chơi Cờ Vua Cho Nhà Vô Địch',
    rulesSubtitle: 'Bấm vào từng quân cờ bên dưới để khám phá sức mạnh, điểm số và mẹo chiến thắng!',
    pawnTitle: 'Quân Tốt Dũng Cảm ♟️',
    pawnMotto: 'Từng bước tiến lên, ước mơ trở thành Hậu!',
    pawnMoves: 'Đi thẳng 1 ô về phía trước. Ở nước đi đầu tiên, Tốt có thể nhảy 2 ô! Tốt ăn quân theo đường chéo 1 ô.',
    pawnTip: 'Khi Tốt đi đến hàng cuối cùng của đối thủ, nó sẽ Phong Cấp thành Hậu, Xe, Tượng hoặc Mã!',

    knightTitle: 'Quân Mã Nhảy Nhót 🐴',
    knightMotto: 'Quân cờ duy nhất có thể nhảy qua đầu các quân khác theo hình chữ L!',
    knightMoves: 'Di chuyển theo hình chữ "L": 2 ô thẳng rồi 1 ô ngang. Có thể nhảy qua bất kỳ quân cờ nào trên đường đi!',
    knightTip: 'Mã rất giỏi đòn "Chĩa Đôi" (Fork) tấn công 2 quân cùng lúc!',

    bishopTitle: 'Quân Tượng Thông Thái 🧙',
    bishopMotto: 'Tia laser chéo xuyên suốt bàn cờ!',
    bishopMoves: 'Di chuyển tùy ý theo các đường chéo. Tượng ở ô màu nào sẽ đứng ở ô màu đó suốt cả ván đấu.',
    bishopTip: 'Hãy đặt Tượng ở các đường chéo mở để kiểm soát không gian rộng lớn!',

    rookTitle: 'Quân Xe Hùng Cường 🏰',
    rookMotto: 'Sức mạnh từ các hàng ngang và cột dọc!',
    rookMoves: 'Di chuyển bao nhiêu ô tùy thích theo hàng ngang hoặc cột dọc thẳng tắp.',
    rookTip: 'Xe rất thích các cột mở không bị Tốt cản đường!',

    queenTitle: 'Quân Hậu Quyền Năng 👑',
    queenMotto: 'Siêu anh hùng mạnh nhất trên bàn cờ!',
    queenMoves: 'Kết hợp sức mạnh của Xe + Tượng! Có thể đi thẳng hoặc đi chéo bao nhiêu ô tùy thích.',
    queenTip: 'Giữ Hậu an toàn ở đầu ván, xuất kích khi quân địch sơ hở!',

    kingTitle: 'Quân Vua Hoàng Gia ♚',
    kingMotto: 'Bảo vệ Vua bằng mọi giá!',
    kingMoves: 'Đi 1 ô theo mọi hướng. Khi Vua bị tấn công (CHIẾU), bạn BẮT BUỘC phải giải cứu Vua ngay lập tức!',
    kingTip: 'Nếu Vua bị chiếu mà không còn đường thoát, đó là CHIẾU HẾT (Checkmate)!',

    // Themes
    themeWood: 'Gỗ Cổ Điển 🪵',
    themeCandy: 'Kẹo Ngọt 🍬',
    themeSpace: 'Vũ Trụ Star 🚀',
    themeForest: 'Rừng Xanh 🌿',
    themeNeon: 'Đèn Neon ⚡',
    themeDuolingo: 'Ngọc Lục Bảo Duo 🦉',

    // User Profile
    profileTitle: 'Hồ Sơ Hiệp Sĩ Cờ Vua',
    editProfile: 'Chỉnh Sửa Hồ Sơ',
    yourName: 'Tên Tăng Cờ',
    selectAvatar: 'Chọn Biểu Tượng Avatar',
    languageLabel: 'Ngôn Ngữ Ứng Dụng',
    badgesHeader: 'Huy Chương & Thành Tựu Đã Mở',
    statsHeader: 'Thống Kê Ván Đấu',
    winsVsAi: 'Thắng AI',
    winsVsPlayer: 'Thắng 2 Người',
    totalGames: 'Tổng Ván Đấu',
    saveProfile: 'Lưu Hồ Sơ',

    // Game Over
    checkmateTitle: 'CHIẾU HẾT! 🏆',
    drawTitle: 'HÒA CỜ! 🤝',
    winMessage: 'Chúc mừng bạn! Bạn đã giành chiến thắng xuất sắc!',
    lossMessage: 'Ván đấu rất hay! Hãy tiếp tục rèn luyện cùng Thầy Cú Duo nhé!',
    drawMessage: 'Ván đấu hòa! Cả hai bên đều thi đấu rất kiên cường.',
  }
};

export function getTranslation(lang: Language | string, key: keyof typeof TRANSLATIONS['en']): string {
  const selectedLang = (lang === 'vi' || lang === 'en') ? lang : 'vi';
  const dict = TRANSLATIONS[selectedLang] || TRANSLATIONS.en;
  return dict[key] || TRANSLATIONS.en[key] || key;
}
