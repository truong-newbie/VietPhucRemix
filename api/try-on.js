import { checkRateLimit, getClientIp } from './_lib/rateLimit.js';
import { buildTryOnPrompt } from './_lib/promptBuilder.js';
import { runGeminiTryOn } from './_providers/geminiTryOn.js';
import { runFalTryOn } from './_providers/falTryOn.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const providerName = (process.env.TRYON_PROVIDER || 'gemini').toLowerCase();
  const apiKey = providerName === 'fal' ? process.env.FAL_KEY : process.env.GEMINI_API_KEY;

  if (!apiKey || !apiKey.trim()) {
    return res.status(503).json({
      code: 'CONFIG_MISSING',
      error: `Chưa cấu hình ${providerName === 'fal' ? 'FAL_KEY' : 'GEMINI_API_KEY'} trong file .env / Vercel Environment Variables.`
    });
  }

  const ip = getClientIp(req);
  const passcode = req.headers?.['x-judge-passcode'] || '';
  const limitRes = checkRateLimit({
    key: `tryon:${ip}`,
    limit: 5,
    passcode: String(passcode),
    expectedPasscode: process.env.JUDGE_PASSCODE || ''
  });

  if (!limitRes.allowed) {
    return res.status(429).json({
      code: 'RATE_LIMITED',
      error: 'Bạn đã hết 5 lượt thử ảnh AI miễn phí hôm nay. Nhập mã Giám khảo để tiếp tục không giới hạn.'
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { personImageDataUrl, stagePreviewDataUrl, outfitSpec } = body;
    if (!personImageDataUrl) {
      return res.status(400).json({ error: 'Thiếu ảnh chân dung người dùng.' });
    }

    const prompt = buildTryOnPrompt(outfitSpec);
    const result =
      providerName === 'fal'
        ? await runFalTryOn({ personImageDataUrl, stagePreviewDataUrl, prompt, apiKey: apiKey.trim() })
        : await runGeminiTryOn({ personImageDataUrl, stagePreviewDataUrl, prompt, apiKey: apiKey.trim() });

    return res.status(200).json({
      ...result,
      remainingQuota: limitRes.remaining
    });
  } catch (err) {
    return res.status(500).json({
      error: err?.message || 'Lỗi xử lý AI Virtual Try-On.'
    });
  }
}
