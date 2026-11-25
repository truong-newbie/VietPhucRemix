import { describe, it, expect } from 'vitest';
import { calculateSusScore, classifySusGrade } from './sus';

describe('SUS score math (Brooke 1996)', () => {
  it('computes 100 for best answers and 0 for worst answers', () => {
    expect(calculateSusScore([5, 1, 5, 1, 5, 1, 5, 1, 5, 1])).toBe(100);
    expect(calculateSusScore([1, 5, 1, 5, 1, 5, 1, 5, 1, 5])).toBe(0);
  });

  it('computes 50 for neutral answers and 75 for target threshold', () => {
    expect(calculateSusScore([3, 3, 3, 3, 3, 3, 3, 3, 3, 3])).toBe(50);
    // 10 câu mỗi câu đóng góp 3 điểm -> 30 * 2.5 = 75
    expect(calculateSusScore([4, 2, 4, 2, 4, 2, 4, 2, 4, 2])).toBe(75);
    expect(classifySusGrade(75).grade).toBe('B');
  });

  it('throws on incomplete or out-of-range answers', () => {
    expect(() => calculateSusScore([5, 1, 5])).toThrow();
    expect(() => calculateSusScore([6, 1, 5, 1, 5, 1, 5, 1, 5, 1])).toThrow();
  });
});
