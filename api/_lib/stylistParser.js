// Chuẩn hóa JSON trả về từ Gemini Vision (tọa độ khung vai + phân tích tông da & gợi ý phối đồ)

export const ALLOWED_GARMENT_IDS = [
  'ngu-than',
  'ao-tac',
  'nhat-binh',
  'giao-linh',
  'tu-than',
  'ao-ba-ba',
  'ao-dai'
];

export const ALLOWED_COLOR_IDS = [
  'do-son',
  'vang-hoang-tho',
  'xanh-cham',
  'xanh-ngoc',
  'trang-nga',
  'den-huyen',
  'hong-dao',
  'tim-hue',
  'nau-non',
  'xanh-re'
];

const DEFAULT_BOX = { centerX: 0.5, shoulderY: 0.42, torsoWidth: 0.48 };
const DEFAULT_ADVICE = {
  skinTone: 'Trung tính sáng',
  undertone: 'Trung tính (Neutral)',
  suggestedGarmentId: 'ngu-than',
  suggestedOuterColorId: 'do-son',
  suggestedBottomColorId: 'trang-nga',
  isCloseUp: false,
  reason: 'Sắc Đỏ Son phối quần Trắng Ngà tạo độ tương phản thanh lịch, dễ tôn sáng khuôn mặt trong nhiều điều kiện ánh sáng.'
};

function clamp(v, min, max, fallback) {
  return typeof v === 'number' && !Number.isNaN(v) ? Math.min(max, Math.max(min, v)) : fallback;
}

export function parsePortraitAnalysis(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    return { bodyBox: { ...DEFAULT_BOX }, stylistAdvice: { ...DEFAULT_ADVICE } };
  }

  try {
    const match = /\{[\s\S]*\}/.exec(rawText);
    if (!match) {
      return { bodyBox: { ...DEFAULT_BOX }, stylistAdvice: { ...DEFAULT_ADVICE } };
    }
    const parsed = JSON.parse(match[0]);
    const boxSrc = parsed.bodyBox || parsed;
    const advSrc = parsed.stylistAdvice || parsed;

    const bodyBox = {
      centerX: clamp(boxSrc.centerX, 0.2, 0.8, DEFAULT_BOX.centerX),
      shoulderY: clamp(boxSrc.shoulderY, 0.15, 0.75, DEFAULT_BOX.shoulderY),
      torsoWidth: clamp(boxSrc.torsoWidth, 0.25, 0.85, DEFAULT_BOX.torsoWidth)
    };

    const suggestedGarmentId = ALLOWED_GARMENT_IDS.includes(advSrc.suggestedGarmentId)
      ? advSrc.suggestedGarmentId
      : DEFAULT_ADVICE.suggestedGarmentId;
    const suggestedOuterColorId = ALLOWED_COLOR_IDS.includes(advSrc.suggestedOuterColorId)
      ? advSrc.suggestedOuterColorId
      : DEFAULT_ADVICE.suggestedOuterColorId;
    const suggestedBottomColorId = ALLOWED_COLOR_IDS.includes(advSrc.suggestedBottomColorId)
      ? advSrc.suggestedBottomColorId
      : DEFAULT_ADVICE.suggestedBottomColorId;

    const stylistAdvice = {
      skinTone:
        typeof advSrc.skinTone === 'string' && advSrc.skinTone.trim()
          ? advSrc.skinTone.trim().slice(0, 60)
          : DEFAULT_ADVICE.skinTone,
      undertone:
        typeof advSrc.undertone === 'string' && advSrc.undertone.trim()
          ? advSrc.undertone.trim().slice(0, 60)
          : DEFAULT_ADVICE.undertone,
      suggestedGarmentId,
      suggestedOuterColorId,
      suggestedBottomColorId,
      isCloseUp: Boolean(advSrc.isCloseUp),
      reason:
        typeof advSrc.reason === 'string' && advSrc.reason.trim()
          ? advSrc.reason.trim().slice(0, 260)
          : DEFAULT_ADVICE.reason
    };

    return { bodyBox, stylistAdvice };
  } catch {
    return { bodyBox: { ...DEFAULT_BOX }, stylistAdvice: { ...DEFAULT_ADVICE } };
  }
}
