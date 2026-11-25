import { describe, it, expect } from 'vitest';
import { weatherAdvice } from './weather';

describe('weatherAdvice', () => {
  it('recommends warm brocade and khan van under 19°C', () => {
    const res = weatherAdvice({ tempMax: 15, precipitationProb: 10 }, { name: 'Áo Ngũ Thân' });
    expect(res.fabric).toContain('Gấm');
    expect(res.accessories).toContain('Khăn Vấn');
  });

  it('recommends cool linen/silk and fan over 30°C', () => {
    const res = weatherAdvice({ tempMax: 33, precipitationProb: 0 }, { name: 'Áo Bà Ba' });
    expect(res.fabric).toContain('đũi');
    expect(res.accessories).toContain('Quạt Lụa');
  });

  it('advises wooden clogs when rain probability >= 45%', () => {
    const res = weatherAdvice({ tempMax: 24, precipitationProb: 70 }, { name: 'Áo Dài' });
    expect(res.note).toContain('70%');
    expect(res.accessories.some((a) => a.includes('Guốc Mộc'))).toBe(true);
  });
});
