import { describe, it, expect } from 'vitest';
import { dataUrlToBlob, buildOpenAIEditFormData } from './openaiTryOn.js';

const SAMPLE_PNG_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

describe('openaiTryOn', () => {
  it('converts valid data URLs into Blobs and rejects invalid inputs', () => {
    const blob = dataUrlToBlob(SAMPLE_PNG_DATA_URL);
    expect(blob).not.toBeNull();
    expect(blob.type).toBe('image/png');
    expect(dataUrlToBlob('not-a-data-url')).toBeNull();
  });

  it('builds multipart FormData with person + garment images and model', () => {
    const form = buildOpenAIEditFormData({
      personImageDataUrl: SAMPLE_PNG_DATA_URL,
      garmentImageDataUrl: SAMPLE_PNG_DATA_URL,
      prompt: 'Vietnamese Ao Tac robe',
      model: 'gpt-image-1.5',
      quality: 'medium'
    });
    expect(form.get('model')).toBe('gpt-image-1.5');
    expect(form.get('quality')).toBe('medium');
    expect(form.getAll('image[]').length).toBe(2);
    expect(String(form.get('prompt'))).toContain('Vietnamese Ao Tac robe');
  });
});
