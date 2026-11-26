// Provider Google Colab GPU T4 (CatVTON) qua Cloudflare Tunnel (*.trycloudflare.com)

export function validateColabUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  const trimmed = rawUrl.trim().replace(/\/+$/, '');
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:') return null;
    // Chặn SSRF: chỉ chấp nhận tunnel công khai hợp lệ của Cloudflare Tunnel
    const host = parsed.hostname.toLowerCase();
    if (!host.endsWith('.trycloudflare.com') || host === '.trycloudflare.com') {
      return null;
    }
    if (parsed.username || parsed.password || parsed.port) return null;
    return `${parsed.protocol}//${host}`;
  } catch {
    return null;
  }
}

export async function runColabTryOn({
  colabUrl,
  personImageDataUrl,
  garmentImageDataUrl,
  outfitSpec = {},
  prompt = ''
}) {
  const cleanUrl = validateColabUrl(colabUrl);
  if (!cleanUrl) {
    return {
      gpuOffline: true,
      provider: 'colab-invalid-url',
      reason: 'Link GPU Colab không hợp lệ (chỉ chấp nhận dạng https://xxxx.trycloudflare.com).'
    };
  }

  const timeoutMs = process.env.VERCEL ? 55000 : 90000;

  try {
    const resp = await fetch(`${cleanUrl}/try-on`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(timeoutMs),
      body: JSON.stringify({
        personImageDataUrl,
        garmentImageDataUrl: garmentImageDataUrl || null,
        garmentId: outfitSpec.garmentId || 'ngu-than',
        outfitSpec,
        prompt
      })
    });

    if (!resp.ok) {
      return {
        gpuOffline: true,
        provider: 'colab-offline',
        reason: `Server GPU Colab phản hồi lỗi (HTTP ${resp.status}). Kiểm tra log Cell 3 trên Colab.`
      };
    }

    const json = await resp.json();
    if (json?.error) {
      return {
        gpuOffline: true,
        provider: 'colab-runtime-error',
        reason: json.error
      };
    }
    if (!json?.imageUrl) {
      return {
        gpuOffline: true,
        provider: 'colab-empty',
        reason: 'Server GPU Colab chưa trả về ảnh kết quả hợp lệ.'
      };
    }

    return {
      imageUrl: json.imageUrl,
      provider: 'colab-catvton'
    };
  } catch (err) {
    const isTimeout = err?.name === 'TimeoutError' || err?.name === 'AbortError';
    return {
      gpuOffline: true,
      provider: 'colab-offline',
      reason: isTimeout
        ? `GPU Colab xử lý quá ${Math.round(timeoutMs / 1000)} giây (lần chạy đầu cần làm nóng CUDA, bạn bấm thử lại 1 lần nữa sẽ nhanh hơn).`
        : `Không kết nối được tới GPU Colab (${err?.message || 'mạng/tunnel bị ngắt'}). Hãy kiểm tra Cell 3 trên Colab còn chạy không.`
    };
  }
}
