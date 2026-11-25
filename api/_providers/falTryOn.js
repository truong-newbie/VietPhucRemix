// Provider Fal.ai (Flux Kontext / VTON) cho /api/try-on

export async function runFalTryOn({ personImageDataUrl, stagePreviewDataUrl, prompt, apiKey }) {
  const resp = await fetch('https://fal.run/fal-ai/flux-pro/kontext', {
    method: 'POST',
    headers: {
      Authorization: `Key ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt,
      image_url: personImageDataUrl,
      ...(stagePreviewDataUrl ? { reference_image_url: stagePreviewDataUrl } : {})
    })
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Fal.ai API lỗi (${resp.status}): ${errText.slice(0, 180)}`);
  }

  const json = await resp.json();
  const imageUrl = json?.images?.[0]?.url;
  if (!imageUrl) {
    throw new Error('Fal.ai không trả về URL ảnh kết quả.');
  }

  return { imageUrl, provider: 'fal' };
}
