import { checkRateLimit, getClientIp } from './_lib/rateLimit.js';
import { buildTryOnPrompt } from './_lib/promptBuilder.js';
import { runGeminiTryOn, analyzePortraitWithGemini } from './_providers/geminiTryOn.js';
import { runFalTryOn } from './_providers/falTryOn.js';
import { runColabTryOn, validateColabUrl } from './_providers/colabTryOn.js';
import { runOpenAITryOn } from './_providers/openaiTryOn.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
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
    const { personImageDataUrl, stagePreviewDataUrl, garmentImageDataUrl, outfitSpec } = body;
    if (!personImageDataUrl) {
      return res.status(400).json({ error: 'Thiếu ảnh chân dung người dùng.' });
    }

    const geminiKey = (process.env.GEMINI_API_KEY || '').trim();
    const headerColabUrl = String(req.headers?.['x-colab-url'] || '').trim();
    const envColabUrl = (process.env.COLAB_TRYON_URL || '').trim();
    const effectiveColabUrl = headerColabUrl || envColabUrl;
    const providerName = (process.env.TRYON_PROVIDER || 'colab').toLowerCase();

    // 1. Luôn chạy AI Stylist Gemini 2.5 Flash Vision (miễn phí 24/7) nếu có GEMINI_API_KEY
    const visionPromise = geminiKey
      ? analyzePortraitWithGemini({ personImageDataUrl, apiKey: geminiKey })
      : Promise.resolve({ stylistAdvice: null });

    const prompt = buildTryOnPrompt(outfitSpec);

    // 2. Chọn engine ghép ảnh: ưu tiên Colab nếu có link nóng hoặc TRYON_PROVIDER=colab
    let tryOnResult;
    if (headerColabUrl || providerName === 'colab') {
      if (!effectiveColabUrl) {
        tryOnResult = {
          gpuOffline: true,
          provider: 'colab-not-configured',
          reason:
            'Server GPU Google Colab hiện đang nghỉ (chế độ tiết kiệm 0đ). Mở notebook colab/vietphuc-tryon-server.ipynb và dán link trycloudflare.com vào mục Cài đặt Demo để kích hoạt ghép ảnh thật.'
        };
      } else if (!validateColabUrl(effectiveColabUrl)) {
        tryOnResult = {
          gpuOffline: true,
          provider: 'colab-invalid-url',
          reason: 'Link GPU Colab phải có định dạng https://xxxx.trycloudflare.com.'
        };
      } else {
        tryOnResult = await runColabTryOn({
          colabUrl: effectiveColabUrl,
          personImageDataUrl,
          garmentImageDataUrl,
          outfitSpec,
          prompt
        });
      }
    } else if (providerName === 'openai') {
      const openaiKey = (process.env.OPENAI_API_KEY || '').trim();
      if (!openaiKey) {
        tryOnResult = {
          gpuOffline: true,
          provider: 'config-missing',
          reason:
            'Chưa cấu hình OPENAI_API_KEY trong .env / Vercel Environment Variables (key tạo tại platform.openai.com).'
        };
      } else {
        tryOnResult = await runOpenAITryOn({
          personImageDataUrl,
          garmentImageDataUrl,
          prompt,
          apiKey: openaiKey
        });
      }
    } else if (providerName === 'fal') {
      const falKey = (process.env.FAL_KEY || '').trim();
      if (!falKey) {
        tryOnResult = {
          gpuOffline: true,
          provider: 'config-missing',
          reason: 'Chưa cấu hình FAL_KEY trong .env / Vercel Environment Variables.'
        };
      } else {
        tryOnResult = await runFalTryOn({
          personImageDataUrl,
          stagePreviewDataUrl,
          prompt,
          apiKey: falKey
        });
      }
    } else {
      if (!geminiKey) {
        tryOnResult = {
          gpuOffline: true,
          provider: 'config-missing',
          reason: 'Chưa cấu hình GEMINI_API_KEY trong .env / Vercel Environment Variables.'
        };
      } else {
        tryOnResult = await runGeminiTryOn({
          personImageDataUrl,
          stagePreviewDataUrl,
          prompt,
          apiKey: geminiKey
        });
      }
    }

    const visionAnalysis = await visionPromise;

    if (tryOnResult?.gpuOffline) {
      return res.status(200).json({
        gpuOffline: true,
        message: tryOnResult.reason,
        stylistAdvice: visionAnalysis?.stylistAdvice || null,
        provider: tryOnResult.provider,
        remainingQuota: limitRes.remaining
      });
    }

    return res.status(200).json({
      ...tryOnResult,
      stylistAdvice: visionAnalysis?.stylistAdvice || null,
      remainingQuota: limitRes.remaining
    });
  } catch (err) {
    return res.status(500).json({
      error: err?.message || 'Lỗi xử lý AI Virtual Try-On.'
    });
  }
}
