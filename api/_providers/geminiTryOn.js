// Provider Gemini Image + Gemini 2.5 Flash Vision Stylist (miễn phí 24/7) cho /api/try-on
import { ALLOWED_GARMENT_IDS, ALLOWED_COLOR_IDS, parsePortraitAnalysis } from '../_lib/stylistParser.js';

const IMAGE_MODELS = ['gemini-2.5-flash-image', 'gemini-3.1-flash-image'];

export function parseDataUrl(dataUrl) {
  const match = /^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/.exec(dataUrl || '');
  if (!match) return null;
  return { mimeType: match[1], data: match[2] };
}

// Dùng Gemini 2.5 Flash Vision (Free Tier 24/7) để phân tích tông da, kiểm tra ảnh cận mặt & gợi ý Việt Phục hợp nhất
export async function analyzePortraitWithGemini({ personImageDataUrl, apiKey }) {
  const person = parseDataUrl(personImageDataUrl);
  if (!person || !apiKey || !apiKey.trim()) {
    return parsePortraitAnalysis('');
  }

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
      apiKey.trim()
    )}`;
    const promptText = [
      'Analyze this human portrait carefully and return JSON with this exact schema:',
      '{',
      '  "bodyBox": { "centerX": number, "shoulderY": number, "torsoWidth": number },',
      '  "stylistAdvice": {',
      '    "skinTone": "short Vietnamese skin tone description observed in the photo (e.g. Sáng hồng, Trung tính sáng, Da vàng ấm, Ngăm khỏe khoắn)",',
      '    "undertone": "Ấm (Warm) | Lạnh (Cool) | Trung tính (Neutral)",',
      `    "suggestedGarmentId": "one of: ${ALLOWED_GARMENT_IDS.join(', ')}",`,
      `    "suggestedOuterColorId": "one of: ${ALLOWED_COLOR_IDS.join(', ')}",`,
      `    "suggestedBottomColorId": "one of: ${ALLOWED_COLOR_IDS.join(', ')}",`,
      '    "isCloseUp": true if the photo is a close-up/ID headshot showing mostly head and very little torso below shoulders, else false,',
      '    "reason": "1-2 specific Vietnamese sentences tailored to the person in this photo explaining why the garment silhouette and color flatter them"',
      '  }',
      '}'
    ].join('\n');

    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: promptText }, { inlineData: person }] }],
        generationConfig: {
          temperature: 0.25,
          maxOutputTokens: 450,
          responseMimeType: 'application/json'
        }
      })
    });
    if (!resp.ok) return parsePortraitAnalysis('');
    const json = await resp.json();
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return parsePortraitAnalysis(text);
  } catch {
    return parsePortraitAnalysis('');
  }
}

export async function runGeminiTryOn({ personImageDataUrl, stagePreviewDataUrl, prompt, apiKey }) {
  const person = parseDataUrl(personImageDataUrl);
  if (!person) {
    throw new Error('Ảnh chân dung tải lên không đúng định dạng.');
  }

  const parts = [{ text: prompt }, { inlineData: person }];
  const refImg = parseDataUrl(stagePreviewDataUrl);
  if (refImg) {
    parts.push({ inlineData: refImg });
  }

  let lastStatus = 500;
  let lastErr = '';

  for (const model of IMAGE_MODELS) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(
      apiKey
    )}`;

    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts }],
        generationConfig: { responseModalities: ['TEXT', 'IMAGE'] }
      })
    });

    if (resp.ok) {
      const json = await resp.json();
      const candidates = json?.candidates?.[0]?.content?.parts || [];
      const imagePart = candidates.find((p) => p.inlineData?.data);
      if (!imagePart) {
        throw new Error('Gemini không trả về dữ liệu ảnh hợp lệ.');
      }
      const mime = imagePart.inlineData.mimeType || 'image/png';
      return {
        imageUrl: `data:${mime};base64,${imagePart.inlineData.data}`,
        provider: 'gemini',
        model
      };
    }

    lastStatus = resp.status;
    lastErr = await resp.text();

    if (resp.status === 429) {
      return {
        gpuOffline: true,
        provider: 'gemini-vision-only',
        reason:
          'Google AI Studio Free Tier giới hạn tạo ảnh AI = 0. Hãy dán Link GPU Google Colab (miễn phí 0đ) vào mục Cài đặt Demo để ghép ảnh thật, hoặc xem phân tích AI Stylist & bản Bảo tàng 2.5D/3D.'
      };
    }

    if (resp.status !== 404) {
      break;
    }
  }

  throw new Error(`Gemini API lỗi (${lastStatus}): ${lastErr.slice(0, 160)}`);
}
