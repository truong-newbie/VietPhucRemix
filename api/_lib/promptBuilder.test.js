import { describe, it, expect } from 'vitest';
import { buildTryOnPrompt } from './promptBuilder';

describe('promptBuilder', () => {
  it('builds garment-specific anatomy prompt and guards against Qipao/Hanfu drift', () => {
    const prompt = buildTryOnPrompt({
      garmentId: 'nhat-binh',
      outerColorName: 'Vàng Hoàng Thổ',
      bottomColorName: 'Trắng Sứ Ngà'
    });
    expect(prompt).toContain('Nhat Binh');
    expect(prompt).toContain('Vàng Hoàng Thổ');
    expect(prompt).toContain('Qipao');
  });
});
