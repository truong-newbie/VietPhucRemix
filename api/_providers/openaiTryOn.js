// Provider OpenAI Images Edit (/v1/images/edits) cho /api/try-on
// Chỉ dùng OPENAI_API_KEY phía server (.env / Vercel) — không bao giờ expose ra client.

const DEFAULT_OPENAI_IMAGE_MODEL = 'gpt-image-1.5';

export function dataUrlToBlob(dataUrl) {
  const match = /^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/.exec(dataUrl || '');
  if (!match) return null;
  const mimeType = match[1];
  const bytes = Buffer.from(match[2], 'base64');
  return new Blob([bytes], { type: mimeType });
}

export function buildOpenAIEditFormData({
  personImageDataUrl,
  garmentImageDataUrl,
  prompt,
  model = process.env.OPENAI_IMAGE_MODEL || DEFAULT_OPENAI_IMAGE_MODEL,
  quality = 'medium'
}) {
  const personBlob = dataUrlToBlob(personImageDataUrl);
  if (!personBlob) {
    throw new Error('Ảnh chân dung tải lên không đúng định dạng.');
  }

  const form = new FormData();
  form.append('model', model.trim() || DEFAULT_OPENAI_IMAGE_MODEL);
  form.append('image[]', personBlob, 'person.jpg');

  const garmentBlob = garmentImageDataUrl ? dataUrlToBlob(garmentImageDataUrl) : null;
  if (garmentBlob) {
    form.append('image[]', garmentBlob, 'garment.jpg');
  }

  form.append(
    'prompt',
    `${prompt} Strictly preserve the person's exact face, hairstyle, skin tone, body proportions, and original background from the first image; dress them naturally in the authentic Vietnamese traditional costume shown in the second reference image.`
  );
  form.append('size', '1024x1536');
  form.append('quality', quality);
  return form;
}

export async function runOpenAITryOn({
  personImageDataUrl,
  garmentImageDataUrl,
  prompt,
  apiKey,
  model
}) {
  if (!apiKey || !apiKey.trim()) {
    throw new Error('Chưa cấu hình OPENAI_API_KEY trong file .env / Vercel Environment Variables.');
  }

  const selectedModel = (model || process.env.OPENAI_IMAGE_MODEL || DEFAULT_OPENAI_IMAGE_MODEL).trim();
  const form = buildOpenAIEditFormData({
    personImageDataUrl,
    garmentImageDataUrl,
    prompt,
    model: selectedModel
  });

  const resp = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey.trim()}`
    },
    body: form
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`OpenAI Image API lỗi (${resp.status}): ${errText.slice(0, 180)}`);
  }

  const json = await resp.json();
  const item = json?.data?.[0];
  if (item?.b64_json) {
    return {
      imageUrl: `data:image/png;base64,${item.b64_json}`,
      provider: 'openai',
      model: selectedModel
    };
  }
  if (item?.url) {
    return {
      imageUrl: item.url,
      provider: 'openai',
      model: selectedModel
    };
  }

  throw new Error('OpenAI không trả về dữ liệu ảnh hợp lệ.');
}
