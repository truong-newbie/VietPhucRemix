// Bộ truy xuất Structured RAG thuần túy: ưu tiên ngữ cảnh bộ đồ đang mặc, lọc nguồn xác thực
import { buildVerifiedKnowledgeBase } from '../../src/data/ragKnowledgeBase.js';

const DOMAIN_HINTS = [
  'ao', 'viet phuc', 'co phuc', 'ngu than', 'tu than', 'nhat binh', 'ao dai', 'ba ba',
  'ao tac', 'giao linh', 'khan van', 'non quai thao', 'non la', 'khan ran', 'tram', 'guoc',
  'ngu hanh', 'mau', 'le chua', 'dam cuoi', 'tet', 'hoi lang', 'hue', 'lich su', 'mac',
  'phoi', 'van hoa', 'di san', 'khuy', 'ta ao', 'quan', 'vay', 'han phuc', 'suon xam'
];

export function normalizeVietnamese(str = '') {
  return String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const STOP_WORDS = new Set([
  'la', 'gi', 'cua', 'va', 'cho', 'hoi', 've', 'co', 'khong', 'bao', 'nhieu',
  'hom', 'nay', 'ngay', 'the', 'nao', 'sao', 'tai', 'vi', 'sao', 'nhu', 'the',
  'duoc', 'khi', 'nao', 'ai', 'dau', 'o', 'trong', 'ngoai', 'voi', 'hay', 'can',
  'nen', 'tien', 'gia', 'muon', 'biet', 'chi', 'giup', 'toi', 'minh', 'ban'
]);

export function retrieveVerifiedContext(query = '', activeOutfit = {}, docs = buildVerifiedKnowledgeBase()) {
  const normQuery = normalizeVietnamese(query);
  if (!normQuery) return { matched: [], outOfScope: true };

  const tokens = normQuery.split(' ').filter((t) => t.length >= 2 && !STOP_WORDS.has(t));
  const hasDomainSignal =
    DOMAIN_HINTS.some((h) => new RegExp(`(?:^|\\s)${h}(?:$|\\s)`).test(normQuery)) ||
    Boolean(activeOutfit.garmentId && normQuery.includes('bo nay')) ||
    normQuery.includes('trang phuc nay') ||
    normQuery.includes('dang mac');

  const scored = docs
    .filter((d) => d.source && d.source !== 'CẦN THẨM ĐỊNH')
    .map((doc) => {
      const hay = normalizeVietnamese(`${doc.title} ${doc.content} ${doc.source}`);
      let score = 0;

      for (const tok of tokens) {
        if (hay.includes(tok)) score += 2;
      }

      if (activeOutfit.garmentId && doc.garmentId === activeOutfit.garmentId) {
        score += hasDomainSignal ? 4 : 1;
      }
      if (activeOutfit.eventId && doc.eventId === activeOutfit.eventId) {
        score += hasDomainSignal ? 3 : 1;
      }

      return { doc, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const keywordOnlyMatch = scored.some((item) => {
    const hay = normalizeVietnamese(`${item.doc.title} ${item.doc.content}`);
    return tokens.some((tok) => hay.includes(tok));
  });

  if (!hasDomainSignal && !keywordOnlyMatch) {
    return { matched: [], outOfScope: true };
  }

  return {
    matched: scored.slice(0, 6).map((s) => s.doc),
    outOfScope: scored.length === 0
  };
}
