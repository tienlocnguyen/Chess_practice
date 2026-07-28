import { Language } from './i18n';
import { Puzzle } from '../types/chess';

// In-memory cache for API translations
const translationCache = new Map<string, string>();

// LocalStorage cache key prefix
const CACHE_KEY_PREFIX = 'duo_chess_trans_';

/**
 * Common Lichess puzzle theme definitions mapped to friendly Vietnamese terms.
 */
export const THEME_VI_MAP: Record<string, string> = {
  middlegame: 'Trung cuộc',
  endgame: 'Tàn cuộc',
  opening: 'Khai cuộc',
  crushing: 'Đòn đập tan',
  advantage: 'Tạo ưu thế',
  equality: 'Cân bằng',
  mate: 'Chiếu hết',
  mateIn1: 'Chiếu hết 1 nước',
  mateIn2: 'Chiếu hết 2 nước',
  mateIn3: 'Chiếu hết 3 nước',
  mateIn4: 'Chiếu hết 4 nước',
  short: 'Đòn thế ngắn',
  long: 'Đòn thế dài',
  veryLong: 'Đòn thế rất dài',
  hangingPiece: 'Ăn quân bị hở',
  backRankMate: 'Chiếu hết hàng cuối',
  smotheredMate: 'Chiếu nghẹt',
  discoveredAttack: 'Chiếu mở',
  pin: 'Đòn ghim',
  fork: 'Đòn bắt đôi',
  skewer: 'Đòn xiên',
  deflection: 'Đòn đánh lạc hướng',
  pinning: 'Đòn ghim quân',
  doubleCheck: 'Đòn chiếu đôi',
  pawnEndgame: 'Tàn cuộc Tốt',
  rookEndgame: 'Tàn cuộc Xe',
  knightEndgame: 'Tàn cuộc Mã',
  bishopEndgame: 'Tàn cuộc Tượng',
  queenEndgame: 'Tàn cuộc Hậu',
  queenRookEndgame: 'Tàn cuộc Hậu Xe',
  master: 'Bài tập Đại kiện tướng',
  superGM: 'Siêu Đại kiện tướng',
};

/**
 * Translates chess SAN piece notation into Vietnamese piece names.
 */
export function translatePieceName(moveSan?: string): string {
  if (!moveSan) return 'quân cờ';
  const char = moveSan.charAt(0);
  switch (char) {
    case 'N':
      return 'Mã';
    case 'B':
      return 'Tượng';
    case 'R':
      return 'Xe';
    case 'Q':
      return 'Hậu';
    case 'K':
      return 'Vua';
    case 'O':
      return 'Đòn nhập thành';
    default:
      return 'Tốt';
  }
}

/**
 * Translates array of English theme keys into Vietnamese.
 */
export function translateThemesToVi(themes?: string[]): string {
  if (!themes || themes.length === 0) return 'Đòn thế cờ vua';
  const translated = themes
    .map((t) => THEME_VI_MAP[t] || t)
    .filter(Boolean);
  return translated.slice(0, 3).join(', ');
}

/**
 * Uses Google Translate free API (gtx) with fallback to translate English text to Vietnamese.
 */
export async function translateTextToVi(text: string): Promise<string> {
  if (!text || text.trim() === '') return text;

  const cacheKey = CACHE_KEY_PREFIX + text;

  // 1. Check in-memory cache
  if (translationCache.has(text)) {
    return translationCache.get(text)!;
  }

  // 2. Check localStorage cache
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      translationCache.set(text, cached);
      return cached;
    }
  } catch (e) {
    // ignore localstorage errors
  }

  try {
    // 3. Google Translate free endpoint (client=gtx)
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const result = data[0].map((item: any) => item[0]).join('');
        if (result && result.trim() !== '') {
          translationCache.set(text, result);
          try {
            localStorage.setItem(cacheKey, result);
          } catch (e) {}
          return result;
        }
      }
    }
  } catch (err) {
    console.warn('[Translator] Primary Google Translate API failed, trying fallback:', err);
  }

  try {
    // 4. Fallback: MyMemory Translation API
    const fallbackUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|vi`;
    const fallbackRes = await fetch(fallbackUrl);
    if (fallbackRes.ok) {
      const fallbackData = await fallbackRes.json();
      if (fallbackData?.responseData?.translatedText) {
        const result = fallbackData.responseData.translatedText;
        translationCache.set(text, result);
        try {
          localStorage.setItem(cacheKey, result);
        } catch (e) {}
        return result;
      }
    }
  } catch (err) {
    console.warn('[Translator] Fallback MyMemory API failed:', err);
  }

  return text; // Return original if all APIs fail
}

/**
 * Translates a Lichess or custom puzzle into Vietnamese.
 */
export async function translatePuzzleToVietnamese(puzzle: Puzzle): Promise<Puzzle> {
  if (puzzle.titleVi && puzzle.descriptionVi && puzzle.hintVi) {
    return puzzle;
  }

  // Create localized title if missing
  let titleVi = puzzle.titleVi;
  if (!titleVi) {
    if (puzzle.lichessId) {
      const moves = Math.ceil((puzzle.solution?.length || 1) / 2);
      titleVi = `Lichess #${puzzle.lichessId} (${moves} Nước Thắng)`;
    } else {
      titleVi = await translateTextToVi(puzzle.title);
    }
  }

  // Translate description & hint asynchronously in parallel
  const [descriptionVi, hintVi] = await Promise.all([
    puzzle.descriptionVi ? Promise.resolve(puzzle.descriptionVi) : translateTextToVi(puzzle.description),
    puzzle.hintVi ? Promise.resolve(puzzle.hintVi) : translateTextToVi(puzzle.hint),
  ]);

  return {
    ...puzzle,
    titleVi,
    descriptionVi,
    hintVi,
  };
}

/**
 * Helper to get localized title, description, and hint for a puzzle according to language.
 */
export function getPuzzleLocalized(puzzle: Puzzle, lang: Language): { title: string; description: string; hint: string } {
  if (lang === 'vi') {
    return {
      title: puzzle.titleVi || puzzle.title,
      description: puzzle.descriptionVi || puzzle.description,
      hint: puzzle.hintVi || puzzle.hint,
    };
  }
  return {
    title: puzzle.title,
    description: puzzle.description,
    hint: puzzle.hint,
  };
}
