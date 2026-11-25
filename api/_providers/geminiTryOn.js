// Provider Gemini Flash Image cho /api/try-on

function parseDataUrl(dataUrl) {
  const match = /^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/.exec(dataUrl || '');
  if (!match) return null;
  return { mimeType: match[1], data: match[2] };
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

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${encodeURIComponent(
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

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Gemini API lỗi (${resp.status}): ${errText.slice(0, 180)}`);
  }

  const json = await resp.json();
  const candidates = json?.candidates?.[0]?.content?.parts || [];
  const imagePart = candidates.find((p) => p.inlineData?.data);
  if (!imagePart) {
    throw new Error('Gemini không trả về dữ liệu ảnh hợp lệ.');
  }

  const mime = imagePart.inlineData.mimeType || 'image/png';
  return {
    imageUrl: `data:${mime};base64,${imagePart.inlineData.data}`,
    provider: 'gemini'
  };
}
