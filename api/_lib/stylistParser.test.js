import { describe, it, expect } from 'vitest';
import { parsePortraitAnalysis, ALLOWED_GARMENT_IDS, ALLOWED_COLOR_IDS } from './stylistParser.js';

describe('stylistParser', () => {
  it('parses valid Gemini Vision JSON and clamps coordinates', () => {
    const raw = `\`\`\`json
    {
      "bodyBox": { "centerX": 0.48, "shoulderY": 0.36, "torsoWidth": 0.52 },
      "stylistAdvice": {
        "skinTone": "Sáng ấm",
        "undertone": "Ấm (Warm)",
        "suggestedGarmentId": "nhat-binh",
        "suggestedOuterColorId": "xanh-ngoc",
        "suggestedBottomColorId": "trang-nga",
        "isCloseUp": true,
        "reason": "Tông da ấm rất hợp sắc Xanh Ngọc dịu mắt."
      }
    }
    \`\`\``;
    const res = parsePortraitAnalysis(raw);
    expect(res.bodyBox).toEqual({ centerX: 0.48, shoulderY: 0.36, torsoWidth: 0.52 });
    expect(res.stylistAdvice.suggestedGarmentId).toBe('nhat-binh');
    expect(res.stylistAdvice.suggestedOuterColorId).toBe('xanh-ngoc');
    expect(res.stylistAdvice.undertone).toBe('Ấm (Warm)');
    expect(res.stylistAdvice.isCloseUp).toBe(true);
  });

  it('rejects unknown garment/color IDs and falls back safely on malformed input', () => {
    const badIds = parsePortraitAnalysis(
      JSON.stringify({
        bodyBox: { centerX: 99, shoulderY: -5, torsoWidth: 0.1 },
        stylistAdvice: {
          suggestedGarmentId: 'kimono-invalid',
          suggestedOuterColorId: 'neon-pink'
        }
      })
    );
    expect(badIds.bodyBox.centerX).toBe(0.8);
    expect(badIds.bodyBox.shoulderY).toBe(0.15);
    expect(badIds.bodyBox.torsoWidth).toBe(0.25);
    expect(ALLOWED_GARMENT_IDS).toContain(badIds.stylistAdvice.suggestedGarmentId);
    expect(ALLOWED_COLOR_IDS).toContain(badIds.stylistAdvice.suggestedOuterColorId);

    const garbage = parsePortraitAnalysis('not json at all');
    expect(garbage.bodyBox.centerX).toBe(0.5);
    expect(garbage.stylistAdvice.suggestedGarmentId).toBe('ngu-than');
  });
});
