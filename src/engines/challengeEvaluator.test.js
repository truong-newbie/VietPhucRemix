import { describe, it, expect } from 'vitest';
import { evaluateChallenge } from './challengeEvaluator';
import { CHALLENGES_DATA } from '../data/challengesData';

describe('challengeEvaluator', () => {
  it('passes when all criteria (event, garment, 0 red violations, harmony) are satisfied', () => {
    const challenge = CHALLENGES_DATA[1]; // Đại Lễ Cưới Hoàng Tộc Huế
    const res = evaluateChallenge(challenge, {
      outfit: { eventId: 'dam-cuoi', garmentId: 'nhat-binh' },
      cultureResult: { issues: [] },
      harmonyResult: { score: 88 }
    });
    expect(res.passed).toBe(true);
    expect(res.checklist.every((c) => c.ok)).toBe(true);
  });

  it('fails when red violation exists or harmony is below threshold', () => {
    const challenge = CHALLENGES_DATA[0]; // Lễ Chùa
    const res = evaluateChallenge(challenge, {
      outfit: { eventId: 'le-chua', garmentId: 'ngu-than' },
      cultureResult: { issues: [{ severity: 'red', title: 'Màu chói' }] },
      harmonyResult: { score: 65 }
    });
    expect(res.passed).toBe(false);
    expect(res.checklist.find((c) => c.id === 'culture')?.ok).toBe(false);
    expect(res.checklist.find((c) => c.id === 'harmony')?.ok).toBe(false);
  });
});
