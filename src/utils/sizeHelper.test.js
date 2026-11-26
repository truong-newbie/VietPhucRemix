import { describe, it, expect } from 'vitest';
import { suggestGarmentSize, estimateDiscountedPrice } from './sizeHelper';

describe('sizeHelper', () => {
  it('suggests S/M/L/XL accurately based on height and weight', () => {
    expect(suggestGarmentSize(154, 46)?.size).toBe('S');
    expect(suggestGarmentSize(164, 56)?.size).toBe('M');
    expect(suggestGarmentSize(172, 68)?.size).toBe('L');
    expect(suggestGarmentSize(180, 82)?.size).toBe('XL');
    expect(suggestGarmentSize(0, 50)).toBeNull();
  });

  it('estimates 10% discounted price from VND range strings', () => {
    expect(estimateDiscountedPrice('300.000đ - 500.000đ / ngày', 10)).toBe('~270k – 450k');
    expect(estimateDiscountedPrice('2.000.000đ', 10)).toBe('~1.8tr');
    expect(estimateDiscountedPrice('Liên hệ', 10)).toBe('');
  });
});
